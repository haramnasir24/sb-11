import React from "react";
import {
  FaClipboardList,
  FaMoneyCheckAlt,
  FaPuzzlePiece,
  FaUser,
} from "react-icons/fa";

interface RegistrationHeaderProps {
  currStep: number;
}

const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({
  currStep,
}) => {
  const steps = [
    { label: "User Data", icon: FaUser },
    { label: "Modules", icon: FaPuzzlePiece },
    { label: "Additional Details", icon: FaClipboardList },
    { label: "Payment Proof", icon: FaMoneyCheckAlt },
  ];

  return (
    <div className="mb-4 bg-white p-3 sm:mb-8 sm:p-4 md:mb-12 md:p-6">
      <h2 className="mb-4 text-center text-lg font-extrabold text-purple-800 sm:mb-6 sm:text-xl md:text-2xl lg:text-3xl">
        Science Bee Registration Form
      </h2>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-1 flex-col items-center">
            <div
              className={`sm:border-3 flex h-6 w-6 items-center justify-center rounded-full border-2 sm:h-8 sm:w-8 md:h-10 md:w-10 md:border-4 lg:h-12 lg:w-12 ${
                index < currStep
                  ? "border-purple-800 bg-purple-800 text-white"
                  : index === currStep
                    ? "border-purple-800 bg-white text-purple-800"
                    : "border-gray-300 bg-white text-gray-300"
              }`}
            >
              <step.icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            </div>
            <div className="mt-1 h-0.5 w-full bg-gray-200 sm:mt-2 sm:h-1">
              <div
                className={`h-full ${
                  index < currStep ? "bg-purple-800" : "bg-gray-200"
                }`}
                style={{
                  width:
                    index < currStep
                      ? "100%"
                      : index === currStep
                        ? "50%"
                        : "0%",
                }}
              />
            </div>
            <span
              className={`mt-1 text-[0.6rem] font-medium sm:mt-2 sm:text-xs md:text-sm ${
                index <= currStep ? "text-purple-800" : "text-gray-500"
              } hidden sm:inline-block`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationHeader;
