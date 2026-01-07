import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import jobs from "../../Data/jobs.json";

// Optional: Convert ₹ to number (remove commas, symbols)
const parseSalary = (salary) => {
  if (!salary || typeof salary !== "string") return 0;
  const cleaned = salary.replace(/[₹,]/g, "").replace(/\/month|LPA/gi, "").trim();
  if (salary.includes("month")) return parseFloat(cleaned) * 12 / 100000; // approx LPA
  return parseFloat(cleaned);
};

const JobsPerCompanyChart = () => {
  // Build a map of job counts and avg salary per company
  const stats = {};

  jobs.forEach((job) => {
    if (!stats[job.company]) {
      stats[job.company] = { jobs: 0, totalSalary: 0 };
    }
    stats[job.company].jobs += 1;
    stats[job.company].totalSalary += parseSalary(job.salary);
  });

  const chartData = Object.entries(stats).map(([company, data]) => ({
    company,
    jobs: data.jobs,
    avgSalary: +(data.totalSalary / data.jobs).toFixed(2), // in LPA
  }));

  return (
    <section className="container my-5">
      <h4 className="text-center mb-4">📊 Company-Wise Job Stats</h4>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={chartData} margin={{ top: 20, right: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" />
          <YAxis yAxisId="left" label={{ value: "Jobs", angle: -90, position: "insideLeft" }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Avg Salary (LPA)", angle: -90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="jobs" fill="#8884d8" name="Job Count" />
          <Line yAxisId="right" type="monotone" dataKey="avgSalary" stroke="#FF8042" name="Avg Salary (LPA)" />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
};

export default JobsPerCompanyChart;
