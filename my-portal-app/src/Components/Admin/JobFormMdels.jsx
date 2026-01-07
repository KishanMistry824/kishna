

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import "bootstrap/dist/css/bootstrap.min.css";

// const JobFormModal = ({ show, onClose, onSave, job }) => {
//   const initialValues = job || {
//     jobCode: "",
//     title: "",
//     company: { name: "" },
//     type: "Full-time",
//     locations: [{ city: "", state: "", country: "" }],
//     salary: { min: "", max: "", currency: "INR" },
//     description: "",
//     requirements: [""],
//     status: "active",
//     deadline: "",
//   };

//   const validationSchema = Yup.object({
//     jobCode: Yup.string().required("Job code is required"),
//     title: Yup.string().required("Title is required"),
//     company: Yup.object({
//       name: Yup.string().required("Company name is required"),
//     }),
//     locations: Yup.array().of(
//       Yup.object({
//         city: Yup.string().required("City is required"),
//         state: Yup.string().required("State is required"),
//         country: Yup.string().required("Country is required"),
//       })
//     ),
//     salary: Yup.object({
//       min: Yup.number().typeError("Must be a number").required("Min salary is required"),
//       max: Yup.number()
//         .typeError("Must be a number")
//         .min(Yup.ref("min"), "Max must be greater than min")
//         .required("Max salary is required"),
//       currency: Yup.string().required("Currency is required"),
//     }),
//     deadline: Yup.date().required("Deadline is required"),
//     description: Yup.string().required("Description is required"),
//     requirements: Yup.array().of(Yup.string().required("Requirement is required")),
//     status: Yup.string().required("Status is required"),
//   });

//   const handleSubmit = (values) => {
//     onSave(values);
//   };

//   return (
//     <div
//       className={`modal fade ${show ? "show d-block" : ""}`}
//       tabIndex="-1"
//       style={{ background: "rgba(0,0,0,0.4)" }}
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">
//         <div
//           className="modal-content border-0 shadow-lg"
//           style={{
//             borderRadius: "18px",
//             background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
//             color: "#333",
//           }}
//         >
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {() => (
//               <Form>
//                 {/* Gradient Header */}
//                 <div
//                   className="modal-header border-0"
//                   style={{
//                     background: "linear-gradient(90deg, #ff9966, #ff5e62)",
//                     color: "#fff",
//                     borderTopLeftRadius: "18px",
//                     borderTopRightRadius: "18px",
//                   }}
//                 >
//                   <h5 className="modal-title fw-bold">
//                     {job ? "Edit Job" : "Add Job"}
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={onClose}
//                   />
//                 </div>

//                 <div className="modal-body px-4">
//                   {/* Job Code */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Job Code</label>
//                     <Field
//                       type="text"
//                       name="jobCode"
//                       className="form-control modern-input"
//                       placeholder="Enter job code"
//                     />
//                     <ErrorMessage
//                       name="jobCode"
//                       component="div"
//                       className="text-danger small"
//                     />
//                   </div>

//                   {/* Title */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Title</label>
//                     <Field
//                       type="text"
//                       name="title"
//                       className="form-control modern-input"
//                       placeholder="Job title"
//                     />
//                     <ErrorMessage
//                       name="title"
//                       component="div"
//                       className="text-danger small"
//                     />
//                   </div>

//                   {/* Company */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Company</label>
//                     <Field
//                       type="text"
//                       name="company.name"
//                       className="form-control modern-input"
//                       placeholder="Company name"
//                     />
//                     <ErrorMessage
//                       name="company.name"
//                       component="div"
//                       className="text-danger small"
//                     />
//                   </div>

//                   {/* Location */}
//                   <div className="row mb-3">
//                     <div className="col">
//                       <label className="form-label">City</label>
//                       <Field
//                         type="text"
//                         name="locations[0].city"
//                         className="form-control modern-input"
//                       />
//                     </div>
//                     <div className="col">
//                       <label className="form-label">State</label>
//                       <Field
//                         type="text"
//                         name="locations[0].state"
//                         className="form-control modern-input"
//                       />
//                     </div>
//                     <div className="col">
//                       <label className="form-label">Country</label>
//                       <Field
//                         type="text"
//                         name="locations[0].country"
//                         className="form-control modern-input"
//                       />
//                     </div>
//                   </div>

//                   {/* Job Type */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Job Type</label>
//                     <Field as="select" name="type" className="form-select modern-input">
//                       <option>Full-time</option>
//                       <option>Part-time</option>
//                       <option>Contract</option>
//                       <option>Internship</option>
//                       <option>Remote</option>
//                       <option>Temporary</option>
//                     </Field>
//                   </div>

//                   {/* Salary */}
//                   <div className="row mb-3">
//                     <div className="col">
//                       <label className="form-label">Min Salary</label>
//                       <Field
//                         type="text"
//                         name="salary.min"
//                         className="form-control modern-input"
//                       />
//                     </div>
//                     <div className="col">
//                       <label className="form-label">Max Salary</label>
//                       <Field
//                         type="text"
//                         name="salary.max"
//                         className="form-control modern-input"
//                       />
//                     </div>
//                     <div className="col">
//                       <label className="form-label">Currency</label>
//                       <Field
//                         type="text"
//                         name="salary.currency"
//                         className="form-control modern-input"
//                       />
//                     </div>
//                   </div>

//                   {/* Deadline */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Deadline</label>
//                     <Field
//                       type="date"
//                       name="deadline"
//                       className="form-control modern-input"
//                     />
//                   </div>

//                   {/* Description */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Description</label>
//                     <Field
//                       as="textarea"
//                       name="description"
//                       className="form-control modern-input"
//                       rows="3"
//                     />
//                   </div>

//                   {/* Requirements */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Requirements</label>
//                     <Field
//                       as="textarea"
//                       name="requirements[0]"
//                       className="form-control modern-input"
//                       rows="2"
//                     />
//                   </div>

//                   {/* Status */}
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Status</label>
//                     <Field as="select" name="status" className="form-select modern-input">
//                       <option value="active">Active</option>
//                       <option value="pending">Pending</option>
//                       <option value="inactive">Inactive</option>
//                     </Field>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="modal-footer border-0">
//                   <button
//                     type="button"
//                     className="btn rounded-pill px-4"
//                     style={{
//                       background: "linear-gradient(90deg, #cfd9df, #e2ebf0)",
//                       color: "#333",
//                       fontWeight: "500",
//                       border: "none",
//                     }}
//                     onClick={onClose}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn rounded-pill px-4"
//                     style={{
//                       background: "linear-gradient(90deg, #43cea2, #185a9d)",
//                       color: "#fff",
//                       fontWeight: "600",
//                       border: "none",
//                     }}
//                   >
//                     Save Job
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobFormModal;



//https://yourdomain.com/Image/education.png



// import React, { useState } from "react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import "bootstrap/dist/css/bootstrap.min.css";

// const JobFormModal = ({ show, onClose, onSave, job }) => {
//   const [jobCodeError, setJobCodeError] = useState("");


//   const initialValues = job
//     ? { ...job, salaryInput: job.salary ? `${job.salary.min}LPA - ${job.salary.max}LPA` : "" }
//     : {
//         jobCode: "",
//         title: "",
//         company: {
//           name: "",
//           logoUrl: "",
//           industry: "",
//           companyType: "",
//           website: "",
//           linkedin: "",
//           glassdoor: "",
//         },
//         locations: [{ city: "", state: "", country: "" }],
//         type: "Full-time",
//         tags: [""],
//         salary: { min: "", max: "", currency: "LPA" },
//         salaryInput: "", // UI field
//         experienceLevel: "",
//         category: "",
//         description: "",
//         requirements: [""],
//         responsibilities: [""],
//         education: [""],
//         skills: [""],
//         benefits: [""],
//         perks: [""],
//         applyUrl: "",
//         deadline: "",
//         status: "active",
//         remoteOptions: "Onsite",
//         hiringTeam: [{ name: "", role: "", email: "", phone: "" }],
//         recentUpdates: [{ message: "" }],
//         attachments: [""],
//       };

//   const validationSchema = Yup.object({
//     jobCode: Yup.string().required("Job code is required"),
//     title: Yup.string().required("Title is required"),
//     company: Yup.object({
//       name: Yup.string().required("Company name is required"),
//     }),
//     locations: Yup.array().of(
//       Yup.object({
//         city: Yup.string().required("City is required"),
//         state: Yup.string().required("State is required"),
//         country: Yup.string().required("Country is required"),
//       })
//     ),
//     salaryInput: Yup.string()
//       .required("Salary range is required")
//       .matches(/^\d+(\.\d+)?LPA\s*-\s*\d+(\.\d+)?LPA$/, "Format must be like 4.5LPA - 12LPA"),
//     deadline: Yup.date().required("Deadline is required"),
//     description: Yup.string().required("Description is required"),
//     requirements: Yup.array().of(Yup.string().required("Requirement is required")),
//     status: Yup.string().required("Status is required"),
//   });

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setJobCodeError("");

//     try {
//       // Parse salary
//       let min = "", max = "";
//       if (values.salaryInput) {
//         const parts = values.salaryInput.split("-");
//         if (parts.length === 2) {
//           min = parseFloat(parts[0].trim().replace(/LPA/i, ""));
//           max = parseFloat(parts[1].trim().replace(/LPA/i, ""));
//         }
//       }

//       // Build payload
//       const payload = {
//         ...values,
//         jobCode: values.jobCode.trim(),
//         title: values.title.trim(),
//         company: {
//           ...values.company,
//           name: values.company.name.trim(),
//         },
//         locations: values.locations.map((loc) => ({
//           city: loc.city.trim(),
//           state: loc.state.trim(),
//           country: loc.country.trim(),
//         })),
//         salary: { min, max, currency: "LPA" },
//         tags: values.tags.filter((t) => t.trim() !== ""),
//         requirements: values.requirements.filter((r) => r.trim() !== ""),
//         responsibilities: values.responsibilities.filter((r) => r.trim() !== ""),
//         education: values.education.filter((e) => e.trim() !== ""),
//         skills: values.skills.filter((s) => s.trim() !== ""),
//         benefits: values.benefits.filter((b) => b.trim() !== ""),
//         perks: values.perks.filter((p) => p.trim() !== ""),
//         attachments: values.attachments.filter((a) => a.trim() !== ""),
//         hiringTeam: values.hiringTeam.filter(
//           (member) => member.name.trim() || member.email.trim()
//         ),
//         recentUpdates: values.recentUpdates.filter((u) => u.message.trim() !== ""),
//         deadline: values.deadline ? new Date(values.deadline) : null,
//       };

//       console.log("📤 Submitting Job Payload:", payload);

//       await onSave(payload);
//       onClose();
//     } catch (err) {
//       console.error("❌ Save job error:", err);
//       setJobCodeError(
//         err?.response?.data?.code === 11000
//           ? "Job code already exists. Please use a different job code."
//           : err?.response?.data?.message || "Failed to save job"
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };



//     return (
//       <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" style={{ background: "rgba(0,0,0,0.4)" }}>
//         <div className="modal-dialog modal-xl modal-dialog-centered">
//           <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "18px", background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)" }}>
//             <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
//               {({ isSubmitting }) => (
//                 <Form>
//                   {/* HEADER */}
//                   <div className="modal-header border-0" style={{ background: "linear-gradient(90deg, #ff9966, #ff5e62)", color: "#fff", borderTopLeftRadius: "18px", borderTopRightRadius: "18px" }}>
//                     <h5 className="modal-title fw-bold">{job ? "Edit Job" : "Add Job"}</h5>
//                     <button type="button" className="btn-close btn-close-white" onClick={onClose} />
//                   </div>

//                   {/* BODY */}
//                   <div className="modal-body px-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
//                     {/* Job Code */}
//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Job Code</label>
//                       <Field type="text" name="jobCode" className="form-control" placeholder="Enter job code" />
//                       <ErrorMessage name="jobCode" component="div" className="text-danger small" />
//                       {jobCodeError && <div className="text-danger small">{jobCodeError}</div>}
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Job Title</label>
//                       <Field type="text" name="title" className="form-control" placeholder="Enter job title" />
//                       <ErrorMessage name="title" component="div" className="text-danger small" />
//                     </div>

//                     {/* ================= COMPANY INFO ================= */}
//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Company Name</label>
//                       <Field type="text" name="company.name" className="form-control" placeholder="Company name" />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Company Website</label>
//                       <Field type="url" name="company.website" className="form-control" placeholder="https://company.com" />
//                     </div>

//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Company Logo URL</label>
//                       <Field type="url" name="company.logoUrl" className="form-control" placeholder="https://logo.png" />
//                     </div>


//                     {/* Job Type */}
//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Job Type</label>
//                       <Field as="select" name="type" className="form-select">
//                         <option>Full-time</option>
//                         <option>Part-time</option>
//                         <option>Contract</option>
//                         <option>Internship</option>
//                         <option>Remote</option>
//                         <option>Temporary</option>
//                       </Field>
//                     </div>

//                     {/* ================= SALARY ================= */}

//                     {/* Salary (Single String) */}
//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Salary Range</label>
//                       <Field
//                         type="text"
//                         name="salaryInput"
//                         className="form-control"
//                         placeholder="e.g. 4.5LPA - 12LPA"
//                       />
//                       <ErrorMessage
//                         name="salaryInput"
//                         component="div"
//                         className="text-danger small"
//                       />
//                     </div>


//                     {/* ================= SALARY ================= */}
//                     {/* <div className="mb-3">
//                     <label className="form-label fw-semibold">Salary Range</label>
//                     <div className="d-flex gap-2">
//                       <Field type="number" name="salary.min" className="form-control" placeholder="Min Salary" />
//                       <Field type="number" name="salary.max" className="form-control" placeholder="Max Salary" />
//                       <Field as="select" name="salary.currency" className="form-select">
//                         <option value="INR">INR</option>
//                         <option value="USD">USD</option>
//                         <option value="EUR">EUR</option>
//                       </Field>
//                     </div>
//                     <ErrorMessage name="salary.min" component="div" className="text-danger small" />
//                     <ErrorMessage name="salary.max" component="div" className="text-danger small" />
//                   </div> */}


//                     {/* Remote Option */}
//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Remote Option</label>
//                       <Field as="select" name="remoteOptions" className="form-select">
//                         <option>Onsite</option>
//                         <option>Remote</option>
//                         <option>Hybrid</option>
//                       </Field>
//                     </div>

//                     {/* Apply URL */}
//                     <div className="mb-3">
//                       <label className="form-label fw-semibold">Apply URL</label>
//                       <Field type="url" name="applyUrl" className="form-control" placeholder="Link to apply" />
//                     </div>

//                     {/* Tags */}
//                     <FieldArray name="tags">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Tags</label>
//                           {form.values.tags.map((tag, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`tags.${index}`} className="form-control" placeholder="Enter tag" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>+ Add Tag</button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= REQUIREMENTS ================= */}
//                     <FieldArray name="requirements">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Requirements</label>
//                           {form.values.requirements.map((req, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`requirements.${index}`} className="form-control" placeholder="Enter requirement" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
//                             + Add Requirement
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= RESPONSIBILITIES ================= */}
//                     <FieldArray name="responsibilities">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Responsibilities</label>
//                           {form.values.responsibilities.map((res, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`responsibilities.${index}`} className="form-control" placeholder="Enter responsibility" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
//                             + Add Responsibility
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= EDUCATION ================= */}
//                     <FieldArray name="education">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Education</label>
//                           {form.values.education.map((edu, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`education.${index}`} className="form-control" placeholder="Enter education requirement" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
//                             + Add Education
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= SKILLS ================= */}
//                     <FieldArray name="skills">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Skills</label>
//                           {form.values.skills.map((skill, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`skills.${index}`} className="form-control" placeholder="Enter skill" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
//                             + Add Skill
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= BENEFITS ================= */}
//                     <FieldArray name="benefits">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Benefits</label>
//                           {form.values.benefits.map((benefit, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`benefits.${index}`} className="form-control" placeholder="Enter benefit" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
//                             + Add Benefit
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= PERKS ================= */}
//                     <FieldArray name="perks">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Perks</label>
//                           {form.values.perks.map((perk, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`perks.${index}`} className="form-control" placeholder="Enter perk" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
//                             + Add Perk
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= HIRING TEAM ================= */}
//                     <FieldArray name="hiringTeam">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Hiring Team</label>
//                           {form.values.hiringTeam.map((member, index) => (
//                             <div key={index} className="border p-3 rounded mb-2 bg-light">
//                               <div className="mb-2">
//                                 <Field name={`hiringTeam.${index}.name`} className="form-control" placeholder="Member Name" />
//                               </div>
//                               <div className="mb-2">
//                                 <Field name={`hiringTeam.${index}.role`} className="form-control" placeholder="Role" />
//                               </div>
//                               <div className="mb-2">
//                                 <Field name={`hiringTeam.${index}.email`} type="email" className="form-control" placeholder="Email" />
//                               </div>
//                               <div className="mb-2">
//                                 <Field name={`hiringTeam.${index}.phone`} className="form-control" placeholder="Phone" />
//                               </div>
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>Remove</button>
//                             </div>
//                           ))}
//                           <button
//                             type="button"
//                             className="btn btn-sm btn-outline-primary"
//                             onClick={() => push({ name: "", role: "", email: "", phone: "" })}
//                           >
//                             + Add Team Member
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= RECENT UPDATES ================= */}
//                     <FieldArray name="recentUpdates">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Recent Updates</label>
//                           {form.values.recentUpdates.map((update, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`recentUpdates.${index}.message`} className="form-control" placeholder="Enter update message" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push({ message: "" })}>
//                             + Add Update
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                     {/* ================= ATTACHMENTS ================= */}
//                     <FieldArray name="attachments">
//                       {({ remove, push, form }) => (
//                         <div className="mb-3">
//                           <label className="form-label fw-semibold">Attachments</label>
//                           {form.values.attachments.map((file, index) => (
//                             <div key={index} className="d-flex gap-2 mb-2">
//                               <Field name={`attachments.${index}`} className="form-control" placeholder="File URL (or upload)" />
//                               <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
//                             </div>
//                           ))}
//                           <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
//                             + Add Attachment
//                           </button>
//                         </div>
//                       )}
//                     </FieldArray>

//                   </div>

//                   {/* FOOTER */}
//                   <div className="modal-footer border-0">
//                     <button type="button" className="btn rounded-pill px-4" style={{ background: "linear-gradient(90deg, #cfd9df, #e2ebf0)" }} onClick={onClose}>
//                       Cancel
//                     </button>
//                     <button type="submit" disabled={isSubmitting} className="btn rounded-pill px-4" style={{ background: "linear-gradient(90deg, #43cea2, #185a9d)", color: "#fff" }}>
//                       {isSubmitting ? "Saving..." : "Save Job"}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   export default JobFormModal;














import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const JobFormModal = ({ show, onClose, onSave, job }) => {
  const [jobCodeError, setJobCodeError] = useState("");

  const initialValues = job
    ? { ...job, salaryInput: job.salary ? `${job.salary.min} - ${job.salary.max}` : "" }
    : {
        jobCode: "",
        title: "",
        company: { name: "", logoUrl: "", industry: "", companyType: "", website: "", linkedin: "", glassdoor: "" },
        locations: [{ city: "", state: "", country: "" }],
        type: "Full-time",
        tags: [""],
        salary: { min: "", max: "", currency: "LPA" },
        salaryInput: "",
        experienceLevel: "",
        category: "",
        description: "",
        requirements: [""],
        responsibilities: [""],
        education: [""],
        skills: [""],
        benefits: [""],
        perks: [""],
        applyUrl: "",
        deadline: "",
        status: "active",
        remoteOptions: "Onsite",
        hiringTeam: [{ name: "", role: "", email: "", phone: "" }],
        recentUpdates: [{ message: "" }],
        attachments: [""],
      };

  const validationSchema = Yup.object({
    jobCode: Yup.string().required("Job code is required"),
    title: Yup.string().required("Title is required"),
    company: Yup.object({ name: Yup.string().required("Company name is required") }),
    locations: Yup.array().of(
      Yup.object({
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required"),
      })
    ),
    salaryInput: Yup.string()
      .required("Salary range is required")
      .matches(/^\d+(\.\d+)?LPA\s*-\s*\d+(\.\d+)?LPA$/, "Format must be like 4.5LPA - 12LPA"),
    deadline: Yup.date().required("Deadline is required"),
    description: Yup.string().required("Description is required"),
    requirements: Yup.array().of(Yup.string().required("Requirement is required")),
    status: Yup.string().required("Status is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setJobCodeError("");
    try {
      // Parse salary range
      let min = "", max = "";
      if (values.salaryInput) {
        const parts = values.salaryInput.split("-");
        if (parts.length === 2) {
          min = parseFloat(parts[0].trim().replace(/LPA/i, ""));
          max = parseFloat(parts[1].trim().replace(/LPA/i, ""));
        }
      }

      const payload = {
        ...values,
        jobCode: values.jobCode.trim(),
        title: values.title.trim(),
        company: { ...values.company, name: values.company.name.trim() },
        locations: values.locations.map((loc) => ({
          city: loc.city.trim(),
          state: loc.state.trim(),
          country: loc.country.trim(),
        })),
        salary: { min, max, currency: "LPA" },
        tags: values.tags.filter((t) => t.trim() !== ""),
        requirements: values.requirements.filter((r) => r.trim() !== ""),
        responsibilities: values.responsibilities.filter((r) => r.trim() !== ""),
        education: values.education.filter((e) => e.trim() !== ""),
        skills: values.skills.filter((s) => s.trim() !== ""),
        benefits: values.benefits.filter((b) => b.trim() !== ""),
        perks: values.perks.filter((p) => p.trim() !== ""),
        attachments: values.attachments.filter((a) => a.trim() !== ""),
        hiringTeam: values.hiringTeam.filter((member) => member.name.trim() || member.email.trim()),
        recentUpdates: values.recentUpdates.filter((u) => u.message.trim() !== ""),
        deadline: values.deadline ? new Date(values.deadline) : null,
      };

      console.log("📤 Submitting Job Payload:", payload);

      await onSave(payload); // Wait for API success before closing
      onClose();
    } catch (err) {
      console.error("❌ Save job error:", err);
      setJobCodeError(
        err?.response?.data?.code === 11000
          ? "Job code already exists. Please use a different job code."
          : err?.response?.data?.message || "Failed to save job"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`modal  ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div
          className="modal-content border-0 shadow-lg"
          style={{
            borderRadius: "18px",
            background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
          }}
        >
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ isSubmitting }) => (
              <Form>
                {/* HEADER */}
                <div
                  className="modal-header border-0"
                  style={{
                    background: "linear-gradient(90deg, #ff9966, #ff5e62)",
                    color: "#fff",
                    borderTopLeftRadius: "18px",
                    borderTopRightRadius: "18px",
                  }}
                >
                  <h5 className="modal-title fw-bold">{job ? "Edit Job" : "Add Job"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={onClose} />
                </div>

                {/* BODY */}
                <div className="modal-body px-4 py-3" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                   <div className="mb-3">
                      <label className="form-label fw-semibold">Job Code</label>
                      <Field type="text" name="jobCode" className="form-control" placeholder="Enter job code" />
                      <ErrorMessage name="jobCode" component="div" className="text-danger small" />
                      {jobCodeError && <div className="text-danger small">{jobCodeError}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Job Title</label>
                      <Field type="text" name="title" className="form-control" placeholder="Enter job title" />
                      <ErrorMessage name="title" component="div" className="text-danger small" />
                    </div>

                    {/* ================= COMPANY INFO ================= */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Company Name</label>
                      <Field type="text" name="company.name" className="form-control" placeholder="Company name" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Company Website</label>
                      <Field type="url" name="company.website" className="form-control" placeholder="https://company.com" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Company Logo URL</label>
                      <Field type="url" name="company.logoUrl" className="form-control" placeholder="https://logo.png" />
                    </div>


                    {/* Job Type */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Job Type</label>
                      <Field as="select" name="type" className="form-select">
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                        <option>Remote</option>
                        <option>Temporary</option>
                      </Field>
                    </div>

                    {/* ================= SALARY ================= */}

                    {/* Salary (Single String) */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Salary Range</label>
                      <Field
                        type="text"
                        name="salaryInput"
                        className="form-control"
                        placeholder="e.g. 4.5LPA - 12LPA"
                      />
                      <ErrorMessage
                        name="salaryInput"
                        component="div"
                        className="text-danger small"
                      />
                    </div>


                    {/* ================= SALARY ================= */}
                    {/* <div className="mb-3">
                    <label className="form-label fw-semibold">Salary Range</label>
                    <div className="d-flex gap-2">
                      <Field type="number" name="salary.min" className="form-control" placeholder="Min Salary" />
                      <Field type="number" name="salary.max" className="form-control" placeholder="Max Salary" />
                      <Field as="select" name="salary.currency" className="form-select">
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </Field>
                    </div>
                    <ErrorMessage name="salary.min" component="div" className="text-danger small" />
                    <ErrorMessage name="salary.max" component="div" className="text-danger small" />
                  </div> */}


                    {/* Remote Option */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Remote Option</label>
                      <Field as="select" name="remoteOptions" className="form-select">
                        <option>Onsite</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                      </Field>
                    </div>

                    {/* Apply URL */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Apply URL</label>
                      <Field type="url" name="applyUrl" className="form-control" placeholder="Link to apply" />
                    </div>

                    {/* Tags */}
                    <FieldArray name="tags">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Tags</label>
                          {form.values.tags.map((tag, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`tags.${index}`} className="form-control" placeholder="Enter tag" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>+ Add Tag</button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= REQUIREMENTS ================= */}
                    <FieldArray name="requirements">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Requirements</label>
                          {form.values.requirements.map((req, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`requirements.${index}`} className="form-control" placeholder="Enter requirement" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
                            + Add Requirement
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= RESPONSIBILITIES ================= */}
                    <FieldArray name="responsibilities">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Responsibilities</label>
                          {form.values.responsibilities.map((res, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`responsibilities.${index}`} className="form-control" placeholder="Enter responsibility" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
                            + Add Responsibility
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= EDUCATION ================= */}
                    <FieldArray name="education">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Education</label>
                          {form.values.education.map((edu, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`education.${index}`} className="form-control" placeholder="Enter education requirement" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
                            + Add Education
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= SKILLS ================= */}
                    <FieldArray name="skills">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Skills</label>
                          {form.values.skills.map((skill, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`skills.${index}`} className="form-control" placeholder="Enter skill" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
                            + Add Skill
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= BENEFITS ================= */}
                    <FieldArray name="benefits">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Benefits</label>
                          {form.values.benefits.map((benefit, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`benefits.${index}`} className="form-control" placeholder="Enter benefit" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
                            + Add Benefit
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= PERKS ================= */}
                    <FieldArray name="perks">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Perks</label>
                          {form.values.perks.map((perk, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`perks.${index}`} className="form-control" placeholder="Enter perk" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
                            + Add Perk
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= HIRING TEAM ================= */}
                    <FieldArray name="hiringTeam">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Hiring Team</label>
                          {form.values.hiringTeam.map((member, index) => (
                            <div key={index} className="border p-3 rounded mb-2 bg-light">
                              <div className="mb-2">
                                <Field name={`hiringTeam.${index}.name`} className="form-control" placeholder="Member Name" />
                              </div>
                              <div className="mb-2">
                                <Field name={`hiringTeam.${index}.role`} className="form-control" placeholder="Role" />
                              </div>
                              <div className="mb-2">
                                <Field name={`hiringTeam.${index}.email`} type="email" className="form-control" placeholder="Email" />
                              </div>
                              <div className="mb-2">
                                <Field name={`hiringTeam.${index}.phone`} className="form-control" placeholder="Phone" />
                              </div>
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>Remove</button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => push({ name: "", role: "", email: "", phone: "" })}
                          >
                            + Add Team Member
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= RECENT UPDATES ================= */}
                    <FieldArray name="recentUpdates">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Recent Updates</label>
                          {form.values.recentUpdates.map((update, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`recentUpdates.${index}.message`} className="form-control" placeholder="Enter update message" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push({ message: "" })}>
                            + Add Update
                          </button>
                        </div>
                      )}
                    </FieldArray>

                    {/* ================= ATTACHMENTS ================= */}
                    <FieldArray name="attachments">
                      {({ remove, push, form }) => (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Attachments</label>
                          {form.values.attachments.map((file, index) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                              <Field name={`attachments.${index}`} className="form-control" placeholder="File URL (or upload)" />
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(index)}>✕</button>
                            </div>
                          ))}
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => push("")}>
                            + Add Attachment
                          </button>
                        </div>
                      )}
                    </FieldArray>

                </div>

                {/* FOOTER */}
                <div className="modal-footer border-0 pt-3 pb-3">
                  <button
                    type="button"
                    className="btn rounded-pill px-4"
                    style={{ background: "linear-gradient(90deg, #cfd9df, #e2ebf0)" }}
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn rounded-pill px-4 d-flex align-items-center gap-2"
                    style={{ background: "linear-gradient(90deg, #43cea2, #185a9d)", color: "#fff" }}
                  >
                    {isSubmitting && <span className="spinner-border spinner-border-sm"></span>}
                    {isSubmitting ? "Saving..." : "Save Job"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default JobFormModal;
