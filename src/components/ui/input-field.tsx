"use client";
import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => (
  <div className="">
    <label className="mb-2 block text-lg text-purple-600">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
    />
  </div>
);

export default InputField;
