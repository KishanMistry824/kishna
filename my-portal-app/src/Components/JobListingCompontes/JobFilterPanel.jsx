import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import JobCard from "./JobCard";
import NoJobFound from "./NoJobFound";
import { useLocation } from "react-router-dom"; // ✅ added

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
const JOBS_PER_PAGE = 3;

/**
 * JobPortal component renders a job listing page with advanced filtering, searching, and pagination.
 * 
 * Features:
 * - Sidebar filter panel with keyword, experience, company type, category, city, education, work mode, and salary range filters.
 * - Multi-select popups for filter options with search capability.
 * - Fetches jobs from backend API based on selected filters.
 * - Supports liking and saving jobs (requires user authentication).
 * - Pagination for job listings.
 * - Responsive layout with styled UI components.
 * 
 * State:
 * - jobs: Array of job objects fetched from the backend.
 * - loading: Boolean indicating if jobs are being loaded.
 * - filters: Object containing current filter values.
 * - popup: Object controlling the multi-select popup state.
 * - searchTerm: String for searching within popup options.
 * - currentPage: Current page number for pagination.
 * 
 * Dependencies:
 * - React, useState, useEffect, useRef
 * - axios for API requests
 * - react-router's useLocation for URL-based filter syncing
 * - AnimatePresence, motion from framer-motion for popup animation
 * - JobCard and NoJobFound components for job display
 * 
 * @component
 */
const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    keyword: "",
    experience: "",
    companyType: [],
    category: [],
    city: [],
    education: [],
    type: [],
    salaryRange: [],
  });

  const [popup, setPopup] = useState({ section: null, position: { x: 0, y: 0 } });
  const [searchTerm, setSearchTerm] = useState("");
  const popupRef = useRef(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  //  Auth info (only userId + role from localStorage)
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("role");
  // const isAdmin = userRole === "admin";

  //  get current URL
  const location = useLocation();

  //  Load filters from URL on first render
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = { ...filters };

    Object.keys(newFilters).forEach((key) => {
      if (params.has(key)) {
        const value = params.getAll(key);
        if (value.length > 1) {
          newFilters[key] = value;
        } else {
          const v = params.get(key);
          newFilters[key] = Array.isArray(filters[key]) ? [v] : v;
        }
      }
    });

    setFilters(newFilters);
  }, [location.search]); // run whenever URL query changes

  // Options
  const categories = [
    "Accounting & Finance",
    "Administration",
    "Advertising & Marketing",
    "Agriculture & Farming",
    "Architecture & Design",
    "Arts & Media",
    "Automotive",
    "Aviation",
    "Banking",
    "BPO & Customer Service",
    "Construction",
    "Consulting",
    "Data & Analytics",
    "Education & Training",
    "Engineering",
    "FMCG",
    "Government & Public Sector",
    "Healthcare",
    "Hospitality",
    "Human Resources",
    "Information Technology",
    "Insurance",
    "Legal",
    "Logistics & Supply Chain",
    "Manufacturing",
    "Mining & Metals",
    "Oil & Gas",
    "Real Estate",
    "Retail",
    "Telecommunications",
    "Sustainability / Environmental Data",
    "Cybersecurity / Ethical Hacking",
    "Machine Learning / DevOps / Generative AI"
  ];

  const companyTypes = [
    "Private Limited Company (Pvt. Ltd.)",
    "Public Limited Company (Ltd.)",
    "MNC (Multinational Corporation)",
    "Government Organization / PSU",
    "Startup",
    "Service-Based Company",
    "Product-Based Company",
    "Recruitment / Staffing Agency",
    "Educational Institution",
    "Consultancy Firm",
    "Non-Profit Organization / NGO",
  ];

  const cities = [
    "Ahmedabad, Gujarat",
    "Surat, Gujarat",
    "Bengaluru, Karnataka",
    "Chennai, Tamil Nadu",
    "Delhi, Delhi",
    "Mumbai, Maharashtra",
    "Pune, Maharashtra",
    "Hyderabad, Telangana",
    "Kolkata, West Bengal",
    "Jaipur, Rajasthan",
    "Chandigarh, Punjab",
  ];

  const salaryOptions = [
    "0-3 Lakhs",
    "3-6 Lakhs",
    "6-10 Lakhs",
    "10-15 Lakhs",
    "15-25 Lakhs",
    "25-50 Lakhs",
    "50-75 Lakhs",
    "75-100 Lakhs",
    "1-5 Cr",
    "5+ Cr",
  ];
  const educationOptions = [
    "Any Graduate",
    "MBA/PGDM",
    "B.Tech/B.E.",
    "M.Tech",
    "MCA",
    "M.Sc",
    "MBBS",
    "Diploma",
  ];
  const type = ["Full-time", "Part-time", "internship", "Remote", "Hybrid", "Contract"];

  const optionsMap = {
    companyType: companyTypes,
    category: categories,
    city: cities,
    education: educationOptions,
    type: type,
    salaryRange: salaryOptions,
  };

  // Fetch jobs from backend with filters
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = { ...filters };

      // ✅ Only transform if user selected something
      if (params.type?.length > 0) {
        params.type = params.type;  // or keep as type if your backend uses "type"
        delete params.type;
      }

      const res = await axios.get(`${API_BASE}/api/jobs`, {
        params,
        paramsSerializer: (params) =>
          Object.entries(params)
            .filter(([_, val]) => val && (Array.isArray(val) ? val.length : true))
            .map(([key, val]) =>
              Array.isArray(val)
                ? val.map((v) => `${key}=${encodeURIComponent(v)}`).join("&")
                : `${key}=${encodeURIComponent(val)}`
            )
            .join("&"),
      });

      setJobs(res.data || []);
    } catch (err) {
      console.error("Failed fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]); // ✅ re-fetch on filter change

  // Actions 
  const toggleLike = async (jobId) => {
    if (!userId) return alert("Login to like jobs");
    try {
      await axios.put(`${API_BASE}/api/jobs/${jobId}/like`, { userId });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };
  // save button
  const toggleSave = async (jobId) => {
    if (!userId) return alert("Login to save jobs");
    try {
      await axios.put(`${API_BASE}/api/jobs/${jobId}/save`, { userId });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  // const handleDelete = async (jobId) => {
  //   if (!isAdmin) return alert("Admin only");
  //   if (!window.confirm("Delete this job?")) return;
  //   try {
  //     await axios.delete(`${API_BASE}/api/admin/jobs/${jobId}`);
  //     fetchJobs();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // Filter handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleMultiSelect = (e, type) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [type]: checked ? [...(prev[type] || []), value] : (prev[type] || []).filter((i) => i !== value),
    }));
    setCurrentPage(1);
  };

  const handleRemoveTag = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((i) => i !== value),
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      experience: "",
      companyType: [],
      category: [],
      city: [],
      education: [],
      type: [],
      salaryRange: [],
    });
    setCurrentPage(1);
  };

  // Popup
  const openPopup = (section, event) => {
    const rect = event.target.getBoundingClientRect();
    setPopup({
      section,
      position: { x: rect.right + window.scrollX + 10, y: rect.top + window.scrollY },
    });
    setSearchTerm("");
  };

  const filteredItems = () => {
    const items = optionsMap[popup.section] || [];
    if (!searchTerm) return items;
    return items.filter((i) => i.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  // Pagination
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const visibleJobs = jobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  return (
    <div className="container-fluid py-3 bg-light">
      <div className="row">
        {/* Sidebar filters */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-xl rounded-4 overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 d-flex justify-content-between align-items-center"
              style={{
                background: "linear-gradient(135deg, #004e92, #000428)",
                color: "#fff",
                boxShadow: "inset 0 -2px 12px rgba(0,0,0,0.25)",
              }}
            >
              <h5
                className="fw-light mb-0"
                style={{
                  fontSize: "1rem",
                  letterSpacing: "0.6px",
                }}
              >
                <i className="bi bi-search me-2" style={{ color: "white" }} />
                Find Your Perfect Job
              </h5>
            </div>

            {/* Body */}
            <div className="card-body p-4">
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Keyword */}
                <div className="mb-4">
                  <label className="form-label fw-medium small text-secondary">
                    Keyword
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-sm px-3 py-3"
                    style={{
                      border: "1px solid #e5e7eb",
                      transition: "all 0.35s ease",
                    }}
                    name="keyword"
                    placeholder="e.g. Product Designer, Frontend Dev..."
                    value={filters.keyword}
                    onChange={handleChange}
                    onFocus={(e) =>
                    (e.target.style.boxShadow =
                      "0 0 0 0.3rem rgba(0,78,146,0.25)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <label className="form-label fw-medium small text-secondary">
                    Experience
                  </label>
                  <select
                    className="form-select rounded-pill shadow-sm px-3 py-3"
                    style={{
                      border: "1px solid #e5e7eb",
                      transition: "all 0.35s ease",
                    }}
                    name="experience"
                    value={filters.experience}
                    onChange={handleChange}
                    onFocus={(e) =>
                    (e.target.style.boxShadow =
                      "0 0 0 0.3rem rgba(0,78,146,0.25)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  >
                    <option value="">Select Experience</option>
                    <option value="Senior-Level">Senior-Level</option>
                    <option value="Junior-Level">Junior-Level</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Fresher">Fresher</option>
                  </select>
                </div>

                {/* Multi-select sections */}
                {[
                  "companyType",
                  "category",
                  "city",
                  "education",
                  "type",
                  "salaryRange",
                ].map((section) => (
                  <div key={section} className="mb-4 pb-2 border-bottom">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label fw-medium mb-0 small text-secondary">
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </label>
                      <span
                        className="small"
                        style={{
                          cursor: "pointer",
                          color: "#d4af37",
                        }}
                        onClick={(e) => openPopup(section, e)}
                      >
                        <i className="bi bi-plus-circle-fill" style={{ fontSize: "1.1rem" }} />
                      </span>
                    </div>

                    {/* Selected tags */}
                    <div className="mb-2">
                      {filters[section]?.map((item) => (
                        <span
                          key={item}
                          className="badge rounded-pill me-1 mb-2"
                          style={{
                            background: "linear-gradient(135deg, #d4af37, #c5a356)",
                            color: "#fff",
                            fontWeight: 600,
                            padding: "6px 14px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                          onClick={() => handleRemoveTag(section, item)}
                        >
                          {item} ✕
                        </span>
                      ))}
                    </div>

                    {/* Checkboxes */}
                    {optionsMap[section]?.slice(0, 3).map((item) => (
                      <div
                        key={item}
                        className="form-check mb-2 d-flex align-items-center"
                        style={{
                          cursor: "pointer",
                          padding: "6px 10px",
                          borderRadius: "10px",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(212,175,55,0.08)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          style={{
                            accentColor: "#d4af37",
                            cursor: "pointer",
                          }}
                          value={item}
                          onChange={(e) => handleMultiSelect(e, section)}
                          checked={filters[section]?.includes(item)}
                        />
                        <label className="form-check-label small">{item}</label>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Clear Button */}
                <button
                  type="button"
                  className="btn w-100 mt-4 rounded-pill py-3 fw-semibold d-flex justify-content-center align-items-center"
                  style={{
                    background: "linear-gradient(135deg, #004e92, #000428)",
                    color: "#fff",
                    border: "none",
                    fontSize: "1rem",
                    transition: "all 0.4s ease",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 24px rgba(0,0,0,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 18px rgba(0,0,0,0.35)";
                  }}
                  onClick={clearAllFilters}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Clear All Filters
                </button>
              </form>
            </div>
          </div>




        </div>

        {/* Jobs list */}
        <div className="col-md-9">
          {loading &&
            <div>
              {/* Loading tag */}
              Loading...
            </div>
          }
          {!loading && visibleJobs.length === 0 && <div>
            {/* no job found tag */}
            <NoJobFound />
          </div>}
          <div className="d-flex flex-column gap-3">
            {visibleJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                userId={userId}
                // isAdmin={isAdmin}
                toggleLike={toggleLike}
                toggleSave={toggleSave}
                // handleDelete={handleDelete}
                openEditModal={(j) => console.log("Edit modal not implemented", j)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination pagination-sm gap-1 shadow-sm rounded-pill p-2 bg-light">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link rounded-pill px-2"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    ⬅ Prev
                  </button>
                </li>

                {Array.from({ length: totalPages }).map((_, i) => {
                  if (i === 0 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage)) {
                    return (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                        <button
                          className={`page-link rounded-pill px-3 fw-semibold ${currentPage === i + 1 ? "bg-primary text-white shadow-sm" : "text-dark"
                            }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    );
                  } else if (i === currentPage - 3 || i === currentPage + 1) {
                    return (
                      <li key={i} className="page-item disabled">
                        <span className="page-link border-0 bg-transparent">...</span>
                      </li>
                    );
                  }
                  return null;
                })}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link rounded-pill px-2"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next ➡
                  </button>
                </li>
              </ul>
            </nav>
          )}


        </div>
      </div>

      {/* Popup for multi-select */}
      <AnimatePresence>
        {popup.section && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="position-absolute shadow rounded p-3 custom-popup"
            style={{
              top: popup.position.y,
              left: popup.position.x,
              width: "260px",
              zIndex: 1050,
              background: "linear-gradient(135deg, #ffffff, #f7f7f7, #ececec)",
            }}
          >
            <div className="d-flex justify-content-between mb-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn-close ms-2"
                onClick={() =>
                  setPopup({ section: null, position: { x: 0, y: 0 } })
                }
              />
            </div>
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
              }}
              className="custom-scrollbar"
            >
              {filteredItems().map((item) => (
                <div key={item} className="form-check mb-1">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={filters[popup.section]?.includes(item)}
                    onChange={(e) =>
                      handleMultiSelect(
                        {
                          target: {
                            value: item,
                            checked: !filters[popup.section]?.includes(item),
                          },
                        },
                        popup.section
                      )
                    }
                    value={item}
                  />
                  <label className="form-check-label">{item}</label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styled JSX for scrollbar + popup */}
      <style jsx>{`
  .custom-popup {
    border: 1px solid #ddd;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #d1d1d1, #b5b5b5);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #b5b5b5, #999);
  }
`}</style>



    </div>
  );
};

export default JobPortal;     






