/* eslint-disable unused-imports/no-unused-vars */
import { google } from "googleapis";
import { sheets_v4 } from "googleapis";
import { toast } from "sonner";
import { Readable } from "stream";

import { env } from "@/env";

function getServiceAccountCredentials() {
  const encodedCredentials = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!encodedCredentials) {
    throw new Error("Google service account credentials not found");
  }

  try {
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64",
    ).toString();
    return JSON.parse(decodedCredentials);
  } catch (error) {
    toast.error("Invalid Google service account credentials");
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

// Add this new function to create folder
export async function createUserFolder(
  userName: string,
  instituteName: string,
): Promise<string> {
  try {
    const folderName = `${userName}_${instituteName}`.replace(
      /[^a-zA-Z0-9_]/g,
      "_",
    );

    // First check if folder exists
    const findFolderResponse = await drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${FOLDER_ID}' in parents and trashed=false`,
      fields: "files(id)",
      spaces: "drive",
    });

    if (
      findFolderResponse.data.files &&
      findFolderResponse.data.files.length > 0
    ) {
      return findFolderResponse.data.files[0].id!;
    }

    // Create new folder
    const createFolderResponse = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [FOLDER_ID],
      },
      fields: "id",
    });

    if (!createFolderResponse.data.id) {
      throw new Error("Failed to create folder");
    }

    return createFolderResponse.data.id;
  } catch (error) {
    toast.error("Error creating user folder");
    throw new Error("Failed to create user folder");
  }
}

// Modify uploadToDrive to accept folderId
export async function uploadToDrive(
  file: File,
  fileName: string,
  folderId: string,
): Promise<string> {
  try {
    const buffer = await fileToBuffer(file);
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: file.type,
        body: bufferStream,
      },
      fields: "webViewLink",
    });

    if (!response.data.webViewLink) {
      throw new Error("Failed to get file URL");
    }

    return response.data.webViewLink;
  } catch (error) {
    toast.error("Error uploading file, please try again later");
    throw new Error("Failed to upload file");
  }
}

// Append row to Google Sheets
export async function appendToSheet(values: any[]): Promise<void> {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:Z",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      } as sheets_v4.Schema$ValueRange,
    });

    if (response.status !== 200) {
      throw new Error(`Failed to append to sheet: ${response.statusText}`);
    }
  } catch (error) {
    toast.error("Error appending to Sheet");
    throw new Error("Failed to append data to Google Sheets");
  }
}
