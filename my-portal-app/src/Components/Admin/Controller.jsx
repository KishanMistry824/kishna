// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import JobFormModal from "./JobFormMdels";
// import DeleteButton from "./DeleteButton"; // ✅ Import new DeleteButton


// // ===== Helpers for badge styles =====
// const getStatusBadge = (status) => {
//   switch (status) {
//     case "active":
//       return "bg-success bg-opacity-10 text-success border border-success";
//     case "pending":
//       return "bg-warning bg-opacity-25 text-warning border border-warning";
//     case "closed":
//       return "bg-danger bg-opacity-10 text-danger border border-danger";
//     case "inactive":
//       return "bg-secondary bg-opacity-10 text-secondary border border-secondary";
//     default:
//       return "bg-secondary bg-opacity-10 text-secondary border border-secondary";
//   }
// };

// const getTypeBadge = (type) => {
//   switch (type?.toLowerCase()) {
//     case "full-time":
//       return "bg-primary bg-opacity-10 text-primary border border-primary";
//     case "contract":
//       return "bg-info bg-opacity-10 text-info border border-info";
//     case "internship":
//       return "bg-success bg-opacity-10 text-success border border-success";
//     default:
//       return "bg-secondary bg-opacity-10 text-secondary border border-secondary";
//   }
// };

// const AdminController = () => {
//   const [activeTab, setActiveTab] = useState("jobs");
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [candidates, setCandidates] = useState([]);
//   const jobsPerPage = 12;

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/admin/candidates"); // replace with your API
//         setCandidates(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch candidates:", err);
//         toast.error("Failed to load candidates.");
//       }
//     };

//     if (activeTab === "candidates") {
//       fetchCandidates();
//     }
//   }, [activeTab]);





//   // ===== Fetch Jobs =====
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/jobs");
//       setJobs(response.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load jobs.");
//       toast.error("Failed to load jobs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===== Save Job =====
//   const handleSaveJob = async (jobData) => {
//     try {
//       if (selectedJob) {
//         await axios.put(
//           `http://localhost:5000/api/admin/jobs/${selectedJob._id}`,
//           jobData
//         );
//         toast.success("✅ Job updated successfully!");
//       } else {
//         await axios.post("http://localhost:5000/api/admin/jobs", jobData);
//         toast.success("✅ Job created successfully!");
//       }
//       setShowModal(false);
//       setSelectedJob(null);
//       fetchJobs();
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to save job. " + (err.response?.data?.message || err.message));
//     }
//   };

//   // ===== Delete Job =====
//   const handleDeleteJob = async (jobId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/jobs/${jobId}`);
//       setJobs(jobs.filter((j) => j._id !== jobId));
//       toast.success("Job deleted successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete job. " + (err.response?.data?.message || err.message));
//     }
//   };

//   // ===== Modal Handlers =====
//   const handleAddJob = () => {
//     setSelectedJob(null);
//     setShowModal(true);
//   };
//   const handleEditJob = (job) => {
//     setSelectedJob(job);
//     setShowModal(true);
//   };

//   // ===== Filter & Pagination =====
//   const filteredJobs = jobs.filter(
//     (j) =>
//       j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       j.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       j.jobCode.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const Pagination = () =>
//     totalPages > 1 && (
//       <nav className="d-flex justify-content-center mt-4">
//         <ul className="pagination pagination-sm gap-1 shadow-sm rounded-pill p-2 bg-light">
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button
//               className="page-link rounded-pill px-2"
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             >
//               ⬅ Prev
//             </button>
//           </li>

//           {Array.from({ length: totalPages }).map((_, i) => (
//             <li
//               key={i}
//               className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
//             >
//               <button
//                 className={`page-link rounded-pill px-3 fw-semibold ${currentPage === i + 1
//                   ? "bg-primary text-white shadow-sm"
//                   : "text-dark"
//                   }`}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             </li>
//           ))}

//           <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//             <button
//               className="page-link rounded-pill px-2"
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             >
//               Next ➡
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );

//   // ===== Render Table =====
//   const renderJobTable = () => (
//     <div className="card shadow-lg border-0 rounded-4" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
//       <div className="card-body p-3">
//         <div className="table-responsive">
//           <table className="table align-middle mb-0">
//             <thead style={{ background: "rgba(0,123,255,0.1)" }}>
//               <tr>
//                 <th>Code</th>
//                 <th>Title</th>
//                 <th>Company</th>
//                 <th>Location</th>
//                 <th>Type</th>
//                 <th>Status</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <AnimatePresence>
//                 {currentJobs.length > 0 ? (
//                   currentJobs.map((job) => (
//                     <motion.tr
//                       key={job._id}
//                       initial={{ opacity: 0, y: 15 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -15 }}
//                       whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)" }}
//                       transition={{ duration: 0.3 }}
//                       style={{ cursor: "pointer", transition: "all 0.3s ease" }}
//                     >
//                       <td className="fw-semibold">{job.jobCode}</td>
//                       <td className="fw-bold">{job.title}</td>
//                       <td>{job.company?.name}</td>
//                       <td>{job.locations?.[0]?.city || ""}, {job.locations?.[0]?.state || ""}</td>
//                       <td>
//                         <span
//                           className="badge rounded-pill px-3 py-2 fw-semibold"
//                           style={{
//                             background: getTypeBadge(job.type)
//                               ? "linear-gradient(135deg, #6a11cb, #2575fc)"
//                               : "#6c757d",
//                             color: "white",
//                             boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
//                           }}
//                         >
//                           {job.type}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className="badge rounded-pill px-3 py-2 fw-semibold"
//                           style={{
//                             background: getStatusBadge(job.status)
//                               ? "linear-gradient(135deg, #ff416c, #ff4b2b)"
//                               : "#6c757d",
//                             color: "white",
//                             boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
//                           }}
//                         >
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="text-center d-flex justify-content-center gap-2">
//                         {/* Edit Button */}
//                         <button
//                           className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center hover-scale"
//                           onClick={() => handleEditJob(job)}
//                           style={{
//                             background: "linear-gradient(135deg, #00c6ff, #0072ff)",
//                             color: "#fff",
//                             border: "none",
//                             width: "36px",
//                             height: "36px",
//                             boxShadow: "0 4px 12px rgba(0,198,255,0.5)",
//                             transition: "all 0.3s ease",
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.transform = "scale(1.15)";
//                             e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,198,255,0.7)";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.transform = "scale(1)";
//                             e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,198,255,0.5)";
//                           }}
//                         >
//                           <i className="bi bi-pencil"></i>
//                         </button>

//                         {/* Delete Button */}
//                         <DeleteButton
//                           jobId={job._id}
//                           handleDeleteJob={handleDeleteJob}
//                           small
//                           style={{
//                             width: "36px",
//                             height: "36px",
//                             borderRadius: "50%",
//                             boxShadow: "0 4px 12px rgba(255,70,70,0.5)",
//                           }}
//                         />
//                       </td>

//                     </motion.tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center text-muted py-5">
//                       No matching jobs found.
//                     </td>
//                   </tr>
//                 )}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-3">
//           <Pagination />
//         </div>

//         <style>{`
//       .hover-scale:hover {
//         transform: scale(1.05);
//         transition: transform 0.3s ease-in-out;
//       }
//       tbody tr:hover {
//         background: rgba(255,255,255,0.08);
//       }
//     `}</style>
//       </div>
//     </div>

//   );

//   // ===== Render Card View =====
//   const renderJobCards = () => (
//     <div>
//       <div className="row g-4">
//         {currentJobs.length > 0 ? (
//           currentJobs.map((job) => (
//             <motion.div
//               key={job._id}
//               className="col-md-4"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               whileHover={{ scale: 1.03 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div
//                 className="card h-100 border-0 rounded-4 position-relative"
//                 style={{
//                   background: "rgba(255, 255, 255, 0.07)",
//                   backdropFilter: "blur(15px)",
//                   WebkitBackdropFilter: "blur(15px)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//                   overflow: "hidden",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 {/* Neon Glow Header */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "-50%",
//                     left: "-50%",
//                     width: "200%",
//                     height: "200%",
//                     background:
//                       "conic-gradient(from 0deg, #00c6ff, #0072ff, #8e2de2, #00c6ff)",
//                     filter: "blur(100px)",
//                     opacity: "0.2",
//                     pointerEvents: "none",
//                     animation: "rotateGlow 10s linear infinite",
//                   }}
//                 ></div>

//                 <div className="card-body position-relative">
//                   <h5
//                     className="fw-bold mb-2"
//                     style={{
//                       background: "linear-gradient(90deg, #00c6ff, #0072ff, #8e2de2)",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                       textShadow: "0 2px 6px rgba(0,0,0,0.4)",
//                     }}
//                   >
//                     {job.title}
//                   </h5>
//                   <p className="text-muted mb-1">{job.company?.name}</p>
//                   <p className="small text-secondary mb-3">
//                     {job.locations?.[0]?.city || ""},{" "}
//                     {job.locations?.[0]?.state || ""}
//                   </p>

//                   <div className="d-flex flex-wrap gap-2 mb-3">
//                     <span
//                       className={`badge rounded-pill px-3 py-2 fw-semibold`}
//                       style={{
//                         background: getTypeBadge(job.type)
//                           ? `linear-gradient(135deg, #6a11cb, #2575fc)`
//                           : "#6c757d",
//                         color: "white",
//                         boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//                       }}
//                     >
//                       {job.type}
//                     </span>
//                     <span
//                       className={`badge rounded-pill px-3 py-2 fw-semibold`}
//                       style={{
//                         background: getStatusBadge(job.status)
//                           ? `linear-gradient(135deg, #ff416c, #ff4b2b)`
//                           : "#6c757d",
//                         color: "white",
//                         boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//                       }}
//                     >
//                       {job.status}
//                     </span>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center mt-3">
//                     <button
//                       className="btn btn-sm rounded-pill px-3 py-2 fw-semibold d-flex align-items-center justify-content-center"
//                       onClick={() => handleEditJob(job)}
//                       style={{
//                         background: "linear-gradient(135deg, #00c6ff, #0072ff)",
//                         color: "#fff",
//                         border: "none",
//                         boxShadow: "0 4px 15px rgba(0, 198, 255, 0.4)",
//                         transition: "all 0.3s ease",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = "scale(1.05)";
//                         e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,198,255,0.6)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = "scale(1)";
//                         e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,198,255,0.4)";
//                       }}
//                     >
//                       <i className="bi bi-pencil me-2"></i> Edit
//                     </button>

//                     <DeleteButton jobId={job._id} handleDeleteJob={handleDeleteJob} />
//                   </div>

//                 </div>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <div className="text-center text-muted py-5">No jobs found.</div>
//         )}
//       </div>

//       <Pagination />

//       {/* Card Hover & Glow CSS */}
//       <style>{`
//     @keyframes rotateGlow {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//     .hover-scale:hover {
//       transform: scale(1.05);
//       transition: transform 0.3s ease-in-out;
//     }
//   `}</style>
//     </div>

//   );

//   return (
//     <div className="container-fluid min-vh-100 py-4" style={{ background: "#f8fafc" }}>
//       {/* Header */}
//       <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
//         <motion.h2
//           className="fw-bold"
//           style={{ color: "#1f2937" }}
//           initial={{ x: -40, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//         >
//           Admin Control Center
//         </motion.h2>

//         {activeTab === "jobs" && (
//           <div className="d-flex flex-wrap align-items-center gap-2">
//             <input
//               type="text"
//               className="form-control shadow-sm"
//               placeholder="🔍 Search by code, title or company..."
//               style={{ width: "250px", borderRadius: "25px" }}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="btn px-4 rounded-pill shadow-sm text-white"
//               style={{ background: "linear-gradient(90deg,#6366f1,#14b8a6)" }}
//               onClick={handleAddJob}
//             >
//               + Add Job
//             </motion.button>
//             <button
//               className="btn btn-outline-secondary rounded-pill"
//               onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
//             >
//               <i className={`bi ${viewMode === "table" ? "bi-grid" : "bi-list"}`}></i>
//               {viewMode === "table" ? " Card View" : " Table View"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Tabs */}
//       <div className="d-flex gap-2 mb-4 flex-wrap">
//         {["jobs", "candidates", "applications", "settings"].map((tab) => (
//           <button
//             key={tab}
//             className={`btn rounded-pill px-4 fw-semibold ${activeTab === tab ? "text-white" : "btn-outline-dark text-dark"
//               }`}
//             style={
//               activeTab === tab
//                 ? { background: "linear-gradient(90deg,#6366f1,#14b8a6)" }
//                 : {}
//             }
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <motion.div
//         key={activeTab}
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white border-0 shadow-sm rounded-4 p-4"
//       >
//         {activeTab === "jobs" ? (
//           viewMode === "table" ? renderJobTable() : renderJobCards()
//         ) : (
//           <div className="alert alert-info rounded-4 shadow-sm">
//             {activeTab === "candidates" ? (
//               candidates && candidates.length > 0 ? (
//                 // <ul className="list-group list-group-flush">
//                 //   {candidates.map((candidate) => (
//                 //     <li
//                 //       key={candidate._id}
//                 //       className="list-group-item d-flex justify-content-between align-items-center"
//                 //       style={{ borderRadius: "0.5rem", marginBottom: "0.25rem" }}
//                 //     >
//                 //       <span>{candidate.name}</span>
//                 //       <span className="badge bg-primary">{candidate.email}</span>
//                 //     </li>
//                 //   ))}
//                 // </ul>
//                  <CTA/>              
//               ) : (
//                 <div className="text-center text-muted py-3"> <CTA/></div>
//               )
//             ) : activeTab === "applications" ? (
//               "Applications list will appear here."
//             ) : (
//               "Admin settings page."
//             )}

//           </div>

//         )}
//       </motion.div>

//       {/* Modal */}
//       <JobFormModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onSave={handleSaveJob}
//         job={selectedJob}
//       />
//     </div>
//   );
// };

// export default AdminController;




















import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobFormModal from "./JobFormMdels";
import DeleteButton from "./DeleteButton"; // ✅ Import DeleteButton
import AdminSettings from "./AdminSetting"; // ✅ Import AdminSettings

// ===== Helpers for badge styles =====
const getStatusBadge = (status) => {
  switch (status) {
    case "active":
      return "bg-success bg-opacity-10 text-success border border-success";
    case "pending":
      return "bg-warning bg-opacity-25 text-warning border border-warning";
    case "closed":
      return "bg-danger bg-opacity-10 text-danger border border-danger";
    case "inactive":
      return "bg-secondary bg-opacity-10 text-secondary border border-secondary";
    default:
      return "bg-secondary bg-opacity-10 text-secondary border border-secondary";
  }
};

const getTypeBadge = (type) => {
  switch (type?.toLowerCase()) {
    case "full-time":
      return "bg-primary bg-opacity-10 text-primary border border-primary";
    case "contract":
      return "bg-info bg-opacity-10 text-info border border-info";
    case "internship":
      return "bg-success bg-opacity-10 text-success border border-success";
    default:
      return "bg-secondary bg-opacity-10 text-secondary border border-secondary";
  }
};

const AdminController = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);

  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const jobsPerPage = 12;

  // ===== Fetch Candidates =====
  useEffect(() => {
    if (activeTab === "candidates") fetchCandidates();
    if (activeTab === "users") fetchUsers();
  }, [activeTab]);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/candidates");
      setCandidates(res.data || []);
    } catch (err) {
      console.error("Failed to fetch candidates:", err);
      toast.error("Failed to load candidates.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/candidates");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users.");
    }
  };

  // ===== Block/Unblock User =====
  const handleBlockUnblock = async (userId) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/users/${userId}/block`);
      toast.success("User status updated successfully!");
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user status. " + (err.response?.data?.message || err.message));
    }
  };

  // ===== Delete User =====
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/candidates/${userId}`);
      toast.success("User deleted successfully!");
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user. " + (err.response?.data?.message || err.message));
    }
  };

  // ===== Fetch Users (fix endpoint) =====
  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/admin/candidates"); // Correct endpoint
  //     setUsers(res.data || []);
  //   } catch (err) {
  //     console.error("Failed to fetch users:", err);
  //     toast.error("Failed to load users.");
  //   }
  // };


  // ===== Fetch Jobs =====
  useEffect(() => {
    fetchJobs();
    fetchUsers();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/jobs");
      setJobs(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs.");
      toast.error("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  // ===== Save Job =====
  const handleSaveJob = async (jobData) => {
    try {
      if (selectedJob) {
        await axios.put(
          `http://localhost:5000/api/admin/jobs/${selectedJob._id}`,
          jobData
        );
        toast.success("✅ Job updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/admin/jobs", jobData);
        toast.success("✅ Job created successfully!");
      }
      setShowModal(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save job. " + (err.response?.data?.message || err.message));
    }
  };

  // ===== Delete Job =====
  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/jobs/${jobId}`);
      setJobs(jobs.filter((j) => j._id !== jobId));
      toast.success("Job deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job. " + (err.response?.data?.message || err.message));
    }
  };

  // ===== Modal Handlers =====
  const handleAddJob = () => {
    setSelectedJob(null);
    setShowModal(true);
  };
  const handleEditJob = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  // ===== Filter & Pagination =====
  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.jobCode.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const Pagination = () =>
    totalPages > 1 && (
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination pagination-sm gap-1 shadow-sm rounded-pill p-2 bg-light">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link rounded-pill px-2"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ⬅ Prev
            </button>
          </li>

          {Array.from({ length: totalPages }).map((_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className={`page-link rounded-pill px-3 fw-semibold ${currentPage === i + 1
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark"
                  }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link rounded-pill px-2"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next ➡
            </button>
          </li>
        </ul>
      </nav>
    );

  // ===== Render Job Table =====
  const renderJobTable = () => (
    <div className="tw-bg-white tw-shadow-xl tw-rounded-3xl tw-p-4 tw-border tw-border-gray-200">
      <div className="tw-overflow-x-auto">
        <table className="tw-w-full tw-text-left tw-border-collapse">
          <thead className="tw-bg-gray-100 tw-text-gray-700">
            <tr>
              <th className="tw-px-4 tw-py-3 tw-font-semibold">Code</th>
              <th className="tw-px-4 tw-py-3 tw-font-semibold">Title</th>
              <th className="tw-px-4 tw-py-3 tw-font-semibold">Company</th>
              <th className="tw-px-4 tw-py-3 tw-font-semibold">Location</th>
              <th className="tw-px-4 tw-py-3 tw-font-semibold">Type</th>
              <th className="tw-px-4 tw-py-3 tw-font-semibold">Status</th>
              <th className="tw-px-4 tw-py-3 tw-font-semibold tw-text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <motion.tr
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.002 }}
                    transition={{ duration: 0.25 }}
                    className="tw-transition hover:tw-bg-gray-50"
                  >
                    <td className="tw-px-4 tw-py-3 tw-font-semibold tw-text-gray-700">
                      {job.jobCode}
                    </td>

                    <td className="tw-px-4 tw-py-3 tw-font-bold tw-text-gray-900">
                      {job.title}
                    </td>

                    <td className="tw-px-4 tw-py-3 tw-text-gray-700">
                      {job.company?.name}
                    </td>

                    <td className="tw-px-4 tw-py-3 tw-text-gray-700">
                      {job.locations?.[0]?.city || ""}, {job.locations?.[0]?.state || ""}
                    </td>

                    <td className="tw-px-4 tw-py-3">
                      <span className="tw-inline-block tw-rounded-full tw-px-3 tw-py-1 tw-font-semibold tw-text-white tw-bg-gradient-to-r tw-from-purple-500 tw-to-indigo-600 tw-shadow-md tw-transition tw-duration-300 hover:tw-scale-105">
                        {job.type}
                      </span>
                    </td>


                    <td className="tw-px-4 tw-py-3">
                      <span className="tw-inline-block tw-rounded-full tw-px-3 tw-py-1 tw-font-semibold tw-text-white tw-bg-gradient-to-r tw-from-green-400 tw-to-green-600 tw-shadow-md tw-transition tw-duration-300 hover:tw-scale-105">
                        {job.status}
                      </span>
                    </td>


                    <td className="tw-px-4 tw-py-3 tw-text-center">
                      <div className="tw-flex tw-justify-center tw-gap-2">
                        {/* EDIT BUTTON */}
                        <button
                          onClick={() => handleEditJob(job)}
                          className="tw-w-9 tw-h-9 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-text-white
                 tw-bg-gradient-to-r tw-from-cyan-400 tw-to-blue-600
                 hover:tw-from-cyan-500 hover:tw-to-blue-700
                 tw-shadow-md tw-transition tw-duration-300 hover:tw-scale-105"
                        >
                          <i className="bi bi-pencil tw-text-lg"></i>
                        </button>

                        {/* DELETE BUTTON COMPONENT */}
                        <DeleteButton
                          jobId={job._id}
                          onDelete={handleDeleteJob}
                          small={true}
                        // Optional: You can pass custom gradient props if DeleteButton supports it
                        // gradientFrom="red-500" gradientTo="red-600"
                        />
                      </div>
                    </td>

                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="tw-text-center tw-text-gray-400 tw-py-8 tw-font-medium"
                  >
                    No matching jobs found.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="tw-mt-4">
        <Pagination />
      </div>
    </div>
  );




  // ===== Render Job Cards =====
  const renderJobCards = () => (
    <div>
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="tw-w-full"
            >
              <div
                className="
                tw-h-full tw-rounded-2xl tw-p-5 
                tw-shadow-lg tw-border tw-border-white/10
                tw-bg-white/10 tw-backdrop-blur-xl
                hover:tw-scale-[1.015] tw-transition tw-duration-300
              "
              >
                {/* TITLE */}
                <h5 className="tw-text-xl tw-font-semibold tw-mb-1">
                  {job.title}
                </h5>

                {/* COMPANY */}
                <p className="tw-text-gray-700 tw-font-medium tw-mb-1">
                  {job.company?.name}
                </p>

                {/* LOCATION */}
                <p className="tw-text-sm tw-text-gray-600">
                  {job.locations?.[0]?.city || ""},{" "}
                  {job.locations?.[0]?.state || ""}
                </p>

                {/* BADGES */}
                <div className="tw-flex tw-gap-2 tw-mt-3">
                  <span
                    className="
                    tw-text-white tw-text-xs tw-font-semibold 
                    tw-rounded-full tw-px-3 tw-py-1.5 
                    tw-bg-gradient-to-r tw-from-indigo-600 tw-to-blue-500
                  "
                  >
                    {job.type}
                  </span>

                  <span
                    className="
                    tw-text-white tw-text-xs tw-font-semibold 
                    tw-rounded-full tw-px-3 tw-py-1.5 
                    tw-bg-gradient-to-r tw-from-pink-500 tw-to-red-500
                  "
                  >
                    {job.status}
                  </span>
                </div>

                {/* BUTTONS */}
                <div className="tw-flex tw-justify-between tw-mt-5">
                  <button
                    className="
                    tw-flex tw-items-center tw-gap-2
                    tw-text-white tw-text-sm tw-font-medium
                    tw-rounded-full tw-px-4 tw-py-1.5
                    tw-bg-gradient-to-r tw-from-cyan-400 tw-to-blue-600
                    hover:tw-scale-105 tw-transition
                  "
                    onClick={() => handleEditJob(job)}
                  >
                    <i className="bi bi-pencil"></i>
                    Edit
                  </button>

                  <DeleteButton
                    jobId={job._id}
                    handleDeleteJob={handleDeleteJob}
                  />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="tw-text-center tw-text-gray-500 tw-py-10 tw-col-span-3">
            No jobs found.
          </div>
        )}
      </div>

      <Pagination />
    </div>
  );

  // ===== Render Users =====
  const renderUsers = () => (
    <div className="tw-overflow-x-auto tw-w-full">
      <div className="tw-shadow-md tw-rounded-2xl tw-bg-white tw-border tw-border-gray-100">
        <table className="tw-min-w-full tw-divide-y tw-divide-gray-200 tw-table-auto">
          <thead className="tw-bg-gray-50">
            <tr>
              <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-700 tw-uppercase">Full Name</th>
              <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-700 tw-uppercase">Username</th>
              <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-700 tw-uppercase">Email</th>
              <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-700 tw-uppercase">Work Status</th>
              <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-700 tw-uppercase">Mobile</th>
              <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-700 tw-uppercase">Role</th>
              <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-semibold tw-text-gray-700 tw-uppercase">Status</th>
              <th className="tw-px-4 tw-py-3 tw-text-center tw-text-xs tw-font-semibold tw-text-gray-700 tw-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="tw-bg-white tw-divide-y tw-divide-gray-200">
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="tw-align-middle tw-transition-all tw-duration-300 hover:tw-bg-gray-50">
                  <td className="tw-px-4 tw-py-3 tw-font-medium tw-text-gray-900">{u.fullName}</td>
                  <td className="tw-px-4 tw-py-3 tw-text-gray-500">{u.username}</td>
                  <td className="tw-px-4 tw-py-3 tw-text-gray-500 tw-truncate" style={{ maxWidth: "180px" }}>{u.email}</td>
                  <td className="tw-px-4 tw-py-3">
                    <span className={`tw-inline-block tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold ${u.workStatus === "Working" ? "tw-bg-green-100 tw-text-green-800" : "tw-bg-blue-100 tw-text-blue-800"}`}>
                      {u.workStatus}
                    </span>
                  </td>
                  <td className="tw-px-4 tw-py-3">{u.mobile || "-"}</td>
                  <td className="tw-px-4 tw-py-3">
                    <span className="tw-inline-block tw-bg-indigo-100 tw-text-indigo-800 tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="tw-px-4 tw-py-3">
                    <span className={`tw-inline-block tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold ${u.isBlocked ? "tw-bg-red-100 tw-text-red-800" : "tw-bg-green-100 tw-text-green-800"}`}>
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="tw-px-4 tw-py-3 tw-text-center">
                    <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-2">
                      <button
                        className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-transition-colors tw-duration-300 ${u.isBlocked ? "tw-bg-green-500 tw-text-white hover:tw-bg-green-600" : "tw-bg-yellow-400 tw-text-white hover:tw-bg-yellow-500"}`}
                        onClick={() => handleBlockUnblock(u._id)}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>

                      <button
                        className="tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-border tw-border-red-400 tw-text-red-500 hover:tw-bg-red-50 tw-transition-colors tw-duration-300"
                        onClick={() => handleDeleteUser(u._id)}
                      >
                        Delete
                      </button>

                      <button className="tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold tw-border tw-border-blue-400 tw-text-blue-500 hover:tw-bg-blue-50 tw-transition-colors tw-duration-300">
                        Info
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="tw-text-center tw-text-gray-400 tw-py-10">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );


  return (
    <div className="container-fluid min-vh-100 py-4" style={{ background: "#f8fafc" }}>
      <div className="d-flex flex-column flex-md-row justify-content-between mb-4 gap-3">
        <motion.h2 className="fw-bold" style={{ color: "#1f2937" }} initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          Admin Control Center
        </motion.h2>

        {activeTab === "jobs" && (
          <div className="d-flex flex-wrap align-items-center gap-2">
            <input type="text" className="form-control shadow-sm" placeholder="🔍 Search by code, title or company..." style={{ width: "250px", borderRadius: "25px" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <motion.button whileHover={{ scale: 1.05 }} className="btn px-4 rounded-pill shadow-sm text-white" style={{ background: "linear-gradient(90deg,#6366f1,#14b8a6)" }} onClick={handleAddJob}>
              + Add Job
            </motion.button>
            <button className="btn btn-outline-secondary rounded-pill" onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}>
              <i className={`bi ${viewMode === "table" ? "bi-grid" : "bi-list"}`}></i>{viewMode === "table" ? " Card View" : " Table View"}
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {["jobs", "user", "settings"].map((tab) => (
          <button key={tab} className={`btn rounded-pill px-4 fw-semibold ${activeTab === tab ? "text-white" : "btn-outline-primary text-dark"}`}
            style={activeTab === tab ? { background: "linear-gradient(90deg,#6366f1,#14b8a6)" } : {}}
            onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white shadow-sm rounded-4 p-4">
        {activeTab === "jobs"
          ? (viewMode === "table" ? renderJobTable() : renderJobCards())
          : activeTab === "user"
            ? renderUsers()
            // : activeTab === "candidates"
            // ? <div className="text-muted">Candidates list will appear here.</div>
            : activeTab === "Setting"
              ? "Applications list will appear here."
              : < AdminSettings />}
      </motion.div>

      <JobFormModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSaveJob} job={selectedJob} />
    </div>
  );
};

export default AdminController;

