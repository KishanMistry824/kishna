import React from "react";

const JobsCard = ({ job }) => {
  const renderTags = (tags) => {
    return tags?.map((tag, index) => {
      let emoji = "";
      if (tag.toLowerCase() === "urgent") emoji = "🚀";
      else if (tag.toLowerCase() === "remote") emoji = "🌐";
      else if (tag.toLowerCase() === "internship") emoji = "🎓";

      return (
        <span
          key={index}
          className="badge bg-warning text-dark me-2 mb-1"
          style={{ fontSize: "0.75rem" }}
        >
          {emoji} {tag}
        </span>
      );
    });
  };

  return (
    <div className="card h-100 shadow-sm border-0 p-2">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{job.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>

        <div className="mb-2">{renderTags(job.tags)}</div>

        <p className="card-text text-secondary small mb-2">
          📍 {job.location} <br />
          💼 {job.type} <br />
          💰 {job.salary}
        </p>

        <p className="card-text flex-grow-1">{job.description}</p>
      </div>

      <a href="/" className="btn btn-primary mt-auto w-100 mb-1">
        Apply Now
      </a>
    </div>
  );
};

export default JobsCard;
