import { google } from "googleapis";
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { Readable } from "stream";

import { sheets } from "@/lib/google-sheets";

import Schema from "@/constant/form-schemas/schema";
import { env } from "@/env";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming form data
    const form = await request.formData();
    const parsed = Schema.safeParse(Object.fromEntries(form.entries()));

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: parsed.error.errors,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Extract image files from the form data.profileImage
    const profileImage = form.get("profileImage") as File;
    const uniIdImage = form.get("uniIdImage") as File;
    const paymentProofImage = form.get("paymentProofImage") as File;

    if (!profileImage || !uniIdImage || !paymentProofImage) {
      return NextResponse.json(
        { message: "All images are required" },
        { status: 400 },
      );
    }

    // Configure nodemailer transport
    const transport = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
      requireTLS: true,
    });

    const mailOptions: Mail.Options = {
      from: env.SMTP_EMAIL_FROM,
      to: data.email,
      subject: "We have received your Science Bee Registration Request!",
      html: `
        <html>
          <body>
            <p>Hello ${data.name}!</p>
            <p>Thank you so much for signing up for the Science Bee XI</p>
            <p>Have a great day,</p>
          </body>
        </html>
      `,
    };

    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      env.GOOGLE_REDIRECT_URI,
    );

    oauth2Client.setCredentials({
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
    });

    await refreshAccessTokenIfNeeded(oauth2Client);

    // Google Drive Setup
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });

    const mainFolderId = env.GOOGLE_DRIVE_FOLDER_ID!;
    const sheetInfo = await sheets.spreadsheets.values.get({
      spreadsheetId: env.GOOGLE_SHEET_ID!,
      range: "Sheet1!A:A",
    });
    const rowNumber = (sheetInfo.data.values?.length || 0) + 1;
    const transactionFolderName = `Transaction-${rowNumber}`;
    const transactionFolderId = await createFolder(
      drive,
      transactionFolderName,
      mainFolderId,
    );

    const profileImageUrl = await uploadFile(
      drive,
      profileImage,
      transactionFolderId,
    );
    const uniIdImageUrl = await uploadFile(
      drive,
      uniIdImage,
      transactionFolderId,
    );
    const paymentProofImageUrl = await uploadFile(
      drive,
      paymentProofImage,
      transactionFolderId,
    );

    const teamMembersData = [];
    const teamMembersCopy = JSON.parse(data.teamMembers);
    if (teamMembersCopy.length > 5) {
      return NextResponse.json(
        { message: "A team can have a maximum of 5 members" },
        { status: 400 },
      );
    }

    for (const [index, member] of teamMembersCopy.entries()) {
      const studentCardImage = form.get(`studentCardImage${index + 1}`) as File;
      if (!studentCardImage) {
        return NextResponse.json(
          {
            message: `StudentCardImage is required for team member ${index + 1}`,
          },
          { status: 400 },
        );
      }

      const studentCardImageUrl = await uploadFile(
        drive,
        studentCardImage,
        transactionFolderId,
      );

      teamMembersData.push(
        member.memberName || "",
        member.memberCNIC || "",
        studentCardImageUrl,
      );
    }

    const values = [
      data.name,
      data.email,
      data.phone,
      data.Cnic,
      data.university,
      data.guardianPhone,
      data.city,
      data.referralCode,
      "Submitted",
      profileImageUrl,
      uniIdImageUrl,
      data.accomodationDetails, // Assuming this is a boolean
      data.nights,
      data.isTeam,
      data.teamName,
      paymentProofImageUrl,
      ...teamMembersData, // Includes URLs for StudentCardImage
    ];

    const sheetRequest = {
      spreadsheetId: env.GOOGLE_SHEET_ID!,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [values],
      },
      auth: sheets.context._options.auth,
    };

    await Promise.all([
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, (err) => {
          if (err) reject("Email not sent");
          else resolve("Email sent");
        });
      }),
      sheets.spreadsheets.values.append(sheetRequest),
    ]);

    return NextResponse.json({
      message: "Email sent and data appended to Google Sheets",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to process request: ${(error as any).message}`,
      },
      { status: 500 },
    );
  }
}

async function refreshAccessTokenIfNeeded(oauth2Client: any) {
  const tokenInfo = oauth2Client.getAccessToken();
  const isTokenExpired =
    tokenInfo && tokenInfo.expiry_date && tokenInfo.expiry_date <= Date.now();
  if (isTokenExpired) {
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);
  }
}

async function createFolder(
  drive: any,
  folderName: string,
  parentFolderId: string,
): Promise<string> {
  try {
    const folderMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
    };

    const folder = await drive.files.create({
      requestBody: folderMetadata,
      fields: "id",
    });
    return folder.data.id!;
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    throw new Error("Failed to create folder in Google Drive");
  }
}

async function uploadFile(
  drive: any,
  file: File,
  parentFolderId: string,
): Promise<string> {
  try {
    const buffer = await file.arrayBuffer();
    const readable = new Readable();
    readable._read = () => {};
    readable.push(Buffer.from(buffer));
    readable.push(null);

    const fileMetadata = {
      name: file.name,
      parents: [parentFolderId],
    };

    const media = {
      mimeType: file.type,
      body: readable,
    };

    const res = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
    });
    return `https://drive.google.com/uc?id=${res.data.id}`;
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    throw new Error("Failed to upload file to Google Drive");
  }
}
