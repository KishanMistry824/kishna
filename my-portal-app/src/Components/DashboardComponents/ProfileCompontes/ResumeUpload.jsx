import React, { useState } from "react";

const ResumeUpload = () => {
  const [fileName, setFileName] = useState("MyResume_JohnDoe_2024.pdf");
  const [uploadedDate, setUploadedDate] = useState("July 20, 2024");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploadedDate(new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }));
    }
  };

  return (
    <section className="mb-5">
      {/* <h2 className="fs-4 fw-bold text-dark border-bottom border-3 border-primary pb-2">
        Resume Upload
      </h2> */}

      <div
        className="p-4 rounded-4 shadow-sm border"
        style={{
          background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
          borderColor: "#e9ecef",
        }}
      >
        {/* Dropzone / Upload Box */}
        <label
          htmlFor="resume-upload"
          className="d-flex flex-column align-items-center justify-content-center p-5 border border-2 border-dashed rounded-4 bg-white hover-shadow"
          style={{
            cursor: "pointer",
            transition: "all 0.3s ease",
            borderColor: "#0d6efd40",
          }}
        >
          <i className="bi bi-cloud-upload fs-1 text-primary mb-2"></i>
          <span className="fw-semibold text-primary">Click to Upload</span>
          <span className="text-muted small">Supports .pdf, .doc, .docx</span>
        </label>

        <input
          type="file"
          id="resume-upload"
          className="visually-hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        {/* File Info Section */}
        <div className="mt-4 text-center">
          <p className="mb-1 text-dark fw-semibold">
            📄 {fileName}
          </p>
          <p className="small text-muted">
            Uploaded on: <span className="fw-medium">{uploadedDate}</span>
          </p>
        </div>

        <div className="text-center mt-3">
          <button
            className="btn btn-outline-primary rounded-pill px-4 fw-semibold shadow-sm"
            onClick={() => document.getElementById("resume-upload")?.click()}
          >
            <i className="bi bi-arrow-repeat me-2"></i> Update Resume
          </button>
        </div>
      </div>

      {/* Styles */}
      <style jsx="true">{`
        .hover-shadow:hover {
          background-color: #f1f3f5;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default ResumeUpload;
