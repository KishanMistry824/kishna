import React from "react";
import jobs from "../../Data/jobs.json";

const parseSalary = (salary) => {
  if (!salary || typeof salary !== "string") return 0;
  const cleaned = salary.replace(/[₹,]/g, "").replace(/\/month|LPA/gi, "").trim();
  if (salary.includes("month")) return parseFloat(cleaned) * 12 / 100000;
  return parseFloat(cleaned);
};

const TopPayingCompanies = () => {
  const stats = {};

  jobs.forEach((job) => {
    if (!stats[job.company]) {
      stats[job.company] = { totalSalary: 0, jobCount: 0 };
    }
    stats[job.company].jobCount += 1;
    stats[job.company].totalSalary += parseSalary(job.salary);
  });

  const sortedCompanies = Object.entries(stats)
    .map(([company, data]) => ({
      company,
      jobCount: data.jobCount,
      avgSalary: +(data.totalSalary / data.jobCount).toFixed(2),
    }))
    .sort((a, b) => b.avgSalary - a.avgSalary)
    .slice(0, 5); // top 5 only

  return (
    <section className="container my-5">
      <h4 className="text-center mb-4">🏆 Top Paying Companies</h4>
      <div className="row">
        {sortedCompanies.map((item, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{item.company}</h5>
                <p className="card-text">
                  <strong>Average Salary:</strong> ₹{item.avgSalary} LPA <br />
                  <strong>Open Jobs:</strong> {item.jobCount}
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopPayingCompanies;
