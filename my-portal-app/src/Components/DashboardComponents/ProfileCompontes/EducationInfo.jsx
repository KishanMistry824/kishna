// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CheckCircle, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const validationSchemas = [
//   Yup.object().shape({
//     tenthScore: Yup.string().required("Required"),
//     tenthYear: Yup.string().required("Required"),
//   }),
//   Yup.object().shape({
//     twelfthScore: Yup.string().required("Required"),
//     twelfthYear: Yup.string().required("Required"),
//   }),
//   Yup.object().shape({
//     gradDegree: Yup.string().required("Required"),
//     gradInstitute: Yup.string().required("Required"),
//     gradScore: Yup.string().required("Required"),
//     gradStartYear: Yup.string().required("Required"),
//     gradEndYear: Yup.string().required("Required"),
//   }),
//   Yup.object().shape({
//     postGradDegree: Yup.string(),
//     postGradInstitute: Yup.string(),
//     postGradScore: Yup.string(),
//     postGradStartYear: Yup.string(),
//     postGradEndYear: Yup.string(),
//   }),
// ];

// const initialValues = {
//   tenthScore: "",
//   tenthYear: "",
//   twelfthScore: "",
//   twelfthYear: "",
//   gradDegree: "",
//   gradInstitute: "",
//   gradScore: "",
//   gradStartYear: "",
//   gradEndYear: "",
//   postGradDegree: "",
//   postGradInstitute: "",
//   postGradScore: "",
//   postGradStartYear: "",
//   postGradEndYear: "",
// };

// const EducationWizard = () => {
//   const [step, setStep] = useState(0);
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleNext = () => setStep((prev) => prev + 1);
//   const handleBack = () => setStep((prev) => prev - 1);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const userId = localStorage.getItem("userId");
//       const res = await fetch("http://localhost:5000/api/education", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, ...values }),
//       });
//       await res.json();
//       toast.success("Education info submitted successfully!");
//       setSubmittedData(values); // store submitted data
//     } catch (err) {
//       console.error(err);
//       toast.error("Submission failed.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const steps = [
//     {
//       title: "10th Details",
//       fields: (
//         <>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">10th Score</label>
//             <Field name="tenthScore" className="form-control shadow-sm" />
//             <ErrorMessage name="tenthScore" component="div" className="text-danger" />
//           </div>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">10th Passing Year</label>
//             <Field name="tenthYear" className="form-control shadow-sm" />
//             <ErrorMessage name="tenthYear" component="div" className="text-danger" />
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "12th Details",
//       fields: (
//         <>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">12th Score</label>
//             <Field name="twelfthScore" className="form-control shadow-sm" />
//             <ErrorMessage name="twelfthScore" component="div" className="text-danger" />
//           </div>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">12th Passing Year</label>
//             <Field name="twelfthYear" className="form-control shadow-sm" />
//             <ErrorMessage name="twelfthYear" component="div" className="text-danger" />
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "Graduation",
//       fields: (
//         <>
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Graduation Degree</label>
//               <Field name="gradDegree" className="form-control shadow-sm" />
//               <ErrorMessage name="gradDegree" component="div" className="text-danger" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Graduation Institute</label>
//               <Field name="gradInstitute" className="form-control shadow-sm" />
//               <ErrorMessage name="gradInstitute" component="div" className="text-danger" />
//             </div>
//           </div>
//           <div className="row g-3 mt-2">
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">Score</label>
//               <Field name="gradScore" className="form-control shadow-sm" />
//               <ErrorMessage name="gradScore" component="div" className="text-danger" />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">Start Year</label>
//               <Field name="gradStartYear" className="form-control shadow-sm" />
//               <ErrorMessage name="gradStartYear" component="div" className="text-danger" />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">End Year</label>
//               <Field name="gradEndYear" className="form-control shadow-sm" />
//               <ErrorMessage name="gradEndYear" component="div" className="text-danger" />
//             </div>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "Post Graduation (Optional)",
//       fields: (
//         <>
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Post Grad Degree</label>
//               <Field name="postGradDegree" className="form-control shadow-sm" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Institute</label>
//               <Field name="postGradInstitute" className="form-control shadow-sm" />
//             </div>
//           </div>
//           <div className="row g-3 mt-2">
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">Score</label>
//               <Field name="postGradScore" className="form-control shadow-sm" />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">Start Year</label>
//               <Field name="postGradStartYear" className="form-control shadow-sm" />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">End Year</label>
//               <Field name="postGradEndYear" className="form-control shadow-sm" />
//             </div>
//           </div>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <div className="card shadow-lg p-4 rounded-4 border-0">
//         {submittedData ? (
//           // Display submitted data in modern card
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="row g-4"
//           >
//             <h4 className="mb-3 text-primary fw-bold">Your Education Details</h4>

//             {["10th", "12th", "Graduation", "Post Graduation"].map((level, idx) => {
//               const prefix = level.toLowerCase().replace(" ", "");
//               const data = {};
//               switch (prefix) {
//                 case "10th":
//                   data.Score = submittedData.tenthScore;
//                   data.Year = submittedData.tenthYear;
//                   break;
//                 case "12th":
//                   data.Score = submittedData.twelfthScore;
//                   data.Year = submittedData.twelfthYear;
//                   break;
//                 case "graduation":
//                   data.Degree = submittedData.gradDegree;
//                   data.Institute = submittedData.gradInstitute;
//                   data.Score = submittedData.gradScore;
//                   data.StartYear = submittedData.gradStartYear;
//                   data.EndYear = submittedData.gradEndYear;
//                   break;
//                 case "postgraduation":
//                   data.Degree = submittedData.postGradDegree || "N/A";
//                   data.Institute = submittedData.postGradInstitute || "N/A";
//                   data.Score = submittedData.postGradScore || "N/A";
//                   data.StartYear = submittedData.postGradStartYear || "N/A";
//                   data.EndYear = submittedData.postGradEndYear || "N/A";
//                   break;
//                 default:
//                   break;
//               }

//               return (
//                 <div className="col-md-6" key={idx}>
//                   <div className="card shadow-sm rounded-3 p-3 h-100 hover-scale">
//                     <h5 className="text-primary fw-bold">{level}</h5>
//                     <ul className="list-unstyled mt-2 mb-0">
//                       {Object.entries(data).map(([key, value], i) => (
//                         <li key={i}>
//                           <span className="fw-semibold">{key}:</span>{" "}
//                           <span className="badge bg-info text-dark ms-2">{value}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               );
//             })}
//           </motion.div>
//         ) : (
//           // Render form wizard
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[step]}
//             onSubmit={step === steps.length - 1 ? handleSubmit : handleNext}
//           >
//             {({ isSubmitting, handleSubmit }) => (
//               <Form onSubmit={handleSubmit}>
//                 {/* Stepper */}
//                 <div className="d-flex justify-content-between mb-4 flex-wrap">
//                   {steps.map((s, index) => (
//                     <div
//                       key={index}
//                       className={`text-center flex-fill px-2 mb-2 ${
//                         index <= step ? "text-primary fw-bold" : "text-muted"
//                       } step-hover`}
//                       onClick={() => setStep(index)}
//                     >
//                       <div className="mb-1">
//                         {index < step ? (
//                           <CheckCircle size={20} className="text-success" />
//                         ) : index === step ? (
//                           <ArrowRightCircle size={20} />
//                         ) : (
//                           <span className="badge bg-secondary">{index + 1}</span>
//                         )}
//                       </div>
//                       <small>{s.title}</small>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Step content */}
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={step}
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     {steps[step].fields}
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Navigation Buttons */}
//                 <div className="d-flex justify-content-between mt-4">
//                   {step > 0 && (
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary hover-scale"
//                       onClick={handleBack}
//                     >
//                       <ArrowLeftCircle size={18} className="me-1" /> Back
//                     </button>
//                   )}
//                   <div className="ms-auto">
//                     {step < steps.length - 1 ? (
//                       <button type="submit" className="btn btn-primary hover-scale">
//                         Next <ArrowRightCircle size={18} className="ms-1" />
//                       </button>
//                     ) : (
//                       <button
//                         type="submit"
//                         className="btn btn-success hover-scale"
//                         disabled={isSubmitting}
//                       >
//                         Submit
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         )}
//       </div>

//       <style>{`
//         .hover-scale:hover {
//           transform: scale(1.03);
//           transition: transform 0.2s ease-in-out;
//         }
//         .step-hover:hover {
//           cursor: pointer;
//           color: #0d6efd !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default EducationWizard;















import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { CheckCircle, ArrowRightCircle, ArrowLeftCircle, Edit2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://localhost:5000/api/education";

const validationSchemas = [
  Yup.object().shape({
    tenthScore: Yup.string().required("Required"),
    tenthYear: Yup.string().required("Required"),
  }),
  Yup.object().shape({
    twelfthScore: Yup.string().required("Required"),
    twelfthYear: Yup.string().required("Required"),
  }),
  Yup.object().shape({
    gradDegree: Yup.string().required("Required"),
    gradInstitute: Yup.string().required("Required"),
    gradScore: Yup.string().required("Required"),
    gradStartYear: Yup.string().required("Required"),
    gradEndYear: Yup.string().required("Required"),
  }),
  Yup.object().shape({
    postGradDegree: Yup.string(),
    postGradInstitute: Yup.string(),
    postGradScore: Yup.string(),
    postGradStartYear: Yup.string(),
    postGradEndYear: Yup.string(),
  }),
];

const initialValues = {
  tenthScore: "",
  tenthYear: "",
  twelfthScore: "",
  twelfthYear: "",
  gradDegree: "",
  gradInstitute: "",
  gradScore: "",
  gradStartYear: "",
  gradEndYear: "",
  postGradDegree: "",
  postGradInstitute: "",
  postGradScore: "",
  postGradStartYear: "",
  postGradEndYear: "",
};

const EducationWizard = () => {
  const [step, setStep] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch existing education data
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${userId}`);
        if (res.data) {
          const data = res.data;
          const formValues = {
            tenthScore: data.secondary.tenth.score || "",
            tenthYear: data.secondary.tenth.year || "",
            twelfthScore: data.secondary.twelfth.score || "",
            twelfthYear: data.secondary.twelfth.year || "",
            gradDegree: data.graduation.degree || "",
            gradInstitute: data.graduation.institute || "",
            gradScore: data.graduation.score || "",
            gradStartYear: data.graduation.startYear || "",
            gradEndYear: data.graduation.endYear || "",
            postGradDegree: data.postGraduation.degree || "",
            postGradInstitute: data.postGraduation.institute || "",
            postGradScore: data.postGraduation.score || "",
            postGradStartYear: data.postGraduation.startYear || "",
            postGradEndYear: data.postGraduation.endYear || "",
          };
          setSubmittedData(formValues);
        }
      } catch (err) {
        console.log("No existing education found.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [userId]);

  const handleSubmit = async (values, actions) => {
    try {
      if (submittedData) {
        await axios.put(`${API_BASE}/${userId}`, values);
      } else {
        await axios.post(API_BASE, { userId, ...values });
      }
      setSubmittedData(values);
      setEditMode(false);
      toast.success("Education info saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed!");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const steps = [
    {
      title: "10th Details",
      fields: (
        <>
          <div className="mb-3">
            <label className="form-label fw-semibold">10th Score</label>
            <Field name="tenthScore" className="form-control shadow-sm" />
            <ErrorMessage name="tenthScore" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">10th Passing Year</label>
            <Field name="tenthYear" className="form-control shadow-sm" />
            <ErrorMessage name="tenthYear" component="div" className="text-danger" />
          </div>
        </>
      ),
    },
    {
      title: "12th Details",
      fields: (
        <>
          <div className="mb-3">
            <label className="form-label fw-semibold">12th Score</label>
            <Field name="twelfthScore" className="form-control shadow-sm" />
            <ErrorMessage name="twelfthScore" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">12th Passing Year</label>
            <Field name="twelfthYear" className="form-control shadow-sm" />
            <ErrorMessage name="twelfthYear" component="div" className="text-danger" />
          </div>
        </>
      ),
    },
    {
      title: "Graduation",
      fields: (
        <>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Graduation Degree</label>
              <Field name="gradDegree" className="form-control shadow-sm" />
              <ErrorMessage name="gradDegree" component="div" className="text-danger" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Graduation Institute</label>
              <Field name="gradInstitute" className="form-control shadow-sm" />
              <ErrorMessage name="gradInstitute" component="div" className="text-danger" />
            </div>
          </div>
          <div className="row g-3 mt-2">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Score</label>
              <Field name="gradScore" className="form-control shadow-sm" />
              <ErrorMessage name="gradScore" component="div" className="text-danger" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Start Year</label>
              <Field name="gradStartYear" className="form-control shadow-sm" />
              <ErrorMessage name="gradStartYear" component="div" className="text-danger" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">End Year</label>
              <Field name="gradEndYear" className="form-control shadow-sm" />
              <ErrorMessage name="gradEndYear" component="div" className="text-danger" />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Post Graduation (Optional)",
      fields: (
        <>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Post Grad Degree</label>
              <Field name="postGradDegree" className="form-control shadow-sm" />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Institute</label>
              <Field name="postGradInstitute" className="form-control shadow-sm" />
            </div>
          </div>
          <div className="row g-3 mt-2">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Score</label>
              <Field name="postGradScore" className="form-control shadow-sm" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Start Year</label>
              <Field name="postGradStartYear" className="form-control shadow-sm" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">End Year</label>
              <Field name="postGradEndYear" className="form-control shadow-sm" />
            </div>
          </div>
        </>
      ),
    },
  ];

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="card shadow-lg p-4 rounded-4 border-0">
        {submittedData && !editMode ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="row g-4">
            <div className="d-flex justify-content-between mb-3">
              <h4 className="text-primary fw-bold">Your Education Details</h4>
              <button
                className="btn btn-outline-primary"
                onClick={() => setEditMode(true)}
              >
                <Edit2 size={16} className="me-1" /> Edit
              </button>
            </div>

            {["10th", "12th", "Graduation", "Post Graduation"].map((level, idx) => {
              const prefix = level.toLowerCase().replace(" ", "");
              const data = {};
              switch (prefix) {
                case "10th":
                  data.Score = submittedData.tenthScore;
                  data.Year = submittedData.tenthYear;
                  break;
                case "12th":
                  data.Score = submittedData.twelfthScore;
                  data.Year = submittedData.twelfthYear;
                  break;
                case "graduation":
                  data.Degree = submittedData.gradDegree;
                  data.Institute = submittedData.gradInstitute;
                  data.Score = submittedData.gradScore;
                  data.StartYear = submittedData.gradStartYear;
                  data.EndYear = submittedData.gradEndYear;
                  break;
                case "postgraduation":
                  data.Degree = submittedData.postGradDegree || "N/A";
                  data.Institute = submittedData.postGradInstitute || "N/A";
                  data.Score = submittedData.postGradScore || "N/A";
                  data.StartYear = submittedData.postGradStartYear || "N/A";
                  data.EndYear = submittedData.postGradEndYear || "N/A";
                  break;
                default:
                  break;
              }

              return (
                <div className="col-md-6 mb-4" key={idx}>
                  <div
                    className="card border-0 shadow-lg rounded-4 p-4 h-100 hover-scale"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 30px rgba(0, 0, 0, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 15px rgba(0, 0, 0, 0.2)";
                    }}
                  >
                    <h5 className="text-info fw-bold text-uppercase mb-3">
                      <i className="bi bi-diagram-3 me-2"></i> {level}
                    </h5>
                    <ul className="list-unstyled mb-0">
                      {Object.entries(data).map(([key, value], i) => (
                        <li
                          key={i}
                          className="d-flex align-items-center justify-content-between mb-2"
                        >
                          <span className="fw-semibold text-light">{key}</span>
                          <span className="badge rounded-pill bg-gradient text-dark px-3 py-2"
                            style={{
                              background:
                                "linear-gradient(135deg, #00c6ff, #0072ff)",
                              fontSize: "0.85rem",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            }}
                          >
                            {value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              );
            })}
          </motion.div>
        ) : (
          <Formik
            initialValues={submittedData || initialValues}
            validationSchema={validationSchemas[step]}
            onSubmit={async (values, actions) => {
              if (step < steps.length - 1) {
                setStep(step + 1);
                actions.setTouched({});
              } else {
                await handleSubmit(values, actions);
              }
            }}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Stepper */}
                <div className="d-flex justify-content-between mb-4 flex-wrap">
                  {steps.map((s, index) => (
                    <div
                      key={index}
                      className={`text-center flex-fill px-2 mb-2 ${index <= step ? "text-primary fw-bold" : "text-muted"
                        } step-hover`}
                      onClick={() => setStep(index)}
                    >
                      <div className="mb-1">
                        {index < step ? (
                          <CheckCircle size={20} className="text-success" />
                        ) : index === step ? (
                          <ArrowRightCircle size={20} />
                        ) : (
                          <span className="badge bg-secondary">{index + 1}</span>
                        )}
                      </div>
                      <small>{s.title}</small>
                    </div>
                  ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                  >
                    {steps[step].fields}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  {step > 0 && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary hover-scale"
                      onClick={() => setStep(step - 1)}
                    >
                      <ArrowLeftCircle size={18} className="me-1" /> Back
                    </button>
                  )}
                  <div className="ms-auto">
                    <button
                      type="submit"
                      className={`btn ${step === steps.length - 1 ? "btn-success" : "btn-primary"
                        } hover-scale`}
                      disabled={isSubmitting}
                    >
                      {step === steps.length - 1 ? "Submit" : "Next"}{" "}
                      {step === steps.length - 1 ? "" : <ArrowRightCircle size={18} className="ms-1" />}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>

      <style>{`
        .hover-scale:hover {
          transform: scale(1.03);
          transition: transform 0.2s ease-in-out;
        }
        .step-hover:hover {
          cursor: pointer;
          color: #0d6efd !important;
        }
      `}</style>
    </div>
  );
};

export default EducationWizard;






























// 2 option
// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { CheckCircle, ArrowRightCircle, ArrowLeftCircle, Edit3 } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API_BASE = "http://localhost:5000/api/education";

// const validationSchemas = [
//   Yup.object().shape({
//     tenthScore: Yup.string().required("Required"),
//     tenthYear: Yup.string().required("Required"),
//   }),
//   Yup.object().shape({
//     twelfthScore: Yup.string().required("Required"),
//     twelfthYear: Yup.string().required("Required"),
//   }),
//   Yup.object().shape({
//     gradDegree: Yup.string().required("Required"),
//     gradInstitute: Yup.string().required("Required"),
//     gradScore: Yup.string().required("Required"),
//     gradStartYear: Yup.string().required("Required"),
//     gradEndYear: Yup.string().required("Required"),
//   }),
//   Yup.object().shape({
//     postGradDegree: Yup.string(),
//     postGradInstitute: Yup.string(),
//     postGradScore: Yup.string(),
//     postGradStartYear: Yup.string(),
//     postGradEndYear: Yup.string(),
//   }),
// ];

// const initialValues = {
//   tenthScore: "",
//   tenthYear: "",
//   twelfthScore: "",
//   twelfthYear: "",
//   gradDegree: "",
//   gradInstitute: "",
//   gradScore: "",
//   gradStartYear: "",
//   gradEndYear: "",
//   postGradDegree: "",
//   postGradInstitute: "",
//   postGradScore: "",
//   postGradStartYear: "",
//   postGradEndYear: "",
// };

// const EducationWizard = () => {
//   const [step, setStep] = useState(0);
//   const [educationData, setEducationData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const userId = localStorage.getItem("userId");

//   // Fetch existing education on mount
//   useEffect(() => {
//     const fetchEducation = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE}/${userId}`);
//         setEducationData(res.data);
//       } catch (err) {
//         if (err.response?.status !== 404) {
//           toast.error("Failed to fetch education data.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchEducation();
//   }, [userId]);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       if (educationData) {
//         // Update existing education
//         const res = await axios.put(`${API_BASE}/${userId}`, values);
//         toast.success("Education updated successfully!");
//         setEducationData(res.data);
//       } else {
//         // Create new education
//         const res = await axios.post(API_BASE, { userId, ...values });
//         toast.success("Education info submitted successfully!");
//         setEducationData(res.data);
//       }
//       setIsEditing(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Submission failed.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const steps = [
//     {
//       title: "10th Details",
//       fields: (
//         <>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">10th Score</label>
//             <Field name="tenthScore" className="form-control shadow-sm" />
//             <ErrorMessage name="tenthScore" component="div" className="text-danger" />
//           </div>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">10th Passing Year</label>
//             <Field name="tenthYear" className="form-control shadow-sm" />
//             <ErrorMessage name="tenthYear" component="div" className="text-danger" />
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "12th Details",
//       fields: (
//         <>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">12th Score</label>
//             <Field name="twelfthScore" className="form-control shadow-sm" />
//             <ErrorMessage name="twelfthScore" component="div" className="text-danger" />
//           </div>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">12th Passing Year</label>
//             <Field name="twelfthYear" className="form-control shadow-sm" />
//             <ErrorMessage name="twelfthYear" component="div" className="text-danger" />
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "Graduation",
//       fields: (
//         <>
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Graduation Degree</label>
//               <Field name="gradDegree" className="form-control shadow-sm" />
//               <ErrorMessage name="gradDegree" component="div" className="text-danger" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Graduation Institute</label>
//               <Field name="gradInstitute" className="form-control shadow-sm" />
//               <ErrorMessage name="gradInstitute" component="div" className="text-danger" />
//             </div>
//           </div>
//           <div className="row g-3 mt-2">
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">Score</label>
//               <Field name="gradScore" className="form-control shadow-sm" />
//               <ErrorMessage name="gradScore" component="div" className="text-danger" />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">Start Year</label>
//               <Field name="gradStartYear" className="form-control shadow-sm" />
//               <ErrorMessage name="gradStartYear" component="div" className="text-danger" />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">End Year</label>
//               <Field name="gradEndYear" className="form-control shadow-sm" />
//               <ErrorMessage name="gradEndYear" component="div" className="text-danger" />
//             </div>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "Post Graduation (Optional)",
//       fields: (
//         <>
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Post Grad Degree</label>
//               <Field name="postGradDegree" className="form-control shadow-sm" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label fw-semibold">Institute</label>
//               <Field name="postGradInstitute" className="form-control shadow-sm" />
//             </div>
//           </div>
//           <div className="row g-3 mt-2">
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">Score</label>
//               <Field name="postGradScore" className="form-control shadow-sm" />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">Start Year</label>
//               <Field name="postGradStartYear" className="form-control shadow-sm" />
//             </div>
//             <div className="col-md-4">
//               <label className="form-label fw-semibold">End Year</label>
//               <Field name="postGradEndYear" className="form-control shadow-sm" />
//             </div>
//           </div>
//         </>
//       ),
//     },
//   ];

//   if (loading) {
//     return <div className="text-center my-5">Loading...</div>;
//   }

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <div className="card shadow-lg p-4 rounded-4 border-0">
//         {educationData && !isEditing ? (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="row g-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h4 className="text-primary fw-bold">Your Education Details</h4>
//               <button
//                 className="btn btn-outline-primary btn-sm"
//                 onClick={() => setIsEditing(true)}
//               >
//                 <Edit3 size={16} className="me-1" /> Edit
//               </button>
//             </div>

//             {["10th", "12th", "Graduation", "Post Graduation"].map((level, idx) => {
//               const data = {};
//               switch (level) {
//                 case "10th":
//                   data.Score = educationData.secondary?.tenth?.score;
//                   data.Year = educationData.secondary?.tenth?.year;
//                   break;
//                 case "12th":
//                   data.Score = educationData.secondary?.twelfth?.score;
//                   data.Year = educationData.secondary?.twelfth?.year;
//                   break;
//                 case "Graduation":
//                   Object.assign(data, educationData.graduation);
//                   break;
//                 case "Post Graduation":
//                   Object.assign(data, educationData.postGraduation);
//                   break;
//                 default:
//                   break;
//               }
//               return (
//                 <div className="col-md-6" key={idx}>
//                   <div className="card shadow-sm rounded-3 p-3 h-100">
//                     <h5 className="text-primary fw-bold">{level}</h5>
//                     <ul className="list-unstyled mt-2 mb-0">
//                       {Object.entries(data).map(([key, value], i) => (
//                         <li key={i}>
//                           <span className="fw-semibold">{key}:</span>{" "}
//                           <span className="badge bg-info text-dark ms-2">
//                             {value || "N/A"}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               );
//             })}
//           </motion.div>
//         ) : (
//           <Formik
//             initialValues={
//               educationData
//                 ? {
//                     tenthScore: educationData.secondary?.tenth?.score || "",
//                     tenthYear: educationData.secondary?.tenth?.year || "",
//                     twelfthScore: educationData.secondary?.twelfth?.score || "",
//                     twelfthYear: educationData.secondary?.twelfth?.year || "",
//                     gradDegree: educationData.graduation?.degree || "",
//                     gradInstitute: educationData.graduation?.institute || "",
//                     gradScore: educationData.graduation?.score || "",
//                     gradStartYear: educationData.graduation?.startYear || "",
//                     gradEndYear: educationData.graduation?.endYear || "",
//                     postGradDegree: educationData.postGraduation?.degree || "",
//                     postGradInstitute: educationData.postGraduation?.institute || "",
//                     postGradScore: educationData.postGraduation?.score || "",
//                     postGradStartYear: educationData.postGraduation?.startYear || "",
//                     postGradEndYear: educationData.postGraduation?.endYear || "",
//                   }
//                 : initialValues
//             }
//             validationSchema={validationSchemas[step]}
//             onSubmit={step === steps.length - 1 ? handleSubmit : () => setStep(step + 1)}
//           >
//             {({ isSubmitting, handleSubmit }) => (
//               <Form onSubmit={handleSubmit}>
//                 {/* Stepper */}
//                 <div className="d-flex justify-content-between mb-4 flex-wrap">
//                   {steps.map((s, index) => (
//                     <div
//                       key={index}
//                       className={`text-center flex-fill px-2 mb-2 ${
//                         index <= step ? "text-primary fw-bold" : "text-muted"
//                       } step-hover`}
//                       onClick={() => setStep(index)}
//                     >
//                       <div className="mb-1">
//                         {index < step ? (
//                           <CheckCircle size={20} className="text-success" />
//                         ) : index === step ? (
//                           <ArrowRightCircle size={20} />
//                         ) : (
//                           <span className="badge bg-secondary">{index + 1}</span>
//                         )}
//                       </div>
//                       <small>{s.title}</small>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Step Content */}
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={step}
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     {steps[step].fields}
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Navigation */}
//                 <div className="d-flex justify-content-between mt-4">
//                   {step > 0 && (
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       onClick={() => setStep(step - 1)}
//                     >
//                       <ArrowLeftCircle size={18} className="me-1" /> Back
//                     </button>
//                   )}
//                   <div className="ms-auto">
//                     {step < steps.length - 1 ? (
//                       <button type="submit" className="btn btn-primary">
//                         Next <ArrowRightCircle size={18} className="ms-1" />
//                       </button>
//                     ) : (
//                       <button
//                         type="submit"
//                         className="btn btn-success"
//                         disabled={isSubmitting}
//                       >
//                         {educationData ? "Update" : "Submit"}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         )}
//       </div>

//       <style>{`
//         .step-hover:hover {
//           cursor: pointer;
//           color: #0d6efd !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default EducationWizard;

