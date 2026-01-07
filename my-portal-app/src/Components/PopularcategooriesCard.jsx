import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const gradients = {
  "Information Technology": "linear-gradient(135deg, #4facfe, #00f2fe)",
  "Telecommunications": "linear-gradient(135deg, #F7971E, #FFD200)",
  "Engineering": "linear-gradient(135deg, #a18cd1, #fbc2eb)",
  "Aviation": "linear-gradient(135deg, #667eea, #764ba2)",
  "Architecture & Design": "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  "Government & Public Sector": "linear-gradient(135deg, #434343, #000000)",
  "Data & Analytics": "linear-gradient(135deg, #11998e, #38ef7d)",
  "Logistics & Supply Chain": "linear-gradient(135deg, #f46b45, #eea849)",
  "Manufacturing": "linear-gradient(135deg, #1D976C, #93F9B9)",
  "Agriculture & Farming": "linear-gradient(135deg, #56ab2f, #a8e063)",
  "Machine Learning / Generative AI": "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)",
};

const PopularCategoriesCard = ({ title, imageSrc }) => {
  const navigate = useNavigate();
  const bg = gradients[title] || "#3b82f6";

  const handleClick = () => {
    navigate(`/job-filters?category=${encodeURIComponent(title)}`);
  };

  return (
    <motion.div
      className="col-6 col-md-4 col-lg-3 d-flex"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div
        className="card text-white shadow-lg border-0 w-100 position-relative overflow-hidden"
        style={{
          background: bg,
          borderRadius: "20px",
          height: "200px",
        }}
      >
        {/* Subtle background circle pattern */}
        <div
          style={{
            position: "absolute",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            top: "-30px",
            right: "-30px",
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            bottom: "-30px",
            left: "-20px",
            filter: "blur(8px)",
          }}
        />

        {/* Content */}
        <div className="card-body d-flex flex-column justify-content-between p-4">
          <div>
            <img
              src={imageSrc}
              alt={title}
              style={{
                height: "40px",
                width: "40px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h6 className="fw-semibold fs-6 mb-1">{title}</h6>
            <p className="small mb-0 opacity-75">3,245 jobs</p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="small opacity-75">
              <i className="bi bi-graph-up-arrow me-1"></i> +12%
            </span>
            <span className="fw-semibold small">
              Explore <i className="bi bi-arrow-right-short"></i>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCategoriesCard;
