import React, { useState } from "react";
import JobsCard from "./JobsCard";
import JobFilter from "../JobsComponents/JobSearchFilter";
import jobData from "../../Data/jobs.json";

const JOBS_PER_PAGE = 12;

const JobList = () => {
  const [filters, setFilters] = useState({
    title: [],
    location: [],
    type: [],
    company: [],
    category: [],
    salary: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredJobs = jobData.filter((job) => {
    const match = (field, selectedValues) =>
      selectedValues.length === 0 || selectedValues.includes(job[field]);

    const jobSalaryNum = parseInt(job.salary.replace(/[^\d]/g, ""));
    const filterSalaryNum = parseInt(filters.salary.replace(/[^\d]/g, ""));
    const salaryMatch =
      filters.salary === "" || jobSalaryNum >= filterSalaryNum;

    return (
      match("title", filters.title) &&
      match("location", filters.location) &&
      match("type", filters.type) &&
      match("company", filters.company) &&
      match("category", filters.category) &&
      salaryMatch
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const visibleJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  // Unique filter values
  const getUniqueValues = (key) => [...new Set(jobData.map((job) => job[key]))];
  const jobTitles = getUniqueValues("title");
  const companies = getUniqueValues("company");
  const locations = getUniqueValues("location");
  const categories = getUniqueValues("category");
  const types = getUniqueValues("type");

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">🎯 Available Jobs</h2>
      <JobFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        jobTitles={jobTitles}
        companies={companies}
        locations={locations}
        categories={categories}
        types={types}
      />

      <div className="row mt-4">
        {visibleJobs.length > 0 ? (
          visibleJobs.map((job) => (
            <div className="col-md-6 col-lg-4 mb-4" key={job.id}>
              <JobsCard job={job} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-danger">
            <p>No matching jobs found 😔</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ⏮ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next ⏭
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;
