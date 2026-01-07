// import React, { useState, useEffect, useCallback } from "react";
// import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";

// // ✅ Environment variable
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// // ✅ Password strength evaluator
// const getPasswordStrength = (password) => {
//   let score = 0;
//   if (password.length >= 8) score++;
//   if (password.length >= 12) score++;
//   if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
//   if (/[0-9]/.test(password)) score++;
//   if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

//   if (score >= 4) return { text: "Strong", color: "text-success", width: 100 };
//   if (score >= 2) return { text: "Medium", color: "text-warning", width: 66 };
//   return { text: "Weak", color: "text-danger", width: 33 };
// };

// // ✅ Form progress tracker
// const FormProgress = ({ values }) => {
//   const fields = ["fullName", "email", "password", "mobile", "workStatus"];
//   const completed = fields.filter((field) => values[field]).length;
//   const progress = (completed / fields.length) * 100;

//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <div className="progress" style={{ height: "5px" }}>
//         <div
//           className="progress-bar bg-success"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//       <small className="text-muted">
//         {completed} of {fields.length} fields completed
//       </small>
//     </div>
//   );
// };

// // ✅ Auto username generator
// const UsernameAutoGenerator = ({ setGeneratedUsername, isUsernameEditable }) => {
//   const { values } = useFormikContext();

//   useEffect(() => {
//     if (values.fullName.trim() && !isUsernameEditable) {
//       const name = values.fullName.trim().replace(/\s+/g, "").toLowerCase();
//       const random = Math.floor(Math.random() * 1000);
//       setGeneratedUsername(`${name}@${random}`);
//     }
//   }, [values.fullName, isUsernameEditable, setGeneratedUsername]);

//   return null;
// };

// const Register = () => {
//   const navigate = useNavigate();
//   const [generatedUsername, setGeneratedUsername] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUsernameEditable, setIsUsernameEditable] = useState(false);
//   const [emailExists, setEmailExists] = useState(false);
//   const [mobileLength, setMobileLength] = useState(0);
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false);

//   const initialValues = {
//     fullName: "",
//     email: "",
//     password: "",
//     mobile: "",
//     workStatus: "",
//     promotions: false,
//     role: "candidate",
//   };

//   const validationSchema = Yup.object({
//     fullName: Yup.string().required("Full name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().min(6, "Minimum 6 characters").required(),
//     mobile: Yup.string()
//       .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
//       .required("Mobile number is required"),
//     workStatus: Yup.string().required("Work status is required"),
//   });

//   // ✅ Debounced email check
//   const checkEmailExists = useCallback(
//     debounce(async (email) => {
//       if (!email || !email.includes("@")) return;
//       try {
//         setIsCheckingEmail(true);
//         const { data } = await axios.get(`${API_URL}/api/users/check-email/${email}`);
//         setEmailExists(data.exists);
//       } catch {
//         setEmailExists(false);
//       } finally {
//         setIsCheckingEmail(false);
//       }
//     }, 500),
//     []
//   );

//   // ✅ Submit handler
//   const handleSubmit = async (values, { resetForm }) => {
//     setIsLoading(true);
//     const username = generatedUsername;
//     try {
//       const payload = { ...values, username };
//       await axios.post(`${API_URL}/api/users/register`, payload);
//       toast.success("🎉 Registration Successful!");
//       resetForm();
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
//         backgroundImage: "url('/Image/login.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: "rgba(255, 255, 255, 0.55)",
//           backdropFilter: "blur(10px)",
//           zIndex: 0,
//         }}
//       ></div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="container position-relative"
//         style={{ zIndex: 1 }}
//       >
//         <div className="row justify-content-center align-items-center">
//           {/* Left Info Card */}
//           <motion.div
//             className="col-md-4 mb-4 d-none d-md-block"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div
//               className="card shadow-sm p-4 rounded-4 border-0"
//               style={{
//                 backgroundColor: "rgba(255,255,255,0.85)",
//                 backdropFilter: "blur(5px)",
//               }}
//             >
//               <img
//                 src="/Image/register.png"
//                 alt="register"
//                 style={{
//                   width: "60%",
//                   maxWidth: "200px",
//                   margin: "0 auto 15px",
//                   display: "block",
//                 }}
//               />
//               <h5 className="fw-bold mb-3">On registering, you can</h5>
//               {["Build your profile and let recruiters find you",
//                 "Get job postings delivered to your email",
//                 "Find a job and grow your career"].map((text, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.2 }}
//                   className="mb-2 p-2 bg-light rounded-3 small"
//                 >
//                   <span className="text-success fw-bold me-2">✔</span> {text}
//                 </motion.div>
//               ))}
//               <Link to="/login" className="btn btn-outline-primary mt-3 w-100">
//                 Already have an account?
//               </Link>
//             </div>
//           </motion.div>

//           {/* Right Form Card */}
//           <motion.div
//             className="col-md-8 mb-5"
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div
//               className="card p-5 shadow-lg rounded-4 border-0"
//               style={{
//                 backgroundColor: "rgba(255, 255, 255, 0.85)",
//                 backdropFilter: "blur(6px)",
//                 minHeight: "720px",
//               }}
//             >
//               <h4 className="fw-bold mb-1">Create your Naukri profile</h4>
//               <p className="text-muted mb-4">Search & apply to jobs easily</p>

//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ values, handleChange }) => (
//                   <Form>
//                     <UsernameAutoGenerator
//                       setGeneratedUsername={setGeneratedUsername}
//                       isUsernameEditable={isUsernameEditable}
//                     />
//                     <FormProgress values={values} />

//                     {/* Full Name */}
//                     <div className="mb-3 position-relative">
//                       <label className="form-label fw-bold">Full name*</label>
//                       <Field
//                         name="fullName"
//                         className="form-control form-control-lg"
//                         placeholder="Enter your full name"
//                         autoFocus
//                       />
//                       <ErrorMessage
//                         name="fullName"
//                         component="div"
//                         className="text-danger"
//                       />
//                     </div>

//                     {/* Username */}
//                     <div className="mb-3">
//                       <label className="form-label fw-bold">
//                         Username{" "}
//                         <button
//                           type="button"
//                           className="btn btn-sm btn-link"
//                           onClick={() =>
//                             setIsUsernameEditable(!isUsernameEditable)
//                           }
//                         >
//                           {isUsernameEditable ? "🔒 Lock" : "✏️ Edit"}
//                         </button>
//                       </label>
//                       <input
//                         value={generatedUsername}
//                         disabled={!isUsernameEditable}
//                         onChange={(e) =>
//                           setGeneratedUsername(e.target.value)
//                         }
//                         className="form-control form-control-lg"
//                       />
//                     </div>

//                     {/* Email */}
//                     <div className="mb-3">
//                       <label className="form-label fw-bold">Email*</label>
//                       <Field
//                         name="email"
//                         type="email"
//                         className="form-control form-control-lg"
//                         placeholder="you@example.com"
//                         onBlur={(e) => checkEmailExists(e.target.value)}
//                       />
//                       {isCheckingEmail ? (
//                         <small className="text-muted">Checking...</small>
//                       ) : emailExists ? (
//                         <small className="text-danger">
//                           This email is already registered.
//                         </small>
//                       ) : null}
//                       <ErrorMessage
//                         name="email"
//                         component="div"
//                         className="text-danger"
//                       />
//                     </div>

//                     {/* Password */}
//                     <div className="mb-3">
//                       <label className="form-label fw-bold">Password*</label>
//                       <div className="input-group">
//                         <Field
//                           name="password"
//                           type={showPassword ? "text" : "password"}
//                           className="form-control form-control-lg"
//                           placeholder="(Minimum 6 characters)"
//                         />
//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? "Hide" : "Show"}
//                         </button>
//                       </div>
//                       {/* Password strength */}
//                       <div className="mt-2">
//                         <div className="progress" style={{ height: "4px" }}>
//                           <div
//                             className={`progress-bar ${
//                               getPasswordStrength(values.password).color.replace(
//                                 "text-",
//                                 "bg-"
//                               )
//                             }`}
//                             style={{
//                               width: `${getPasswordStrength(values.password).width}%`,
//                             }}
//                           />
//                         </div>
//                         <small
//                           className={
//                             getPasswordStrength(values.password).color
//                           }
//                         >
//                           Password Strength:{" "}
//                           {getPasswordStrength(values.password).text}
//                         </small>
//                       </div>
//                       <ErrorMessage
//                         name="password"
//                         component="div"
//                         className="text-danger"
//                       />
//                     </div>

//                     {/* Mobile */}
//                     <div className="mb-3">
//                       <label className="form-label fw-bold">Mobile*</label>
//                       <div className="input-group">
//                         <span className="input-group-text">+91</span>
//                         <Field
//                           name="mobile"
//                           type="tel"
//                           inputMode="numeric"
//                           pattern="[0-9]*"
//                           className="form-control form-control-lg"
//                           onChange={(e) => {
//                             handleChange(e);
//                             setMobileLength(e.target.value.length);
//                           }}
//                           placeholder="10-digit number"
//                         />
//                       </div>
//                       <small
//                         className={
//                           mobileLength === 10 ? "text-success" : "text-muted"
//                         }
//                       >
//                         {mobileLength}/10 digits
//                       </small>
//                       <ErrorMessage
//                         name="mobile"
//                         component="div"
//                         className="text-danger"
//                       />
//                     </div>

//                     {/* Work Status */}
//                     <div className="mb-3">
//                       <label className="form-label fw-bold">
//                         Work status*
//                       </label>
//                       <div className="d-flex flex-column flex-md-row gap-3">
//                         <label className="form-check border rounded p-3 w-100">
//                           <Field
//                             type="radio"
//                             name="workStatus"
//                             value="experienced"
//                             className="form-check-input me-2"
//                           />
//                           I'm experienced
//                         </label>
//                         <label className="form-check border rounded p-3 w-100">
//                           <Field
//                             type="radio"
//                             name="workStatus"
//                             value="fresher"
//                             className="form-check-input me-2"
//                           />
//                           I'm a fresher
//                         </label>
//                       </div>
//                       <ErrorMessage
//                         name="workStatus"
//                         component="div"
//                         className="text-danger"
//                       />
//                     </div>

//                     {/* Promotions */}
//                     <div className="form-check mb-3">
//                       <Field
//                         type="checkbox"
//                         name="promotions"
//                         className="form-check-input"
//                         id="promotions"
//                       />
//                       <label
//                         className="form-check-label ms-2"
//                         htmlFor="promotions"
//                       >
//                         Send me important updates & promotions
//                       </label>
//                     </div>

//                     {/* Submit */}
//                     <button
//                       type="submit"
//                       className="btn btn-primary btn-lg w-100"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "Registering..." : "Register now"}
//                     </button>

//                     <p className="mt-4 text-muted small text-center">
//                       By clicking Register, you agree to{" "}
//                       <Link to="/terms">Terms</Link> &{" "}
//                       <Link to="/privacy">Privacy Policy</Link>.
//                     </p>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// // ✅ Simple debounce utility
// function debounce(func, delay) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// }

// export default Register;






// import React, { useState, useEffect, useCallback } from "react";
// import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";

// // ✅ Environment variable
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// // ✅ Password strength evaluator
// const getPasswordStrength = (password) => {
//   let score = 0;
//   if (password.length >= 8) score++;
//   if (password.length >= 12) score++;
//   if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
//   if (/[0-9]/.test(password)) score++;
//   if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

//   if (score >= 4) return { text: "Strong", color: "tw-text-green-500", width: 100 };
//   if (score >= 2) return { text: "Medium", color: "tw-text-yellow-500", width: 66 };
//   return { text: "Weak", color: "tw-text-red-500", width: 33 };
// };

// // ✅ Form progress tracker
// const FormProgress = ({ values }) => {
//   const fields = ["fullName", "email", "password", "mobile", "workStatus"];
//   const completed = fields.filter((field) => values[field]).length;
//   const progress = (completed / fields.length) * 100;

//   return (
//     <div className="tw-mb-4">
//       <div className="tw-h-1 tw-rounded-full tw-overflow-hidden tw-bg-gray-200">
//         <div
//           className="tw-h-1 tw-bg-gradient-to-r tw-from-blue-400 tw-via-purple-400 tw-to-pink-400"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//       <small className="tw-text-gray-500">
//         {completed} of {fields.length} fields completed
//       </small>
//     </div>
//   );
// };

// // ✅ Auto username generator
// const UsernameAutoGenerator = ({ setGeneratedUsername, isUsernameEditable }) => {
//   const { values } = useFormikContext();

//   useEffect(() => {
//     if (values.fullName.trim() && !isUsernameEditable) {
//       const name = values.fullName.trim().replace(/\s+/g, "").toLowerCase();
//       const random = Math.floor(Math.random() * 1000);
//       setGeneratedUsername(`${name}@${random}`);
//     }
//   }, [values.fullName, isUsernameEditable, setGeneratedUsername]);

//   return null;
// };

// const Register = () => {
//   const navigate = useNavigate();
//   const [generatedUsername, setGeneratedUsername] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUsernameEditable, setIsUsernameEditable] = useState(false);
//   const [emailExists, setEmailExists] = useState(false);
//   const [mobileLength, setMobileLength] = useState(0);
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false);

//   const initialValues = {
//     fullName: "",
//     email: "",
//     password: "",
//     mobile: "",
//     workStatus: "",
//     promotions: false,
//     role: "candidate",
//   };

//   const validationSchema = Yup.object({
//     fullName: Yup.string().required("Full name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().min(6, "Minimum 6 characters").required(),
//     mobile: Yup.string()
//       .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
//       .required("Mobile number is required"),
//     workStatus: Yup.string().required("Work status is required"),
//   });

//   const checkEmailExists = useCallback(
//     debounce(async (email) => {
//       if (!email || !email.includes("@")) return;
//       try {
//         setIsCheckingEmail(true);
//         const { data } = await axios.get(`${API_URL}/api/users/check-email/${email}`);
//         setEmailExists(data.exists);
//       } catch {
//         setEmailExists(false);
//       } finally {
//         setIsCheckingEmail(false);
//       }
//     }, 500),
//     []
//   );

//   const handleSubmit = async (values, { resetForm }) => {
//     setIsLoading(true);
//     const username = generatedUsername;
//     try {
//       const payload = { ...values, username };
//       await axios.post(`${API_URL}/api/users/register`, payload);
//       toast.success("🎉 Registration Successful!");
//       resetForm();
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-p-6 tw-bg-gradient-to-br tw-from-blue-50 tw-via-purple-50 tw-to-pink-50 tw-relative overflow-hidden">
//       {/* Soft animated radial glow */}
//       <div className="tw-absolute tw-inset-0 tw-bg-gradient-radial tw-from-white/30 tw-via-blue-100/20 tw-to-pink-50/10 tw-animate-pulse tw-z-0"></div>
//       <div className="tw-absolute tw-inset-0 tw-bg-white/40 tw-backdrop-blur-xl tw-z-0"></div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="container tw-relative tw-z-10"
//       >
//         <div className="row justify-content-center align-items-center">
//           {/* Left Info Card */}
//           <motion.div
//             className="col-md-4 mb-4 d-none d-md-block"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="tw-bg-white/70 tw-backdrop-blur-md tw-rounded-3xl tw-p-6 tw-shadow-xl tw-text-center tw-border-l-4 tw-border-gradient-to-r tw-from-blue-400 tw-via-purple-400 tw-to-pink-400 tw-animate-pulse">
//               <img
//                 src="/Image/register.png"
//                 alt="register"
//                 className="tw-w-3/5 tw-mx-auto tw-mb-4"
//               />
//               <h5 className="tw-font-bold tw-mb-3">On registering, you can</h5>
//               {[
//                 "Build your profile and let recruiters find you",
//                 "Get job postings delivered to your email",
//                 "Find a job and grow your career",
//               ].map((text, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.2 }}
//                   className="tw-mb-2 tw-p-2 tw-bg-white/50 tw-rounded-lg tw-shadow-md tw-text-sm tw-flex tw-items-center tw-border-l-4 tw-border-gradient-to-r tw-from-blue-400 tw-via-purple-400 tw-to-pink-400 tw-animate-pulse"
//                 >
//                   <span className="tw-text-green-500 tw-font-bold tw-mr-2">✔</span> {text}
//                 </motion.div>
//               ))}
//               <Link
//                 to="/login"
//                 className="tw-inline-block tw-mt-4 tw-w-full tw-text-center tw-py-2 tw-rounded-xl tw-border tw-border-blue-500 tw-bg-white/50 tw-backdrop-blur-sm hover:tw-bg-blue-50 transition"
//               >
//                 Already have an account?
//               </Link>
//             </div>
//           </motion.div>

//           {/* Right Form Card */}
//           <motion.div
//             className="col-md-8 mb-5"
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="tw-bg-white/70 tw-backdrop-blur-md tw-rounded-3xl tw-p-8 tw-shadow-2xl tw-min-h-[720px] tw-border-l-4 tw-border-gradient-to-r tw-from-blue-400 tw-via-purple-400 tw-to-pink-400 tw-animate-pulse">
//               <h4 className="tw-font-bold tw-mb-1">Create your Naukri profile</h4>
//               <p className="tw-text-gray-600 tw-mb-6">Search & apply to jobs easily</p>

//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ values, handleChange }) => (
//                   <Form>
//                     <UsernameAutoGenerator
//                       setGeneratedUsername={setGeneratedUsername}
//                       isUsernameEditable={isUsernameEditable}
//                     />
//                     <FormProgress values={values} />

//                     {/* Full Name */}
//                     <div className="tw-mb-4 tw-relative">
//                       <label className="tw-block tw-font-semibold tw-mb-1">Full name*</label>
//                       <Field
//                         name="fullName"
//                         className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-blue-400 tw-focus:outline-none"
//                         placeholder="Enter your full name"
//                         autoFocus
//                       />
//                       <ErrorMessage name="fullName" component="div" className="tw-text-red-500 tw-mt-1" />
//                     </div>

//                     {/* Username */}
//                     <div className="tw-mb-4">
//                       <label className="tw-block tw-font-semibold tw-mb-1">
//                         Username{" "}
//                         <button
//                           type="button"
//                           className="tw-text-blue-500 tw-text-sm hover:tw-underline"
//                           onClick={() => setIsUsernameEditable(!isUsernameEditable)}
//                         >
//                           {isUsernameEditable ? "🔒 Lock" : "✏️ Edit"}
//                         </button>
//                       </label>
//                       <input
//                         value={generatedUsername}
//                         disabled={!isUsernameEditable}
//                         onChange={(e) => setGeneratedUsername(e.target.value)}
//                         className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-purple-400 tw-focus:outline-none"
//                       />
//                     </div>

//                     {/* Email */}
//                     <div className="tw-mb-4">
//                       <label className="tw-block tw-font-semibold tw-mb-1">Email*</label>
//                       <Field
//                         name="email"
//                         type="email"
//                         className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-purple-400 tw-focus:outline-none"
//                         placeholder="you@example.com"
//                         onBlur={(e) => checkEmailExists(e.target.value)}
//                       />
//                       {isCheckingEmail ? (
//                         <small className="tw-text-gray-500">Checking...</small>
//                       ) : emailExists ? (
//                         <small className="tw-text-red-500">This email is already registered.</small>
//                       ) : null}
//                       <ErrorMessage name="email" component="div" className="tw-text-red-500" />
//                     </div>

//                     {/* Password */}
//                     <div className="tw-mb-4">
//                       <label className="tw-block tw-font-semibold tw-mb-1">Password*</label>
//                       <div className="tw-flex tw-w-full">
//                         <Field
//                           name="password"
//                           type={showPassword ? "text" : "password"}
//                           className="tw-w-full tw-py-3 tw-px-4 tw-rounded-l-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-pink-400 tw-focus:outline-none"
//                           placeholder="(Minimum 6 characters)"
//                         />
//                         <button
//                           type="button"
//                           className="tw-bg-gray-100 tw-px-4 tw-rounded-r-xl tw-border-l tw-border-gray-300 hover:tw-bg-gray-200"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? "Hide" : "Show"}
//                         </button>
//                       </div>
//                       <div className="tw-mt-2">
//                         <div className="tw-h-1 tw-rounded-full tw-overflow-hidden tw-bg-gray-200">
//                           <div
//                             className={`tw-h-1 ${getPasswordStrength(values.password).color.replace(
//                               "tw-text-",
//                               "tw-bg-"
//                             )}`}
//                             style={{ width: `${getPasswordStrength(values.password).width}%` }}
//                           />
//                         </div>
//                         <small className={`${getPasswordStrength(values.password).color} tw-font-semibold`}>
//                           Password Strength: {getPasswordStrength(values.password).text}
//                         </small>
//                       </div>
//                       <ErrorMessage name="password" component="div" className="tw-text-red-500" />
//                     </div>

//                     {/* Mobile */}
//                     <div className="tw-mb-4">
//                       <label className="tw-block tw-font-semibold tw-mb-1">Mobile*</label>
//                       <div className="tw-flex">
//                         <span className="tw-bg-gray-100 tw-px-4 tw-flex tw-items-center tw-rounded-l-xl tw-border tw-border-gray-300">+91</span>
//                         <Field
//                           name="mobile"
//                           type="tel"
//                           inputMode="numeric"
//                           pattern="[0-9]*"
//                           className="tw-w-full tw-py-3 tw-px-4 tw-rounded-r-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-blue-400 tw-focus:outline-none"
//                           onChange={(e) => {
//                             handleChange(e);
//                             setMobileLength(e.target.value.length);
//                           }}
//                           placeholder="10-digit number"
//                         />
//                       </div>
//                       <small className={mobileLength === 10 ? "tw-text-green-500" : "tw-text-gray-500"}>
//                         {mobileLength}/10 digits
//                       </small>
//                       <ErrorMessage name="mobile" component="div" className="tw-text-red-500" />
//                     </div>

//                     {/* Work Status */}
//                     <div className="tw-mb-4">
//                       <label className="tw-block tw-font-semibold tw-mb-2">Work status*</label>
//                       <div className="tw-flex tw-flex-col tw-md:flex-row tw-gap-3">
//                         <label className="tw-border tw-rounded-xl tw-p-3 tw-w-full tw-flex tw-items-center tw-shadow-sm hover:tw-shadow-md transition">
//                           <Field type="radio" name="workStatus" value="experienced" className="tw-mr-2" />
//                           I'm experienced
//                         </label>
//                         <label className="tw-border tw-rounded-xl tw-p-3 tw-w-full tw-flex tw-items-center tw-shadow-sm hover:tw-shadow-md transition">
//                           <Field type="radio" name="workStatus" value="fresher" className="tw-mr-2" />
//                           I'm a fresher
//                         </label>
//                       </div>
//                       <ErrorMessage name="workStatus" component="div" className="tw-text-red-500" />
//                     </div>

//                     {/* Promotions */}
//                     <div className="tw-mb-4 tw-flex tw-items-center">
//                       <Field type="checkbox" name="promotions" className="tw-mr-2" id="promotions" />
//                       <label htmlFor="promotions" className="tw-select-none">Send me important updates & promotions</label>
//                     </div>

//                     {/* Submit */}
//                     <button
//                       type="submit"
//                       className="tw-w-full tw-py-3 tw-rounded-xl tw-bg-gradient-to-r tw-from-blue-400 tw-via-purple-400 tw-to-pink-400 tw-text-white tw-font-semibold hover:tw-opacity-90 transition"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "Registering..." : "Register now"}
//                     </button>

//                     <p className="tw-mt-4 tw-text-gray-500 tw-text-center tw-text-sm">
//                       By clicking Register, you agree to <Link to="/terms" className="tw-text-blue-500 hover:tw-underline">Terms</Link> & <Link to="/privacy" className="tw-text-blue-500 hover:tw-underline">Privacy Policy</Link>.
//                     </p>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// // ✅ Simple debounce utility
// function debounce(func, delay) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// }

// export default Register;















import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ Environment variable
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ✅ Password strength evaluator
const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  if (score >= 4) return { text: "Strong", color: "tw-text-green-500", width: 100 };
  if (score >= 2) return { text: "Medium", color: "tw-text-yellow-500", width: 66 };
  return { text: "Weak", color: "tw-text-red-500", width: 33 };
};

// ✅ Form progress tracker
const FormProgress = ({ values }) => {
  const fields = ["fullName", "email", "password", "mobile", "workStatus"];
  const completed = fields.filter((field) => values[field]).length;
  const progress = (completed / fields.length) * 100;

  return (
    <div className="tw-mb-4">
      <div className="tw-h-1 tw-rounded-full tw-overflow-hidden tw-bg-gray-200">
        <div
          className="tw-h-1 tw-bg-gradient-to-r tw-from-blue-400 tw-via-purple-400 tw-to-pink-400"
          style={{ width: `${progress}%` }}
        />
      </div>
      <small className="tw-text-gray-500">
        {completed} of {fields.length} fields completed
      </small>
    </div>
  );
};

// ✅ Auto username generator
const UsernameAutoGenerator = ({ setGeneratedUsername, isUsernameEditable }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    if (values.fullName.trim() && !isUsernameEditable) {
      const name = values.fullName.trim().replace(/\s+/g, "").toLowerCase();
      const random = Math.floor(Math.random() * 1000);
      setGeneratedUsername(`${name}@${random}`);
    }
  }, [values.fullName, isUsernameEditable, setGeneratedUsername]);

  return null;
};

const Register = () => {
  const navigate = useNavigate();
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [mobileLength, setMobileLength] = useState(0);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    workStatus: "",
    promotions: false,
    role: "candidate",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required(),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
      .required("Mobile number is required"),
    workStatus: Yup.string().required("Work status is required"),
  });

  const checkEmailExists = useCallback(
    debounce(async (email) => {
      if (!email || !email.includes("@")) return;
      try {
        setIsCheckingEmail(true);
        const { data } = await axios.get(`${API_URL}/api/users/check-email/${email}`);
        setEmailExists(data.exists);
      } catch {
        setEmailExists(false);
      } finally {
        setIsCheckingEmail(false);
      }
    }, 500),
    []
  );

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    const username = generatedUsername;
    try {
      const payload = { ...values, username };
      await axios.post(`${API_URL}/api/users/register`, payload);
      toast.success("🎉 Registration Successful!");
      resetForm();
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-p-6 tw-bg-gradient-to-br tw-from-blue-50 tw-via-purple-50 tw-to-pink-50 tw-relative overflow-hidden">

      {/* Spark particles background */}
      <div className="tw-absolute tw-inset-0 tw-pointer-events-none tw-overflow-hidden tw-z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="tw-absolute tw-rounded-full tw-bg-gradient-to-r tw-from-blue-400 tw-via-purple-400 tw-to-pink-400 tw-opacity-30 tw-blur-xl"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `spark${i} ${5 + Math.random() * 5}s linear infinite`,
            }}
          ></div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container tw-relative tw-z-10"
      >
        <div className="row justify-content-center align-items-center">
          
          {/* Left Info Card - simplified, no glow or float */}
          <motion.div
            className="col-md-4 mb-4 d-none d-md-block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="tw-bg-white/70 tw-backdrop-blur-md tw-rounded-3xl tw-p-6 tw-shadow-lg tw-text-center">
              <img
                src="/Image/register.png"
                alt="register"
                className="tw-w-3/5 tw-mx-auto tw-mb-4"
              />
              <h5 className="tw-font-bold tw-mb-3">On registering, you can</h5>
              <ul className="tw-text-left tw-text-gray-700 tw-list-disc tw-pl-5">
                <li>Build your profile and let recruiters find you</li>
                <li>Get job postings delivered to your email</li>
                <li>Find a job and grow your career</li>
              </ul>
              <Link
                to="/login"
                className="tw-inline-block tw-mt-4 tw-w-full tw-text-center tw-py-2 tw-rounded-xl tw-border tw-border-blue-500 tw-bg-white/50 hover:tw-bg-blue-50 transition"
              >
                Already have an account?
              </Link>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            className="col-md-8 mb-5 tw-relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="tw-bg-white/70 tw-backdrop-blur-md tw-rounded-3xl tw-p-8 tw-shadow-2xl tw-min-h-[720px]">
              <h4 className="tw-font-bold tw-mb-1">Create your Naukri profile</h4>
              <p className="tw-text-gray-600 tw-mb-6">Search & apply to jobs easily</p>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange }) => (
                  <Form>
                    <UsernameAutoGenerator
                      setGeneratedUsername={setGeneratedUsername}
                      isUsernameEditable={isUsernameEditable}
                    />
                    <FormProgress values={values} />

                    {/* Full Name */}
                    <div className="tw-mb-4 tw-relative">
                      <label className="tw-block tw-font-semibold tw-mb-1">Full name*</label>
                      <Field
                        name="fullName"
                        className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-blue-400 tw-focus:outline-none"
                        placeholder="Enter your full name"
                        autoFocus
                      />
                      <ErrorMessage name="fullName" component="div" className="tw-text-red-500 tw-mt-1" />
                    </div>

                    {/* Username */}
                    <div className="tw-mb-4">
                      <label className="tw-block tw-font-semibold tw-mb-1">
                        Username{" "}
                        <button
                          type="button"
                          className="tw-text-blue-500 tw-text-sm hover:tw-underline"
                          onClick={() => setIsUsernameEditable(!isUsernameEditable)}
                        >
                          {isUsernameEditable ? "🔒 Lock" : "✏️ Edit"}
                        </button>
                      </label>
                      <input
                        value={generatedUsername}
                        disabled={!isUsernameEditable}
                        onChange={(e) => setGeneratedUsername(e.target.value)}
                        className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-purple-400 tw-focus:outline-none"
                      />
                    </div>

                     <div className="tw-mb-4">
                      <label className="tw-block tw-font-semibold tw-mb-1">Email*</label>
                      <Field
                        name="email"
                        type="email"
                        className="tw-w-full tw-py-3 tw-px-4 tw-rounded-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-purple-400 tw-focus:outline-none"
                        placeholder="you@example.com"
                        onBlur={(e) => checkEmailExists(e.target.value)}
                      />
                      {isCheckingEmail ? (
                        <small className="tw-text-gray-500">Checking...</small>
                      ) : emailExists ? (
                        <small className="tw-text-red-500">This email is already registered.</small>
                      ) : null}
                      <ErrorMessage name="email" component="div" className="tw-text-red-500" />
                    </div>

                    {/* Password */}
                    <div className="tw-mb-4">
                      <label className="tw-block tw-font-semibold tw-mb-1">Password*</label>
                      <div className="tw-flex tw-w-full">
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="tw-w-full tw-py-3 tw-px-4 tw-rounded-l-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-pink-400 tw-focus:outline-none"
                          placeholder="(Minimum 6 characters)"
                        />
                        <button
                          type="button"
                          className="tw-bg-gray-100 tw-px-4 tw-rounded-r-xl tw-border-l tw-border-gray-300 hover:tw-bg-gray-200"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <div className="tw-mt-2">
                        <div className="tw-h-1 tw-rounded-full tw-overflow-hidden tw-bg-gray-200">
                          <div
                            className={`tw-h-1 ${getPasswordStrength(values.password).color.replace(
                              "tw-text-",
                              "tw-bg-"
                            )}`}
                            style={{ width: `${getPasswordStrength(values.password).width}%` }}
                          />
                        </div>
                        <small className={`${getPasswordStrength(values.password).color} tw-font-semibold`}>
                          Password Strength: {getPasswordStrength(values.password).text}
                        </small>
                      </div>
                      <ErrorMessage name="password" component="div" className="tw-text-red-500" />
                    </div>

                    {/* Mobile */}
                    <div className="tw-mb-4">
                      <label className="tw-block tw-font-semibold tw-mb-1">Mobile*</label>
                      <div className="tw-flex">
                        <span className="tw-bg-gray-100 tw-px-4 tw-flex tw-items-center tw-rounded-l-xl tw-border tw-border-gray-300">+91</span>
                        <Field
                          name="mobile"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="tw-w-full tw-py-3 tw-px-4 tw-rounded-r-xl tw-border tw-border-gray-300 tw-focus:ring-2 tw-focus:ring-blue-400 tw-focus:outline-none"
                          onChange={(e) => {
                            handleChange(e);
                            setMobileLength(e.target.value.length);
                          }}
                          placeholder="10-digit number"
                        />
                      </div>
                      <small className={mobileLength === 10 ? "tw-text-green-500" : "tw-text-gray-500"}>
                        {mobileLength}/10 digits
                      </small>
                      <ErrorMessage name="mobile" component="div" className="tw-text-red-500" />
                    </div>

                    {/* Work Status */}
                    <div className="tw-mb-4">
                      <label className="tw-block tw-font-semibold tw-mb-2">Work status*</label>
                      <div className="tw-flex tw-flex-col tw-md:flex-row tw-gap-3">
                        <label className="tw-border tw-rounded-xl tw-p-3 tw-w-full tw-flex tw-items-center tw-shadow-sm hover:tw-shadow-md transition">
                          <Field type="radio" name="workStatus" value="experienced" className="tw-mr-2" />
                          I'm experienced
                        </label>
                        <label className="tw-border tw-rounded-xl tw-p-3 tw-w-full tw-flex tw-items-center tw-shadow-sm hover:tw-shadow-md transition">
                          <Field type="radio" name="workStatus" value="fresher" className="tw-mr-2" />
                          I'm a fresher
                        </label>
                      </div>
                      <ErrorMessage name="workStatus" component="div" className="tw-text-red-500" />
                    </div>

                    {/* Promotions */}
                    <div className="tw-mb-4 tw-flex tw-items-center">
                      <Field type="checkbox" name="promotions" className="tw-mr-2" id="promotions" />
                      <label htmlFor="promotions" className="tw-select-none">Send me important updates & promotions</label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="tw-w-full tw-py-3 tw-rounded-xl tw-bg-gradient-to-r tw-from-blue-400 tw-via-purple-400 tw-to-pink-400 tw-text-white tw-font-semibold hover:tw-opacity-90 transition"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Register now"}
                    </button>

                    <p className="tw-mt-4 tw-text-gray-500 tw-text-center tw-text-sm">
                      By clicking Register, you agree to <Link to="/terms" className="tw-text-blue-500 hover:tw-underline">Terms</Link> & <Link to="/privacy" className="tw-text-blue-500 hover:tw-underline">Privacy Policy</Link>.
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Keyframe animations */}
      <style>{`
        @keyframes float0 {0% {transform: translateY(0)} 100% {transform: translateY(-20px)}}
        @keyframes float1 {0% {transform: translateY(0)} 100% {transform: translateY(15px)}}
        @keyframes float2 {0% {transform: translateY(0)} 100% {transform: translateY(-10px)}}
        @keyframes float3 {0% {transform: translateY(0)} 100% {transform: translateY(18px)}}
        @keyframes float4 {0% {transform: translateY(0)} 100% {transform: translateY(-15px)}}
        @keyframes float5 {0% {transform: translateY(0)} 100% {transform: translateY(12px)}}

        ${[...Array(15)].map((_, i) => `
          @keyframes spark${i} {
            0% { transform: translate(0,0) rotate(0deg); opacity: 0.2; }
            50% { opacity: 0.6; }
            100% { transform: translate(100px,100px) rotate(360deg); opacity: 0; }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

// ✅ Simple debounce utility
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default Register;
