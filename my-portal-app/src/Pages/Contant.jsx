// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { FaUser, FaEnvelope, FaCommentDots, FaPhone } from "react-icons/fa";
// import axios from "axios";
// import ContactHero from "../Components/ContactHero";

// // SuccessPopup component
// const SuccessPopup = ({ show, message }) => {
//   if (!show) return null;

//   return (
//     <div
//       id="success-popup"
//       style={{
//         position: "fixed",
//         top: "20px",
//         right: "20px",
//         zIndex: 9999,
//         background: "#4caf50",
//         color: "#fff",
//         padding: "16px 32px",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//         fontWeight: "bold",
//         fontSize: "1rem",
//         transition: "opacity 0.3s",
//       }}
//     >
//       {message}
//     </div>
//   );
// };

// const Contact = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");

//   const initialValues = {
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required."),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required."),
//     phone: Yup.string()
//       .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
//       .optional(),
//     message: Yup.string().required("Message is required."),
//   });

//   const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/contact", values);
//       const msg = res.data.message || "Message sent successfully ✅";

//       setStatus({ success: true, message: msg });
//       resetForm();

//       setPopupMessage(msg);
//       setShowPopup(true);
//     } catch (error) {
//       const msg = error.response?.data?.error || "❌ Failed to send. Please try again.";
//       setStatus({ success: false, message: msg });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Hide popup after 2.5s
//   useEffect(() => {
//     if (showPopup) {
//       const timer = setTimeout(() => {
//         setShowPopup(false);
//       }, 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [showPopup]);

//   return (
//     <>
//       <ContactHero />
//       <div
//         className="py-5"
//         style={{
//           background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
//           minHeight: "100vh",
//           paddingTop: "60px",
//         }}
//       >
//         <div className="container">
//           <h2 className="text-center mb-5 fw-bold text-dark">Get in Touch</h2>
//           <div className="row g-5">
//             <div className="col-md-6">
//               <div className="p-4 shadow-lg rounded-4 bg-white">
//                 <Formik
//                   initialValues={initialValues}
//                   validationSchema={validationSchema}
//                   onSubmit={handleSubmit}
//                 >
//                   {({ isSubmitting, status }) => (
//                     <Form>
//                       <div className="mb-3">
//                         <label htmlFor="name" className="form-label">
//                           <FaUser className="me-2" /> Name*
//                         </label>
//                         <Field
//                           type="text"
//                           name="name"
//                           autoComplete="name"
//                           className="form-control rounded-pill px-3"
//                         />
//                         <ErrorMessage name="name" component="div" className="text-danger small" />
//                       </div>

//                       <div className="mb-3" style={{}}>
//                         <label htmlFor="email" className="form-label">
//                           <FaEnvelope className="me-2" /> Email*
//                         </label>
//                         <Field
//                           type="email"
//                           name="email"
//                           autoComplete="email"
//                           className="form-control rounded-pill px-3"
//                         />
//                         <ErrorMessage name="email" component="div" className="text-danger small" />
//                       </div>

//                       <div className="mb-3">
//                         <label htmlFor="phone" className="form-label">
//                           <FaPhone className="me-2" /> Phone (optional)
//                         </label>
//                         <Field
//                           type="text"
//                           name="phone"
//                           autoComplete="tel"
//                           className="form-control rounded-pill px-3"
//                         />
//                         <ErrorMessage name="phone" component="div" className="text-danger small" />
//                       </div>

//                       <div className="mb-3">
//                         <label htmlFor="message" className="form-label">
//                           <FaCommentDots className="me-2" /> Message*
//                         </label>
//                         <Field
//                           as="textarea"
//                           name="message"
//                           className="form-control rounded-4 p-3"
//                           rows="4"
//                         />
//                         <ErrorMessage name="message" component="div" className="text-danger small" />
//                       </div>

//                       <button
//                         type="submit"
//                         className="btn btn-primary w-100 rounded-pill fw-semibold"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? "Sending..." : "Send Message"}
//                       </button>

//                       {status && !status.success && (
//                         <div className="mt-3 alert alert-danger">{status.message}</div>
//                       )}
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </div>

//             {/* Google Map */}
//             {/* Location Section with Google Map */}
//              <div className="col-md-6">
//               <div className="card bg-white text-dark shadow-lg rounded-4 border-0 h-100">
//                 <div className="card-body">
//                   <h5 className="card-title fw-bold mb-3">
//                      Visit Our Office
//                   </h5>
//                   <p className="card-text mb-4">
//                     JobSphere HQ, Surat, Gujarat<br />
//                     India – 395007
//                   </p>

//                   <div className="ratio ratio-4x3 rounded-3 overflow-hidden">
//                     <iframe
//                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14725.422496948107!2d72.82201570908667!3d21.17024098270279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04eeb1f1bdf4d%3A0x92c350df4748fedd!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1685454845111!5m2!1sen!2sin"
//                       style={{ border: 0 }}
//                       allowFullScreen=""
//                       loading="lazy"
//                       title="Google Map"
//                       referrerPolicy="no-referrer-when-downgrade"
//                     ></iframe>
//                   </div>
//                 </div>
//               </div>
//             </div> 

            
//          </div>
//         </div>

//       {/* ✅ Popup Notification */}
//       <SuccessPopup show={showPopup} message={popupMessage} />
//     </div >
//     </>
//   );
// };

// export default Contact;





// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { FaUser, FaEnvelope, FaCommentDots, FaPhone } from "react-icons/fa";
// import axios from "axios";
// import ContactHero from "../Components/ContactHero";

// // SUCCESS POPUP
// const SuccessPopup = ({ show, message }) => {
//   if (!show) return null;

//   return (
//     <div
//       className="tw-fixed tw-top-5 tw-right-5 tw-z-[9999] tw-bg-green-500 tw-text-white tw-font-semibold tw-px-6 tw-py-3 tw-rounded-xl tw-shadow-xl tw-transition-opacity"
//     >
//       {message}
//     </div>
//   );
// };

// const Contact = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");

//   const initialValues = {
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required."),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required."),
//     phone: Yup.string()
//       .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
//       .optional(),
//     message: Yup.string().required("Message is required."),
//   });

//   const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/contact", values);
//       const msg = res.data.message || "Message sent successfully ✅";

//       setStatus({ success: true, message: msg });
//       resetForm();

//       setPopupMessage(msg);
//       setShowPopup(true);
//     } catch (error) {
//       const msg = error.response?.data?.error || "❌ Failed to send. Please try again.";
//       setStatus({ success: false, message: msg });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (showPopup) {
//       const timer = setTimeout(() => setShowPopup(false), 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [showPopup]);

//   return (
//     <>
//       <ContactHero />

//       {/* Background section */}
//       <div className="tw-min-h-screen tw-py-16 tw-bg-gradient-to-br tw-from-[#e0f7fa] tw-to-[#f1f8e9] tw-px-4">

//         <div className="tw-max-w-6xl tw-mx-auto">
//           <h2 className="tw-text-center tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-10">
//             Get in Touch
//           </h2>

//           <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-10">

//             {/* FORM SECTION */}
//             <div className="tw-bg-white tw-shadow-xl tw-rounded-3xl tw-p-8 tw-border tw-border-gray-200">
//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ isSubmitting, status }) => (
//                   <Form className="tw-space-y-5">

//                     {/* NAME */}
//                     <div>
//                       <label className="tw-font-semibold tw-text-gray-700 tw-flex tw-items-center tw-gap-2">
//                         <FaUser /> Name*
//                       </label>
//                       <Field
//                         type="text"
//                         name="name"
//                         className="tw-w-full tw-mt-1 tw-rounded-full tw-border tw-border-gray-300 tw-px-4 tw-py-2 focus:tw-outline-none focus:tw-border-blue-500"
//                       />
//                       <ErrorMessage name="name" component="div" className="tw-text-red-500 tw-text-sm" />
//                     </div>

//                     {/* EMAIL */}
//                     <div>
//                       <label className="tw-font-semibold tw-text-gray-700 tw-flex tw-items-center tw-gap-2">
//                         <FaEnvelope /> Email*
//                       </label>
//                       <Field
//                         type="email"
//                         name="email"
//                         className="tw-w-full tw-mt-1 tw-rounded-full tw-border tw-border-gray-300 tw-px-4 tw-py-2 focus:tw-outline-none focus:tw-border-blue-500"
//                       />
//                       <ErrorMessage name="email" component="div" className="tw-text-red-500 tw-text-sm" />
//                     </div>

//                     {/* PHONE */}
//                     <div>
//                       <label className="tw-font-semibold tw-text-gray-700 tw-flex tw-items-center tw-gap-2">
//                         <FaPhone /> Phone (optional)
//                       </label>
//                       <Field
//                         type="text"
//                         name="phone"
//                         className="tw-w-full tw-mt-1 tw-rounded-full tw-border tw-border-gray-300 tw-px-4 tw-py-2 focus:tw-outline-none focus:tw-border-blue-500"
//                       />
//                       <ErrorMessage name="phone" component="div" className="tw-text-red-500 tw-text-sm" />
//                     </div>

//                     {/* MESSAGE */}
//                     <div>
//                       <label className="tw-font-semibold tw-text-gray-700 tw-flex tw-items-center tw-gap-2">
//                         <FaCommentDots /> Message*
//                       </label>
//                       <Field
//                         as="textarea"
//                         name="message"
//                         rows="4"
//                         className="tw-w-full tw-mt-1 tw-rounded-2xl tw-border tw-border-gray-300 tw-p-4 focus:tw-outline-none focus:tw-border-blue-500"
//                       />
//                       <ErrorMessage name="message" component="div" className="tw-text-red-500 tw-text-sm" />
//                     </div>

//                     {/* SUBMIT BUTTON */}
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="tw-w-full tw-bg-blue-600 tw-text-white tw-font-semibold tw-rounded-full tw-py-3 hover:tw-bg-blue-700 tw-transition-all tw-shadow-md"
//                     >
//                       {isSubmitting ? "Sending..." : "Send Message"}
//                     </button>

//                     {status && !status.success && (
//                       <div className="tw-bg-red-100 tw-text-red-700 tw-p-3 tw-rounded-xl tw-text-center">
//                         {status.message}
//                       </div>
//                     )}
//                   </Form>
//                 )}
//               </Formik>
//             </div>

//             {/* GOOGLE MAP SECTION */}
//             <div className="tw-bg-white tw-shadow-xl tw-rounded-3xl tw-border tw-border-gray-200 tw-overflow-hidden">
//               <div className="tw-p-6">
//                 <h5 className="tw-text-2xl tw-font-bold tw-mb-3">Visit Our Office</h5>
//                 <p className="tw-text-gray-700 tw-mb-5">
//                   JobSphere HQ, Surat, Gujarat <br />
//                   India – 395007
//                 </p>
//               </div>

//               <div className="tw-aspect-[4/3] tw-rounded-b-3xl tw-overflow-hidden">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14725.422496948107!2d72.82201570908667!3d21.17024098270279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04eeb1f1bdf4d%3A0x92c350df4748fedd!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1685454845111!5m2!1sen!2sin"
//                   allowFullScreen=""
//                   loading="lazy"
//                   title="Google Map"
//                   className="tw-w-full tw-h-full tw-border-0"
//                 ></iframe>
//               </div>
//             </div>

//           </div>
//         </div>

//         <SuccessPopup show={showPopup} message={popupMessage} />
//       </div>
//     </>
//   );
// };

// export default Contact;

// src/Pages/Contact.jsx
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaCommentDots, FaPhone } from "react-icons/fa";
import axios from "axios";
import ContactHero from "../Components/ContactHero";

const SuccessPopup = ({ show, message }) => {
  if (!show) return null;
  return (
    <div
      className="tw-fixed tw-top-5 tw-right-5 tw-z-[9999] tw-bg-gradient-to-r tw-from-emerald-400 tw-to-cyan-400 tw-text-black tw-font-semibold tw-px-6 tw-py-3 tw-rounded-xl tw-shadow-[0_8px_40px_rgba(0,255,200,0.18)] tw-backdrop-blur"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const glowRef = useRef(null);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Invalid email format").required("Email is required."),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits").optional(),
    message: Yup.string().required("Message is required."),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/contact", values);
      const msg = res.data.message || "Message sent successfully ✅";

      setStatus({ success: true, message: msg });
      resetForm();

      setPopupMessage(msg);
      setShowPopup(true);
    } catch (error) {
      const msg = error.response?.data?.error || "❌ Failed to send. Please try again.";
      setStatus({ success: false, message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  // Cursor glow movement for cyber effect
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      glow.style.display = "none";
      return;
    }
    const onMove = (e) => {
      // offset so glow centers on pointer
      const size = 220;
      glow.style.transform = `translate3d(${e.clientX - size / 2}px, ${e.clientY - size / 2}px, 0)`;
      glow.style.opacity = "0.95";
    };
    const onLeave = () => {
      glow.style.opacity = "0";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      {/* --- Top hero (unchanged) --- */}
      <ContactHero />

      {/* --- Page background / wrapper --- */}
      <div className="tw-min-h-screen tw-relative tw-bg-gradient-to-br tw-from-[#030415] tw-via-[#0c0030] tw-to-[#050012] tw-overflow-hidden tw-py-16 tw-px-4">

        {/* heavy particle drift (background) */}
        <div aria-hidden className="tw-absolute tw-inset-0 -tw-z-30 tw-pointer-events-none">
          {/* subtle circuit grid */}
          <svg className="tw-w-full tw-h-full tw-opacity-10" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.9" fill="rgba(123,226,255,0.04)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* scanline overlay */}
        <div
          aria-hidden
          className="tw-absolute tw-inset-0 -tw-z-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 6px)",
            mixBlendMode: "overlay",
            opacity: 0.22,
            pointerEvents: "none",
          }}
        />

        {/* cursor glow element */}
        <div
          ref={glowRef}
          id="cursor-glow"
          aria-hidden
          className="tw-pointer-events-none tw-absolute tw-w-[220px] tw-h-[220px] tw-rounded-full tw-blur-[30px] -tw-z-10"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(0,240,255,0.20), rgba(255,0,247,0.16) 35%, rgba(0,255,127,0.12) 60%, transparent 70%)",
            opacity: 0,
            transition: "transform 0.08s linear, opacity 0.16s linear",
            transform: "translate3d(-50%, -50%, 0)",
          }}
        />

        {/* digital animated corners */}
        <div aria-hidden className="tw-absolute tw-inset-0 -tw-z-10 pointer-events-none">
          <div className="tw-absolute tw-top-6 tw-left-6 tw-w-16 tw-h-16 tw-border-t-4 tw-border-l-4 tw-border-cyan-400 tw-rounded-sm tw-shadow-[0_0_22px_#00eaff] tw-animate-[pulseBorder_2.6s_infinite]" />
          <div className="tw-absolute tw-top-6 tw-right-6 tw-w-16 tw-h-16 tw-border-t-4 tw-border-r-4 tw-border-fuchsia-400 tw-rounded-sm tw-shadow-[0_0_22px_#ff00ff] tw-animate-[pulseBorder_2.6s_infinite]" />
          <div className="tw-absolute tw-bottom-6 tw-left-6 tw-w-16 tw-h-16 tw-border-b-4 tw-border-l-4 tw-border-purple-400 tw-rounded-sm tw-shadow-[0_0_22px_#b400ff] tw-animate-[pulseBorder_2.6s_infinite]" />
          <div className="tw-absolute tw-bottom-6 tw-right-6 tw-w-16 tw-h-16 tw-border-b-4 tw-border-r-4 tw-border-blue-400 tw-rounded-sm tw-shadow-[0_0_22px_#009dff] tw-animate-[pulseBorder_2.6s_infinite]" />
        </div>

        {/* content container */}
        <div className="tw-max-w-6xl tw-mx-auto tw-relative tw-z-10">

          <h2 className="tw-text-center tw-text-4xl tw-font-dancing tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-[#7be2ff] tw-via-[#ff6bf7] tw-to-[#00ff9a] tw-mb-12">
            Reach Out — We’re Listening
          </h2>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">

            {/* FORM CARD (LEFT) */}
            <div className="tw-relative tw-rounded-3xl tw-p-6 tw-overflow-hidden">
              {/* RGB animated border (outer) */}
              <div className="tw-absolute -tw-inset-1 tw-rounded-3xl tw-pointer-events-none tw-z-[-1]"
                   style={{
                     background: "linear-gradient(90deg,#00d4ff, #7be2ff, #ff6bf7, #00ff7a)",
                     filter: "blur(18px)",
                     opacity: 0.18,
                     mixBlendMode: "screen",
                   }} />

              {/* glass card */}
              <div className="tw-relative tw-bg-black/60 tw-backdrop-blur tw-border tw-border-white/6 tw-rounded-3xl tw-p-6 tw-shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <h3 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4">Send a Message</h3>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isSubmitting, status }) => (
                    <Form className="tw-space-y-4">

                      {/* name */}
                      <div className="tw-relative group">
                        <label className="tw-text-sm tw-text-cyan-200 tw-font-medium tw-block tw-mb-2">
                          <FaUser className="tw-inline tw-mr-2" /> Your Name *
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className="tw-w-full tw-bg-transparent tw-border tw-border-cyan-400/30 tw-rounded-xl tw-px-4 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-cyan-300 focus:tw-shadow-[0_0_18px_rgba(0,212,255,0.12)]"
                          placeholder="Jane Doe"
                        />
                        <ErrorMessage name="name" component="div" className="tw-text-red-400 tw-text-sm tw-mt-1" />
                      </div>

                      {/* email */}
                      <div className="tw-relative group">
                        <label className="tw-text-sm tw-text-cyan-200 tw-font-medium tw-block tw-mb-2">
                          <FaEnvelope className="tw-inline tw-mr-2" /> Email *
                        </label>
                        <Field
                          name="email"
                          type="email"
                          className="tw-w-full tw-bg-transparent tw-border tw-border-cyan-400/30 tw-rounded-xl tw-px-4 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-cyan-300 focus:tw-shadow-[0_0_18px_rgba(0,212,255,0.12)]"
                          placeholder="hello@example.com"
                        />
                        <ErrorMessage name="email" component="div" className="tw-text-red-400 tw-text-sm tw-mt-1" />
                      </div>

                      {/* phone */}
                      <div className="tw-relative group">
                        <label className="tw-text-sm tw-text-cyan-200 tw-font-medium tw-block tw-mb-2">
                          <FaPhone className="tw-inline tw-mr-2" /> Phone (optional)
                        </label>
                        <Field
                          name="phone"
                          type="text"
                          className="tw-w-full tw-bg-transparent tw-border tw-border-cyan-400/30 tw-rounded-xl tw-px-4 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-cyan-300 focus:tw-shadow-[0_0_18px_rgba(0,212,255,0.12)]"
                          placeholder="9876543210"
                        />
                        <ErrorMessage name="phone" component="div" className="tw-text-red-400 tw-text-sm tw-mt-1" />
                      </div>

                      {/* message */}
                      <div className="tw-relative group">
                        <label className="tw-text-sm tw-text-cyan-200 tw-font-medium tw-block tw-mb-2">
                          <FaCommentDots className="tw-inline tw-mr-2" /> Message *
                        </label>
                        <Field
                          as="textarea"
                          name="message"
                          rows="5"
                          className="tw-w-full tw-bg-transparent tw-border tw-border-cyan-400/30 tw-rounded-2xl tw-px-4 tw-py-3 tw-text-white focus:tw-outline-none focus:tw-border-cyan-300 focus:tw-shadow-[0_0_18px_rgba(0,212,255,0.12)]"
                          placeholder="Tell us about your project..."
                        />
                        <ErrorMessage name="message" component="div" className="tw-text-red-400 tw-text-sm tw-mt-1" />
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="tw-w-full tw-bg-gradient-to-r tw-from-cyan-400 tw-to-fuchsia-400 tw-text-black tw-font-semibold tw-py-3 tw-rounded-full tw-shadow-[0_8px_40px_rgba(0,212,255,0.12)] hover:tw-scale-[1.02] tw-transition"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                      </div>

                      {status && !status.success && (
                        <div className="tw-mt-2 tw-bg-red-900/70 tw-text-red-200 tw-p-3 tw-rounded-lg tw-text-center">
                          {status.message}
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* MAP CARD (RIGHT) — full cyberpunk heavy) */}
            <div className="tw-relative tw-rounded-3xl tw-overflow-hidden tw-p-1">
              {/* neon frame */}
              <div className="tw-absolute -tw-inset-1 tw-rounded-3xl tw-pointer-events-none"
                   style={{ background: "linear-gradient(90deg,#00d4ff,#7be2ff,#ff6bf7,#00ff7a)", filter: "blur(18px)", opacity: 0.2 }} />
              <div className="tw-relative tw-bg-black/60 tw-backdrop-blur tw-border tw-border-white/8 tw-rounded-3xl tw-p-6 tw-shadow-[0_18px_80px_rgba(0,0,0,0.6)]">
                <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                  <div>
                    <h4 className="tw-text-xl tw-font-semibold tw-text-white">Visit Our Office</h4>
                    <p className="tw-text-gray-300">JobSphere HQ, Surat, Gujarat · India – 395007</p>
                  </div>
                </div>

                {/* map container with hologram overlay */}
                <div className="tw-aspect-[4/3] tw-rounded-2xl tw-overflow-hidden tw-relative tw-mt-4">

                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14725.422496948107!2d72.82201570908667!3d21.17024098270279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04eeb1f1bdf4d%3A0x92c350df4748fedd!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1685454845111!5m2!1sen!2sin"
                    className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* hologram shine on map */}
                  <div aria-hidden className="tw-absolute tw-inset-0 tw-pointer-events-none">
                    <div className="tw-absolute -tw-left-1/4 tw-top-0 tw-w-1/3 tw-h-full tw-transform -tw-skew-x-12 tw-bg-gradient-to-r tw-from-white/30 tw-via-white/8 tw-to-transparent tw-animate-[mapShine_3s_linear_infinite]" />
                    {/* inner subtle particles */}
                    <div className="tw-absolute tw-inset-0 tw-bg-[radial-gradient(circle,rgba(0,212,255,0.06)_1px,transparent_20%)] tw-opacity-40 tw-pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <SuccessPopup show={showPopup} message={popupMessage} />
      </div>

      {/* ---- Inline CSS keyframes + helpers (kept here for portability) ---- */}
      <style>{`
        /* pulse border corners */
        @keyframes pulseBorder {
          0% { transform: scale(1); opacity: .9; box-shadow: 0 0 10px rgba(0,230,255,0.12); }
          50% { transform: scale(1.02); opacity: 1; box-shadow: 0 0 28px rgba(255,0,247,0.14); }
          100% { transform: scale(1); opacity: .9; box-shadow: 0 0 10px rgba(0,230,255,0.12); }
        }
        .tw-animate-\\[pulseBorder_2\\.6s_infinite\\] { animation: pulseBorder 2.6s infinite; }

        /* map shine */
        @keyframes mapShine {
          0% { left: -40%; opacity: 0; }
          10% { opacity: 0.6; }
          50% { left: 120%; opacity: 0.9; }
          100% { left: 120%; opacity: 0; }
        }
        .tw-animate-\\[mapShine_3s_linear_infinite\\] { animation: mapShine 3s linear infinite; }

        /* prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .tw-animate-\\[pulseBorder_2\\.6s_infinite\\],
          .tw-animate-\\[mapShine_3s_linear_infinite\\] {
            animation: none !important;
          }
          /* hide heavy backdrops */
          #cursor-glow { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Contact;