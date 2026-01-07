// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { motion } from "framer-motion";

// const experienceSchema = Yup.object().shape({
//   internshipExperiences: Yup.array().of(
//     Yup.object().shape({
//       role: Yup.string().required("Role is required"),
//       company: Yup.string().required("Company is required"),
//       startDate: Yup.string().required("Start date is required"),
//       endDate: Yup.string().required("End date is required"),
//       description: Yup.string(),
//     })
//   ),
// });

// const InternshipExperience = () => {
//   const userId = localStorage.getItem("userId");
//   const [initialValues, setInitialValues] = useState({
//     userId,
//     internshipExperiences: [
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
//         const res = await axios.get(`http://localhost:5000/api/internships/${userId}`);
//         if (res.data.length) {
//           setInitialValues({
//             userId,
//             internshipExperiences: res.data,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching internship data:", err);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   return (
//     <Formik
//       enableReinitialize
//       initialValues={initialValues}
//       validationSchema={experienceSchema}
//       onSubmit={async (values, { setSubmitting }) => {
//         try {
//           await axios.post("http://localhost:5000/api/internships", values);
//           alert("✅ Internship experience saved successfully!");
//         } catch (err) {
//           console.error("Error submitting internship:", err);
//           alert("❌ Error saving data");
//         } finally {
//           setSubmitting(false);
//         }
//       }}
//     >
//       {({ values }) => (
//         <Form className="container my-3">
//           <FieldArray name="internshipExperiences">
//             {({ remove, push }) => (
//               <>
//                 {values.internshipExperiences.map((_, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 40 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     className="card border-0 rounded-4 p-4 mb-4 shadow-sm"
//                     style={{
//                       backgroundColor: "#ffffff", // ✅ White card for modern feel
//                       boxShadow: "0 4px 14px rgba(0,0,0,0.08)", // ✅ Softer shadow
//                       transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)")}
//                     onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.08)")}
//                   >
//                     <div className="row gy-3">
//                       {/* Role */}
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">Role</label>
//                         <Field
//                           name={`internshipExperiences[${index}].role`}
//                           className="form-control"
//                           placeholder="e.g., Intern - UI/UX"
//                         />
//                         <ErrorMessage
//                           name={`internshipExperiences[${index}].role`}
//                           component="div"
//                           className="text-danger small"
//                         />
//                       </div>

//                       {/* Company */}
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">Company</label>
//                         <Field
//                           name={`internshipExperiences[${index}].company`}
//                           className="form-control"
//                           placeholder="e.g., Infosys"
//                         />
//                         <ErrorMessage
//                           name={`internshipExperiences[${index}].company`}
//                           component="div"
//                           className="text-danger small"
//                         />
//                       </div>

//                       {/* Dates */}
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">Start Date</label>
//                         <Field type="date" name={`internshipExperiences[${index}].startDate`} className="form-control" />
//                         <ErrorMessage
//                           name={`internshipExperiences[${index}].startDate`}
//                           component="div"
//                           className="text-danger small"
//                         />
//                       </div>

//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">End Date</label>
//                         <Field type="date" name={`internshipExperiences[${index}].endDate`} className="form-control" />
//                         <ErrorMessage
//                           name={`internshipExperiences[${index}].endDate`}
//                           component="div"
//                           className="text-danger small"
//                         />
//                       </div>

//                       {/* Description */}
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">Description</label>
//                         <Field
//                           as="textarea"
//                           name={`internshipExperiences[${index}].description`}
//                           className="form-control"
//                           rows={3}
//                           placeholder="Briefly describe your work..."
//                         />
//                       </div>

//                       {/* Remove Button */}
//                       <div className="text-end">
//                         {index > 0 && (
//                           <button
//                             type="button"
//                             className="btn btn-outline-danger rounded-pill btn-sm px-3"
//                             style={{
//                               transition: "all 0.2s ease-in-out",
//                             }}
//                             onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffe6e6")}
//                             onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
//                             onClick={() => remove(index)}
//                           >
//                              Remove
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}

//                 {/* Add Internship Button */}
//                 <div className="text-start mb-4">
//                   <button
//                     type="button"
//                     className="btn btn-info rounded-pill px-4 py-2 shadow-sm  fw-semibold"
//                     style={{
//                       fontWeight: "500",
//                       transition: "all 0.2s ease-in-out",
//                     }}
//                     onMouseEnter={(e) => (e.target.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.3)")}
//                     onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
//                     onClick={() =>
//                       push({ role: "", company: "", startDate: "", endDate: "", description: "" })
//                     }
//                   >
//                      Add Internship
//                   </button>
//                 </div>
//               </>
//             )}
//           </FieldArray>

//           {/* Save Button */}
//           <div className="text-end">
//             <button
//               type="submit"
//               className="btn btn-success rounded-pill px-4 py-2 shadow fw-semibold"
//               style={{
//                 fontWeight: "600",
//                 boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
//                 transition: "all 0.2s ease-in-out",
//               }}
//               onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
//               onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
//             >
//                Save Internships
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default InternshipExperience;



import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const experienceSchema = Yup.object().shape({
  internshipExperiences: Yup.array().of(
    Yup.object().shape({
      role: Yup.string().required("Role is required"),
      company: Yup.string().required("Company is required"),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().required("End date is required"),
      description: Yup.string(),
    })
  ),
});

const InternshipExperience = () => {
  const userId = localStorage.getItem("userId");
  const [initialValues, setInitialValues] = useState({
    userId,
    internshipExperiences: [
      { role: "", company: "", startDate: "", endDate: "", description: "" },
    ],
  });

  const [isEditing, setIsEditing] = useState(true); // ✅ default: show form until first save

  // Fetch internships
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/internships/${userId}`);
        if (res.data.length > 0) {
          setInitialValues({ userId, internshipExperiences: res.data });
          setIsEditing(false); // ✅ switch to view mode
        }
      } catch (err) {
        console.error("Error fetching internship data:", err);
      }
    };
    fetchData();
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/internships/${id}`);
      setInitialValues((prev) => ({
        ...prev,
        internshipExperiences: prev.internshipExperiences.filter((exp) => exp._id !== id),
      }));
      alert("✅ Internship deleted!");
    } catch (err) {
      console.error("Error deleting internship:", err);
      alert("❌ Failed to delete internship.");
    }
  };

  return (
    <div className="container my-3">
      {/* Toggle Buttons */}
      {!isEditing && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold">Internship Experience</h5>
          <div>
            <button
              className="btn btn-outline-primary rounded-pill me-2"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Internships
            </button>
            <button
              className="btn btn-outline-success rounded-pill"
              onClick={() => {
                setIsEditing(true);
                setInitialValues((prev) => ({
                  ...prev,
                  internshipExperiences: [
                    ...prev.internshipExperiences,
                    { role: "", company: "", startDate: "", endDate: "", description: "" },
                  ],
                }));
              }}
            >
              ➕ Add Internship
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isEditing ? (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={experienceSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.post("http://localhost:5000/api/internships", values);
                alert("✅ Internship experience saved successfully!");
                setIsEditing(false); // ✅ go back to view mode
              } catch (err) {
                console.error("Error submitting internship:", err);
                alert("❌ Error saving data");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values }) => (
              <Form>
                <FieldArray name="internshipExperiences">
                  {({ remove, push }) => (
                    <>
                      {values.internshipExperiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="card border-0 rounded-4 p-4 mb-4 shadow-sm"
                        >
                          <div className="row gy-3">
                            {/* Role */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Role</label>
                              <Field
                                name={`internshipExperiences[${index}].role`}
                                className="form-control"
                                placeholder="e.g., Intern - UI/UX"
                              />
                              <ErrorMessage
                                name={`internshipExperiences[${index}].role`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>

                            {/* Company */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Company</label>
                              <Field
                                name={`internshipExperiences[${index}].company`}
                                className="form-control"
                                placeholder="e.g., Infosys"
                              />
                              <ErrorMessage
                                name={`internshipExperiences[${index}].company`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>

                            {/* Dates */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Start Date</label>
                              <Field type="date" name={`internshipExperiences[${index}].startDate`} className="form-control" />
                              <ErrorMessage
                                name={`internshipExperiences[${index}].startDate`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label fw-semibold">End Date</label>
                              <Field type="date" name={`internshipExperiences[${index}].endDate`} className="form-control" />
                              <ErrorMessage
                                name={`internshipExperiences[${index}].endDate`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>

                            {/* Description */}
                            <div className="col-12">
                              <label className="form-label fw-semibold">Description</label>
                              <Field
                                as="textarea"
                                name={`internshipExperiences[${index}].description`}
                                className="form-control"
                                rows={3}
                                placeholder="Briefly describe your work..."
                              />
                            </div>

                            {/* Remove */}
                            <div className="text-end">
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm rounded-pill"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Add Internship Button */}
                      <div className="text-start mb-4">
                        <button
                          type="button"
                          className="btn btn-info rounded-pill px-4 py-2 shadow-sm"
                          onClick={() =>
                            push({ role: "", company: "", startDate: "", endDate: "", description: "" })
                          }
                        >
                          ➕ Add Internship
                        </button>
                      </div>
                    </>
                  )}
                </FieldArray>

                {/* Save Button */}
                <div className="text-end">
                  <button type="submit" className="btn btn-success rounded-pill px-4 py-2 shadow">
                    💾 Save Internships
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          // ✅ View mode
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="row g-3"
          >
            {initialValues.internshipExperiences.map((exp) => (
              <div className="col-12" key={exp._id || exp.company}>
                <div className="card shadow-sm border-0 rounded-4 p-3">
                  <h6 className="mb-1">{exp.role}</h6>
                  <p className="mb-1"><strong>Company:</strong> {exp.company}</p>
                  <p className="mb-1"><strong>Period:</strong> {exp.startDate} - {exp.endDate}</p>
                  {exp.description && <p className="small">{exp.description}</p>}
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill"
                    onClick={() => handleDelete(exp._id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternshipExperience;
