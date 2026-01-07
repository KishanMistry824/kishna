// // CompanyDetails.jsx
import React from "react";
import { useParams,  } from "react-router-dom";
import companies from "../../../Data/companys.json";

const CompanyDetails = () => {
  const { companyId } = useParams();
  const company = companies.find(
    (c) => c.company.toLowerCase().replaceAll(" ", "") === companyId.toLowerCase()
  );

  if (!company) {
    return <div className="container my-5 text-danger">Company not found.</div>;
  }

  return (
    <section className="container my-5">
      {/* <Link to="/top-companies" className="btn btn-sm btn-secondary mb-3">
        ← Back to Companies
      </Link> */}

      <div className="card shadow p-4">
        <div className="text-center mb-3">
          <img src={`Image/${company.logo.png}`} alt={company.company} style={{ height: "70px" }} />
          <h3 className="mt-2">{company.company}</h3>
          <p className="text-muted">{company.headOffice} | {company.industry}</p>
          <p>Rating: ⭐ {company.companyRating}</p>
          <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
            Visit Company Website ↗
          </a>
        </div>

        <p><strong>Description:</strong> {company.description}</p>
        <p><strong>Hiring Process:</strong> {company.hiringProcess}</p>
        <p><strong>Tech Stack:</strong> {company.techStack?.join(", ")}</p>
        <p><strong>Why Join Us:</strong> {company.whyJoinUs}</p>
        <p><strong>Interview Tips:</strong> {company.interviewTips}</p>

        <hr />
        <h5 className="mt-4">📋 Available Jobs:</h5>
        {company.jobs?.length > 0 ? (
          <ul className="list-group">
            {company.jobs.map((job, index) => (
              <li key={index} className="list-group-item">
                <strong>{job.title}</strong> — {job.location} — {job.type} — {job.salary}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No job listings available.</p>
        )}
      </div>
    </section>
  );
};

export default CompanyDetails;
