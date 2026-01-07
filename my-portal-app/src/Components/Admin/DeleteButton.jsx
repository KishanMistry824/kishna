// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const DeleteButton = ({
//   jobId,
//   onDelete,
//   small = false,
//   title = "Confirm Deletion",
//   message = "Are you sure you want to delete this job? This action cannot be undone.",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, []);

//   const confirmDelete = () => {
//     if (typeof onDelete === "function") {
//       onDelete(jobId);
//     } else {
//       console.error("❌ ERROR: onDelete is not a function!");
//     }
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* DELETE BUTTON */}
//       <motion.button
//         whileHover={{ scale: 1.07 }}
//         whileTap={{ scale: 0.95 }}
//         className={`btn ${
//           small ? "btn-sm rounded-circle" : "rounded-pill px-3"
//         } shadow-sm d-flex align-items-center gap-2`}
//         style={{
//           background: "linear-gradient(135deg, #dc2626, #b91c1c)",
//           border: "none",
//           color: "white",
//           boxShadow: "0 4px 12px rgba(220,38,38,0.5)",
//         }}
//         onClick={() => setIsOpen(true)}
//       >
//         <i className="bi bi-trash"></i>
//         {!small && "Delete"}
//       </motion.button>

//       {/* MODAL */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="modal-backdrop fade show"
//             style={{
//               position: "fixed",
//               inset: 0,
//               backgroundColor: "rgba(0,0,0,0.6)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               zIndex: 2000,
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsOpen(false)}
//           >
//             <motion.div
//               className="modal-dialog"
//               style={{ maxWidth: "420px", width: "90%" }}
//               initial={{ scale: 0.85, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.85, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="modal-content rounded-4 shadow-lg border-0 p-3">
//                 <div className="modal-header border-0 pb-0">
//                   <h5 className="modal-title fw-bold text-danger">{title}</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setIsOpen(false)}
//                   ></button>
//                 </div>

//                 <div className="modal-body text-secondary fs-6 py-3">
//                   {message}
//                 </div>

//                 <div className="modal-footer border-0 pt-0">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary rounded-pill"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger rounded-pill d-flex align-items-center gap-2 px-4"
//                     style={{ boxShadow: "0 4px 10px rgba(220,38,38,0.4)" }}
//                     onClick={confirmDelete}
//                   >
//                     <i className="bi bi-trash"></i> Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default DeleteButton;


import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteButton = ({
  jobId,
  onDelete,
  small = false,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this job? This action cannot be undone.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shake, setShake] = useState(false);

  const handleEsc = useCallback((e) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, handleEsc]);

  const confirmDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(jobId);
      setIsOpen(false);
    } else {
      console.error("❌ onDelete is not a function!");
      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <>
      {/* Delete Button */}
      <motion.button
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className={`btn ${small ? "btn-sm rounded-circle" : "rounded-pill px-3"} 
          shadow-sm d-flex align-items-center gap-2`}
        style={{
          background: "linear-gradient(135deg, #dc2626, #b91c1c)",
          border: "none",
          color: "white",
          boxShadow: "0 4px 12px rgba(220,38,38,0.5)",
        }}
        onClick={() => setIsOpen(true)}
      >
        <i className="bi bi-trash"></i>
        {!small && "Delete"}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-backdrop fade show"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              className="modal-dialog"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{ maxWidth: "420px", width: "90%" }}
            >
              <motion.div
                className="modal-content rounded-4 shadow-lg border-0 p-3"
                animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold text-danger">{title}</h5>
                  <button className="btn-close" onClick={() => setIsOpen(false)} />
                </div>

                <div className="modal-body text-secondary fs-6 py-3">
                  {message}
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger rounded-pill d-flex align-items-center gap-2 px-4"
                    style={{ boxShadow: "0 4px 10px rgba(220,38,38,0.4)" }}
                    onClick={confirmDelete}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteButton;
