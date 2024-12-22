/* eslint-disable no-console */
import { NextRequest, NextResponse } from "next/server";

import { appendToSheet, uploadToDrive } from "@/lib/google-services";

import { formSchema } from "@/schema/form";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Parse JSON strings back to objects
    const rawFormData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key === "participationType" || key === "accommodation") {
        rawFormData[key] = JSON.parse(value as string);
      } else {
        rawFormData[key] = value;
      }
    });

    // Validate the form data
    const validatedData = await formSchema.parseAsync(rawFormData);

    // Upload files to Drive
    const [profilePictureUrl, studentCardUrl, paymentProofUrl] =
      await Promise.all([
        uploadToDrive(
          validatedData.profilePicture,
          `profile_${validatedData.userName}_${Date.now()}`,
        ),
        uploadToDrive(
          validatedData.studentCardorCNIC,
          `student_card_${validatedData.userName}_${Date.now()}`,
        ),
        uploadToDrive(
          validatedData.paymentProof,
          `payment_${validatedData.userName}_${Date.now()}`,
        ),
      ]);

    // Prepare base data for Google Sheets
    const sheetData = [
      validatedData.userName,
      validatedData.email,
      validatedData.phone,
      validatedData.cnic,
      validatedData.instituteName,
      validatedData.guardianPhone,
      validatedData.city,
      validatedData.referralCode || "",
      profilePictureUrl,
      studentCardUrl,
      validatedData.accommodation.required,
      validatedData.accommodation.required === "Yes"
        ? validatedData.accommodation.duration
        : "N/A",
      validatedData.participationType.type,
      validatedData.participationType.type === "team"
        ? validatedData.participationType.teamDetails.teamName
        : "N/A",
      paymentProofUrl,
    ];

    // Handle team members data if applicable
    if (validatedData.participationType.type === "team") {
      const memberUploads = await Promise.all(
        validatedData.participationType.teamDetails.members.map(
          async (member) => {
            const memberCardUrl = await uploadToDrive(
              member.studentCardPhoto,
              `team_member_${member.name}_${Date.now()}`,
            );
            return [member.name, member.cnic, memberCardUrl];
          },
        ),
      );

      sheetData.push(...memberUploads.flat());
    }

    await appendToSheet(sheetData);

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process form submission",
      },
      { status: 500 },
    );
  }
}
