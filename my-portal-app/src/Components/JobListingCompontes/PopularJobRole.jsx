import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, LineChart, Lock, Cpu, Stethoscope, Users, Bot, Leaf } from "lucide-react";

const neonColors = [
  "#00bcd4", "#ff4081", "#ff9800", "#4caf50",
  "#9c27b0", "#03a9f4", "#e91e63", "#8bc34a"
];

const trendingRoles = [
  "Ethical Hacker",
  "Generative AI Engineer",
  "Sustainability & Climate Data Analyst"
];

const roles = [
  { title: "Ethical Hacker", icon: <Shield size={28} />, openings: 120, tag: "Hacker" },
  { title: "Data & Analytics", icon: <LineChart size={28} />, openings: 85, tag: "Data" },
  { title: "Cybersecurity Specialist", icon: <Lock size={28} />, openings: 45, tag: "cyberSecurity" },
  { title: "MLOps Engineer", icon: <Cpu size={28} />, openings: 102, tag: "MLOps" },
  { title: "SEO Executive", icon: <Stethoscope size={28} />, openings: 56, tag:"SEO Executive" },
  { title: "Human Resources Manager", icon: <Users size={28} />, openings: 33, tag: "HR" },
  { title: "Generative AI Engineer", icon: <Bot size={28} />, openings: 40, tag: "Generative Ai" },
  { title: "Sustainability & Climate Data Analyst", icon: <Leaf size={28} />, openings: 22, tag: "Sustainability" },
];

// Sort roles by openings (highest first)
const sortedRoles = [...roles].sort((a, b) => b.openings - a.openings);

// Dark gradient backgrounds
const darkGradients = [
  "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", // purple-dark
  "linear-gradient(135deg, #232526, #414345)", // grey-dark
  "linear-gradient(135deg, #1e3c72, #2a5298)", // blue-dark
  "linear-gradient(135deg, #0f2027, #203a43)", // navy-dark
];

const PopularJobRole = () => {
  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4 text-center text-black display-6">
        Popular Job Roles
      </h2>
      <p className="text-center text-success mb-5">
        Explore the hottest roles in demand across tech and sustainability sectors.
      </p>

      <div className="row g-4">
        {sortedRoles.map((role, index) => {
          const glow = neonColors[index % neonColors.length];
          const isTrending = trendingRoles.includes(role.title);
          const gradient = darkGradients[index % darkGradients.length];

          return (
            <div className="col-6 col-md-4 col-lg-3" key={index}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: `0 12px 30px ${glow}40`,
                  border: `1px solid ${glow}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 120 }}
                className="h-100 position-relative"
              >
                <Link
                  to={`/job-filters?keyword=${encodeURIComponent(role.tag)}`}
                  className="text-decoration-none d-block h-100 p-4"
                  style={{
                    background: gradient,
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${glow}40`,
                    borderRadius: "1.5rem",
                    boxShadow: `0 6px 18px rgba(0,0,0,0.3)`,
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isTrending && (
                    <motion.span
                      animate={{ boxShadow: [`0 0 8px ${glow}`, `0 0 20px ${glow}80`, `0 0 8px ${glow}`] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: glow,
                        color: "#fff",
                        fontSize: "0.7rem",
                        padding: "2px 6px",
                        borderRadius: "6px",
                      }}
                    >
                      🔥 Hot
                    </motion.span>
                  )}

                  <motion.div
                    animate={{ boxShadow: [`0 0 8px ${glow}30`, `0 0 20px ${glow}70`, `0 0 8px ${glow}30`] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: `${glow}20`,
                      color: glow,
                    }}
                  >
                    {role.icon}
                  </motion.div>

                  <h6 className="fw-semibold text-center text-truncate">{role.title}</h6>
                  <p className="text-center text-light small mb-0">
                    {role.openings} Open Positions
                  </p>
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-5">
        <Link to="/job-filters">
          <motion.button
            className="btn btn-lg fw-lighter text-white px-5 py-3 rounded-pill"
            style={{
              background: "linear-gradient(to right, #0066ff, #00ffff)",
              border: "none",
            }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 18px #00ffff" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Categories
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default PopularJobRole;




// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   Shield,
//   LineChart,
//   Lock,
//   Cpu,
//   Stethoscope,
//   Users,
//   Bot,
//   Leaf,
// } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// const neonColors = [
//   "#00bcd4",
//   "#ff4081",
//   "#ff9800",
//   "#4caf50",
//   "#9c27b0",
//   "#03a9f4",
//   "#e91e63",
//   "#8bc34a",
// ];

// const trendingRoles = [
//   "Ethical Hacker",
//   "Generative AI Engineer",
//   "Sustainability & Climate Data Analyst",
// ];

// const roles = [
//   { title: "Ethical Hacker", icon: <Shield size={28} />, openings: 120 },
//   { title: "Data & Analytics", icon: <LineChart size={28} />, openings: 85 },
//   { title: "Cybersecurity Specialist", icon: <Lock size={28} />, openings: 45 },
//   { title: "MLOps Engineer", icon: <Cpu size={28} />, openings: 102 },
//   { title: "SEO Executive", icon: <Stethoscope size={28} />, openings: 56 },
//   { title: "Human Resources Manager", icon: <Users size={28} />, openings: 33 },
//   { title: "Generative AI Engineer", icon: <Bot size={28} />, openings: 40 },
//   { title: "Sustainability & Climate Data Analyst", icon: <Leaf size={28} />, openings: 22 },
// ];

// const sortedRoles = [...roles].sort((a, b) => b.openings - a.openings);

// const darkGradients = [
//   "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
//   "linear-gradient(135deg, #232526, #414345)",
//   "linear-gradient(135deg, #1e3c72, #2a5298)",
//   "linear-gradient(135deg, #0f2027, #203a43)",
// ];

// const PopularJobRole = () => {
//   const isMobile = window.innerWidth < 768;

//   const renderCard = (role, index) => {
//     const glow = neonColors[index % neonColors.length];
//     const gradient = darkGradients[index % darkGradients.length];
//     const isTrending = trendingRoles.includes(role.title);

//     return (
//       <motion.div
//         key={index}
//         whileHover={{
//           y: -8,
//           rotate: -1,
//           scale: 1.06,
//           boxShadow: `0 12px 30px ${glow}40`,
//         }}
//         transition={{ type: "spring", stiffness: 150 }}
//         className="h-100 position-relative"
//       >
//         <Link
//           to={`/job-filters?title=${encodeURIComponent(role.title)}`}
//           className="text-decoration-none d-block h-100 p-4 position-relative overflow-hidden"
//           style={{
//             background: "rgba(255,255,255,0.08)",
//             backdropFilter: "blur(16px)",
//             borderRadius: "1.25rem",
//             border: `1px solid ${glow}30`,
//             boxShadow: `inset 0 0 12px ${glow}15, 0 8px 25px rgba(0,0,0,0.3)`,
//             color: "#fff",
//             transition: "all 0.3s ease",
//           }}
//         >
//           {/* Floating gradient orb behind icon */}
//           <motion.div
//             animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
//             transition={{ duration: 3, repeat: Infinity }}
//             style={{
//               position: "absolute",
//               top: "40px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               width: "100px",
//               height: "100px",
//               borderRadius: "50%",
//               background: `radial-gradient(circle at center, ${glow}50, transparent 70%)`,
//               filter: "blur(12px)",
//               zIndex: 0,
//             }}
//           />

//           {/* Trending badge */}
//           {isTrending && (
//             <motion.span
//               animate={{
//                 background: [`linear-gradient(90deg,${glow},#00ffff)`],
//                 boxShadow: [`0 0 10px ${glow}`],
//               }}
//               transition={{ repeat: Infinity, duration: 1.8 }}
//               style={{
//                 position: "absolute",
//                 top: "12px",
//                 right: "12px",
//                 fontSize: "0.7rem",
//                 padding: "2px 8px",
//                 borderRadius: "8px",
//                 color: "#fff",
//                 background: `linear-gradient(90deg,${glow},#00ffff)`,
//               }}
//             >
//               🔥 Hot
//             </motion.span>
//           )}

//           {/* Icon */}
//           <motion.div
//             animate={{
//               boxShadow: [`0 0 8px ${glow}40`, `0 0 20px ${glow}80`, `0 0 8px ${glow}40`],
//             }}
//             transition={{ repeat: Infinity, duration: 2 }}
//             className="d-flex justify-content-center align-items-center mb-3 mx-auto position-relative"
//             style={{
//               width: "72px",
//               height: "72px",
//               borderRadius: "50%",
//               background: "rgba(255,255,255,0.05)",
//               border: `2px solid ${glow}`,
//               color: glow,
//               zIndex: 1,
//             }}
//           >
//             {role.icon}
//           </motion.div>

//           {/* Title */}
//           <h6 className="fw-semibold text-center text-truncate mb-1" style={{ zIndex: 1 }}>
//             {role.title}
//           </h6>
//           <p className="text-center small mb-0 text-secondary" style={{ zIndex: 1 }}>
//             {role.openings} Open Positions
//           </p>
//         </Link>
//       </motion.div>
//     );
//   };

//   return (
//     <section className="container py-5">
//       <h2 className="fw-bold mb-4 text-center text-black display-6">
//         Popular Job Roles
//       </h2>
//       <p className="text-center text-success mb-5">
//         Explore the hottest roles in demand across tech and sustainability sectors.
//       </p>

//       {/* Responsive Layout */}
//       {isMobile ? (
//         <Swiper
//           spaceBetween={20}
//           slidesPerView={1.3}
//           grabCursor
//           centeredSlides
//           style={{ paddingBottom: "30px" }}
//         >
//           {sortedRoles.map((role, index) => (
//             <SwiperSlide key={index}>{renderCard(role, index)}</SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <div className="row g-4">
//           {sortedRoles.map((role, index) => (
//             <div className="col-6 col-md-4 col-lg-3" key={index}>
//               {renderCard(role, index)}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* CTA Button */}
//       <div className="text-center mt-5">
//         <Link to="/job-filters">
//           <motion.button
//             className="btn btn-lg fw-lighter text-white px-5 py-3 rounded-pill"
//             style={{
//               background: "linear-gradient(to right, #0066ff, #00ffff)",
//               border: "none",
//             }}
//             whileHover={{ scale: 1.08, boxShadow: "0 0 18px #00ffff" }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Explore All Categories
//           </motion.button>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default PopularJobRole;
