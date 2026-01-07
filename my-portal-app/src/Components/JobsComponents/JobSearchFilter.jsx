import React from "react";

const JobSearchFilter = ({
  filters,
  onFilterChange,
  jobTitles,
  companies,
  locations,
  categories,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClear = () => {
    onFilterChange("title", "");
    onFilterChange("location", "");
    onFilterChange("type", "");
    onFilterChange("company", "");
    onFilterChange("category", "");
    onFilterChange("salary", "");
  };

  return (
    <section
      className="container my-5"
      style={{
        background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
      }}
    >
      <div className="p-4 rounded-4 shadow-lg">
        <h3 className="mb-4 text-center fw-bold">🔍 Find Your Dream Job</h3>

        <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="col-md-4">
            <label className="form-label">Job Title</label>
            <select
              className="form-select border-0 shadow-sm"
              value={filters.title}
              onChange={(e) => onFilterChange("title", e.target.value)}
            >
              <option value="">All Titles</option>
              {jobTitles.map((title, idx) => (
                <option key={idx} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Company */}
          <div className="col-md-4">
            <label className="form-label">Company</label>
            <select
              className="form-select border-0 shadow-sm"
              value={filters.company}
              onChange={(e) => onFilterChange("company", e.target.value)}
            >
              <option value="">All Companies</option>
              {companies.map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="col-md-4">
            <label className="form-label">Location</label>
            <select
              className="form-select border-0 shadow-sm"
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div className="col-md-4">
            <label className="form-label">Job Type</label>
            <select
              className="form-select border-0 shadow-sm"
              value={filters.type}
              onChange={(e) => onFilterChange("type", e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Category */}
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select
              className="form-select border-0 shadow-sm"
              value={filters.category}
              onChange={(e) => onFilterChange("category", e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div className="col-md-4">
            <label className="form-label">Minimum Salary</label>
            <select
              className="form-select border-0 shadow-sm"
              value={filters.salary}
              onChange={(e) => onFilterChange("salary", e.target.value)}
            >
              <option value="">Any</option>
              <option value="10000">₹10,000+</option>
              <option value="20000">₹20,000+</option>
              <option value="50000">₹50,000+</option>
              <option value="100000">₹1,00,000+</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-md-12 d-flex justify-content-end gap-3">
            <button type="submit" className="btn btn-primary px-4 shadow-sm">
              Apply Filters
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary shadow-sm"
              onClick={handleClear}
            >
              Clear All
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobSearchFilter;
