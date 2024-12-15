import React, { useState } from "react";

import FileUpload from "../ui/file-upload"; // Assuming a drag-and-drop component exists

interface Step2Props {
  formData: any;
  handleInputChange: any;
  errors: any;
}

interface TeamMember {
  name: string;
  cnic: string;
  studentCard: File | null; // Change to accept File or null
}

const Step2: React.FC<Step2Props> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    formData.applicationDetails.teamMembers || [],
  );

  const handleAddMember = () => {
    const newMember = { name: "", cnic: "", studentCard: null }; // Set studentCard as null initially
    setTeamMembers([...teamMembers, newMember]);
    handleInputChange("applicationDetails", "teamMembers", [
      ...teamMembers,
      newMember,
    ]);
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
    handleInputChange("applicationDetails", "teamMembers", updatedMembers);
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = teamMembers.map((member: TeamMember, i: number) =>
      i === index ? { ...member, [field]: value } : member,
    );
    setTeamMembers(updatedMembers);
    handleInputChange("applicationDetails", "teamMembers", updatedMembers);
  };

  const handleFileSelect = (index: number, file: File | null) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].studentCard = file;
    setTeamMembers(updatedMembers);
    handleInputChange("applicationDetails", "teamMembers", updatedMembers);
  };

  return (
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

        {formData.applicationDetails.accommodation && (
          <div className="mt-4">
            <label className="mb-2 block text-purple-600">
              Select number of nights:
            </label>
            <select
              value={formData.applicationDetails.nights || "2 Nights"}
              onChange={(e) =>
                handleInputChange(
                  "applicationDetails",
                  "nights",
                  e.target.value,
                )
              }
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="2 Nights">2 Nights</option>
              <option value="3 Nights">3 Nights</option>
            </select>
          </div>
        )}

        <label className="mb-2 mt-6 block text-purple-600">
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

        {formData.applicationDetails.applyingAsTeam && (
          <div className="mt-4">
            <label className="mb-2 block text-purple-600">Team Name:</label>
            <input
              type="text"
              value={formData.applicationDetails.teamName || ""}
              onChange={(e) =>
                handleInputChange(
                  "applicationDetails",
                  "teamName",
                  e.target.value,
                )
              }
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <div className="mt-6">
              <h4 className="mb-4 text-lg font-semibold text-purple-600">
                Team Members ({teamMembers.length}):
              </h4>
              {teamMembers.map((member: TeamMember, index: number) => (
                <div key={index} className="mb-4 border-b border-gray-300 pb-4">
                  <label className="mb-2 block text-purple-600">Name:</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />

                  <label className="mb-2 mt-4 block text-purple-600">
                    CNIC:
                  </label>
                  <input
                    type="text"
                    value={member.cnic}
                    onChange={(e) =>
                      handleMemberChange(index, "cnic", e.target.value)
                    }
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />

                  <label className="mb-2 mt-4 block text-purple-600">
                    Student Card:
                  </label>
                  <FileUpload
                    section={`teamMember_${index}`}
                    field="studentCard"
                    fileName={member.studentCard} // Pass the File or null
                    onFileSelect={(file) => handleFileSelect(index, file)} // Handle file selection
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Remove Member
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddMember}
                className="mt-6 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                + Add Member
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
