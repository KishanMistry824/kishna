// code1
// import React from "react";
// import { motion } from "framer-motion";
// import { Typewriter } from "react-simple-typewriter";
// import Lottie from "lottie-react";
// import jobAnimation from "./job-search.json";
// import { Briefcase, Rocket, Globe2 } from "lucide-react";

// const HeroSection2 = () => {
//   return (
//     <section
//       className="py-5 position-relative overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(135deg, #8acfeaff, #203a43, #083b51ff, #1b2735)",
//         color: "#fff",
//       }}
//     >
//       <div className="container position-relative" style={{ zIndex: 1 }}>
//         <div className="row align-items-center flex-column-reverse flex-md-row">
//           {/* --- Text Section --- */}
//           <motion.div
//             className="col-md-6 mt-5 mt-md-0 text-white"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="display-4 fw-bold mb-4 lh-sm">
//               <span className="text-warning d-block mb-2">
//                 <Typewriter
//                   words={[
//                     "Find Your Dream Job",
//                     "Boost Your Career",
//                     "Work with Top Companies",
//                   ]}
//                   loop={true}
//                   cursor
//                   cursorStyle="_"
//                   typeSpeed={70}
//                   deleteSpeed={50}
//                   delaySpeed={1500}
//                 />
//               </span>
//               <span style={{ color: "#f8f9fa" }}>— All in One Place 🚀</span>
//             </h1>

//             <p className="lead mb-4 opacity-75">
//               Unlock career opportunities from startups to Fortune 500s — 
//               personalized just for you.
//             </p>

//             <div className="d-flex flex-column flex-sm-row gap-3">
//               <motion.a
//                 whileHover={{ scale: 1.05 }}
//                 href="/job-filters"
//                 className="btn btn-warning btn-lg px-4 rounded-pill fw-semibold shadow-lg border-0"
//                 style={{ boxShadow: "0 0 15px rgba(255,193,7,0.5)" }}
//               >
//                 <Briefcase size={20} className="me-2" />
//                 Browse Jobs
//               </motion.a>
//               <motion.a
//                 whileHover={{ scale: 1.05 }}
//                 href="/upload"
//                 className="btn btn-outline-light btn-lg px-4 rounded-pill fw-semibold border-2"
//               >
//                 <Rocket size={20} className="me-2" />
//                 Upload Resume
//               </motion.a>
//             </div>
//           </motion.div>

//           {/* --- Lottie Animation Section --- */}
//           <motion.div
//             className="col-md-6 text-center"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <Lottie
//               animationData={jobAnimation}
//               loop={true}
//               style={{ height: "400px", width: "100%" }}
//             />
//           </motion.div>
//         </div>
//       </div>

//       {/* --- Floating Icons for uniqueness --- */}
//       <motion.div
//         className="position-absolute"
//         style={{ top: "15%", left: "10%", zIndex: 0, opacity: 0.2 }}
//         animate={{ y: [0, 20, 0] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       >
//         <Globe2 size={100} color="#00eaff" />
//       </motion.div>
//       <motion.div
//         className="position-absolute"
//         style={{ bottom: "15%", right: "10%", zIndex: 0, opacity: 0.2 }}
//         animate={{ y: [0, -20, 0] }}
//         transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//       >
//         <Rocket size={90} color="#ff6ec7" />
//       </motion.div>

//       {/* --- Animated Light Blobs --- */}
//       <motion.div
//         className="position-absolute rounded-circle"
//         style={{
//           width: "320px",
//           height: "320px",
//           background: "radial-gradient(circle, #ff6ec7, transparent 70%)",
//           filter: "blur(140px)",
//           zIndex: 0,
//           top: "10%",
//           left: "-8%",
//         }}
//         animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="position-absolute rounded-circle"
//         style={{
//           width: "260px",
//           height: "260px",
//           background: "radial-gradient(circle, #00f0ff, transparent 70%)",
//           filter: "blur(140px)",
//           zIndex: 0,
//           bottom: "10%",
//           right: "-5%",
//         }}
//         animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//       />
//     </section>
//   );
// };

// export default HeroSection2;










//code 2
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Briefcase, Rocket } from "lucide-react";
import Lottie from "lottie-react";
import jobAnimation from "./job-search.json"; // ✅ Direct import (works like Code 1)

// ✅ Memoized Lottie for performance
const MemoizedLottie = React.memo(({ onComplete }) => (
  <Lottie
    animationData={jobAnimation}
    loop={true}
    autoplay={true}
    style={{
      width: "100%",
      maxWidth: "450px",
      height: "auto",
      margin: "0 auto",
    }}
    rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
    onComplete={onComplete}
  />
));

const HeroSection2 = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const particleCount = window.innerWidth < 768 ? 5 : 10;

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }`;
    document.head.appendChild(style);
  }, []);

  return (
    <section
      className="py-5 position-relative overflow-hidden heroSection"
      style={{
        background: "linear-gradient(135deg, #1b1f24, #2c3e50 50%, #1b1f24 100%)",
        color: "#f8f9fa",
      }}
    >
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center flex-column-reverse flex-md-row">
          {/* --- Text Section --- */}
          <motion.div
            className="col-md-6 mt-5 mt-md-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="position-relative d-inline-block mb-4">
              <h1
                className="fw-bold mb-3 gradientText"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  lineHeight: "1.2",
                  background:
                    "linear-gradient(90deg, #dba8ff, #f5c451, #7fd8be, #dba8ff)",
                  backgroundSize: "300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  willChange: "background-position",
                  animation: prefersReducedMotion
                    ? "none"
                    : "gradientFlow 8s ease-in-out infinite",
                }}
              >
                <span className="d-block mb-2">
                  <Typewriter
                    words={[
                      "Find Opportunities That Inspire",
                      "Build Your Career with Confidence",
                      "Work Smarter. Grow Faster.",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
                <span
                  className="fw-light"
                  style={{ color: "#ccc", fontSize: "1.1rem" }}
                >
                  Elevate your career journey with global job opportunities 
                </span>
              </h1>

              {/*  Animated Gradient Underline */}
              <motion.div
                className="position-absolute start-0 bottom-0"
                style={{
                  height: "4px",
                  width: "100%",
                  borderRadius: "4px",
                  background:
                    "linear-gradient(90deg, #f5c451, #a9e2d3, #dba8ff, #f5c451)",
                  backgroundSize: "300% 100%",
                  willChange: "background-position",
                }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <p
              className="lead mb-4"
              style={{
                color: "#bbb",
                maxWidth: "90%",
                fontWeight: 400,
              }}
            >
              Access curated jobs from startups to top global brands — designed
              to match your skills, goals, and ambitions.
            </p>

            {/* --- Call-to-Action Buttons --- */}
            <div className="d-flex flex-column flex-sm-row gap-3">
              <motion.a
                custom={0}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                href="/job-filters"
                aria-label="Browse available job listings"
                className="btn btn-lg px-4 rounded-pill fw-semibold border-0"
                style={{
                  background:
                    "linear-gradient(90deg, #f7cf6d, #ffe9a8, #f6b93b)",
                  color: "#1b1f24",
                }}
              >
                <Briefcase size={20} className="me-2" />
                Browse Jobs
              </motion.a>

              <motion.a
                custom={1}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                href="/upload-resume"
                aria-label="Upload your resume"
                className="btn btn-outline-light btn-lg px-4 rounded-pill fw-semibold border-2"
              >
                <Rocket size={20} className="me-2" />
                Upload Resume
              </motion.a>
            </div>

            {/* --- CTA Stats --- */}
            <div className="d-flex gap-4 mt-4 mb-4">
              <div>
                <h3 className="fw-bold mb-0 text-warning">50K+</h3>
                <p className="text-white small">Active Jobs</p>
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-info">10K+</h3>
                <p className="text-white small">Companies</p>
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-success">500K+</h3>
                <p className="text-white small">Job Seekers</p>
              </div>
            </div>
          </motion.div>

          {/* --- Lottie Animation Section --- */}
          <motion.div
            className="col-md-6 text-center d-flex justify-content-center align-items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isLoaded ? 1 : 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <MemoizedLottie onComplete={() => setIsLoaded(true)} />
          </motion.div>
        </div>
      </div>

      {/* --- Floating Particles --- */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="position-absolute rounded-circle"
          style={{
            width: "10px",
            height: "10px",
            background:
              i % 2 === 0
                ? "radial-gradient(circle, #f5c451, transparent 70%)"
                : "radial-gradient(circle, #dba8ff, transparent 70%)",
            filter: "blur(2px)",
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            opacity: 0.6,
            zIndex: 0,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { y: [0, -15, 0], opacity: [0.5, 1, 0.5] }
          }
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </section>
  );
};

export default HeroSection2;
