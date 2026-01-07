// CompanyCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body text-center">
        <img
          src={company.logo}
          alt={company.company}
          className="img-fluid mb-3"
          style={{ height: "60px" }}
        />
        <h5 className="card-title mb-1">{company.company}</h5>
        <p className="text-muted mb-1">{company.headOffice}</p>
        <p className="text-muted small mb-2">Industry: {company.industry}</p>
        <p className="text-warning mb-2">⭐ {company.companyRating}</p>
        <Link to={`/top-companies/${company.company.toLowerCase()}`} className="btn btn-outline-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
