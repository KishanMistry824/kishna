import React from "react";
import { motion } from "framer-motion";
import PopularCategoriesCard from "./PopularcategooriesCard";

const categories = [
  { title: "Information Technology", imageSrc: "./Image/InformationTechnology.png" },
  { title: "Data & Analytics", imageSrc: "./Image/sales_marketing.png" },
  { title: "Engineering", imageSrc: "./Image/engineering.png" },
  { title: "Machine Learning / Generative AI", imageSrc: "./Image/artificial-intelligence.png" },
  { title: "Aviation", imageSrc: "./Image/Aviation.png" },
  { title: "Government Organization / PSU", imageSrc: "/image/Government&PublicSector.png" },
];

const PopularCategories = () => {
  return (
    <section
      className="py-5 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
      }}
    >
      {/* Floating blobs */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(255, 200, 0, 0.15), transparent 70%)",
          top: "-50px",
          left: "-50px",
          filter: "blur(100px)",
          zIndex: 0,
          animation: "float 20s infinite ease-in-out",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(0, 200, 255, 0.15), transparent 70%)",
          bottom: "-50px",
          right: "-50px",
          filter: "blur(100px)",
          zIndex: 0,
          animation: "float 25s infinite ease-in-out",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "220px",
          height: "220px",
          background: "radial-gradient(circle, rgba(146, 254, 157, 0.15), transparent 70%)",
          top: "35%",
          right: "-100px",
          filter: "blur(120px)",
          zIndex: 0,
          animation: "float 30s infinite ease-in-out",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(15px); }
        }
      `}</style>

      <div className="container position-relative z-1">
        <h1 className="text-center text-dark mb-5 fw-bold display-5">
          Popular Job Categories
        </h1>

        <div className="row g-4 justify-content-center">
          {categories.map((cat, index) => (
            <PopularCategoriesCard
              key={index}
              title={cat.title}
              imageSrc={cat.imageSrc}
            />
          ))}
        </div>

        <div className="text-center mt-5">
          <a href="/job-filters">
            <motion.button
              className="btn btn-lg fw-bold text-white px-5 py-3 rounded-pill"
              style={{
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                border: "none",
              }}
              whileHover={{ scale: 1.08, boxShadow: "0 0 15px #00b09b" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Categories
            </motion.button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
