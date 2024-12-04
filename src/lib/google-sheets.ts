/* eslint-disable */
import { google } from "googleapis";

let sheetsInstance: any = null;

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
    console.error(
      "Failed to decode Google service account credentials:",
      error,
    );
    return null;
  }
}

function initializeGoogleSheets() {
  if (sheetsInstance) {
    return sheetsInstance;
  }

  const credentials = getServiceAccountCredentials();

  if (!credentials) {
    console.warn(
      "Google Sheets integration is disabled - missing or invalid credentials",
    );
    return null;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    sheetsInstance = google.sheets({
      version: "v4",
      auth,
    });

    return sheetsInstance;
  } catch (error) {
    console.error("Failed to initialize Google Sheets:", error);
    return null;
  }
}

// Modified appendToGoogleSheet function with safety checks
export async function appendToGoogleSheet(values: any[]) {
  const sheets = initializeGoogleSheets();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheets || !spreadsheetId) {
    console.warn("Skipping Google Sheets append - integration not configured");
    return;
  }

  try {
    const sheetRequest = {
      spreadsheetId,
      range: "A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [values],
      },
    };

    await sheets.spreadsheets.values.append(sheetRequest);
    console.log("Successfully appended data to Google Sheets");
  } catch (error) {
    console.error("Failed to append to Google Sheets:", error);
    throw error;
  }
}

// Export a function to check if Google Sheets is properly configured
export function isGoogleSheetsConfigured(): boolean {
  return !!getServiceAccountCredentials() && !!process.env.GOOGLE_SHEET_ID;
}

export const sheets = initializeGoogleSheets();
