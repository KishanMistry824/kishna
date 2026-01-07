import React from "react";
import { motion } from "framer-motion";
import Personal from "./ProfileCompontes/personal";
import EducationInfo from "./ProfileCompontes/EducationInfo";
import Experience from "./ProfileCompontes/Exprience";
import SkillsSection from "./ProfileCompontes/SkillsSection";
import ResumeUpload from "./ProfileCompontes/ResumeUpload";
import ScoialLinks from "./ProfileCompontes/SocialLink";
import Certificates_Courses from "./ProfileCompontes/Certificates _Courses";
import InternshipExperience from "./ProfileCompontes/IntershipExprience";

const ProfileDashboard = () => {
  return (
    <div className="container">
      {/* Profile Summary Card */}
      {/* <ProfileTopPanel /> */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card border-0 shadow-lg rounded-4 p-4 mt-4 bg-white"
      >
        {/* Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h1 className="fs-3 fw-lighter text-black mb-3 mb-sm-0 d-flex align-items-center gap-2">
            <i className="bi bi-person-badge-fill fs-5text-dark"></i>
            My Profile Dashboard
          </h1>
          {/* <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn btn-success px-4 py-2 fw-semibold shadow-sm rounded-pill"
          >
            <i className="bi bi-save me-2"></i>Save Changes
          </motion.button> */}
        </div>

        {/* Sections */}
        {[
          { title: "Personal Information", Component: Personal },
          { title: "Skill Set", Component: SkillsSection },
          { title: "Education Background", Component: EducationInfo },
           { title: "Social Links", Component: ScoialLinks },
          { title: "Professional Experience", Component: Experience },
          { title: "Internship Experience", Component: InternshipExperience },
          { title: "Courses & Certifications", Component: Certificates_Courses },
          
          { title: "Upload Resume", Component: ResumeUpload },
         
        ].map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-5"
          >
            <h5 className="text-black fw-light mb-3 d-flex align-items-center gap-2">
              <span className="bg-primary bg-opacity-10 p-2 rounded-circle">
                <i className="bi bi-check2-circle text-primary"></i>
              </span>
              {section.title}
            </h5>
            <div className="bg-light rounded-4 p-1 shadow-sm">
              <section.Component />
            </div>
            {index < 7 && <hr className="my-4" />}
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
};

export default ProfileDashboard;
