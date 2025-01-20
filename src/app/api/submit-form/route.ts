import { NextRequest, NextResponse } from "next/server";

import { sendConfirmationEmail } from "@/lib/email-service";
import {
  appendToSheet,
  createUserFolder,
  uploadToDrive,
} from "@/lib/google-services";
import { formatDate } from "@/lib/utils";

import { formSchema } from "@/schema/form";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

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

    const fileFields = ["profilePicture", "studentCardorCNIC", "paymentProof"];
    fileFields.forEach((field) => {
      rawFormData[field] = formData.get(field);
    });

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

    const validatedData = await formSchema.parseAsync(rawFormData);

    // Create folder once at the start
    const folderId = await createUserFolder(
      validatedData.userName,
      validatedData.instituteName,
    );

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

      // Calculate number of members
      let numberOfMem = 1
      const addMem = validatedData.participationType.type === "team" ? validatedData.participationType.teamDetails.numberOfMembers : 0
      numberOfMem = numberOfMem + addMem


    // Prepare sheet data
    const sheetData = [
      formatDate(new Date()),
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
        : "No Accomodation",
      validatedData.chaperone.bringing,
      validatedData.chaperone.bringing === "Yes"
        ? validatedData.chaperone.name
        : "No Chaperone",
      validatedData.chaperone.bringing === "Yes"
        ? validatedData.chaperone.cnic
        : "No Chaperone",
      validatedData.chaperone.bringing === "Yes"
        ? validatedData.chaperone.accommodation.required
        : "No Chaperone",
      validatedData.chaperone.bringing === "Yes" &&
      validatedData.chaperone.accommodation.required === "Yes"
        ? validatedData.chaperone.accommodation.duration
        : "No Chaperone",
      validatedData.participationType.type,
      validatedData.participationType.type === "team"
        ? validatedData.participationType.teamDetails.teamName
        : "Individual",
      validatedData.totalRegistrationAmount.toString(),
      paymentProofUrl,
      numberOfMem,
    ];

    // Handle team members data if present
    if (validatedData.participationType.type === "team") {
      const memberData = await Promise.all(
        validatedData.participationType.teamDetails.members.map(
          async (member) => {
            const [cardUrl, photoUrl] = await Promise.all([
              uploadToDrive(
                member.studentCardPhoto,
                `team_${member.name}_student_card`,
                folderId,
              ),
              uploadToDrive(
                member.teamMemberProfilePhoto,
                `team_${member.name}_profile_photo`,
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
                : "No Accomodation",
            ];
          },
        ),
      );
      sheetData.push(...memberData.flat());
    }

    await appendToSheet(sheetData);

    // Send confirmation email
    await sendConfirmationEmail(validatedData);

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process form",
      },
      { status: 500 },
    );
  }
}
