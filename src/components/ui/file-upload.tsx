/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
"use client";
import React from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  section: string;
  field: string;
  fileName: File | null; // Change to accept File | null
  onFileSelect: (file: File | null) => void; // Accept the File object or null
}

const FileUpload: React.FC<FileUploadProps> = ({
  section,
  field,
  fileName,
  onFileSelect,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log("Files dropped:", acceptedFiles);
      if (file) {
        console.log(file);
        onFileSelect(file); // Pass the selected file back to the parent
      }
    },
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        <p className="text-center text-purple-600">
          Drag & drop your file here, or click to select
        </p>
      </div>

      {fileName && (
        <div className="mt-2 text-gray-700">
          <strong>Selected file:</strong> {fileName.name}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
