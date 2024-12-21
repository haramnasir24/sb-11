/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";
import { Readable } from "stream";

import { env } from "@/env";
import { formSchema } from "@/schema/form";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    // Parse the stringified JSON fields back to objects
    const entries = Array.from(form.entries()).map(([key, value]) => {
      if (key === "participationType" || key === "accommodation") {
        return [key, JSON.parse(value as string)];
      }
      return [key, value];
    });

    const parsed = formSchema.safeParse(Object.fromEntries(entries));

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

    // Extract image files
    const profilePicture = form.get("profilePicture") as File;
    const studentCardorCNIC = form.get("studentCardorCNIC") as File;
    const paymentProof = form.get("paymentProof") as File;

    if (!profilePicture || !studentCardorCNIC || !paymentProof) {
      return NextResponse.json(
        { message: "All required images are missing" },
        { status: 400 },
      );
    }

    // // Configure nodemailer transport
    // const transport = nodemailer.createTransport({
    //   host: env.SMTP_HOST,
    //   port: Number(env.SMTP_PORT),
    //   secure: false,
    //   auth: {
    //     user: env.SMTP_USER,
    //     pass: env.SMTP_PASSWORD,
    //   },
    //   requireTLS: true,
    // });

    // const mailOptions = {
    //   from: env.SMTP_EMAIL_FROM,
    //   to: data.email,
    //   subject: "Registration Confirmation",
    //   html: `
    //     <html>
    //       <body>
    //         <p>Hello ${data.userName}!</p>
    //         <p>Thank you for your registration. We have received your submission.</p>
    //         <p>Best regards,</p>
    //         <p>The Team</p>
    //       </body>
    //     </html>
    //   `,
    // };

    // Initialize Google OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      env.GOOGLE_REDIRECT_URI,
    );

    oauth2Client.setCredentials({
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
    });

    await refreshAccessTokenIfNeeded(oauth2Client);

    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const sheets = google.sheets({ version: "v4", auth: oauth2Client });

    // Create folder and upload files
    const mainFolderId = env.GOOGLE_DRIVE_FOLDER_ID!;
    const sheetInfo = await sheets.spreadsheets.values.get({
      spreadsheetId: env.GOOGLE_SHEET_ID!,
      range: "Sheet1!A:A",
    });

    const rowNumber = (sheetInfo.data.values?.length || 0) + 1;
    const folderName = `Submission-${rowNumber}`;
    const folderId = await createFolder(drive, folderName, mainFolderId);

    // Upload main files
    const profilePictureUrl = await uploadFile(drive, profilePicture, folderId);
    const studentCardorCNICUrl = await uploadFile(
      drive,
      studentCardorCNIC,
      folderId,
    );
    const paymentProofUrl = await uploadFile(drive, paymentProof, folderId);

    // Handle team members' files
    let teamMembersData: any[] = [];
    if (data.participationType.type === "team") {
      teamMembersData = await Promise.all(
        data.participationType.teamDetails.members.map(
          async (member, index) => {
            const studentCardPhoto = form.get(
              `teamMember${index + 1}StudentCardPhoto`,
            ) as File;

            if (!studentCardPhoto) {
              throw new Error(
                `Student card photo for team member ${index + 1} is missing`,
              );
            }

            const studentCardPhotoUrl = await uploadFile(
              drive,
              studentCardPhoto,
              folderId,
            );

            return [member.name, member.cnic, studentCardPhotoUrl];
          },
        ),
      );
    }

    // Prepare data for Google Sheet
    const values = [
      data.userName,
      data.email,
      data.phone,
      data.cnic,
      data.instituteName,
      data.guardianPhone,
      data.city,
      data.referralCode || "",
      "Submitted",
      profilePictureUrl,
      studentCardorCNICUrl,
      data.accommodation.required,
      data.accommodation.required === "Yes" ? data.accommodation.duration : "",
      data.participationType.type,
      data.participationType.type === "team"
        ? data.participationType.teamDetails.teamName
        : "",
      paymentProofUrl,
      ...teamMembersData.flat(),
    ];

    // Append data to Google Sheet
    const sheetRequest = {
      spreadsheetId: env.GOOGLE_SHEET_ID!,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [values],
      },
    };

    // Execute email sending and sheet update in parallel
    await Promise.all([
      // new Promise<void>((resolve, reject) => {
      //   transport.sendMail(mailOptions, (err) => {
      //     if (err) reject(err);
      //     else resolve();
      //   });
      // }),
      sheets.spreadsheets.values.append(sheetRequest),
    ]);

    return NextResponse.json({
      message: "Registration successful. Email sent and data recorded.",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        message: "Failed to process registration",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

async function refreshAccessTokenIfNeeded(oauth2Client: any) {
  try {
    const tokenInfo = await oauth2Client.getAccessToken();
    const isTokenExpired =
      tokenInfo && tokenInfo.expiry_date && tokenInfo.expiry_date <= Date.now();

    if (isTokenExpired) {
      await oauth2Client.refreshAccessToken();
      console.log("Access token refreshed successfully.");
    }
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error instanceof Error ? error.message : error,
    );
    throw new Error("Failed to refresh access token.");
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
    return folder.data.id;
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
  } catch (error) {
    throw new Error("Failed to upload file to Google Drive");
  }
}
