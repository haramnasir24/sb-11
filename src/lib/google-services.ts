/* eslint-disable no-console */
import { google } from "googleapis";
import { Readable } from "stream";

import { env } from "@/env";

function getServiceAccountCredentials() {
  const encodedCredentials = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!encodedCredentials) {
    return null;
  }

  try {
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64",
    ).toString();
    return JSON.parse(decodedCredentials);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      "Failed to decode Google service account credentials:",
      error,
    );
    return null;
  }
}

const credentials = getServiceAccountCredentials();

// Initialize Google OAuth2 client
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

// Initialize Google Sheets
const sheets = google.sheets({ version: "v4", auth });
const SHEET_ID = env.GOOGLE_SHEET_ID;

// Initialize Google Drive
const drive = google.drive({ version: "v3", auth });
const FOLDER_ID = env.GOOGLE_DRIVE_FOLDER_ID;

// Helper function to convert File to Buffer
async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Upload file to Google Drive
export async function uploadToDrive(
  file: File,
  fileName: string,
): Promise<string> {
  try {
    const buffer = await fileToBuffer(file);
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: file.type,
        body: bufferStream,
      },
      fields: "id, webViewLink",
    });

    return response.data.webViewLink || "";
  } catch (error) {
    console.error("Error uploading to Drive:", error);
    throw new Error("Failed to upload file to Google Drive");
  }
}

// Append row to Google Sheets
export async function appendToSheet(values: any[]): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:Z", // Adjust range as needed
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    });
  } catch (error) {
    console.error("Error appending to Sheet:", error);
    throw new Error("Failed to append data to Google Sheets");
  }
}
