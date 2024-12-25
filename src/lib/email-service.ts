/* eslint-disable no-console */
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { env } from "@/env";
import { FormSchemaValues } from "@/schema/form";

export async function sendConfirmationEmail(
  data: FormSchemaValues,
): Promise<void> {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });

    const modulesList = data.modules.selections
      .map((module) => `<li>${module}</li>`)
      .join("");

    const accommodationDetails =
      data.accommodation.required === "Yes"
        ? `Duration: ${data.accommodation.duration}`
        : "No accommodation requested";

    const chaperoneDetails =
      data.chaperone.bringing === "Yes"
        ? `
        <p><strong>Name:</strong> ${data.chaperone.name}</p>
        <p><strong>CNIC:</strong> ${data.chaperone.cnic}</p>
        <p><strong>Accommodation:</strong> ${
          data.chaperone.accommodation.required === "Yes"
            ? data.chaperone.accommodation.duration
            : "No accommodation"
        }</p>
      `
        : "<p>No chaperone</p>";

    const teamDetails =
      data.participationType.type === "team"
        ? `
        <p><strong>Team Name:</strong> ${data.participationType.teamDetails.teamName}</p>
        <p><strong>Number of Members:</strong> ${data.participationType.teamDetails.numberOfMembers}</p>
        <h4>Team Members:</h4>
        <ul>
          ${data.participationType.teamDetails.members
            .map(
              (member, index) => `
            <li>
              <strong>${index + 1}. ${member.name}</strong><br>
              CNIC: ${member.cnic}<br>
              Accommodation: ${
                member.accommodation.required === "Yes"
                  ? member.accommodation.duration
                  : "No accommodation"
              }
            </li>
          `,
            )
            .join("")}
        </ul>
      `
        : "<p>Individual Participant</p>";

    const mailOptions: Mail.Options = {
      from: env.SMTP_EMAIL_FROM,
      to: data.email,
      cc: "nsswebnit@gmail.com",
      subject: "Science Bee XI - Registration Confirmation",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Science Bee XI Registration Confirmation</h2>
            <p>Dear ${data.userName},</p>
            
            <p>Thank you for registering for Science Bee XI! Your registration has been successfully received.</p>
            
            <h3>Registration Details:</h3>
            <p>
              <strong>Name:</strong> ${data.userName}<br>
              <strong>Email:</strong> ${data.email}<br>
              <strong>Phone:</strong> ${data.phone}<br>
              <strong>CNIC:</strong> ${data.cnic}<br>
              <strong>Designation:</strong> ${data.designation}<br>
              <strong>Institute:</strong> ${data.instituteName}<br>
              <strong>Guardian Phone:</strong> ${data.guardianPhone}<br>
              <strong>City:</strong> ${data.city}
            </p>

            <h3>Selected Modules:</h3>
            <ul>
              ${modulesList}
            </ul>

            <h3>Accommodation:</h3>
            <p>${accommodationDetails}</p>

            <h3>Participation Type:</h3>
            ${teamDetails}

            <h3>Chaperone Information:</h3>
            ${chaperoneDetails}

            <h3>Total Registration Amount:</h3>
            <p>Rs. ${data.totalRegistrationAmount.toLocaleString()}</p>

            <h3>Important Notes:</h3>
            <ul>
              <li>Please keep this email for your records</li>
              <li>Bring your CNIC/Student Card on the event day</li>
              <li>For any queries, contact us at sbxregi@gmail.com</li>
            </ul>

            <p>Best regards,<br>
            Science Bee XI Team<br>
            NUST Science Society</p>
          </body>
        </html>
      `,
    };

    await transport.sendMail(mailOptions);

    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error("Failed to send confirmation email");
  }
}
