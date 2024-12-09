// "use client";
// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import "../globals.css";

import RegistrationForm from "@/components/ui/forms/RegistrationForm";

// interface BasicInfo {
//   name: string;
//   email: string;
//   phone: string;
//   Cnic: string;
//   institute: string;
//   guardianPhone: string;
//   city: string;
//   profilePicture: string;
//   studentCard: string;
// }

// interface ApplicationDetails {
//   accommodation: boolean;
//   applyingAsTeam: boolean;
// }

// interface PaymentInfo {
//   paymentProof: string;
//   bankDetails: string;
// }

// interface FormData {
//   basicInfo: BasicInfo;
//   applicationDetails: ApplicationDetails;
//   paymentInfo: PaymentInfo;
// }

// const MultiStepForm: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [formData, setFormData] = useState<FormData>({
//     basicInfo: {
//       name: '',
//       email: '',
//       phone: '',
//       Cnic: '',
//       institute: '',
//       guardianPhone: '',
//       city: '',
//       profilePicture: '',
//       studentCard: '',
//     },
//     applicationDetails: {
//       accommodation: false,
//       applyingAsTeam: false,
//     },
//     paymentInfo: {
//       paymentProof: '',
//       bankDetails: '',
//     },
//   });
//   const [bankDetails] = useState({
//     accountName: 'John Doe',
//     accountNumber: '1234567890',
//     bankName: 'Bank of Example',
//     branchName: 'Main Branch',
//   });
//   type BasicInfoFields = 'name' | 'email' | 'phone' | 'Cnic' | 'institute' | 'guardianPhone' | 'city' | 'profilePicture' | 'studentCard';
//   type ApplicationDetailsFields = 'accommodation' | 'applyingAsTeam';
//   type PaymentInfoFields = 'paymentProof' | 'bankDetails';
//   const handleInputChange = <T extends keyof FormData>(
//     section: T,
//     field: keyof FormData[T],
//     value: string | boolean
//   ) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [field]: value,
//       },
//     }));
//   };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Collect all data here, on submit
//     console.log('Form submitted:', formData);
//   };

//   const StepTracker: React.FC = () => (
//     <div className="flex justify-center space-x-6 mb-6">
//       {[1, 2, 3].map((step) => (
//         <div
//           key={step}
//           className={`py-2 px-4 cursor-pointer ${step === currentStep ? 'border-b-4 border-purple-600 text-purple-600 font-semibold' : 'border-b-4 border-gray-300 text-gray-400'}`}
//         >
//           Step {step}
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <form className='m-5 p-5 relative' onSubmit={handleSubmit}>
//       <StepTracker />

//       <div className={`step1 ${currentStep === 1 ? '' : 'hidden'}`}>
//         <h3 className="text-xl font-semibold mb-4 text-purple-600">Basic Info</h3>
//         <InputField label="Name" value={formData.basicInfo.name} onChange={(e) => handleInputChange('basicInfo', 'name', e.target.value)} />
//         <InputField label="Email" value={formData.basicInfo.email} onChange={(e) => handleInputChange('basicInfo', 'email', e.target.value)} />
//         <InputField label="Phone" value={formData.basicInfo.phone} onChange={(e) => handleInputChange('basicInfo', 'phone', e.target.value)} />
//         <InputField label="Cnic" value={formData.basicInfo.Cnic} onChange={(e) => handleInputChange('basicInfo', 'Cnic', e.target.value)} />
//         <InputField label="Institute" value={formData.basicInfo.institute} onChange={(e) => handleInputChange('basicInfo', 'institute', e.target.value)} />
//         <InputField label="Guardian Phone" value={formData.basicInfo.guardianPhone} onChange={(e) => handleInputChange('basicInfo', 'guardianPhone', e.target.value)} />
//         <InputField label="City" value={formData.basicInfo.city} onChange={(e) => handleInputChange('basicInfo', 'city', e.target.value)} />
//         <h3 className="text-xl font-semibold mb-4 text-purple-600">Profile Picture</h3>

//         <FileUpload section="basicInfo" field="profilePicture" fileName={formData.basicInfo.profilePicture} onFileSelect={(fileName) => handleInputChange('basicInfo', 'profilePicture', fileName)} />
//         <h3 className="text-xl font-semibold mb-4 text-purple-600">Student Card</h3>

//          <FileUpload section="basicInfo" field="studentCard" fileName={formData.basicInfo.studentCard} onFileSelect={(fileName) => handleInputChange('basicInfo', 'studentCard', fileName)} />
//            </div>

//       <div className={`step2 ${currentStep === 2 ? '' : 'hidden'}`}>
//         <h3 className="text-xl font-semibold mb-4 text-purple-600">Details for Applying</h3>
//         <div>
//             <label className="block mb-2 text-purple-600">Do you want accommodation?</label>
//             <select value={formData.applicationDetails.accommodation ? 'Yes' : 'No'} onChange={(e) => handleInputChange('applicationDetails', 'accommodation', e.target.value === 'Yes')} className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600">
//               <option value="No">No</option>
//               <option value="Yes">Yes</option>
//             </select>

//             <label className="block mb-2 text-purple-600">Applying as a team or individual?</label>
//             <select value={formData.applicationDetails.applyingAsTeam ? 'Team' : 'Individual'} onChange={(e) => handleInputChange('applicationDetails', 'applyingAsTeam', e.target.value === 'Team')} className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600">
//               <option value="Individual">Individual</option>
//               <option value="Team">Team</option>
//             </select>
//           </div>
//       </div>

//       <div className={`step3 ${currentStep === 3 ? '' : 'hidden'}`}>

//         <div>
//         <h3 className="text-xl font-semibold mb-4 text-purple-600">Bank Details:</h3>
//         <div className="mb-4">
//           <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
//           <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
//           <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
//           <p><strong>Branch Name:</strong> {bankDetails.branchName}</p>
//         </div>
//         <div>

//             <h3 className="text-xl font-semibold mb-4 text-purple-600">Payment Proof</h3>
//             <FileUpload section="paymentInfo" field="paymentProof" fileName={formData.paymentInfo.paymentProof} onFileSelect={(fileName) => handleInputChange('paymentInfo', 'paymentProof', fileName)} />
//             {/* <label className="block mb-2 text-purple-600">Bank Details:</label>
//             <textarea value={formData.paymentInfo.bankDetails} onChange={(e) => handleInputChange('paymentInfo', 'bankDetails', e.target.value)} className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600" /> */}
//           </div>
//       </div>
//       </div>

//       <div className="mt-6 flex justify-between">
//         <button type="button" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1} className={`bg-gray-600 text-white py-2 px-6 rounded-lg focus:outline-none ${currentStep === 1 ? 'invisible' : ''}`}>
//           Previous
//         </button>
//         {currentStep < 3 ? (
//           <button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="bg-purple-600 text-white py-2 px-6 rounded-lg focus:outline-none">
//             Next
//           </button>
//         ) : (
//           <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded-lg focus:outline-none">
//             Submit
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default MultiStepForm;

// const InputField: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
//   <div className="mb-6">
//     <label className="block mb-2 text-purple-600 text-lg">{label}</label>
//     <input type="text" value={value} onChange={onChange} className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
//   </div>
// );

// const FileUpload: React.FC<{
//     section: keyof FormData;
//     field: string;
//     fileName: string;
//     onFileSelect: (fileName: string) => void;
//   }> = ({ section, field, fileName, onFileSelect }) => {
//     const { getRootProps, getInputProps } = useDropzone({
//       onDrop: (acceptedFiles) => {
//         const file = acceptedFiles[0];
//         if (file) {
//           onFileSelect(file.name); // Pass the selected file name back to the parent
//         }
//       },
//       multiple: false,
//     });

//     return (
//       <div>
//         <div
//           {...getRootProps()}
//           className="border-dashed border-2 border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-100"
//         >
//           <input {...getInputProps()} />
//           <p className="text-center text-purple-600">
//             Drag & drop your file here, or click to select
//           </p>
//         </div>

//         {fileName && (
//           <div className="mt-2 text-gray-700">
//             <strong>Selected file:</strong> {fileName}
//           </div>
//         )}
//       </div>
//     );
//   };
export default function Home() {
  return <RegistrationForm />;
}
