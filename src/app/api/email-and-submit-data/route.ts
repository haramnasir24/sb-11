/* eslint-disable */
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { sheets } from "@/lib/google-sheets";

import Schema from "@/constant/form-schemas/schema";

export async function POST(request: NextRequest) {
  const parsed = Schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid data" });
  }

  const data = parsed.data;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    requireTLS: true,
  });

  const mailOptions: Mail.Options = {
    from: process.env.SMTP_EMAIL_FROM,
    to: data.email,
    subject: "Thank you for subscribing to Connect Meses!",
    text: `
      Hello ${data.name}!
  
      Thank you so much for signing-up on NSS
  
      Have a great day,
    `,
    html: `
      <html>
        <body>
          <p>Hello ${data.name}!</p>
  
          <p>Thank you so much for signing-up on NSS</p>
  
          <p>Have a great day,</p>
        </body>
      </html>
    `,
  };

  const values = [data.name, data.email, data.phone];

  const sheetRequest = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "A1", // first col
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [values],
    },
    auth: sheets.context._options.auth,
  };

  try {
    await Promise.all([
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err) {
          if (!err) {
            resolve("Email sent");
          } else {
            reject("Email not sent");
          }
        });
      }),
      sheets.spreadsheets.values.append(sheetRequest),
    ]);
    return NextResponse.json({
      message: "Email sent and data appended to Google Sheets",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email or append data" },
      { status: 500 },
    );
  }
}
