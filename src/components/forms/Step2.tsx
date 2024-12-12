"use client";
import React from "react";

interface Step2Props {
  formData: any;
  handleInputChange: any;
  errors: any;
}

const Step2: React.FC<Step2Props> = ({
  formData,
  handleInputChange,
  errors,
}) => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-purple-600">
      Details for Applying
    </h3>
    <div>
      <label className="mb-2 block text-purple-600">
        Do you want accommodation?
      </label>
      <select
        value={formData.applicationDetails.accommodation ? "Yes" : "No"}
        onChange={(e) =>
          handleInputChange(
            "applicationDetails",
            "accommodation",
            e.target.value === "Yes",
          )
        }
        className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      <label className="mb-2 block text-purple-600">
        Applying as a team or individual?
      </label>
      <select
        value={
          formData.applicationDetails.applyingAsTeam ? "Team" : "Individual"
        }
        onChange={(e) =>
          handleInputChange(
            "applicationDetails",
            "applyingAsTeam",
            e.target.value === "Team",
          )
        }
        className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <option value="Individual">Individual</option>
        <option value="Team">Team</option>
      </select>
    </div>
  </div>
);

export default Step2;
