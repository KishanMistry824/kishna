// // WhyChooseUs.jsx
// import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaStar, FaClock, FaBriefcase } from "react-icons/fa";

// const WhyChooseUs = () => {
//   // Cursor spotlight + neon streak
//   useEffect(() => {
//     const spotlight = document.getElementById("cyber-spotlight-why");
//     const neon = document.getElementById("cyber-neon-streak-why");

//     const move = (e) => {
//       if (spotlight) {
//         spotlight.style.opacity = "1";
//         spotlight.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px,
//           rgba(255,255,255,0.06), transparent 50%)`;
//       }
//       if (neon) {
//         neon.style.opacity = "1";
//         neon.style.transform = `translate3d(${e.clientX - 60}px, ${e.clientY - 60}px, 0)`;
//       }
//     };

//     document.addEventListener("mousemove", move);
//     return () => document.removeEventListener("mousemove", move);
//   }, []);

//   return (
//     <section className="tw-relative tw-overflow-hidden tw-py-16 tw-text-white">
//       {/* SAME RGB CYBERPUNK BACKGROUND layers (keeps consistent with About.jsx) */}
//       <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-br tw-from-black tw-via-[#041325] tw-to-[#020007] -tw-z-30"></div>

//       <div className="tw-absolute -tw-top-36 -tw-left-36 tw-w-[520px] tw-h-[520px] tw-rounded-full tw-blur-[120px] tw-opacity-60 tw-animate-rgb-blob -tw-z-20"></div>
//       <div className="tw-absolute -tw-bottom-36 -tw-right-36 tw-w-[520px] tw-h-[520px] tw-rounded-full tw-blur-[120px] tw-opacity-50 tw-animate-rgb-blob-delay -tw-z-20"></div>

//       {[...Array(36)].map((_, i) => (
//         <span
//           key={i}
//           className="cyber-pt tw-absolute tw-w-1 tw-h-1 tw-bg-white/40 tw-rounded-full -tw-z-10"
//           style={{ left: `${(i * 37) % 100}%`, top: `${(i * 27) % 100}%` }}
//         />
//       ))}

//       {/* polygon mesh (subtle) */}
//       <svg className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-pointer-events-none tw-opacity-08 -tw-z-15">
//         <g stroke="rgba(123,226,255,0.06)" strokeWidth="0.6" fill="none">
//           {[...Array(16)].map((_, i) => (
//             <line key={i} x1={`${i * 7}%`} y1="0" x2={`${i * 7}%`} y2="100%" />
//           ))}
//         </g>
//       </svg>

//       {/* glitch overlay + scanlines */}
//       <div className="tw-absolute tw-inset-0 tw-pointer-events-none tw-z-10 tw-opacity-20">
//         <div className="tw-absolute tw-inset-0 tw-bg-[repeating-linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 1px, transparent 1px, transparent 6px)]"></div>
//       </div>

//       {/* cursor spotlight + neon streak */}
//       <div id="cyber-spotlight-why" className="tw-absolute tw-inset-0 tw-pointer-events-none tw-opacity-0 tw-transition-opacity tw-duration-200 -tw-z-10"></div>
//       <div id="cyber-neon-streak-why" className="tw-absolute tw-w-28 tw-h-28 tw-rounded-full tw-bg-gradient-to-r from-[#00f0ff]/50 via-[#ff00f7]/50 to-[#00ff7a]/50 tw-blur-2xl tw-opacity-0 tw-pointer-events-none -tw-z-8"></div>

//       {/* CONTENT */}
//       <div className="container tw-relative tw-z-20">
//         <motion.h4 className="tw-text-center tw-font-extrabold tw-text-3xl tw-mb-8" initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }}>
//           Why Choose <span className="tw-text-[#7be2ff]">Us</span>?
//         </motion.h4>

//         <div className="row g-4">
//           {[
//             { icon: <FaStar size={30} />, title: "Trusted by Thousands", desc: "10,000+ active users and counting." },
//             { icon: <FaClock size={30} />, title: "Real-Time Updates", desc: "Instant notifications & live hiring." },
//             { icon: <FaBriefcase size={30} />, title: "Verified Companies", desc: "Strict verification & trust score." },
//           ].map((f, i) => (
//             <motion.div key={i} className="col-md-4" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
//               <div className="tw-rounded-3xl tw-p-6 tw-bg-white/6 tw-border tw-border-white/8 tw-backdrop-blur tw-shadow-2xl hover:tw-scale-105 tw-transition tw-duration-300">
//                 <div className="tw-text-[#7be2ff] tw-mb-3">{f.icon}</div>
//                 <h5 className="tw-font-bold">{f.title}</h5>
//                 <p className="tw-text-gray-300 tw-mt-2">{f.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* local CSS tweaks */}
//       <style>{`
//         /* reuse the same keyframes as About.jsx */
//         @keyframes rgbBlob {
//           0% { filter: hue-rotate(0deg); transform: translate(0,0) scale(1); }
//           25% { filter: hue-rotate(60deg); transform: translate(8px,-8px) scale(1.03); }
//           50% { filter: hue-rotate(140deg); transform: translate(-8px,8px) scale(0.97); }
//           75% { filter: hue-rotate(220deg); transform: translate(5px,5px) scale(1.01); }
//           100% { filter: hue-rotate(360deg); transform: translate(0,0) scale(1); }
//         }
//         .tw-animate-rgb-blob { animation: rgbBlob 18s linear infinite; background: radial-gradient(circle at 30% 30%, rgba(123,226,255,0.12), transparent 20%), radial-gradient(circle at 70% 70%, rgba(255,0,247,0.08), transparent 25%), radial-gradient(circle at 50% 50%, rgba(0,255,122,0.06), transparent 30%); }
//         .tw-animate-rgb-blob-delay { animation: rgbBlob 22s linear infinite; }
//         .cyber-pt { will-change: transform; transition: transform 0.35s linear; }
//       `}</style>
//     </section>
//   );
// };

// export default WhyChooseUs;







// WhyChooseUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaClock, FaBriefcase } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="tw-relative tw-py-16 tw-text-white tw-bg-transparent">
      
      {/* CONTENT */}
      <div className="container tw-relative">

        <motion.h4
          className="tw-text-center tw-font-extrabold tw-text-3xl tw-mb-8"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Why Choose <span className="tw-text-blue-400">Us</span>?
        </motion.h4>

        <div className="row g-4">
          {[
            {
              icon: <FaStar size={30} />,
              title: "Trusted by Thousands",
              desc: "10,000+ active users and counting.",
            },
            {
              icon: <FaClock size={30} />,
              title: "Real-Time Updates",
              desc: "Instant notifications & live hiring.",
            },
            {
              icon: <FaBriefcase size={30} />,
              title: "Verified Companies",
              desc: "Strict verification & trust score.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="col-md-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="
                tw-rounded-3xl tw-p-6 
                tw-bg-white/10 tw-border tw-border-white/10 
                tw-backdrop-blur-lg tw-shadow-xl 
                hover:tw-scale-105 tw-transition tw-duration-300 tw-text-center
              ">
                <div className="tw-text-blue-400 tw-mb-3">{f.icon}</div>
                <h5 className="tw-font-bold">{f.title}</h5>
                <p className="tw-text-gray-300 tw-mt-2">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
