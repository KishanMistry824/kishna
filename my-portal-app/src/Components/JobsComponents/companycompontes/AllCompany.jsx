// AllCompanies.jsx
import React from "react";
import companies from "../../../Data/companys.json";
import CompanyCard from "./CompanyCard";

const AllCompanies = () => {
  return (
    <section className="container my-5">
      <h3 className="text-center mb-4">🏢 All Partner Companies</h3>

      <div className="row">
        {companies.map((company, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <CompanyCard company={company} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllCompanies;
