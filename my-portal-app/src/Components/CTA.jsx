// import React from "react";
// import { Link } from "react-router-dom";

// const CTA = () => {
//     return (
//         <section
//             className="py-5 text-white text-center"
//             style={{
//                 // backgroundimage:" linear-gradient(109.6deg, rgba(254, 253, 205, 1) 11.2 %, rgba(163, 230, 255, 1) 91.1 % )"
//      background:" linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)", // blue gradient
//     // linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)
//     //linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)
//     //linear-gradient(90deg, #efd5ff 0%, #515ada 100%)
// }}
//     >
//     <div className="container">
//         <h2 className="fw-bold mb-3 display-6">
//             🚀 Ready to Land Your Dream Job?
//         </h2>
//         <p className="lead mb-4">
//             Create your profile and get matched with top companies hiring today.
//         </p>
//         <Link to="/register" className="btn btn-light btn-lg fw-semibold px-5 py-2 rounded-pill shadow-sm">
//             Get Started for Free
//         </Link>
//     </div>
//     </section >
//   );
// };

// export default CTA;
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const CTA = () => {
  return (
    <section
      className="py-5 text-white text-center position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        borderRadius: "2rem",
        margin: "2rem",
        backdropFilter: "blur(10px)",
        position: "relative",
      }}
    >
      {/* Decorative Blobs */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)",
          top: "-80px",
          left: "-80px",
          filter: "blur(80px)",
          zIndex: "0",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
          bottom: "-60px",
          right: "-60px",
          filter: "blur(80px)",
          zIndex: "0",
        }}
      />

      {/* Content */}
      <motion.div
        className="container position-relative z-1"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="fw-light mb-3 display-5 text-dark">
          🚀{" "}
          <span>
            <Typewriter
              words={[
                "Ready to Land Your Dream Job?",
                "Start Your Journey Today",
                "Get Hired by Top Companies",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </span>
        </h3>

        <p className="lead mb-4 text-dark">
          Create your profile and get matched with top companies hiring today.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/regi"
            className="btn btn-dark btn-lg fw-semibold px-5 py-2 rounded-pill shadow-sm"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;

