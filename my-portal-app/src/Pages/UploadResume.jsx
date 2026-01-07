// import React, { useState } from "react";
// import {
//   Upload,
//   FileText,
//   X,
//   CheckCircle,
//   AlertCircle,
//   Lightbulb
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function ResumeUpload() {
//   const [file, setFile] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState("idle");
//   const [errorMessage, setErrorMessage] = useState("");

//   const acceptedFormats = [".pdf", ".doc", ".docx"];
//   const maxSize = 5 * 1024 * 1024;

//   const validateFile = (file) => {
//     const ext = "." + file.name.split(".").pop().toLowerCase();

//     if (!acceptedFormats.includes(ext)) {
//       setErrorMessage(`Allowed formats: ${acceptedFormats.join(", ")}`);
//       setUploadStatus("error");
//       return false;
//     }

//     if (file.size > maxSize) {
//       setErrorMessage("File must be under 5MB");
//       setUploadStatus("error");
//       return false;
//     }

//     return true;
//   };

//   const handleFile = (f) => {
//     setUploadStatus("idle");
//     if (validateFile(f)) {
//       setFile(f);
//       setUploadStatus("uploading");

//       setTimeout(() => {
//         setUploadStatus("success");
//       }, 1200);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const dropped = e.dataTransfer.files[0];
//     if (dropped) handleFile(dropped);
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return "";
//     const sizes = ["Bytes", "KB", "MB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
//   };

//   return (
//     <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-100 tw-via-white tw-to-purple-100 tw-flex tw-items-center tw-justify-center tw-p-4">
//       <div className="tw-w-full tw-max-w-2xl">
//         {/* Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="tw-bg-white/80 tw-backdrop-blur-xl tw-rounded-2xl tw-shadow-[0_8px_30px_rgba(0,0,0,0.1)] tw-p-10 tw-border tw-border-white/40"
//         >
//           {/* Header */}
//           <div className="tw-text-center tw-mb-10">
//             <h2 className="tw-text-3xl tw-font-bold tw-text-gray-900">
//               Upload Your Resume
//             </h2>
//             <p className="tw-text-gray-600 tw-mt-1">
//               Fast upload • Secure • Professional parsing
//             </p>
//           </div>

//           {/* Upload Area */}
//           <div
//             onDrop={handleDrop}
//             onDragOver={(e) => {
//               e.preventDefault();
//               setIsDragging(true);
//             }}
//             onDragLeave={() => setIsDragging(false)}
//             className={`tw-relative tw-rounded-2xl tw-p-10 tw-border-2 tw-border-dashed tw-transition-all tw-duration-300 tw-cursor-pointer
//               ${
//                 isDragging
//                   ? "tw-border-blue-500 tw-bg-blue-50 tw-shadow-lg tw-scale-[1.02]"
//                   : uploadStatus === "success"
//                   ? "tw-border-green-500 tw-bg-green-50"
//                   : uploadStatus === "error"
//                   ? "tw-border-red-500 tw-bg-red-50"
//                   : "tw-border-gray-300 tw-bg-gray-50 hover:tw-bg-blue-50 hover:tw-border-blue-400"
//               }
//             `}
//           >
//             {/* No File UI */}
//             {!file ? (
//               <div className="tw-text-center">
//                 <div className="tw-mb-6 tw-flex tw-justify-center">
//                   <div
//                     className={`tw-p-5 tw-rounded-full tw-shadow-sm ${
//                       isDragging ? "tw-bg-blue-200" : "tw-bg-blue-100"
//                     }`}
//                   >
//                     <Upload
//                       className={`tw-w-14 tw-h-14 ${
//                         isDragging ? "tw-text-blue-700" : "tw-text-blue-600"
//                       }`}
//                     />
//                   </div>
//                 </div>

//                 <h3 className="tw-text-xl tw-font-semibold tw-text-gray-700 tw-mb-3">
//                   {isDragging ? "Drop the file here" : "Drag & drop your resume"}
//                 </h3>

//                 <p className="tw-text-gray-500 tw-mb-4">or</p>

//                 <label>
//                   <input
//                     type="file"
//                     className="tw-hidden"
//                     accept={acceptedFormats.join(",")}
//                     onChange={(e) => handleFile(e.target.files[0])}
//                   />
//                   <span className="tw-px-7 tw-py-3 tw-bg-blue-600 tw-text-white tw-rounded-xl tw-font-semibold tw-shadow hover:tw-bg-blue-700 tw-transition">
//                     Browse File
//                   </span>
//                 </label>

//                 <p className="tw-text-sm tw-text-gray-500 tw-mt-4">
//                   PDF, DOC, DOCX • Max 5MB
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {/* FILE BOX */}
//                 <div className="tw-flex tw-items-start tw-gap-4 tw-p-5 tw-bg-white tw-rounded-xl tw-border tw-border-gray-200 tw-shadow-sm">
//                   <div
//                     className={`tw-p-3 tw-rounded-xl ${
//                       uploadStatus === "success"
//                         ? "tw-bg-green-100"
//                         : uploadStatus === "error"
//                         ? "tw-bg-red-100"
//                         : "tw-bg-blue-100"
//                     }`}
//                   >
//                     <FileText
//                       className={`tw-w-8 tw-h-8 ${
//                         uploadStatus === "success"
//                           ? "tw-text-green-600"
//                           : uploadStatus === "error"
//                           ? "tw-text-red-600"
//                           : "tw-text-blue-600"
//                       }`}
//                     />
//                   </div>

//                   <div className="tw-flex-1">
//                     <div className="tw-flex tw-justify-between tw-items-start">
//                       <div>
//                         <h4 className="tw-font-semibold tw-text-gray-900 tw-truncate">
//                           {file.name}
//                         </h4>
//                         <p className="tw-text-sm tw-text-gray-500">
//                           {formatFileSize(file.size)}
//                         </p>
//                       </div>

//                       <button
//                         onClick={() => {
//                           setFile(null);
//                           setUploadStatus("idle");
//                         }}
//                         className="tw-p-1 tw-rounded hover:tw-bg-gray-200 tw-transition"
//                       >
//                         <X className="tw-w-5 tw-h-5 tw-text-gray-600" />
//                       </button>
//                     </div>

//                     {/* Upload Progress */}
//                     {uploadStatus === "uploading" && (
//                       <div className="tw-mt-4">
//                         <p className="tw-text-blue-600 tw-text-sm tw-font-medium mb-1">
//                           Uploading…
//                         </p>

//                         <div className="tw-w-full tw-h-2 tw-bg-gray-200 tw-rounded-full overflow-hidden">
//                           <motion.div
//                             initial={{ width: "0%" }}
//                             animate={{ width: "75%" }}
//                             transition={{ duration: 1.2 }}
//                             className="tw-bg-blue-600 tw-h-full tw-rounded-full tw-animate-pulse"
//                           ></motion.div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Success */}
//                     {uploadStatus === "success" && (
//                       <div className="tw-mt-3 tw-flex tw-items-center tw-gap-2 tw-text-green-600">
//                         <CheckCircle className="tw-w-6 tw-h-6" />
//                         <span className="tw-text-sm tw-font-medium">
//                           Upload successful!
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Replace File */}
//                 {uploadStatus === "success" && (
//                   <label className="tw-block tw-text-center tw-mt-4 tw-font-semibold tw-text-blue-600 hover:tw-text-blue-700 tw-cursor-pointer">
//                     <input
//                       type="file"
//                       className="tw-hidden"
//                       accept={acceptedFormats.join(",")}
//                       onChange={(e) => handleFile(e.target.files[0])}
//                     />
//                     Upload another file
//                   </label>
//                 )}
//               </>
//             )}

//             {/* ERROR ALERT */}
//             {uploadStatus === "error" && (
//               <div className="tw-mt-5 tw-p-4 tw-bg-red-50 tw-border tw-border-red-300 tw-rounded-xl tw-flex tw-gap-3">
//                 <AlertCircle className="tw-w-5 tw-h-5 tw-text-red-600 tw-mt-0.5" />
//                 <div>
//                   <h4 className="tw-font-semibold tw-text-red-700">
//                     Upload Failed
//                   </h4>
//                   <p className="tw-text-sm tw-text-red-600">{errorMessage}</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ACTION BUTTONS */}
//           {uploadStatus === "success" && (
//             <div className="tw-mt-10 tw-flex tw-gap-4">
//               <button className="tw-flex-1 tw-bg-blue-600 tw-text-white tw-py-3 tw-rounded-xl tw-font-semibold hover:tw-bg-blue-700 tw-transition">
//                 Continue
//               </button>

//               <button
//                 onClick={() => {
//                   setFile(null);
//                   setUploadStatus("idle");
//                 }}
//                 className="tw-px-6 tw-py-3 tw-border tw-border-gray-300 tw-text-gray-700 tw-rounded-xl tw-font-medium hover:tw-bg-gray-50 tw-transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}

//           {/* ⭐ UPDATED TIPS SECTION ⭐ */}
//           <motion.div
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.2 }}
//             className="tw-mt-10 tw-p-5 tw-bg-gradient-to-r tw-from-blue-50 tw-to-purple-50 tw-rounded-xl tw-border tw-border-blue-200 tw-shadow-sm"
//           >
//             <div className="tw-flex tw-items-center tw-gap-2 tw-mb-3">
//               <Lightbulb className="tw-w-5 tw-h-5 tw-text-blue-600" />
//               <h4 className="tw-font-semibold tw-text-gray-900 tw-text-sm">
//                 Tips for a standout resume
//               </h4>
//             </div>

//             <ul className="tw-text-sm tw-space-y-2">
//               <li className="tw-flex tw-gap-2">
//                 <span className="tw-text-blue-600">•</span>
//                 Keep your resume 1–2 pages for better readability.
//               </li>
//               <li className="tw-flex tw-gap-2">
//                 <span className="tw-text-blue-600">•</span>
//                 Use consistent headings, spacing, and clean formatting.
//               </li>
//               <li className="tw-flex tw-gap-2">
//                 <span className="tw-text-blue-600">•</span>
//                 Highlight achievements with measurable results.
//               </li>
//               <li className="tw-flex tw-gap-2">
//                 <span className="tw-text-blue-600">•</span>
//                 Tailor your resume to the job role you're applying for.
//               </li>
//             </ul>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }




//2 choice
// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Upload,
//   FileText,
//   X,
//   CheckCircle,
//   AlertCircle,
//   Lightbulb
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function ResumeUpload() {
//   const [file, setFile] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState("idle");
//   const [errorMessage, setErrorMessage] = useState("");

//   const acceptedFormats = [".pdf", ".doc", ".docx"];
//   const maxSize = 5 * 1024 * 1024;

//   const validateFile = (file) => {
//     const ext = "." + file.name.split(".").pop().toLowerCase();

//     if (!acceptedFormats.includes(ext)) {
//       setErrorMessage(`Allowed formats: ${acceptedFormats.join(", ")}`);
//       setUploadStatus("error");
//       return false;
//     }

//     if (file.size > maxSize) {
//       setErrorMessage("File must be under 5MB");
//       setUploadStatus("error");
//       return false;
//     }

//     return true;
//   };

//   const uploadToServer = async (resumeFile) => {
//     const formData = new FormData();
//     formData.append("resume", resumeFile);
//     formData.append("userId", localStorage.getItem("userId"));

//     try {
//       setUploadStatus("uploading");

//       const res = await axios.post(
//         "http://localhost:5000/api/resume/upload",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       console.log("Upload Response:", res.data);
//       setUploadStatus("success");
//     } catch (error) {
//       console.log(error);
//       setErrorMessage("Upload failed");
//       setUploadStatus("error");
//     }
//   };

//   const handleFile = (file) => {
//     if (!file || !validateFile(file)) return;
//     setFile(file);
//     uploadToServer(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const dropped = e.dataTransfer.files[0];
//     if (dropped) handleFile(dropped);
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return "";
//     const sizes = ["Bytes", "KB", "MB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
//   };

//   return (
//     <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-100 tw-via-white tw-to-purple-100 tw-flex tw-items-center tw-justify-center tw-p-4">
//       <div className="tw-w-full tw-max-w-2xl">

//         {/* Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="tw-bg-white/80 tw-backdrop-blur-xl tw-rounded-2xl tw-shadow-[0_8px_30px_rgba(0,0,0,0.1)] tw-p-10 tw-border tw-border-white/40"
//         >

//           {/* Header */}
//           <div className="tw-text-center tw-mb-10">
//             <h2 className="tw-text-3xl tw-font-bold tw-text-gray-900">
//               Upload Your Resume
//             </h2>
//             <p className="tw-text-gray-600 tw-mt-1">
//               Fast upload • Secure • Professional parsing
//             </p>
//           </div>

//           {/* Upload Area */}
//           <div
//             onDrop={handleDrop}
//             onDragOver={(e) => {
//               e.preventDefault();
//               setIsDragging(true);
//             }}
//             onDragLeave={() => setIsDragging(false)}
//             className={`tw-relative tw-rounded-2xl tw-p-10 tw-border-2 tw-border-dashed tw-transition-all tw-duration-300 tw-cursor-pointer
//               ${isDragging ? "tw-border-blue-500 tw-bg-blue-50" : ""}
//             `}
//           >

//             {!file ? (
//               <div className="tw-text-center">

//                 <div className="tw-mb-6 tw-flex tw-justify-center">
//                   <div className={`tw-p-5 tw-rounded-full tw-shadow-sm tw-bg-blue-100`}>
//                     <Upload className="tw-w-14 tw-h-14 tw-text-blue-600" />
//                   </div>
//                 </div>

//                 <label>
//                   <input
//                     type="file"
//                     className="tw-hidden"
//                     accept={acceptedFormats.join(",")}
//                     onChange={(e) => handleFile(e.target.files[0])}
//                   />
//                   <span className="tw-px-7 tw-py-3 tw-bg-blue-600 tw-text-white tw-rounded-xl">
//                     Browse File
//                   </span>
//                 </label>

//               </div>
//             ) : (
//               <>
//                 <div className="tw-flex tw-items-start tw-gap-4 tw-p-5 tw-bg-white tw-rounded-xl tw-border tw-shadow-sm">
//                   <div className="tw-p-3 tw-bg-blue-100 tw-rounded-xl">
//                     <FileText className="tw-w-8 tw-h-8 tw-text-blue-600" />
//                   </div>

//                   <div className="tw-flex-1">
//                     <h4 className="tw-font-semibold">{file.name}</h4>
//                     <p className="tw-text-sm">{formatFileSize(file.size)}</p>

//                     {uploadStatus === "uploading" && (
//                       <p className="tw-text-blue-600 tw-mt-2">Uploading...</p>
//                     )}

//                     {uploadStatus === "success" && (
//                       <div className="tw-flex tw-items-center tw-gap-2 tw-text-green-600 tw-mt-2">
//                         <CheckCircle className="tw-w-6 tw-h-6" />
//                         <span>Upload successful!</span>
//                       </div>
//                     )}

//                     {uploadStatus === "error" && (
//                       <p className="tw-text-red-600 tw-mt-2">{errorMessage}</p>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//         </motion.div>
//       </div>
//     </div>
//   );
// }















// 3 choice

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Trash2,
  CloudUpload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [existingResume, setExistingResume] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const userId = localStorage.getItem("userId");

  // ============================
  // LOAD EXISTING RESUME
  // ============================
  useEffect(() => {
    fetchExistingResume();
  }, []);

  const fetchExistingResume = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/resume/user/${userId}`
      );

      if (res.data.resume) {
        setExistingResume(res.data.resume);
        setUploadStatus("success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ============================
  // DELETE RESUME
  // ============================
  const handleDelete = async () => {
    if (!existingResume) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/resume/${existingResume._id}`
      );

      setExistingResume(null);
      setUploadStatus("idle");
      setFile(null);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // ============================
  // VALIDATION
  // ============================
  const acceptedFormats = [".pdf", ".doc", ".docx"];
  const maxSize = 5 * 1024 * 1024;

  const validateFile = (file) => {
    const ext = "." + file.name.split(".").pop().toLowerCase();

    if (!acceptedFormats.includes(ext)) {
      setErrorMessage(`Allowed formats: ${acceptedFormats.join(", ")}`);
      setUploadStatus("error");
      return false;
    }

    if (file.size > maxSize) {
      setErrorMessage("File must be under 5MB");
      setUploadStatus("error");
      return false;
    }

    return true;
  };

  // ============================
  // UPLOAD
  // ============================
  const uploadToServer = async (resumeFile) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("userId", userId);

    try {
      setUploadStatus("uploading");
      setErrorMessage("");

      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData
      );

      setExistingResume({
        _id: res.data.resumeId,
        resumePath: res.data.resumePath,
        uploadedAt: new Date()
      });

      setUploadStatus("success");
      setFile(resumeFile);
    } catch (error) {
      const msg = error?.response?.data?.msg || "Upload failed";
      setErrorMessage(msg);
      setUploadStatus("error");
    }
  };

  const handleFile = (file) => {
    if (!file || !validateFile(file)) return;

    uploadToServer(file);
  };

  // ============================
  // VIEW / DOWNLOAD
  // ============================
  const handleView = () => {
    const url = `http://localhost:5000/api/resume/${existingResume._id}/view`;
    window.open(url, "_blank");
  };

  const handleDownload = () => {
    const url = `http://localhost:5000/api/resume/${existingResume._id}/download`;
    window.open(url, "_blank");
  };

  const formatDate = (d) => new Date(d).toLocaleString();
  const formatSize = (bytes) => (bytes / 1024).toFixed(1) + " KB";

  // ============================
  // UI
  // ============================
  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-indigo-50 tw-to-blue-50 tw-p-6 tw-flex tw-items-center tw-justify-center">
      <div className="tw-max-w-2xl tw-w-full tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-8">

        <h2 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-6">
          Resume Upload
        </h2>

        {/* ======================
            CASE 1: Resume Already Uploaded
        ======================= */}
        {existingResume && uploadStatus === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tw-bg-green-50 tw-border tw-border-green-200 tw-rounded-xl tw-p-5"
          >
            <div className="tw-flex tw-items-center tw-gap-3">
              <FileText className="tw-w-10 tw-h-10 tw-text-green-600" />

              <div className="tw-flex-1">
                <h3 className="tw-font-semibold">{file?.name || "Uploaded Resume"}</h3>
                <p className="tw-text-sm tw-text-green-700">
                  Uploaded at: {formatDate(existingResume.uploadedAt)}
                </p>
              </div>

              <button
                onClick={handleView}
                className="tw-px-3 tw-py-1 tw-bg-blue-600 tw-text-white tw-rounded-lg"
              >
                View
              </button>

              <button
                onClick={handleDownload}
                className="tw-px-3 tw-py-1 tw-bg-blue-900 tw-text-white tw-rounded-lg"
              >
                Download
              </button>

              <button
                onClick={handleDelete}
                className="tw-px-3 tw-py-1 tw-bg-red-500 tw-text-white tw-rounded-lg"
              >
                <Trash2 />
              </button>
            </div>

            <p className="tw-text-xs tw-text-slate-500 tw-mt-2">
              Resume locked — delete to upload a new one.
            </p>
          </motion.div>
        )}

        {/* ======================
            CASE 2: Upload New Resume
        ======================= */}
        {!existingResume && (
          <div
            className="tw-mt-6 tw-border-2 tw-border-dashed tw-rounded-lg tw-p-10 tw-text-center tw-bg-slate-50"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFile(e.dataTransfer.files[0]);
            }}
          >
            <CloudUpload className="tw-w-12 tw-h-12 tw-text-blue-600 tw-mx-auto tw-mb-4" />

            <h3 className="tw-text-lg tw-font-semibold">Upload your resume</h3>
            <p className="tw-text-slate-500 tw-mb-4">PDF, DOC, DOCX (Max: 5MB)</p>

            <label className="tw-cursor-pointer">
              <input
                type="file"
                className="tw-hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <span className="tw-px-6 tw-py-3 tw-bg-blue-600 tw-text-white tw-rounded-lg tw-font-medium">
                Choose File
              </span>
            </label>

            {uploadStatus === "error" && (
              <p className="tw-text-red-500 tw-mt-4 tw-font-medium">
                {errorMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
