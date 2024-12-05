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
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const data = parsed.data;

    // Extract image files from the form
    const cnicImage = form.get("cnicImage") as File;
    const uniIdImage = form.get("uniIdImage") as File;
    const paymentProofImage = form.get("paymentProofImage") as File;

    if (!cnicImage || !uniIdImage || !paymentProofImage) {
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

    // Email content
    const mailOptions: Mail.Options = {
      from: env.SMTP_EMAIL_FROM,
      to: data.email,
      subject: "We have received your Science Bee Registration Request!",
      text: `Hello ${data.name}!\n\nThank you so much for signing up for the Science Bee XI.\n\nHave a great day.`,
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

    // Google Drive Setup
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });

    // Create the main folder if it doesn't exist
    const mainFolderId = env.GOOGLE_DRIVE_FOLDER_ID!;

    // Find the current row count in the sheet
    const sheetInfo = await sheets.spreadsheets.values.get({
      spreadsheetId: env.GOOGLE_SHEET_ID!,
      range: "Sheet1!A:A",
    });
    const rowNumber = (sheetInfo.data.values?.length || 0) + 1;

    // Create a new folder for the current transaction
    const transactionFolderName = `Transaction-${rowNumber}`;
    const transactionFolderId = await createFolder(
      drive,
      transactionFolderName,
      mainFolderId,
    );

    // Upload images to the transaction folder
    const cnicImageUrl = await uploadFile(
      drive,
      cnicImage,
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

    // Prepare values for Google Sheets
    const values = [
      data.name,
      data.email,
      data.phone,
      data.university,
      data.guardianPhone,
      data.city,
      "Submitted", // Payment Status
      cnicImageUrl,
      uniIdImageUrl,
      paymentProofImageUrl,
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

    // Send email and append data to the Google Sheet
    await Promise.all([
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("Error sending email:", err);
            reject("Email not sent");
          } else {
            console.log("Email sent:", info.response);
            resolve("Email sent");
          }
        });
      }),
      sheets.spreadsheets.values.append(sheetRequest),
    ]);

    return NextResponse.json({
      message: "Email sent and data appended to Google Sheets",
    });
  } catch (error) {
    console.error("Error during request:", error);
    return NextResponse.json(
      {
        error: `Failed to send email or append data: ${(error as any).message}`,
      },
      { status: 500 },
    );
  }
}

// Utility function to create a folder in Google Drive
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
    console.log(`Folder created: ${folder.data.id}`);
    return folder.data.id!;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw new Error("Failed to create folder in Google Drive");
  }
}

// Utility function to upload a file to Google Drive
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

    console.log(`File uploaded: ${res.data.id}`);
    return `https://drive.google.com/uc?id=${res.data.id}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file to Google Drive");
  }
}
