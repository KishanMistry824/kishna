import React from "react";

// Gradient colors for industries
const industryGradients = {
  Tech: "linear-gradient(90deg, #007cf0, #00dfd8)",
  AI: "linear-gradient(90deg, #f7971e, #ffd200)",
  Automotive: "linear-gradient(90deg, #ff416c, #ff4b2b)",
  Finance: "linear-gradient(90deg, #11998e, #38ef7d)",
  Cloud: "linear-gradient(90deg, #00c6ff, #0072ff)",
  Database: "linear-gradient(90deg, #6a11cb, #2575fc)",
  Enterprise: "linear-gradient(90deg, #333333, #555555)",
};

const PopularCompanyCard = ({ title, imageSrc, industry, jobCount }) => {
  const gradient = industryGradients[industry] || "linear-gradient(90deg, #ccc, #999)";

  return (
    <article className="col-6 col-md-4 col-lg-3 d-flex">
      <a
        href={`/job-filters?company=${encodeURIComponent(title)}`}
        className="card text-center bg-white shadow-lg w-100 card-hover text-decoration-none"
        aria-label={`View ${jobCount} jobs at ${title}`}
        style={{
          borderRadius: "20px",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          overflow: "hidden",
        }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
          {/* Logo */}
          <div
            className="logo-container mb-3"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(0,0,0,0.05)",
              transition: "all 0.4s ease",
            }}
          >
            <img
              src={imageSrc}
              alt={`${title} company logo`}
              loading="lazy"
              style={{
                height: "60px",
                width: "60px",
                objectFit: "contain",
                borderRadius: "50%",
                transition: "all 0.4s ease",
              }}
              className="logo-img"
            />
          </div>

          {/* Title + Badge */}
          <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: "1rem" }}>
            {title}
          </h6>
          <span
            className="industry-badge mb-1"
            style={{
              background: gradient,
              color: "#fff",
              padding: "4px 12px",
              borderRadius: "50px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.5px",
              transition: "all 0.4s ease",
            }}
          >
            {industry}
          </span>

          <p className="text-muted small mt-2 mb-0">{jobCount} open jobs</p>
        </div>

        <style jsx="true">{`
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          }
          .card-hover:hover .logo-img {
            transform: scale(1.15);
          }
          .card-hover:focus-visible {
            outline: 3px solid #00dfd8;
            outline-offset: 4px;
          }
        `}</style>
      </a>
    </article>
  );
};

export default PopularCompanyCard;
