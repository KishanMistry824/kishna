import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Certificates_Courses = () => {
  const [certificates, setCertificates] = useState([
    {
      name: "",
      organization: "",
      date: "",
      credentialId: "",
      credentialUrl: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
  };

  const addCertificate = () => {
    setCertificates([
      ...certificates,
      {
        name: "",
        organization: "",
        date: "",
        credentialId: "",
        credentialUrl: "",
      },
    ]);
  };

  const removeCertificate = (index) => {
    const updated = [...certificates];
    updated.splice(index, 1);
    setCertificates(updated);
  };

  return (
    <section className="mb-5">
  {/* Section Title 
  <h2 className="fs-4 fw-bold border-bottom border-3 border-primary pb-2 d-flex align-items-center mb-4">
    <i className="bi bi-award-fill me-2 text-primary" />
    Certificates / Courses
  </h2>*/}

  {/* Animated Certificate Cards */}
  <AnimatePresence>
    {certificates.map((cert, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderLeft: "5px solid #0d6efd",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold text-dark mb-0">
            🎓 Certificate #{index + 1}
          </h5>
          {certificates.length > 1 && (
            <button
              className="btn btn-sm btn-outline-danger d-flex align-items-center"
              onClick={() => removeCertificate(index)}
            >
              <i className="bi bi-trash me-1"></i> Remove
            </button>
          )}
        </div>

        {/* Input Fields */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Course Title <span className="text-danger">*</span>
            </label>
            <input
              className="form-control form-control-lg shadow-sm rounded-pill"
              type="text"
              value={cert.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="e.g., Full Stack Web Development"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Issuing Organization <span className="text-danger">*</span>
            </label>
            <input
              className="form-control form-control-lg shadow-sm rounded-pill"
              type="text"
              value={cert.organization}
              onChange={(e) => handleChange(index, "organization", e.target.value)}
              placeholder="e.g., Coursera, Udemy..."
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Completion Date</label>
            <input
              className="form-control form-control-lg shadow-sm rounded-pill"
              type="month"
              value={cert.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Credential ID <span className="text-muted">(optional)</span>
            </label>
            <input
              className="form-control form-control-lg shadow-sm rounded-pill"
              type="text"
              value={cert.credentialId}
              onChange={(e) => handleChange(index, "credentialId", e.target.value)}
              placeholder="e.g., ABC123XYZ"
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">
              Credential URL <span className="text-muted">(optional)</span>
            </label>
            <input
              className="form-control form-control-lg shadow-sm rounded-pill"
              type="url"
              value={cert.credentialUrl}
              onChange={(e) => handleChange(index, "credentialUrl", e.target.value)}
              placeholder="https://example.com/certificate"
            />
          </div>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>

  {/* Bottom Buttons Row */}
  <motion.div
    className="d-flex justify-content-between align-items-center mt-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <button
      className="btn btn-info d-flex align-items-center rounded-pill px-3"
      onClick={addCertificate}
    >
      {/* <i className="bi bi-plus-circle me-2"></i>  */}
      Add Certificate / Course
    </button>

    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className="btn btn-success px-4 rounded-pill d-flex align-items-center shadow-sm"
      // onClick={handleSave}
    >
      {/* <i className="bi bi-check-circle me-2"></i> */}
      Save 
    </motion.button>
  </motion.div>
</section>
  );
};

export default Certificates_Courses;



