"use client";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

import regFormSchema from "@/constant/form-schemas/RegistrationFormSchema";

import { StepTracker } from "./step-tracker";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const RegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
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
      console.log(result.data);
      return;
    }

    // If no errors, reset errors and process the valid data
    setErrors({});
    const data = new FormData();

    // Add form fields to the formData
    data.append("name", formData.basicInfo.name);
    data.append("email", formData.basicInfo.email);
    data.append("phone", formData.basicInfo.phone);
    data.append("university", formData.basicInfo.institute);
    data.append("guardianPhone", formData.basicInfo.guardianPhone);
    data.append("city", formData.basicInfo.city);
    if (formData.basicInfo.studentCard) {
      data.append("cnicImage", formData.basicInfo.studentCard);
    }
    if (formData.basicInfo.studentCard) {
      data.append("uniIdImage", formData.basicInfo.studentCard);
    }

    if (formData.paymentInfo.paymentProof) {
      data.append("paymentProofImage", formData.paymentInfo.paymentProof);
    }
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }
    const response = await axios.post("/api/email-and-submit-data", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      // Success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your data has been submitted successfully!",
      });
    } else {
      // Error alert for unexpected responses
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    }
    console.log("Response:", response.data); // Handle the response
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
      profilePicture: File | null;
      studentCard: File | null;
    };
    applicationDetails: {
      accommodation: boolean;
      applyingAsTeam: boolean;
    };
    paymentInfo: {
      paymentProof: File | null;
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
      profilePicture: null,
      studentCard: null,
    },
    applicationDetails: { accommodation: false, applyingAsTeam: false },
    paymentInfo: { paymentProof: null },
  });

  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: any,
  ) => {
    if (value instanceof FileList) {
      // Handle file input (extract the first file)
      value = value[0] || null;
      console.log("File Selected");
    }
    console.log(value);
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
