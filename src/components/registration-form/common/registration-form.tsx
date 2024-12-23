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
  });

  // ! For Production
  /* 
      defaultValues: {
      // Step 1
      userName: "",
      email: "",
      phone: "",
      cnic: "",
      instituteName: "",
      guardianPhone: "",
      city: "",
      profilePicture: undefined,
      studentCardorCNIC: undefined,
      // Step 2
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

      // Handle special fields that need to be stringified
      formData.append(
        "participationType",
        JSON.stringify(data.participationType),
      );
      formData.append("accommodation", JSON.stringify(data.accommodation));

      // Append all other fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "participationType" && key !== "accommodation") {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }
      });

      // Handle team members' files if present
      if (data.participationType.type === "team") {
        data.participationType.teamDetails.members.forEach((member, index) => {
          if (member.studentCardPhoto) {
            formData.append(
              `teamMember${index + 1}StudentCardPhoto`,
              member.studentCardPhoto,
            );
          }
        });
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit form",
      );
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
