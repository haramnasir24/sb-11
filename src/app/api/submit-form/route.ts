/* eslint-disable no-console */
import { NextRequest, NextResponse } from "next/server";

import {
  appendToSheet,
  createUserFolder,
  uploadToDrive,
} from "@/lib/google-services";

import { formSchema } from "@/schema/form";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log("Raw form data entries:", Array.from(formData.entries()));

    // Parse JSON fields first
    const rawFormData: Record<string, any> = {
      modules: JSON.parse(formData.get("modules") as string),
      accommodation: JSON.parse(formData.get("accommodation") as string),
      chaperone: JSON.parse(formData.get("chaperone") as string),
      participationType: JSON.parse(
        formData.get("participationType") as string,
      ),
      totalRegistrationAmount: Number(formData.get("totalRegistrationAmount")),
    };

    // Add basic fields
    const basicFields = [
      "userName",
      "email",
      "phone",
      "cnic",
      "designation",
      "instituteName",
      "guardianPhone",
      "city",
      "referralCode",
    ];
    basicFields.forEach((field) => {
      const value = formData.get(field);
      if (value) rawFormData[field] = value;
    });

    // Handle file uploads
    const fileFields = ["profilePicture", "studentCardorCNIC", "paymentProof"];
    fileFields.forEach((field) => {
      rawFormData[field] = formData.get(field);
    });

    // Handle team members if present
    if (rawFormData.participationType.type === "team") {
      const memberCount =
        rawFormData.participationType.teamDetails.numberOfMembers;
      rawFormData.participationType.teamDetails.members = [];

      for (let i = 0; i < memberCount; i++) {
        const memberData = {
          name: formData.get(`participationType.teamDetails.members.${i}.name`),
          cnic: formData.get(`participationType.teamDetails.members.${i}.cnic`),
          studentCardPhoto: formData.get(
            `participationType.teamDetails.members.${i}.studentCardPhoto`,
          ),
          teamMemberProfilePhoto: formData.get(
            `participationType.teamDetails.members.${i}.teamMemberProfilePhoto`,
          ),
          accommodation: JSON.parse(
            formData.get(
              `participationType.teamDetails.members.${i}.accommodation`,
            ) as string,
          ),
        };
        rawFormData.participationType.teamDetails.members.push(memberData);
      }
    }

    // Validate data
    const validatedData = await formSchema.parseAsync(rawFormData);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    // Create folder once at the start
    const folderId = await createUserFolder(
      validatedData.userName,
      validatedData.instituteName,
    );

    // Handle file uploads using the same folder ID
    const [profilePictureUrl, studentCardUrl, paymentProofUrl] =
      await Promise.all([
        uploadToDrive(
          validatedData.profilePicture,
          `profile_${validatedData.userName}`,
          folderId,
        ),
        uploadToDrive(
          validatedData.studentCardorCNIC,
          `student_card_${validatedData.userName}`,
          folderId,
        ),
        uploadToDrive(
          validatedData.paymentProof,
          `payment_${validatedData.userName}`,
          folderId,
        ),
      ]);

    // Prepare sheet data
    const sheetData = [
      new Date().toISOString(), // Add timestamp
      validatedData.userName,
      validatedData.email,
      validatedData.phone,
      validatedData.cnic,
      validatedData.designation,
      validatedData.instituteName,
      validatedData.guardianPhone,
      validatedData.city,
      validatedData.referralCode || "No Referral Code",
      profilePictureUrl,
      studentCardUrl,
      validatedData.modules.selections.join(", "),
      validatedData.accommodation.required,
      validatedData.accommodation.required === "Yes"
        ? validatedData.accommodation.duration
        : "N/A",
      validatedData.chaperone.bringing,
      validatedData.chaperone.bringing === "Yes"
        ? validatedData.chaperone.name
        : "N/A",
      validatedData.chaperone.bringing === "Yes"
        ? validatedData.chaperone.cnic
        : "N/A",
      validatedData.chaperone.bringing === "Yes"
        ? validatedData.chaperone.accommodation.required
        : "N/A",
      validatedData.chaperone.bringing === "Yes" &&
      validatedData.chaperone.accommodation.required === "Yes"
        ? validatedData.chaperone.accommodation.duration
        : "N/A",
      validatedData.participationType.type,
      validatedData.participationType.type === "team"
        ? validatedData.participationType.teamDetails.teamName
        : "N/A",
      validatedData.totalRegistrationAmount.toString(),
      paymentProofUrl,
    ];

    // Handle team members data if present
    if (validatedData.participationType.type === "team") {
      const memberData = await Promise.all(
        validatedData.participationType.teamDetails.members.map(
          async (member) => {
            const [cardUrl, photoUrl] = await Promise.all([
              uploadToDrive(
                member.studentCardPhoto,
                `team_${member.name}_card`,
                folderId,
              ),
              uploadToDrive(
                member.teamMemberProfilePhoto,
                `team_${member.name}_profile`,
                folderId,
              ),
            ]);
            return [
              member.name,
              member.cnic,
              cardUrl,
              photoUrl,
              member.accommodation.required,
              member.accommodation.required === "Yes"
                ? member.accommodation.duration
                : "N/A",
            ];
          },
        ),
      );
      sheetData.push(...memberData.flat());
    }

    // Log the raw form data after processing
    console.log(
      "Processed raw form data:",
      JSON.stringify(rawFormData, null, 2),
    );

    // Before sheet append
    console.log("Final sheet data:", sheetData);

    await appendToSheet(sheetData);
    console.log("Sheet append completed successfully");

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Form submission error:", error);
    // Log the full error object
    console.error(
      "Full error:",
      JSON.stringify(error, Object.getOwnPropertyNames(error)),
    );
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process form",
      },
      { status: 500 },
    );
  }
}
