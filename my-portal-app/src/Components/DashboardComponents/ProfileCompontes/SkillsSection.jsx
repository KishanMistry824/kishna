import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const skillSchema = Yup.object().shape({
  name: Yup.string().trim().required("Skill is required")
});

const SkillsSection = () => {
  const userId = localStorage.getItem("userId");
  const [skills, setSkills] = useState([]);

  const fetchSkills = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/skills/${userId}`);
      setSkills(res.data);
    } catch (error) {
      console.error("Failed to fetch skills");
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchSkills();
  }, [userId, fetchSkills]);

  const addSkill = async (values, actions) => {
    const trimmed = values.name.trim();
    if (!trimmed) return;

    if (skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      actions.setSubmitting(false);
      return;
    }

    if (skills.length >= 10) {
      actions.setSubmitting(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/skills", {
        name: trimmed,
        userId,
      });
      setSkills([...skills, res.data]);
      actions.resetForm();
    } catch (error) {
      console.error("Add failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const removeSkill = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Remove failed");
    }
  };

  return (
    <section className="mb-5">
      <div
        className="bg-white p-4 rounded-4 shadow-sm border position-relative"
        style={{
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)", // softer card shadow
          transition: "box-shadow 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.06)")}
      >
        <label className="form-label fw-bold fs-5 mb-3 text-dark">
          {/* 🛠️  */}
          Add Your Skills
        </label>

        <Formik initialValues={{ name: "" }} validationSchema={skillSchema} onSubmit={addSkill}>
          {({ isSubmitting }) => (
            <Form className="d-flex flex-column flex-md-row gap-2">
              {/* Input Field */}
              <div className="flex-grow-1">
                <Field
                  name="name"
                  className="form-control form-control-lg rounded-pill px-4 shadow-sm border-0"
                  placeholder="e.g., TypeScript, UI/UX, MongoDB"
                  style={{
                    backgroundColor: "#f8f9fa",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onFocus={(e) => (e.target.style.backgroundColor = "#ffffff")}
                  onBlur={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                />
                <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
              </div>

              {/* Add Skill Button */}
              <button
                className="btn btn-success rounded-pill px-4 fw-semibold shadow-sm"
                type="submit"
                disabled={isSubmitting || skills.length >= 10}
                style={{
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => (e.target.style.boxShadow = "0 4px 12px rgba(25, 135, 84, 0.3)")}
                onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
              >
                {/* ➕  */}
                Add Skill
              </button>
            </Form>
          )}
        </Formik>

        {/* Skill Tags */}
        <div className="mt-4 d-flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={skill._id}
              className={`badge d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm text-white fw-medium skill-badge-${index % 5}`}
              style={{
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              title="Click to remove"
              onClick={() => removeSkill(skill._id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.08 }}
            >
              {skill.name}
              <i className="bi bi-x-circle-fill fs-6"></i>
            </motion.span>
          ))}
        </div>

        <p className="text-muted mt-3 small"> Click on a skill to remove it.</p>
      </div>

      {/* Gradient Classes */}
      <style jsx="true">{`
    .skill-badge-0 {
      background: linear-gradient(135deg, #00c6ff, #0072ff);
    }
    .skill-badge-1 {
      background: linear-gradient(135deg, #f7971e, #ffd200);
    }
    .skill-badge-2 {
      background: linear-gradient(135deg, #43e97b, #38f9d7);
    }
    .skill-badge-3 {
      background: linear-gradient(135deg, #f953c6, #b91d73);
    }
    .skill-badge-4 {
      background: linear-gradient(135deg, #fc466b, #3f5efb);
    }

    input:focus {
      outline: none;
      box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
    }
  `}</style>
    </section>

  );
};

export default SkillsSection;



//2 choice


// Updated SkillsSection.jsx with Tailwind (tw- prefix), icons, confirmations, categories, proficiency, endorsements, experience, export, AI suggestions

// NOTE: Your logic is kept intact; enhancements are UI + Additional fields only.

// --- Full File ---

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { FaStar, FaTools, FaBrain, FaClipboardList, FaDownload, FaThumbsUp } from "react-icons/fa";

// const skillSchema = Yup.object().shape({
//   name: Yup.string().trim().required("Skill is required"),
//   category: Yup.string().required("Category required"),
//   proficiency: Yup.string().required("Proficiency required"),
//   experience: Yup.number().min(0).max(50).required("Years required"),
// });

// const categories = [
//   "Frontend", "Backend", "Database", "DevOps", "Cloud", "Soft Skill", "Other"
// ];

// const suggestions = [
//   "React", "Node.js", "MongoDB", "TypeScript", "Communication", "Next.js", "Docker"
// ];

// const SkillsSection = () => {
//   const userId = localStorage.getItem("userId");
//   const [skills, setSkills] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(null);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     if (userId) fetchSkills();
//   }, [userId]);

//   const fetchSkills = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/skills/${userId}`);
//       setSkills(res.data);
//     } catch (error) {
//       console.error("Failed to fetch skills");
//     }
//   };

//   const addSkill = async (values, actions) => {
//     const trimmed = values.name.trim();
//     if (!trimmed) return;

//     if (skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
//       actions.setSubmitting(false);
//       return;
//     }

//     if (skills.length >= 10) {
//       actions.setSubmitting(false);
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/skills", {
//         name: trimmed,
//         category: values.category,
//         proficiency: values.proficiency,
//         experience: values.experience,
//         endorsements: 0,
//         userId,
//       });
//       setSkills([...skills, res.data]);
//       actions.resetForm();
//     } catch (error) {
//       console.error("Add failed");
//     } finally {
//       actions.setSubmitting(false);
//     }
//   };

//   const removeSkill = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/skills/${id}`);
//       setSkills(skills.filter((s) => s._id !== id));
//       setShowConfirm(null);
//     } catch (error) {
//       console.error("Remove failed");
//     }
//   };

//   const exportSkills = () => {
//     const text = skills.map((s) => `${s.name} - ${s.category} - ${s.proficiency} - ${s.experience} yrs`).join("\n");
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const endorseSkill = async (id) => {
//     try {
//       const updated = skills.map((s) =>
//         s._id === id ? { ...s, endorsements: (s.endorsements || 0) + 1 } : s
//       );
//       setSkills(updated);
//     } catch (err) {}
//   };

//   return (
//     <section className="tw-mb-6">
//       <div className="tw-bg-white tw-p-6 tw-rounded-3xl tw-shadow tw-border tw-relative">
//         <label className="tw-font-bold tw-text-xl tw-mb-4 tw-block">Add Your Skills</label>

//         <Formik
//           initialValues={{ name: "", category: "", proficiency: "", experience: "" }}
//           validationSchema={skillSchema}
//           onSubmit={addSkill}
//         >
//           {({ isSubmitting }) => (
//             <Form className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-3">
//               <Field name="name" placeholder="Skill name" className="tw-bg-gray-100 tw-rounded-xl tw-p-3 tw-w-full tw-border" />
//               <Field as="select" name="category" className="tw-bg-gray-100 tw-rounded-xl tw-p-3 tw-w-full tw-border">
//                 <option value="">Select Category</option>
//                 {categories.map((c) => <option key={c}>{c}</option>)}
//               </Field>
//               <Field as="select" name="proficiency" className="tw-bg-gray-100 tw-rounded-xl tw-p-3 tw-w-full tw-border">
//                 <option value="">Proficiency</option>
//                 <option>Beginner</option>
//                 <option>Intermediate</option>
//                 <option>Advanced</option>
//                 <option>Expert</option>
//               </Field>
//               <Field name="experience" type="number" placeholder="Years" className="tw-bg-gray-100 tw-rounded-xl tw-p-3 tw-w-full tw-border" />

//               <div className="tw-col-span-4 tw-flex tw-justify-end">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || skills.length >= 10}
//                   className="tw-bg-green-600 tw-text-white tw-rounded-xl tw-px-6 tw-py-2 tw-font-semibold hover:tw-bg-green-700"
//                 >
//                   Add Skill
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>

//         <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-3">
//           {skills.map((skill, index) => (
//             <motion.div
//               key={skill._id}
//               className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-text-white tw-shadow tw-cursor-pointer"
//               style={{ background: "linear-gradient(135deg,#7F00FF,#E100FF)" }}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <FaTools />
//               <span>{skill.name}</span>
//               <span className="tw-text-xs tw-bg-black/20 tw-rounded-md tw-px-2 tw-py-1">{skill.category}</span>
//               <span className="tw-text-xs tw-bg-black/20 tw-rounded-md tw-px-2 tw-py-1">{skill.proficiency}</span>
//               <span className="tw-text-xs tw-bg-black/20 tw-rounded-md tw-px-2 tw-py-1">{skill.experience} yrs</span>

//               <button onClick={() => endorseSkill(skill._id)} className="tw-bg-white/20 tw-rounded-md tw-px-2 tw-py-1 tw-text-xs">👍 {skill.endorsements || 0}</button>

//               <button onClick={() => setShowConfirm(skill._id)} className="tw-text-red-300 hover:tw-text-red-500">✖</button>

//               {showConfirm === skill._id && (
//                 <div className="tw-fixed tw-inset-0 tw-bg-black/40 tw-flex tw-items-center tw-justify-center">
//                   <div className="tw-bg-white tw-p-6 tw-rounded-2xl tw-shadow-xl tw-text-center">
//                     <p className="tw-mb-4 tw-font-semibold">Remove this skill?</p>
//                     <div className="tw-flex tw-gap-3 tw-justify-center">
//                       <button className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded" onClick={() => removeSkill(skill._id)}>Delete</button>
//                       <button className="tw-bg-gray-300 tw-px-4 tw-py-2 tw-rounded" onClick={() => setShowConfirm(null)}>Cancel</button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>

//         <div className="tw-mt-4 tw-flex tw-gap-4 tw-items-center">
//           <button onClick={exportSkills} className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-xl tw-flex tw-items-center tw-gap-2">
//             <FaDownload /> Export / Copy
//           </button>
//           {copied && <span className="tw-text-green-600 tw-font-medium">Copied!</span>}
//         </div>

//         <div className="tw-mt-6">
//           <p className="tw-font-semibold tw-mb-2">AI Skill Suggestions:</p>
//           <div className="tw-flex tw-gap-2 tw-flex-wrap">
//             {suggestions.map((s) => (
//               <span key={s} className="tw-bg-gray-200 tw-px-3 tw-py-1 tw-rounded-full tw-cursor-pointer hover:tw-bg-gray-300" onClick={() => alert(`AI Suggest: Add ${s}`)}>
//                 {s}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SkillsSection;

