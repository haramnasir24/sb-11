import React from "react";

interface HexagonProps {
  className?: string;
}

const Hexagon: React.FC<HexagonProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
};

export default Hexagon;
