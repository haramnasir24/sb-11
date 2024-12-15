/* eslint-disable unused-imports/no-unused-vars */
"use client";
import React from "react";

import FileUpload from "../ui/file-upload";

interface Step3Props {
  formData: any;
  handleInputChange: any;
  bankDetails: any;
  errors: any;
}

const Step3: React.FC<Step3Props> = ({
  formData,
  handleInputChange,
  errors,
  bankDetails,
}) => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-purple-600">
      Bank Details:
    </h3>
    <div className="mb-4">
      <p>
        <strong>Account Name:</strong> {bankDetails.accountName}
      </p>
      <p>
        <strong>Account Number:</strong> {bankDetails.accountNumber}
      </p>
      <p>
        <strong>Bank Name:</strong> {bankDetails.bankName}
      </p>
      <p>
        <strong>Branch Name:</strong> {bankDetails.branchName}
      </p>
    </div>
    <h3 className="mb-4 text-xl font-semibold text-purple-600">
      Payment Proof
    </h3>
    <FileUpload
      section="paymentInfo"
      field="paymentProof"
      fileName={formData.paymentInfo.paymentProof}
      onFileSelect={(file) =>
        handleInputChange("paymentInfo", "paymentProof", file)
      }
    />
    {errors?.paymentProof && (
      <p className="text-xs text-red-500">{errors.paymentProof}</p>
    )}
  </div>
);

export default Step3;
