// // // NamasteAnimation.jsx
// // import React, { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const greetings = [
// //   { text: 'नमस्ते', lang: 'Hindi' },
// //   { text: 'Namaste', lang: 'English' },
// //   { text: 'નમસ્તે', lang: 'Gujarati' },
// //   { text: 'ਨਮਸਤੇ', lang: 'Punjabi' },
// //   { text: 'நமஸ்தே', lang: 'Tamil' },
// //   { text: 'నమస్తే', lang: 'Telugu' },
// //   { text: 'নমস্তে', lang: 'Bengali' },
// //   { text: 'ನಮಸ್ತೆ', lang: 'Kannada' }
// // ];

// // const NamasteAnimation = () => {
// //   const [index, setIndex] = useState(0);

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setIndex((prev) => (prev + 1) % greetings.length);
// //     }, 2000); // Change word every 2 seconds
// //     return () => clearInterval(timer);
// //   }, []);

// //   return (
// //     <div style={styles.container}>
// //       <AnimatePresence mode="wait">
// //         <motion.div
// //           key={greetings[index].text}
// //           initial={{ opacity: 0, scale: 0.8 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           exit={{ opacity: 0, scale: 1.2 }}
// //           transition={{ duration: 1 }}
// //           style={styles.text}
// //         >
// //           {greetings[index].text}
// //         </motion.div>
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     height: '100vh',
// //     backgroundColor: '#000',
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   text: {
// //     color: 'white',
// //     fontSize: '4rem',
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     fontFamily: 'sans-serif',
// //   }
// // };

// // export default NamasteAnimation;

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const greetings = [
//   'नमस्ते', 'Namaste', 'નમસ્તે', 'ਨਮਸਤੇ', 'நமஸ்தே', 'నమస్తే', 'নমস্তে', 'ನಮಸ್ತೆ'
// ];

// const Animation = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((i) => i + 1);
//     }, 300);

//     if (index >= greetings.length) {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [index]);

//   return (
//     <div style={styles.container}>
//       <AnimatePresence mode="wait">
//         {index < greetings.length && (
//           <motion.div
//             key={greetings[index]}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 1.2 }}
//             transition={{ duration: 0.4 }}
//             style={styles.text}
//           >
//             {greetings[index]}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     height: '100vh',
//     backgroundColor: '#000',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: 'white',
//     fontSize: '4rem',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'sans-serif',
//   }
// };

// export default Animation;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'Namaste', lang: 'English' },
  { text: 'નમસ્તે', lang: 'Gujarati' },
  { text: 'ਨਮਸਤੇ', lang: 'Punjabi' },
  { text: 'நமஸ்தே', lang: 'Tamil' },
  { text: 'నమస్తే', lang: 'Telugu' },
  { text: 'নমস্তে', lang: 'Bengali' },
  { text: 'ನಮಸ್ತೆ', lang: 'Kannada' }
];

export default function NamasteIntro({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => {
        if (prev + 1 === greetings.length) {
          clearInterval(timer);
          setTimeout(() => setAnimationDone(true), 800); // slight buffer
        }
        return (prev + 1) % greetings.length;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (animationDone && onComplete) {
      onComplete();
    }
  }, [animationDone]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={greetings[index].text}
          initial={{ opacity: 0, scale: 0.8, z: 0 }}
          animate={{ opacity: 1, scale: 1, z: -10 }}
          exit={{ opacity: 0, scale: 1.2, z: -50 }}
          transition={{ duration: 1 }}
          style={{
            color: 'white',
            fontSize: '4rem',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {greetings[index].text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
