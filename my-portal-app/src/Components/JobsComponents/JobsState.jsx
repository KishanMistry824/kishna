import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import jobs from "../../Data/jobs.json"; // path to your job JSON
import companies from "../../Data/companys.json";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const JobStats = () => {
  const totalJobs = jobs.length;
  const totalCompanies = companies.length;

  // Count job types
  const jobTypesCount = jobs.reduce(
    (acc, job) => {
      acc[job.type] = (acc[job.type] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieData = Object.keys(jobTypesCount).map((type) => ({
    name: type,
    value: jobTypesCount[type],
  }));

  return (
    <section className="container my-5">
      <h3 className="text-center mb-4">📊 Job Analytics Overview</h3>

      <div className="row text-center mb-4">
        <div className="col-md-4">
          <h5>Total Jobs</h5>
          <p className="fw-bold">{totalJobs}</p>
        </div>
        <div className="col-md-4">
          <h5>Total Companies</h5>
          <p className="fw-bold">{totalCompanies}</p>
        </div>
        <div className="col-md-4">
          <h5>Job Types</h5>
          <p className="fw-bold">{Object.keys(jobTypesCount).length}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export default JobStats;
