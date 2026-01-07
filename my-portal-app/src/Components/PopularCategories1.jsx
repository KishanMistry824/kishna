import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PopularCategoriesCard  from "./PopularcategooriesCard";

const categories = [
  { title: "Information Technology", imageSrc: "./Image/InformationTechnology.png" },
  { title: "Telecommunications", imageSrc: "./Image/telecommunication.png" },
  { title: "Engineering", imageSrc: "./Image/engineering.png" },
  { title: "Aviation", imageSrc:  "./Image/Aviation.png"},
  { title: "Architecture & Design", imageSrc:"./Image/Architecture&Design.png" },
  { title: "Government & Public Sector", imageSrc: "/image/Government&PublicSector.png" },
  { title: "Data & Analytics", imageSrc: "/Image/Data&Analytics.png" },
  { title: "Logistics & Supply Chain", imageSrc: "/Image/logistics.png"},
  { title: "Manufacturing", imageSrc:"/Image/manufacturing.png"},
  { title: "Agriculture & Farming", imageSrc: "/Image/agriculture.png" },
];


const PopularCategories = () => {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="text-center text-dark mb-5 fw-lighter display-5">
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
          <Link to="/job-filters">
          <motion.button
            className="btn btn-lg fw-lighter text-white px-5 py-3 rounded-pill"
            style={{
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              border: "none",
            }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 15px #00b09b" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Categories
          </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;


