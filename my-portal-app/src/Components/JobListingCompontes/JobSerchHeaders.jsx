import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchSection() {
  const cities = [
    "Delhi / NCR", "Bengaluru", "Mumbai (All Areas)", "Hyderabad", "Pune",
    "New Delhi", "Chennai", "Gurugram", "Noida", "Ahmedabad", "Kolkata",
    "Jaipur", "Surat", "Vadodara", "Kochi", "Lucknow", "Indore", "Nagpur",
  ];

  const searchSuggestions = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist",
    "UI/UX Designer", "DevOps Engineer", "Product Manager", "QA Engineer",
    "Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Accenture", "Cognizant",
    "Remote", "Internship", "Work From Home", "Startup", "MNC (Multinational Corporation)",
    "Contract", "JavaScript", "React.js", "Node.js", "Python", "Java", "AWS", "Teaching"
  ];

  const [keyword, setKeyword] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const queryParams = new URLSearchParams();
  if (keyword) queryParams.append("keyword", keyword);
  if (experience) queryParams.append("experience", experience);
  if (location) queryParams.append("location", location);

  const searchUrl = `/job-filters?${queryParams.toString()}`;

  const handleSaveRecent = () => {
    if (keyword || experience || location) {
      const searchText = `${keyword}${experience ? `, ${experience}` : ""}${location ? `, ${location}` : ""}`;
      setRecentSearches([searchText, ...recentSearches]);

      setKeyword("");
      setExperience("");
      setLocation("");
    }
  };

  return (
    <div
      className="text-center py-5"
      // style={{
      //   background: "linear-gradient(135deg, #eef2f3 50%, #8e9eab 100%)", // updated gradient
      // }}
    >
      <h2 className="fw-bold">
        Find your <span className="text-primary fw-lighter">dream job</span> now
      </h2>
      <p className="text-muted">5 lakh+ jobs for you to explore</p>

      {/* Search bar */}
      <div
        className="d-flex align-items-center p-2 shadow-sm rounded-pill mx-auto mb-4"
        style={{ maxWidth: "900px", background: "white" }}
      >
        <i className="bi bi-search ms-3 text-secondary"></i>

        <input
          type="text"
          placeholder="Search by job role, company, or tag"
          className="form-control border-0 shadow-none ms-2"
          list="keywordOptions"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <datalist id="keywordOptions">
          {searchSuggestions.map((s, i) => (
            <option key={i} value={s} />
          ))}
        </datalist>

        <select
          className="form-select border-0 shadow-none"
          style={{ maxWidth: "200px" }}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">Select experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 Years">1-3 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>

        <input
          type="text"
          placeholder="Enter location"
          className="form-control border-0 shadow-none"
          list="cityOptions"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <datalist id="cityOptions">
          {cities.map((c, i) => (
            <option key={i} value={c} />
          ))}
        </datalist>

        <Link
          to={searchUrl}
          className="btn btn-primary rounded-pill px-4 ms-2"
          onClick={handleSaveRecent}
        >
          Search
        </Link>
      </div>

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <div className="mb-4 d-flex flex-wrap justify-content-center gap-2">
          {recentSearches.map((item, idx) => (
            <span
              key={idx}
              className="badge rounded-pill text-dark border p-2 px-3"
              style={{ background: "#f8f9fa" }}
            >
              <i className="bi bi-arrow-repeat me-1"></i>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
