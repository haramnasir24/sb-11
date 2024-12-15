"use client";
import React from "react";

import FileUpload from "../ui/file-upload";
import InputField from "../ui/input-field";

interface BasicInfoProps {
  formData: any;
  handleInputChange: any;
  errors: any;
}

const Step1: React.FC<BasicInfoProps> = ({
  formData,
  handleInputChange,
  errors,
}) => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-purple-600">Basic Info</h3>
    <div className="mb-6">
      <InputField
        label="Name"
        value={formData.basicInfo.name}
        onChange={(e) => handleInputChange("basicInfo", "name", e.target.value)}
      />
      {errors?.name && <p className="text-xs text-red-500">{errors.name}</p>}
    </div>
    <div className="mb-6">
      <InputField
        label="Email"
        value={formData.basicInfo.email}
        onChange={(e) =>
          handleInputChange("basicInfo", "email", e.target.value)
        }
      />
      {errors?.email && <p className="text-xs text-red-500">{errors.email}</p>}
    </div>
    <div className="mb-6">
      <InputField
        label="Phone"
        value={formData.basicInfo.phone}
        onChange={(e) =>
          handleInputChange("basicInfo", "phone", e.target.value)
        }
      />
      {errors?.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
    </div>
    <div className="mb-6">
      <InputField
        label="CNIC Number"
        value={formData.basicInfo.Cnic}
        onChange={(e) => handleInputChange("basicInfo", "Cnic", e.target.value)}
      />
      {errors?.Cnic && <p className="text-xs text-red-500">{errors.Cnic}</p>}
    </div>
    <div className="mb-6">
      <InputField
        label="Institute"
        value={formData.basicInfo.institute}
        onChange={(e) =>
          handleInputChange("basicInfo", "institute", e.target.value)
        }
      />
      {errors?.institute && (
        <p className="text-xs text-red-500">{errors.institute}</p>
      )}
    </div>
    <div className="mb-6">
      <InputField
        label="Guardian Phone"
        value={formData.basicInfo.guardianPhone}
        onChange={(e) =>
          handleInputChange("basicInfo", "guardianPhone", e.target.value)
        }
      />
      {errors?.guardianPhone && (
        <p className="text-xs text-red-500">{errors.guardianPhone}</p>
      )}
    </div>
    <div className="mb-6">
      <InputField
        label="City"
        value={formData.basicInfo.city}
        onChange={(e) => handleInputChange("basicInfo", "city", e.target.value)}
      />
      {errors?.city && <p className="text-xs text-red-500">{errors.city}</p>}
    </div>

    <div className="mb-6">
      <h3 className="mb-4 text-xl font-semibold text-purple-600">
        Referral Code (Optional)
      </h3>
      <InputField
        label="Referral Code"
        value={formData.basicInfo.referralCode}
        onChange={(e) =>
          handleInputChange("basicInfo", "referralCode", e.target.value)
        }
      />
      {errors?.referralCode && (
        <p className="text-xs text-red-500">{errors.referralCode}</p>
      )}
    </div>

    <div className="mb-6">
      <h3 className="mb-4 text-xl font-semibold text-purple-600">
        Profile Picture
      </h3>
      <FileUpload
        section="basicInfo"
        field="profilePicture"
        fileName={formData.basicInfo.profilePicture}
        onFileSelect={(fileName) =>
          handleInputChange("basicInfo", "profilePicture", fileName)
        }
      />
      {errors?.profilePicture && (
        <p className="text-xs text-red-500">{errors.profilePicture}</p>
      )}
    </div>

    <div className="mb-6">
      <h3 className="mb-4 text-xl font-semibold text-purple-600">
        Student Card / CNIC <span className="text-red-500">*</span>
      </h3>
      <FileUpload
        section="basicInfo"
        field="studentCardCnic"
        fileName={formData.basicInfo.studentCardCnic}
        onFileSelect={(fileName) =>
          handleInputChange("basicInfo", "studentCardCnic", fileName)
        }
      />
      {errors?.studentCardCnic && (
        <p className="text-xs text-red-500">{errors.studentCardCnic}</p>
      )}
    </div>
  </div>
);

export default Step1;
