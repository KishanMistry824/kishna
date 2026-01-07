import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JobCard = ({ job, user }) => {
  const storedUserId = localStorage.getItem("userId");
  const finalUserId = user?._id || storedUserId;

  useEffect(() => {
    console.log("Current userId:", finalUserId);
  }, [finalUserId]);

  const [liked, setLiked] = useState(
    job.likedBy?.some((id) => id.toString() === finalUserId)
  );
  const [saved, setSaved] = useState(
    job.savedBy?.some((id) => id.toString() === finalUserId)
  );
  const [views, setViews] = useState(job.views || 0);

  const toggleLike = async (jobCode) => {
    if (!finalUserId) return;
    try {
      setLiked((prev) => !prev);
      const res = await axios.put(
        `http://localhost:5000/api/jobs/code/${jobCode}/like`,
        { userId: finalUserId }
      );
      setLiked(res.data.liked);
    } catch {
      setLiked((prev) => !prev);
    }
  };

  const toggleSave = async (jobCode) => {
    if (!finalUserId) return;
    try {
      setSaved((prev) => !prev);
      const res = await axios.put(
        `http://localhost:5000/api/jobs/code/${jobCode}/save`,
        { userId: finalUserId }
      );
      setSaved(res.data.saved);
    } catch {
      setSaved((prev) => !prev);
    }
  };

  const handleViewDetails = async (jobCode) => {
    try {
      setViews((prev) => prev + 1);
      await axios.put(`http://localhost:5000/api/jobs/code/${jobCode}/view`);
    } catch {
      setViews((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "Internship":
        return { background: "linear-gradient(135deg,#60a5fa,#93c5fd)", color: "#fff" };
      case "Contract":
        return { background: "linear-gradient(135deg,#fb923c,#fbbf24)", color: "#fff" };
      case "Full-time":
        return { background: "linear-gradient(135deg,#22c55e,#86efac)", color: "#fff" };
      case "Part-time":
        return { background: "linear-gradient(135deg,#a855f7,#c084fc)", color: "#fff" };
      case "Remote":
        return { background: "linear-gradient(135deg,#94a3b8,#475569)", color: "#fff" };
      default:
        return { background: "#f3f4f6", color: "#374151" };
    }
  };

  return (
    <div
      className={`modern-job-card p-4 rounded-4 border-0 d-flex align-items-start gap-4 mb-4 ${
        job.isFeatured ? "border border-primary" : ""
      }`}
      style={{
        background: "linear-gradient(145deg,#ffffff 0%,#f9fafc 100%)",
        border: job.isFeatured
          ? "2px solid transparent"
          : "1px solid rgba(229,231,235,0.7)",
        borderImage: job.isFeatured
          ? "linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6) 1"
          : "none",
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.06)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
        cursor: "pointer",
        animation: "fadeInUp 0.6s ease both",
      }}
      tabIndex="0"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
        e.currentTarget.style.boxShadow =
          "0 12px 32px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 2px 4px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.06)";
      }}
    >
      {/* Logo */}
      <div
        className="shadow-sm p-2 rounded-3 d-flex align-items-center justify-content-center"
        style={{
          flexShrink: 0,
          width: 80,
          height: 80,
          background: "linear-gradient(135deg,#eef2ff,#f9fafb)",
          border: "1px solid #e5e7eb",
          transition: "all 0.3s ease",
        }}
      >
        {job.company?.logoUrl ? (
          <img
            src={job.company.logoUrl}
            alt="Logo"
            style={{
              width: 70,
              height: 70,
              objectFit: "contain",
              borderRadius: 12,
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ) : (
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 12,
              background: "#f1f5f9",
            }}
          />
        )}
      </div>

      {/* Job Details */}
      <div className="flex-grow-1 pe-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start flex-wrap">
          <div>
            <h5
              className="fw-bold mb-1"
              style={{
                fontSize: "1.35rem",
                color: "#111827",
                letterSpacing: "-0.3px",
              }}
            >
              <Link
                to={`/jobs/${job._id}`}
                className="text-decoration-none"
                style={{ color: "#111827", transition: "color 0.25s ease" }}
                onClick={() => handleViewDetails(job.jobCode)}
                onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
                onMouseLeave={(e) => (e.target.style.color = "#111827")}
              >
                {job.title}
              </Link>
            </h5>
            <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
              {job.company?.name}
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
            {/* Save */}
            <button
              className="btn rounded-circle border shadow-sm ripple"
              style={{
                width: 40,
                height: 40,
                fontSize: "1.2rem",
                background: saved ? "#fef3c7" : "#f9fafb",
                color: saved ? "#b45309" : "#4b5563",
                transition: "all 0.3s ease",
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(job.jobCode);
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <i className={`bi ${saved ? "bi-bookmark-fill" : "bi-bookmark"}`} />
            </button>

            {/* Like */}
            <button
              className="btn rounded-circle border shadow-sm ripple"
              style={{
                width: 40,
                height: 40,
                fontSize: "1.2rem",
                background: liked
                  ? "linear-gradient(135deg,#fee2e2,#fca5a5)"
                  : "#f9fafb",
                color: liked ? "#b91c1c" : "#4b5563",
                transition: "all 0.3s ease",
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(job.jobCode);
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
            </button>

            {/* Type */}
            {job.type && (
              <span
                className="badge rounded-pill shadow-sm fw-semibold px-3 py-2"
                style={{
                  ...getTypeStyle(job.type),
                  fontSize: "0.8rem",
                  letterSpacing: "0.3px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {job.type}
              </span>
            )}
          </div>
        </div>

        {/* Salary & Remote */}
        <div className="mt-2 small">
          {job.salary?.min && job.salary?.max && (
            <span style={{ color: "#059669", fontWeight: 600 }}>
              {/* 💰  */}
              ₹ {job.salary.min} - {job.salary.max} {job.salary.currency || ""}
            </span>
          )}
          {job.remoteOptions && (
            <span className="ms-3 text-muted">🌐 {job.remoteOptions}</span>
          )}
        </div>

        {/* Meta */}
        <div
          className="grid-container mt-3 p-3 rounded-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            background: "linear-gradient(135deg,#f8fafc,#f1f5f9)",
            gap: "0.6rem",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            fontSize: "0.85rem",
            color: "#6b7280",
          }}
        >
          {job.experienceLevel && (
            <div>
              <i className="bi bi-briefcase me-1" /> {job.experienceLevel}
            </div>
          )}
          {job.locations?.length > 0 && (
            <div>
              <i className="bi bi-geo-alt me-1" /> {job.locations[0].city},{" "}
              {job.locations[0].state}
            </div>
          )}
          <div>
            <i className="bi bi-eye me-1" /> {views} views
          </div>
        </div>

        {/* Benefits */}
        {job.benefits?.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-3">
            {job.benefits.map((b, i) => (
              <span
                key={i}
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                  color: "#1e40af",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {job.tags?.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-3">
            {job.tags.map((tag, i) => (
              <span
                key={i}
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "linear-gradient(135deg,#fef3c7,#fde68a)",
                  color: "#92400e",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          className="d-flex justify-content-between align-items-center flex-wrap mt-4 pt-3 border-top border-light-subtle"
          style={{ gap: "0.75rem" }}
        >
          <small style={{ color: "#9ca3af" }}>
            📅 {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : ""}
            {job.deadline &&
              ` | ⏳ Apply before: ${new Date(job.deadline).toLocaleDateString()}`}
          </small>

          {job.jobCode && (
            <Link
              to={`/job-details/code/${job.jobCode}`}
              className="btn btn-sm rounded-pill fw-semibold shadow-sm"
              style={{
                background:
                  "linear-gradient(135deg,#6366f1,#4f46e5,#3b82f6)",
                color: "#fff",
                padding: "0.55rem 1.3rem",
                border: "none",
                boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              onClick={() => handleViewDetails(job.jobCode)}
            >
              View Details →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple entrance animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeInUp {
  from {opacity:0; transform:translateY(15px);}
  to {opacity:1; transform:translateY(0);}
}
`;
document.head.appendChild(style);

export default JobCard;
