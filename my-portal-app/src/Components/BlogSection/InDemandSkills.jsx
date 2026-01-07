import React, { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample skill/job demand data (you can expand this)
const sectorData = [
  {
    sector: "Technology",
    skills: ["AI/ML", "Cybersecurity", "Cloud Computing", "DevOps"],
    demand: [60, 65, 70, 80, 90, 100],
    color: "#0d6efd",
    aiImpact: "High augmentation and creation. Roles like AI engineers, data scientists booming.",
  },
  {
    sector: "Healthcare",
    skills: ["Telemedicine", "Genomics", "AI Diagnostics", "Nursing"],
    demand: [40, 50, 60, 65, 75, 85],
    color: "#198754",
    aiImpact: "AI supporting diagnostics, automation of admin tasks, but empathy-based roles safe.",
  },
  {
    sector: "Finance",
    skills: ["FinTech", "Data Analysis", "Blockchain", "Quant Modeling"],
    demand: [50, 55, 60, 70, 80, 90],
    color: "#fd7e14",
    aiImpact: "Moderate AI adoption in analytics and fraud detection. Manual roles may reduce.",
  },
  {
    sector: "Automobile",
    skills: ["EV Engineering", "Autonomous Systems", "Battery Tech", "Robotics"],
    demand: [30, 40, 55, 65, 80, 95],
    color: "#6f42c1",
    aiImpact: "Automation in manufacturing and smart systems growing. Some driver roles reducing.",
  },
];

const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

const InDemandSkills = () => {
  const [selectedSector, setSelectedSector] = useState(null);

  const chartData = years.map((year, index) => {
    const dataPoint = { year };
    sectorData.forEach((sector) => {
      dataPoint[sector.sector] = sector.demand[index];
    });
    return dataPoint;
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">📈 In-Demand Skills & Future Job Sectors (2020–2025)</h2>

      <div className="row g-4">
        {sectorData.map((sector, idx) => (
          <div className="col-md-6 col-lg-3" key={idx}>
            <motion.div
              className={`card border-${sector.color} h-100 shadow`}
              whileHover={{ scale: 1.03 }}
              style={{ borderLeft: `5px solid ${sector.color}` }}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold">{sector.sector}</h5>
                <p><strong>Top Skills:</strong></p>
                <ul className="list-unstyled mb-2">
                  {sector.skills.map((skill, i) => (
                    <li key={i}>✅ {skill}</li>
                  ))}
                </ul>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setSelectedSector(sector)}
                  data-bs-toggle="modal"
                  data-bs-target="#aiModal"
                >
                  AI Job Summary
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="mt-5">
        <h4 className="fw-semibold text-center"> Job Demand Growth Comparison</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {sectorData.map((sector, i) => (
              <Line
                key={i}
                type="monotone"
                dataKey={sector.sector}
                stroke={sector.color}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Job Summary Modal */}
      <div
        className="modal fade"
        id="aiModal"
        tabIndex="-1"
        aria-labelledby="aiModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="aiModalLabel">
                AI Impact Summary - {selectedSector?.sector}
              </h5>
              <button
                type="button"
                className="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{selectedSector?.aiImpact}</p>
              <ul>
                {selectedSector?.skills.map((skill, idx) => (
                  <li key={idx}><strong>{skill}</strong> will see continued relevance and demand.</li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InDemandSkills;
