"use client";
import React from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  section: string;
  field: string;
  fileName: string;
  onFileSelect: (fileName: string) => void;
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
      if (file) {
        onFileSelect(file.name); // Pass the selected file name back to the parent
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
          <strong>Selected file:</strong> {fileName}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
