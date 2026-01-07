// TopCompanies.jsx
import React from "react";
import { Link } from "react-router-dom";
import companies from "../../Data/companys.json"; // Updated path
import CompanyCard from "../JobsComponents/companycompontes/CompanyCard"; // Updated path

const TopCompanies = () => {
  const topFive = companies.slice(0, 5); // First 5 companies only

  return (
    <section className="container my-5">
      <h3 className="text-center mb-4">🏢 Top Hiring Companies</h3>

      <div className="row justify-content-center">
        {topFive.map((company, idx) => (
          <div
            key={idx}
            className={`col-md-4 mb-4 ${idx > 2 ? "col-md-6" : ""}`}
          >
            <CompanyCard company={company} />
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <Link to="/all-company" className="btn btn-primary">
          See All Companies
        </Link>
      </div>
    </section>
  );
};

export default TopCompanies;
