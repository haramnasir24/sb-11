"use client";
import React, { useState } from "react";

import regFormSchema from "@/constant/form-schemas/RegistrationFormSchema";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { StepTracker } from "./StepTracker";

const RegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Validate form data using regFormSchema
    const result = regFormSchema.safeParse(formData);

    if (!result.success) {
      // Map errors to the field names (keys)
      const errorMap = result.error.errors.reduce(
        (acc, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      setErrors(errorMap); // Set the errors

      // Set currentStep based on the first error section (minimum step number)
      const firstErrorSection = Object.keys(errorMap).find((key) => {
        if (key.startsWith("basicInfo.")) return 1;
        if (key.startsWith("applicationDetails.")) return 2;
        if (key.startsWith("paymentInfo.")) return 3;
        return 0;
      });

      // Set the currentStep to the minimum step that has an error
      if (firstErrorSection) {
        if (firstErrorSection.startsWith("basicInfo.")) {
          setCurrentStep(1);
        } else if (firstErrorSection.startsWith("applicationDetails.")) {
          setCurrentStep(2);
        } else if (firstErrorSection.startsWith("paymentInfo.")) {
          setCurrentStep(3);
        }
      }

      console.log(errorMap);
      setFormData(formData);
      setIsSubmitting(false);
      return;
    }

    // If no errors, reset errors and process the valid data
    setErrors({});
    console.log("Valid Data:", result.data);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  interface FormData {
    basicInfo: {
      name: string;
      email: string;
      phone: string;
      Cnic: string;
      institute: string;
      guardianPhone: string;
      city: string;
      profilePicture: string;
      studentCard: string;
    };
    applicationDetails: {
      accommodation: boolean;
      applyingAsTeam: boolean;
    };
    paymentInfo: {
      paymentProof: string;
    };
  }

  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      name: "",
      email: "",
      phone: "",
      Cnic: "",
      institute: "",
      guardianPhone: "",
      city: "",
      profilePicture: "",
      studentCard: "",
    },
    applicationDetails: { accommodation: false, applyingAsTeam: false },
    paymentInfo: { paymentProof: "" },
  });

  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: any,
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
  });

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg border border-gray-300 p-6">
      <StepTracker currentStep={currentStep} />
      {currentStep === 1 && (
        <Step1
          errors={Object.keys(errors)
            .filter((key) => key.startsWith("basicInfo."))
            .reduce(
              (acc, key) => {
                acc[key.replace("basicInfo.", "")] = errors[key];
                return acc;
              },
              {} as Record<string, string>,
            )}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {currentStep === 2 && (
        <Step2
          errors={Object.keys(errors)
            .filter((key) => key.startsWith("applicationDetails."))
            .reduce(
              (acc, key) => {
                acc[key.replace("applicationDetails.", "")] = errors[key];
                return acc;
              },
              {} as Record<string, string>,
            )}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {currentStep === 3 && (
        <Step3
          errors={Object.keys(errors)
            .filter((key) => key.startsWith("paymentInfo."))
            .reduce(
              (acc, key) => {
                acc[key.replace("paymentInfo.", "")] = errors[key];
                return acc;
              },
              {} as Record<string, string>,
            )}
          formData={formData}
          handleInputChange={handleInputChange}
          bankDetails={bankDetails}
        />
      )}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          className={`rounded bg-purple-600 px-4 py-2 text-white ${currentStep === 1 ? "invisible" : ""}`}
        >
          Previous
        </button>
        {currentStep !== 3 && (
          <button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 3))}
            className="rounded bg-purple-600 px-4 py-2 text-white"
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handleSubmit}
            className="rounded bg-purple-600 px-4 py-2 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
