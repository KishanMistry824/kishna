// import React from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaArrowRight, FaBriefcase } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { Typewriter } from "react-simple-typewriter";

// const HeroSection = () => {
//   return (
//     <section
//       className="position-relative d-flex align-items-center justify-content-center text-center overflow-hidden"
//       style={{
//         minHeight: "90vh",
//         background: "linear-gradient(135deg, #f8f9fa 0%, #dbe6f6 100%)",
//       }}
//     >
//       {/* Background Animated Blob */}
//       <motion.div
//         className="position-absolute rounded-circle"
//         style={{
//           width: "600px",
//           height: "600px",
//           background: "radial-gradient(circle at 30% 30%, #00c6ff40, transparent 70%)",
//           top: "-150px",
//           left: "-150px",
//           zIndex: 0,
//           filter: "blur(120px)",
//         }}
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.9, 1, 0.9],
//         }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* Another Blob */}
//       <motion.div
//         className="position-absolute rounded-circle"
//         style={{
//           width: "500px",
//           height: "500px",
//           background: "radial-gradient(circle at 70% 70%, #ff00c840, transparent 70%)",
//           bottom: "-100px",
//           right: "-100px",
//           zIndex: 0,
//           filter: "blur(100px)",
//         }}
//         animate={{
//           scale: [1.1, 0.9, 1.1],
//           opacity: [0.8, 1, 0.8],
//         }}
//         transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* Main Content */}
//       <div className="container position-relative z-1">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="display-4 fw-bold mb-3"
//         >
//           Welcome to{" "}
//           <span
//             className="fw-lighter"
//             style={{
//               background: "linear-gradient(90deg,#007CF0,#00DFD8)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Smart Hired
//           </span>
//           <br />
//           <span
//             className="fs-3 fw-lighter"
//             style={{
//               background: "linear-gradient(90deg,#ff6a00,#ee0979)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             <Typewriter
//               words={[
//                 "Find Your Dream Job",
//                 "Hire Top Talent Fast",
//                 "Accelerate Your Career",
//               ]}
//               loop={0}
//               cursor
//               cursorStyle="|"
//               typeSpeed={60}
//               deleteSpeed={40}
//               delaySpeed={2000}
//             />
//           </span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="lead text-secondary mb-4"
//         >
//           Your gateway to top opportunities and exceptional talent.
//         </motion.p>

//         {/* Buttons */}
//         <motion.div
//           className="d-flex justify-content-center flex-wrap gap-3 mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <Link
//             to="/jobs-listing"
//             className="btn btn-outline-primary btn-lg px-4 rounded-pill shadow-sm d-flex align-items-center gap-2"
//           >
//             <FaBriefcase /> Browse Jobs
//           </Link>

//           <motion.div whileHover={{ scale: 1.05 }}>
//             <Link
//               to="/post-job"
//               className="btn btn-lg px-4 rounded-pill shadow-sm text-white d-flex align-items-center gap-2"
//               style={{
//                 background: "linear-gradient(90deg,#00b09b,#96c93d)",
//                 border: "none",
//               }}
//             >
//               Post a Job <FaArrowRight />
//             </Link>
//           </motion.div>
//         </motion.div>

//         {/* Search Input */}
//         <motion.form
//           className="mx-auto"
//           style={{ maxWidth: "600px" }}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//         >
//           <div className="input-group input-group-lg shadow rounded-pill overflow-hidden">
//             <span className="input-group-text bg-white border-0">
//               <FaSearch className="text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control border-0"
//               placeholder="Search jobs by title, company, skills..."
//               aria-label="Search Jobs"
//             />
//           </div>
//         </motion.form>

//         {/* Popular Tags */}
//         {/* <motion.div
//           className="d-flex justify-content-center flex-wrap gap-2 mt-3"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//         >
//           {["Developer", "Designer", "Marketing", "HR", "Finance"].map(
//             (tag, index) => (
//               <motion.span
//                 key={index}
//                 whileHover={{ scale: 1.1 }}
//                 className="badge bg-light text-dark border rounded-pill px-3 py-2 shadow-sm"
//                 style={{ cursor: "pointer" }}
//               >
//                 #{tag}
//               </motion.span>
//             )
//           )}
//         </motion.div> */}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;







import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import lottie from "lottie-web";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  const lottieRef = useRef(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Framer Motion scroll parallax
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    AOS.init({ once: true });

    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: process.env.PUBLIC_URL + "/Assets/Teamart_Hero.json",
    });

    return () => anim.destroy();
  }, []);

  const jobSuggestions = [
    "Frontend Developer",
    "UI/UX Designer",
    "Project Manager",
    "Data Analyst",
  ];

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(
      value
        ? jobSuggestions.filter((job) =>
            job.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  return (
    <>
      {/* ✅ Floating search bar for mobile */}
      {/* {isMobile && (
        <div
          className="position-fixed start-50 translate-middle-x shadow-lg p-2 rounded-pill bg-white border"
          style={{
            top: "10px",
            width: "92%",
            maxWidth: "480px",
            zIndex: 2000,
            backdropFilter: "blur(8px)",
          }}
        >
          <input
            type="text"
            value={query}
            onChange={handleInput}
            placeholder="Search jobs..."
            aria-label="Search jobs"
            className="w-100 border-0 bg-transparent px-3"
            style={{ outline: "none", fontSize: "1rem" }}
          />
          {suggestions.length > 0 && (
            <ul
              className="list-unstyled mt-2 position-absolute w-100"
              style={{
                background: "#ffffff",
                borderRadius: "0.75rem",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                zIndex: 5,
                maxHeight: "180px",
                overflowY: "auto",
              }}
            >
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  style={{
                    padding: "0.75rem 1rem",
                    cursor: "pointer",
                  }}
                  onMouseDown={() => setQuery(s)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#E0F7FF";
                    e.currentTarget.style.color = "#007CF0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#1a1a1a";
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      )} */}

      <section
        className="d-flex align-items-center position-relative overflow-hidden"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e6f2ff 100%)",
          color: "#1a1a1a",
          padding: isMobile ? "7rem 1rem 3rem" : "4rem 1rem",
        }}
      >
        {/* 🌈 Decorative Blurred Glows */}
        <div
          className="position-absolute rounded-circle"
          style={{
            top: "-60px",
            right: "-60px",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(0,201,255,0.15), transparent 70%)",
            filter: "blur(100px)",
            animation: "float 8s ease-in-out infinite alternate",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            bottom: "-70px",
            left: "-70px",
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(0,255,133,0.1), transparent 70%)",
            filter: "blur(120px)",
            animation: "float 9s ease-in-out infinite alternate-reverse",
          }}
        />

        {/* HERO CONTENT */}
        <div className="container position-relative z-1">
          <div className="row align-items-center justify-content-between">
            {/* ===== LEFT SECTION ===== */}
            <motion.div
              className="col-lg-6 col-md-7 col-12 mb-5 mb-lg-0 text-md-start text-center"
              data-aos="fade-right"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  lineHeight: "1.2",
                  color: "#111827",
                  fontWeight: 700,
                }}
              >
                Empower Your Career <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #007CF0, #00DFD8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  with Smart Hired
                </span>
              </motion.h1>

              <h2
                className="fw-semibold mb-3"
                style={{
                  color: "#4B5563",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                }}
              >
                <Typewriter
                  words={[
                    "Find Your Dream Job",
                    "Hire Top Talent Effortlessly",
                    "Accelerate Your Career Growth",
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={30}
                  delaySpeed={2000}
                />
              </h2>

              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                  color: "#52525b",
                  marginBottom: "2rem",
                }}
              >
                Discover opportunities that match your ambitions and connect
                with global employers — faster and smarter.
              </p>

              {/* ===== CTA BUTTONS ===== */}
              <div className="d-flex flex-wrap gap-3 justify-content-md-start justify-content-center mb-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/post-job"
                    className="btn btn-lg text-white"
                    style={{
                      borderRadius: "50rem",
                      background: "linear-gradient(120deg, #00B4DB, #0083B0)",
                      fontWeight: 600,
                      padding: "0.8rem 2rem",
                      boxShadow: "0 0 20px rgba(0,179,255,0.3)",
                      border: "none",
                    }}
                  >
                    Post a Job
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/jobs-listing"
                    className="btn btn-lg"
                    style={{
                      borderRadius: "50rem",
                      border: "2px solid #00B4DB",
                      color: "#007CF0",
                      fontWeight: 600,
                      padding: "0.8rem 2rem",
                      background: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Browse Jobs
                  </Link>
                </motion.div>
              </div>

              {/* Desktop Search Bar */}
              {!isMobile && (
                <div
                  className="position-relative shadow-sm"
                  style={{
                    maxWidth: "600px",
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "50px",
                    backdropFilter: "blur(8px)",
                    padding: "0.2rem",
                    border: "1.5px solid #d1d5db",
                  }}
                >
                  <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    placeholder="Search jobs by title, company, skills..."
                    aria-label="Search jobs"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      color: "#1f2937",
                      borderRadius: "50px",
                      padding: "0.85rem 1.5rem",
                      outline: "none",
                      fontSize: "1rem",
                    }}
                  />

                  {suggestions.length > 0 && (
                    <ul
                      className="list-unstyled mt-2 position-absolute w-100"
                      style={{
                        background: "#ffffff",
                        borderRadius: "0.75rem",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                        zIndex: 5,
                        maxHeight: "180px",
                        overflowY: "auto",
                      }}
                    >
                      {suggestions.map((s, i) => (
                        <li
                          key={i}
                          style={{
                            padding: "0.75rem 1rem",
                            cursor: "pointer",
                          }}
                          onMouseDown={() => setQuery(s)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#E0F7FF";
                            e.currentTarget.style.color = "#007CF0";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#1a1a1a";
                          }}
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>

            {/* ===== RIGHT SECTION: LOTTIE ===== */}
            <motion.div
              className="col-lg-6 col-md-5 col-12 text-center"
              ref={lottieRef}
              aria-label="Animated hero illustration"
              role="img"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "650px",
                margin: "0 auto",
                y,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            ></motion.div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0% { transform: translateY(0); }
            100% { transform: translateY(20px); }
          }

          @media (max-width: 768px) {
            h1, h2, p {
              text-align: center;
            }
            .btn {
              width: 100%;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default HeroSection;



