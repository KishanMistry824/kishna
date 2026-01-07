import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import jobsData from "../../Data/Jobs/JobsData.json";

const JOBS_PER_PAGE = 5;

const ModernJobsListWithLogo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(jobsData || []);
  }, []);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const visibleJobs = jobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  return (
    <div className="container my-1">
      <h2 className="mb-4 text-center">🚀 Explore Jobs</h2>

      <div className="d-flex flex-column gap-4">
        {visibleJobs.length > 0 ? (
          visibleJobs.map((job) => (
            <div
              key={job.id || Math.random()}
              className="modern-job-card position-relative p-3 rounded shadow-sm border d-flex align-items-start gap-3"
            >
              {/* Company Logo */}
              <div style={{ flexShrink: 0 }}>
                {job.Logo ? (
                  <img
                    src={job.Logo}
                    alt="Company Logo"
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "contain",
                      borderRadius: 8,
                      background: "#f5f5f5",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                      background: "#e0e0e0",
                    }}
                  ></div>
                )}
              </div>

              {/* Card Content */}
              <div className="flex-grow-1">
                {/* Featured Badge */}
                {job.isFeatured && (
                  <span className="badge bg-warning text-dark mb-2">Featured</span>
                )}

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="fw-bold mb-1">{job.title}</h5>
                    <div className="d-flex align-items-center text-muted small">
                      <span>{job.company}</span>
                      {job.rating && (
                        <>
                          <i className="bi bi-star-fill text-warning ms-2 me-1"></i>
                          <span>{job.rating}</span>
                          <span className="ms-1">({job.reviewCount || 0} Reviews)</span>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Save Icon */}
                  <div className="save-icon" title="Save Job">
                    <i className="bi bi-heart"></i>
                  </div>
                </div>

                {/* Details Row */}
                <div className="d-flex flex-wrap align-items-center text-muted mb-2 gap-3 small mt-2">
                  {job.experienceLevel && (
                    <span><i className="bi bi-briefcase me-1"></i>{job.experienceLevel}</span>
                  )}
                  {job.Location && (
                    <span><i className="bi bi-geo-alt me-1"></i>{job.Location}</span>
                  )}
                  {job.description && (
                    <span className="text-truncate" style={{ maxWidth: "250px" }} title={job.description}>
                      {job.description}
                    </span>
                  )}
                </div>

                {/* Skill Tags */}
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {job.tags?.map((tag, i) => (
                    <span key={i} className="badge tag-gradient" title={`Skill: ${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-2">
                  <small className="text-muted">{job.postedAt ? `Posted: ${job.postedAt}` : ""}</small>
                  {job.applyUrl && (
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gradient btn-sm">
                      Apply Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-danger">
            <p>No jobs available 😔</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
          <button className="btn btn-outline-primary btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            ⏮ Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-sm ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button className="btn btn-outline-primary btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next ⏭
          </button>
        </div>
      )}

      {/* Styles */}
      <style>
        {`
          .modern-job-card {
            background: #fff;
            transition: all 0.3s ease;
          }
          .modern-job-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.15);
          }
          .save-icon {
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
          }
          .save-icon:hover {
            background: #e2e6ea;
          }
          .tag-gradient {
            font-size: 0.75rem;
            padding: 4px 8px;
            border-radius: 12px;
            background: linear-gradient(90deg, #6c63ff, #00bfff);
            color: #fff;
            cursor: pointer;
            transition: all 0.3s;
          }
          .tag-gradient:hover {
            transform: scale(1.05);
            opacity: 0.9;
          }
          .btn-gradient {
            background: linear-gradient(90deg, #6c63ff, #00bfff);
            border: none;
            color: #fff;
            transition: all 0.3s;
          }
          .btn-gradient:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </div>
  );
};

export default ModernJobsListWithLogo;
