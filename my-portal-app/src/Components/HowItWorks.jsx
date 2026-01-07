import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "bi-search",
    title: "1. Browse Jobs",
    desc: "Explore thousands of job listings across industries and locations.",
  },
  {
    icon: "bi-send-check",
    title: "2. Apply Easily",
    desc: "Apply with one click and upload your resume effortlessly.",
  },
  {
    icon: "bi-briefcase-fill",
    title: "3. Get Hired",
    desc: "Connect with recruiters and land your dream job quickly.",
  },
];

// Framer Motion variants for staggered animation
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, type: "spring", stiffness: 120 },
  }),
};

const HowItWorks = () => {
  return (
    <section className="position-relative py-5 overflow-hidden" style={{ background: "#f8f9fc" }}>
      {/* Floating gradient shapes */}
      <div className="position-absolute top-0 start-0 rounded-circle" 
           style={{
             width: "250px",
             height: "250px",
             background: "radial-gradient(circle, #00C9FF, transparent)",
             filter: "blur(120px)",
             zIndex: 0,
           }} />
      <div className="position-absolute bottom-0 end-0 rounded-circle" 
           style={{
             width: "200px",
             height: "200px",
             background: "radial-gradient(circle, #00FF88, transparent)",
             filter: "blur(120px)",
             zIndex: 0,
           }} />
      <div className="position-absolute top-50 start-50 translate-middle rounded-circle" 
           style={{
             width: "300px",
             height: "300px",
             background: "radial-gradient(circle, #FF6A00, transparent)",
             filter: "blur(150px)",
             zIndex: 0,
           }} />

      {/* Content */}
      <div className="container position-relative z-1">
        <h2 className="text-center fw-bold mb-5 display-6">
          <span style={{ background: "linear-gradient(90deg,#ff6a00,#ee0979)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            How It Works
          </span>
        </h2>

        <div className="row text-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="col-md-4 mb-4"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <motion.div 
                className="card h-100 p-4 shadow-lg border-0 rounded-4 hover-shadow"
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <div className="mb-3">
                  <i
                    className={`bi ${step.icon}`}
                    style={{
                      fontSize: "3rem",
                      background: "linear-gradient(90deg,#00C9FF,#92FE9D)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  ></i>
                </div>
                <h4 className="fw-semibold mb-2">{step.title}</h4>
                <p className="text-black">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
