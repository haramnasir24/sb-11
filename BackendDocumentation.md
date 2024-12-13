# Backend Documentation: Email and Submit Data API

## Overview

This backend service handles the processing of form data submitted by users. It performs the following tasks:

1. Validates the form data using a schema.
2. Handles file uploads to Google Drive.
3. Sends confirmation emails to users.
4. Appends form data to a Google Sheet.

## Endpoint

**POST** `/api/email-and-submit-data`

### Request Format

The endpoint accepts a `multipart/form-data` request containing the following fields:

#### Form Fields

- **name** (string): Required. The user's full name.
- **email** (string): Required. Must be a valid email address.
- **phone** (string): Required. Must start with `03` and be 11 digits long.
- **Cnic** (string): Required. Must be 13 digits long.
- **university** (string): Required. User's university name.
- **guardianPhone** (string): Required. Must start with `03` and be 11 digits long.
- **city** (string): Required. User's city of residence.
- **accomodationDetails** (boolean): Indicates if accommodation is required.
- **isTeam** (boolean): Indicates if the user is part of a team.

#### File Uploads

- **profileImage** (File): Required. The user's profile image.
- **uniIdImage** (File): Required. The user's university ID image.
- **paymentProofImage** (File): Required. Proof of payment.

### Response Format

#### Success Response

```json
{
  "message": "Email sent and data appended to Google Sheets"
}
```

#### Error Response

```json
{
  "error": "<Error Message>"
}
```

---

## Implementation Details

### Validation

Form data is validated using the `zod` schema library. The schema ensures all required fields are present and meet format specifications.

### File Uploads

Files are uploaded to a specific folder in Google Drive:

1. A main folder is identified using `env.GOOGLE_DRIVE_FOLDER_ID`.
2. A sub-folder is created for each transaction.
3. Files are uploaded to this sub-folder and publicly accessible URLs are generated.

### Email Sending

Emails are sent using `nodemailer` with the following configuration:

- **SMTP Details:**
  - Host: `env.SMTP_HOST`
  - Port: `env.SMTP_PORT`
  - User: `env.SMTP_USER`
  - Password: `env.SMTP_PASSWORD`
- The email contains both text and HTML content.

### Google Sheets

Form data is appended to a Google Sheet:

- Spreadsheet ID: `env.GOOGLE_SHEET_ID`
- Data is added to `Sheet1`.

### OAuth2 Authentication

Google Drive and Sheets operations are authenticated using OAuth2:

- Credentials include `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, and `GOOGLE_REFRESH_TOKEN`.
- Access tokens are refreshed if expired.

---

## Utility Functions

### `refreshAccessTokenIfNeeded`

Refreshes the OAuth2 access token if it has expired.

#### Parameters

- `oauth2Client`: The OAuth2 client instance.

### `createFolder`

Creates a folder in Google Drive.

#### Parameters

- `drive`: The Google Drive instance.
- `folderName`: The name of the folder.
- `parentFolderId`: The ID of the parent folder.

#### Returns

- The ID of the created folder.

### `uploadFile`

Uploads a file to Google Drive.

#### Parameters

- `drive`: The Google Drive instance.
- `file`: The file to be uploaded.
- `parentFolderId`: The ID of the parent folder.

#### Returns

- The public URL of the uploaded file.

---

## Environment Variables

### Required Variables

- `SMTP_HOST`: SMTP server host.
- `SMTP_PORT`: SMTP server port.
- `SMTP_USER`: SMTP username.
- `SMTP_PASSWORD`: SMTP password.
- `SMTP_EMAIL_FROM`: Sender's email address.
- `GOOGLE_CLIENT_ID`: Google API client ID.
- `GOOGLE_CLIENT_SECRET`: Google API client secret.
- `GOOGLE_REDIRECT_URI`: Google API redirect URI.
- `GOOGLE_REFRESH_TOKEN`: Google API refresh token.
- `GOOGLE_DRIVE_FOLDER_ID`: ID of the main folder in Google Drive.
- `GOOGLE_SHEET_ID`: ID of the Google Sheet.

---

## Error Handling

1. **Validation Errors**: Returns `400` with a message indicating invalid data.
2. **File Upload Errors**: Logs error and throws a descriptive message.
3. **Email Sending Errors**: Logs error and throws a descriptive message.
4. **Google Sheets Errors**: Logs error and throws a descriptive message.

---

## Logging

Logs are used for debugging purposes:

- Email sending status.
- File upload success or failure.
- Folder creation success or failure.
- OAuth2 token refresh status.

---

## Dependencies

- `googleapis`: For interacting with Google Drive and Sheets.
- `nodemailer`: For sending emails.
- `zod`: For schema validation.
- `next/server`: For handling Next.js API requests.
