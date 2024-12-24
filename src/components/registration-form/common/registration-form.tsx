/* eslint-disable unused-imports/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import LoadingIndicator from "@/components/loading-indicator";

import { formSchema, FormSchemaValues } from "@/schema/form";

import ResponsiveFormContainer from "./responsive-form-container";

type FormField = FieldPath<FormSchemaValues>;

const TOTAL_STEPS = 4;

type TStep = {
  id: string;
  name: string;
  fields: FieldPath<FormSchemaValues>[];
};

const steps: TStep[] = [
  {
    id: "Step 1",
    name: "User Data",
    fields: [
      "userName",
      "email",
      "phone",
      "cnic",
      "designation",
      "instituteName",
      "guardianPhone",
      "city",
      "referralCode",
      "profilePicture",
      "studentCardorCNIC",
    ],
  },
  {
    id: "Step 2",
    name: "Additional Details",
    fields: ["modules"],
  },
  {
    id: "Step 3",
    name: "Additional Details",
    fields: ["chaperone", "accommodation", "participationType"],
  },
  {
    id: "Step 4",
    name: "Payment Proof",
    fields: ["paymentProof"],
  },
];

const RegistrationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currStep = parseInt(searchParams?.get("step") || "1", 10);

  const form = useForm<FormSchemaValues>({
    resolver: zodResolver(formSchema),
    // ! set default values
    defaultValues: {
      // Step 1
      userName: "Muhammad Zain Jee",
      email: "zainjee37405@gmail.com",
      phone: "03125341967",
      cnic: "3740515763723",
      designation: "Student",
      instituteName: "NUST-SEECS",
      guardianPhone: "03125341967",
      city: "Islamabad",
      referralCode: "",
      profilePicture: undefined,
      studentCardorCNIC: undefined,
      // Step 2
      modules: {
        selections: [
          "Chemathon",
          "Speed Programming",
          "Crimeline Road",
          "Escape Room",
          "HeatOps",
        ],
      },
      // Step 3
      chaperone: {
        bringing: "Yes",
        accommodation: { required: "Yes", duration: "2 days" },
        cnic: "3740515763723",
        name: "Chaperone Name",
      },
      accommodation: { required: "Yes", duration: "2 days" },
      participationType: {
        type: "team",
        teamDetails: {
          teamName: "Team Name",
          numberOfMembers: 2,
          members: [
            { name: "First Member", cnic: "3740515763723" },
            { name: "Second Member", cnic: "3740515763723" },
          ],
        },
      },
      // Step
      paymentProof: undefined,
    },
  });

  // ! For Production
  /* 
    defaultValues: {
      // Step 1
      userName: "",
      email: "",
      phone: "",
      cnic: "",
      designation: "",
      instituteName: "",
      guardianPhone: "",
      city: "",
      profilePicture: undefined,
      studentCardorCNIC: undefined,
      // Step 2
      modules: {
        selections: [],
      },
      // Step 3
      chaperone: { bringing: "No" },
      accommodation: { required: "No" },
      participationType: { type: "individual" },
      // Step
      paymentProof: undefined,
    },
  */
  // ! For Testing
  /* 
    defaultValues: {
      // Step 1
      userName: "Muhammad Zain Jee",
      email: "zainjee37405@gmail.com",
      phone: "03125341967",
      cnic: "3740515763723",
      designation: "Student",
      instituteName: "NUST-SEECS",
      guardianPhone: "03125341967",
      city: "Islamabad",
      profilePicture: undefined,
      studentCardorCNIC: undefined,
      // Step 2
      modules: {
        selections: ["Chemathon", "Speed Programming", "Crimeline Road"],
      },
      // Step 3
      chaperone: { bringing: "No" },
      accommodation: { required: "No" },
      participationType: { type: "individual" },
      // Step
      paymentProof: undefined,
    },
  */

  const onContinue = useCallback(
    async (currStep: number) => {
      const fields = steps[currStep - 1].fields as FormField[];
      const isValid = await form.trigger(fields, { shouldFocus: true });
      if (!isValid) return;
      if (currStep === TOTAL_STEPS) {
        try {
          await form.handleSubmit(onSubmit)();
        } catch {
          toast.error("Error in form submission. Please try again.");
        }
        return;
      }
      await router.push(`?step=${currStep + 1}`, { scroll: false });
    },
    [form, router],
  );

  const onBack = useCallback(() => {
    const prevStep = Math.max(currStep - 1, 1);
    router.push(`?step=${prevStep}`, { scroll: false });
  }, [currStep, router]);

  const onSubmit: SubmitHandler<FormSchemaValues> = async (data) => {
    try {
      const formData = new FormData();

      // Basic Info
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("cnic", data.cnic);
      formData.append("designation", data.designation);
      formData.append("instituteName", data.instituteName);
      formData.append("guardianPhone", data.guardianPhone);
      formData.append("city", data.city);
      if (data.referralCode) {
        formData.append("referralCode", data.referralCode);
      }

      // Files
      formData.append("profilePicture", data.profilePicture);
      formData.append("studentCardorCNIC", data.studentCardorCNIC);
      formData.append("paymentProof", data.paymentProof);

      // Modules
      formData.append("modules", JSON.stringify(data.modules));

      // Accommodation
      formData.append("accommodation", JSON.stringify(data.accommodation));

      // Chaperone
      formData.append("chaperone", JSON.stringify(data.chaperone));

      // Participation Type
      if (data.participationType.type === "individual") {
        formData.append(
          "participationType",
          JSON.stringify({ type: "individual" }),
        );
      } else {
        // Team details
        const teamData = {
          type: "team",
          teamDetails: {
            teamName: data.participationType.teamDetails.teamName,
            numberOfMembers: data.participationType.teamDetails.numberOfMembers,
            members: data.participationType.teamDetails.members.map(
              (member) => ({
                name: member.name,
                cnic: member.cnic,
                accommodation: member.accommodation,
              }),
            ),
          },
        };
        formData.append("participationType", JSON.stringify(teamData));

        // Handle team member files separately
        data.participationType.teamDetails.members.forEach((member, index) => {
          // Use the correct path format for team member files
          formData.append(
            `participationType.teamDetails.members.${index}.studentCardPhoto`,
            member.studentCardPhoto,
          );
          formData.append(
            `participationType.teamDetails.members.${index}.teamMemberProfilePhoto`,
            member.teamMemberProfilePhoto,
          );
          formData.append(
            `participationType.teamDetails.members.${index}.name`,
            member.name,
          );
          formData.append(
            `participationType.teamDetails.members.${index}.cnic`,
            member.cnic,
          );
          formData.append(
            `participationType.teamDetails.members.${index}.accommodation`,
            JSON.stringify(member.accommodation),
          );
        });
      }

      // Total Registration Amount
      formData.append(
        "totalRegistrationAmount",
        data.totalRegistrationAmount.toString(),
      );

      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Failed to submit form");
      }

      toast.success("Form submitted successfully");
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  if (form.formState.isSubmitting) return <LoadingIndicator />;

  return (
    <ResponsiveFormContainer
      form={form}
      currStep={currStep}
      onContinue={onContinue}
      onBack={onBack}
      TOTAL_STEPS={TOTAL_STEPS}
    />
  );
};

export default RegistrationForm;
