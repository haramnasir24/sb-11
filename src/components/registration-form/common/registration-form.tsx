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

const TOTAL_STEPS = 3;

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
    fields: ["accommodation", "participationType"],
  },
  {
    id: "Step 3",
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
      instituteName: "NUST-SEECS",
      guardianPhone: "03125341967",
      city: "Islamabad",
      profilePicture: undefined,
      studentCardorCNIC: undefined,
      // Step 2
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

      // Append all basic form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "participationType") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "accommodation") {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
      }
      if (data.studentCardorCNIC) {
        formData.append("studentCardorCNIC", data.studentCardorCNIC);
      }
      if (data.paymentProof) {
        formData.append("paymentProof", data.paymentProof);
      }

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

      const response = await fetch("/api/submit-form-data", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
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
