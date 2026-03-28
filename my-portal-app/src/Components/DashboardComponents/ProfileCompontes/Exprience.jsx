// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   // FaPlusCircle, 
//   FaTrashAlt,
//   // FaSave, 
//   FaBriefcase } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./WorkExperience.css";

// const experienceSchema = Yup.object().shape({
//   workExperiences: Yup.array().of(
//     Yup.object().shape({
//       role: Yup.string().required("Role is required"),
//       company: Yup.string().required("Company is required"),
//       startDate: Yup.string().required("Start date is required"),
//       endDate: Yup.string().required("End date is required"),
//       description: Yup.string(),
//     })
//   ),
// });

// const WorkExperience = () => {
//   const userId = localStorage.getItem("userId");
//   const [initialValues, setInitialValues] = useState({
//     userId,
//     workExperiences: [
//       {
//         role: "",
//         company: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//       },
//     ],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/work/${userId}`);
//         if (res.data.length) {
//           setInitialValues({
//             userId,
//             workExperiences: res.data,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching work experience:", err);
//       }
//     };

//     if (userId) fetchData();
//   }, [userId]);

// return (
//   <>
//     <ToastContainer position="top-right" theme="colored" />
//     <Formik
//       enableReinitialize
//       initialValues={initialValues}
//       validationSchema={experienceSchema}
//       onSubmit={async (values, { setSubmitting }) => {
//         try {
//           await axios.post("http://localhost:5000/api/work", values);
//           toast.success("✅ Work experience saved successfully!");
//         } catch (err) {
//           console.error("Error submitting work:", err);
//           toast.error("❌ Error saving data");
//         } finally {
//           setSubmitting(false);
//         }
//       }}
//     >
//       {({ values }) => (
//         <Form className="container my-5 px-1 px-md-5">
//           <FieldArray name="workExperiences">
//             {({ remove, push }) => (
//               <>
//                 <AnimatePresence>
//                   {values.workExperiences.map((_, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -30 }}
//                       transition={{ duration: 0.3 }}
//                       className="card mb-4 shadow-lg border-0 rounded-4 position-relative overflow-hidden"
//                       style={{
//                         background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
//                       }}
//                     >
//                       <div className="card-body p-3">
//                         <h5 className="fw-lighter text-black mb-3">
//                           <FaBriefcase className="me-2 text-black" />
//                           Experience {index + 1}
//                         </h5>

//                         <div className="row gy-3">
//                           <div className="col-md-6">
//                             <div className="form-floating">
//                               <Field
//                                 name={`workExperiences[${index}].role`}
//                                 className="form-control"
//                                 placeholder="Role"
//                               />
//                               <label>Role</label>
//                             </div>
//                             <ErrorMessage
//                               name={`workExperiences[${index}].role`}
//                               component="div"
//                               className="text-danger small"
//                             />
//                           </div>

//                           <div className="col-md-6">
//                             <div className="form-floating">
//                               <Field
//                                 name={`workExperiences[${index}].company`}
//                                 className="form-control"
//                                 placeholder="Company"
//                               />
//                               <label>Company</label>
//                             </div>
//                             <ErrorMessage
//                               name={`workExperiences[${index}].company`}
//                               component="div"
//                               className="text-danger small"
//                             />
//                           </div>

//                           <div className="col-md-6">
//                             <label className="form-label fw-semibold small text-muted">
//                               Start Date
//                             </label>
//                             <Field
//                               type="date"
//                               name={`workExperiences[${index}].startDate`}
//                               className="form-control"
//                             />
//                             <ErrorMessage
//                               name={`workExperiences[${index}].startDate`}
//                               component="div"
//                               className="text-danger small"
//                             />
//                           </div>

//                           <div className="col-md-6">
//                             <label className="form-label fw-semibold small text-muted">
//                               End Date
//                             </label>
//                             <Field
//                               type="date"
//                               name={`workExperiences[${index}].endDate`}
//                               className="form-control"
//                             />
//                             <ErrorMessage
//                               name={`workExperiences[${index}].endDate`}
//                               component="div"
//                               className="text-danger small"
//                             />
//                           </div>

//                           <div className="col-12">
//                             <div className="form-floating">
//                               <Field
//                                 as="textarea"
//                                 name={`workExperiences[${index}].description`}
//                                 className="form-control"
//                                 rows={3}
//                                 placeholder="Description"
//                               />
//                               <label>Description</label>
//                             </div>
//                           </div>

//                           <div className="col-12 text-end">
//                             {index > 0 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-danger rounded-pill px-3"
//                                 onClick={() => remove(index)}
//                               >
//                                 <FaTrashAlt className="me-1" />
//                                 Remove
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>

//                 {/* 🔄 Combined Buttons Row (Left: Add, Right: Save) */}
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <button
//                     type="button"
//                     className="btn btn-info rounded-pill px-4 py-2 fw-semibold text-black"
//                     onClick={() =>
//                       push({
//                         role: "",
//                         company: "",
//                         startDate: "",
//                         endDate: "",
//                         description: "",
//                       })
//                     }
//                   >
//                     {/* <FaPlusCircle className="me-2" /> */}
//                     Add Work Experience
//                   </button>

//                   <button
//                     type="submit"
//                     className="btn btn-success rounded-pill px-4 py-2 shadow"
//                   >
//                     {/* <FaSave className="me-2" /> */}
//                     Save Experience
//                   </button>
//                 </div>
//               </>
//             )}
//           </FieldArray>
//         </Form>
//       )}
//     </Formik>
//   </>
// );

// };

// export default WorkExperience;











// 2 option
// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaTrashAlt, FaBriefcase, FaEdit } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const experienceSchema = Yup.object().shape({
//   workExperiences: Yup.array().of(
//     Yup.object().shape({
//       role: Yup.string().required("Role is required"),
//       company: Yup.string().required("Company is required"),
//       startDate: Yup.string().required("Start date is required"),
//       endDate: Yup.string().required("End date is required"),
//       description: Yup.string(),
//     })
//   ),
// });

// const API_BASE = "http://localhost:5000/api/work";

// const WorkExperience = () => {
//   const userId = localStorage.getItem("userId");

//   const [initialValues, setInitialValues] = useState({
//     userId,
//     workExperiences: [
//       {
//         role: "",
//         company: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//       },
//     ],
//   });

//   const [submittedData, setSubmittedData] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);

//   // Fetch existing work experience
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/${userId}`);
//         if (res.data && res.data.length) {
//           setSubmittedData(res.data);
//         }
//       } catch (err) {
//         console.error("Error fetching work experience:", err);
//       }
//     };

//     if (userId) fetchData();
//   }, [userId]);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       if (submittedData.length) {
//         await axios.put(`${API_BASE}/${userId}`, values);
//       } else {
//         await axios.post(API_BASE, values);
//       }

//       setSubmittedData(values.workExperiences);
//       setEditIndex(null);
//       toast.success("✅ Work experience saved successfully!");
//     } catch (err) {
//       console.error("Error submitting work experience:", err);
//       toast.error("❌ Error saving data");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="container my-5">
//       <ToastContainer position="top-right" theme="colored" />

//       {submittedData.length && editIndex === null ? (
//         // Display saved experiences as cards
//         <div className="row g-4">
//           {submittedData.map((exp, index) => (
//             <div className="col-md-6" key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="card shadow-sm p-3 rounded-4 position-relative hover-scale"
//               >
//                 <h5 className="fw-bold text-primary">
//                   <FaBriefcase className="me-2" />
//                   {exp.role} @ {exp.company}
//                 </h5>
//                 <p className="text-muted mb-1">
//                   {exp.startDate} - {exp.endDate}
//                 </p>
//                 {exp.description && <p>{exp.description}</p>}

//                 <button
//                   className="btn btn-sm btn-outline-primary mt-2"
//                   onClick={() => setEditIndex(index)}
//                 >
//                   <FaEdit className="me-1" />
//                   Edit
//                 </button>
//               </motion.div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         // Render form for new or editing
//         <Formik
//           enableReinitialize
//           initialValues={{
//             userId,
//             workExperiences:
//               editIndex !== null
//                 ? [submittedData[editIndex]]
//                 : [
//                     {
//                       role: "",
//                       company: "",
//                       startDate: "",
//                       endDate: "",
//                       description: "",
//                     },
//                   ],
//           }}
//           validationSchema={experienceSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values }) => (
//             <Form className="container my-3">
//               <FieldArray name="workExperiences">
//                 {({ remove, push }) => (
//                   <>
//                     <AnimatePresence>
//                       {values.workExperiences.map((_, index) => (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0, y: 30 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -30 }}
//                           transition={{ duration: 0.3 }}
//                           className="card mb-4 shadow-lg border-0 rounded-4 p-3 hover-scale"
//                         >
//                           <div className="row gy-3">
//                             <div className="col-md-6">
//                               <div className="form-floating">
//                                 <Field
//                                   name={`workExperiences[${index}].role`}
//                                   className="form-control"
//                                   placeholder="Role"
//                                 />
//                                 <label>Role</label>
//                               </div>
//                               <ErrorMessage
//                                 name={`workExperiences[${index}].role`}
//                                 component="div"
//                                 className="text-danger small"
//                               />
//                             </div>

//                             <div className="col-md-6">
//                               <div className="form-floating">
//                                 <Field
//                                   name={`workExperiences[${index}].company`}
//                                   className="form-control"
//                                   placeholder="Company"
//                                 />
//                                 <label>Company</label>
//                               </div>
//                               <ErrorMessage
//                                 name={`workExperiences[${index}].company`}
//                                 component="div"
//                                 className="text-danger small"
//                               />
//                             </div>

//                             <div className="col-md-6">
//                               <label className="form-label fw-semibold small text-muted">
//                                 Start Date
//                               </label>
//                               <Field
//                                 type="date"
//                                 name={`workExperiences[${index}].startDate`}
//                                 className="form-control"
//                               />
//                               <ErrorMessage
//                                 name={`workExperiences[${index}].startDate`}
//                                 component="div"
//                                 className="text-danger small"
//                               />
//                             </div>

//                             <div className="col-md-6">
//                               <label className="form-label fw-semibold small text-muted">
//                                 End Date
//                               </label>
//                               <Field
//                                 type="date"
//                                 name={`workExperiences[${index}].endDate`}
//                                 className="form-control"
//                               />
//                               <ErrorMessage
//                                 name={`workExperiences[${index}].endDate`}
//                                 component="div"
//                                 className="text-danger small"
//                               />
//                             </div>

//                             <div className="col-12">
//                               <div className="form-floating">
//                                 <Field
//                                   as="textarea"
//                                   name={`workExperiences[${index}].description`}
//                                   className="form-control"
//                                   rows={3}
//                                   placeholder="Description"
//                                 />
//                                 <label>Description</label>
//                               </div>
//                             </div>

//                             <div className="col-12 text-end">
//                               {index > 0 && (
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm btn-outline-danger rounded-pill px-3"
//                                   onClick={() => remove(index)}
//                                 >
//                                   <FaTrashAlt className="me-1" />
//                                   Remove
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>

//                     <div className="d-flex justify-content-between mb-4">
//                       <button
//                         type="button"
//                         className="btn btn-info rounded-pill px-4 py-2 fw-semibold text-black"
//                         onClick={() =>
//                           push({
//                             role: "",
//                             company: "",
//                             startDate: "",
//                             endDate: "",
//                             description: "",
//                           })
//                         }
//                       >
//                         Add Work Experience
//                       </button>

//                       <button
//                         type="submit"
//                         className="btn btn-success rounded-pill px-4 py-2 shadow"
//                       >
//                         Save Experience
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </FieldArray>
//             </Form>
//           )}
//         </Formik>
//       )}

//       <style>{`
//         .hover-scale:hover {
//           transform: scale(1.03);
//           transition: transform 0.2s ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WorkExperience;



import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaBriefcase, FaEdit, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WorkExperience.css";

const experienceSchema = Yup.object().shape({
  workExperiences: Yup.array().of(
    Yup.object().shape({
      role: Yup.string().required("Role is required"),
      company: Yup.string().required("Company is required"),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().required("End date is required"),
      description: Yup.string(),
    })
  ),
});

const WorkExperience = () => {
  const userId = localStorage.getItem("userId");
  const [initialValues, setInitialValues] = useState({
    workExperiences: [{ role: "", company: "", startDate: "", endDate: "", description: "" }],
  });

  const [viewMode, setViewMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Fetch work data
  const fetchWork = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/work/${userId}`);
      if (res.data.length) {
        setInitialValues({ workExperiences: res.data });
        setViewMode(true);
      }
    } catch (err) {
      console.error("Error fetching work experience:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchWork();
  }, [userId, fetchWork]);

  // Handle delete
  const handleDelete = async () => {
    try {
      const newExperiences = [...initialValues.workExperiences];
      newExperiences.splice(deleteIndex, 1); // remove from array
      await axios.post("http://localhost:5000/api/work", {
        userId,
        workExperiences: newExperiences,
      });
      toast.success("🗑 Work experience deleted");
      setInitialValues({ workExperiences: newExperiences });
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting work experience:", err);
      toast.error("❌ Could not delete experience");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      {/* VIEW MODE */}
      {viewMode && (
        <div className="container my-5">
          <h3 className="fw-bold mb-4">Work Experience</h3>
          <div className="row g-4">
            {initialValues.workExperiences.map((exp, i) => (
              <motion.div
                key={i}
                className="col-md-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="card shadow-lg border-0 rounded-4 p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="fw-bold text-dark mb-1">
                        <FaBriefcase className="me-2" />
                        {exp.role} @ {exp.company}
                      </h5>
                      <p className="text-muted small mb-1">
                        {exp.startDate} - {exp.endDate}
                      </p>
                      <p>{exp.description || "No description provided"}</p>
                    </div>

                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setViewMode(false);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setDeleteIndex(i);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Buttons to Edit or Add */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              className="btn btn-success rounded-pill"
              onClick={() => {
                setInitialValues((prev) => ({
                  workExperiences: [
                    ...prev.workExperiences,
                    { role: "", company: "", startDate: "", endDate: "", description: "" },
                  ],
                }));
                setViewMode(false);
              }}
            >
              <FaPlus className="me-2" /> Add Experience
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODE (FORM WIZARD STYLE) */}
      {!viewMode && (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={experienceSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (!userId) return toast.error("User not logged in!");
            try {
              await axios.post("http://localhost:5000/api/work", {
                userId,
                workExperiences: values.workExperiences,
              });
              toast.success("✅ Work experience saved successfully!");
              fetchWork();
            } catch (err) {
              console.error("Error submitting work experience:", err.response || err);
              toast.error("❌ Error saving data");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values }) => (
            <Form className="container my-5 px-1 px-md-5">
              <FieldArray name="workExperiences">
                {({ remove, push }) => (
                  <>
                    <AnimatePresence>
                      {values.workExperiences.map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.3 }}
                          className="card mb-4 shadow-lg border-0 rounded-4 p-3"
                        >
                          <h5 className="fw-lighter text-black mb-3">
                            Step {index + 1}: Work Experience
                          </h5>

                          {/* Fields */}
                          <div className="form-floating mb-3">
                            <Field
                              name={`workExperiences[${index}].role`}
                              className="form-control"
                              placeholder="Role"
                            />
                            <label>Role</label>
                            <ErrorMessage
                              name={`workExperiences[${index}].role`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>

                          <div className="form-floating mb-3">
                            <Field
                              name={`workExperiences[${index}].company`}
                              className="form-control"
                              placeholder="Company"
                            />
                            <label>Company</label>
                            <ErrorMessage
                              name={`workExperiences[${index}].company`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Start Date</label>
                              <Field
                                type="date"
                                name={`workExperiences[${index}].startDate`}
                                className="form-control"
                              />
                              <ErrorMessage
                                name={`workExperiences[${index}].startDate`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">End Date</label>
                              <Field
                                type="date"
                                name={`workExperiences[${index}].endDate`}
                                className="form-control"
                              />
                              <ErrorMessage
                                name={`workExperiences[${index}].endDate`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          <div className="form-floating mb-3">
                            <Field
                              as="textarea"
                              name={`workExperiences[${index}].description`}
                              className="form-control"
                              placeholder="Description"
                              rows={3}
                            />
                            <label>Description</label>
                          </div>

                          <div className="text-end">
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger rounded-pill"
                                onClick={() => remove(index)}
                              >
                                Remove Step
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-info rounded-pill"
                        onClick={() =>
                          push({ role: "", company: "", startDate: "", endDate: "", description: "" })
                        }
                      >
                        Add Step
                      </button>
                      <button type="submit" className="btn btn-success rounded-pill px-4">
                        Save Experience
                      </button>
                    </div>
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <h5 className="mb-3">Are you sure?</h5>
              <p className="text-muted">This action will delete this work experience permanently.</p>
              <div className="d-flex justify-content-end gap-3">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkExperience;


