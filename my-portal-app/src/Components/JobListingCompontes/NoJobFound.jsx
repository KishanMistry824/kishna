// import React from "react";
// import { motion } from "framer-motion";

// const NoJobFound = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       whileHover={{ scale: 1.05 }}
//       transition={{ duration: 0.5 }}
//       className="text-center p-5 mx-auto"
//       style={{
//         maxWidth: "400px",
//         borderRadius: "20px",
//         background: "linear-gradient(135deg, #ffd6e0, #c2f0f0)",
//         boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
//         color: "#333",
//         marginTop: "50px",
//         cursor: "default",
//       }}
//     >
//       <motion.div
//         animate={{ y: [0, -15, 0] }}
//         transition={{ repeat: Infinity, duration: 1.2 }}
//         style={{ fontSize: "50px", marginBottom: "15px" }}
//       >
//         😢
//       </motion.div>
//       <h4 style={{ fontWeight: "600" }}>No Jobs Found</h4>
//       <p style={{ color: "#555", fontSize: "14px" }}>
//         We couldn't find any jobs matching your search. Try changing your filters or check back later!
//       </p>
//     </motion.div>
//   );
// };

// export default NoJobFound;

// import React from "react";
// import Lottie from "lottie-react";
// import noJobAnimation from "./Robot 404 Error.json"; // Download from LottieFiles

// const NoJobFound = () => {
//   return (
//     <div
//       className="d-flex flex-column align-items-center justify-content-center p-5 mx-auto"
//       style={{
//         maxWidth: "800px",
//         maxHeight:"600px",
//         borderRadius: "20px",
//         background: "linear-gradient(135deg, #ffe5f0, #d6f0ff)",
//         boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
//         color: "#333",
//         marginTop: "50px",
//       }}
//     >
//       <div style={{ width: "200px", marginBottom: "20px" }}>
//         <Lottie animationData={noJobAnimation} loop={true} />
//       </div>
//       <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>No Jobs Found 😢</h4>
//       <p style={{ color: "#555", fontSize: "14px", textAlign: "center" }}>
//         We couldn't find any jobs matching your search. Try adjusting your filters or check back later!
//       </p>
//     </div>
//   );
// };

// export default NoJobFound;


import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Confetti from "react-confetti";
import noJobAnimation from "./Robot 404 Error.json"; // Download from LottieFiles

const floatingEmojis = ["😢", "🧐", "💼", "🔍", "😔"];

const NoJobFound = () => {
  return (
    <div className="d-flex justify-content-center position-relative">
      {/* Confetti effect */}
      <Confetti numberOfPieces={80} recycle={false} gravity={0.3} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="d-flex flex-column align-items-center justify-content-center p-5 mx-auto"
        style={{
          maxWidth: "500px",
          borderRadius: "25px",
          background: "linear-gradient(135deg, #ffd6e0, #c2f0f0)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
          color: "#333",
          marginTop: "50px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Lottie Animation */}
        <div style={{ width: "220px", marginBottom: "20px" }}>
          <Lottie animationData={noJobAnimation} loop={true} />
        </div>

        {/* Floating Emojis */}
        {floatingEmojis.map((emoji, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -20, 0], x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2 + index * 0.3 }}
            style={{
              position: "absolute",
              fontSize: "30px",
              top: `${20 + index * 10}%`,
              left: `${10 + index * 15}%`,
            }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Text */}
        <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>No Jobs Found</h4>
        <p style={{ color: "#555", fontSize: "14px", textAlign: "center" }}>
          Nothing here… keep improving your skills, the right opportunity will appear
        </p>
      </motion.div>
    </div>
  );
};

export default NoJobFound;
