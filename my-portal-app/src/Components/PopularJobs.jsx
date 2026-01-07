import React from 'react';
import JobCard from './PopularJobsCard';
import { motion } from 'framer-motion';

const jobs = [
  { id: 1, title: '	Machine Learning Engineer', company: '	Fractal Analytics', location: 'Mumbai, Maharashtra', description: 'Data visualization and intelligence', color: 'info', link:"job-details/code/JOB-043" },
  { id: 2, title: 'MLOps Engineer', company: 'Tata Consultancy Services', location: 'Bangalore, Karnataka', description: 'Deploy and manage scalable machine learning models ensuring continuous integration and deployment.', color: 'success', link:"job-details/code/JOB-105" },
  { id: 3, title: 'Data & Analytics Specialist', company: 'Capgemini', location: 'Chennai, Tamil Nadu', description: 'Transform data into actionable insights through advanced analytics and visualization techniques.', color: 'warning', link:"job-details/code/JOB-108" },
  { id: 4, title: 'Sales Executive', company: 'Prestige Group', location: 'Bengaluru, Karnataka', description: 'As a Sales Executive at Prestige Group, you will be responsible for driving property sales, building strong client relationships, and achieving revenue targets.', color: 'info', link:"job-details/code/JOB-088" },
  { id: 5, title: 'Ethical Hacker', company: 'Google', location: 'Gandhinagar, Gujarat', description: 'Identify and fix vulnerabilities in organization’s IT infrastructure by simulating cyber-attacks to strengthen security and prevent malicious breaches.', color: 'success', link:"job-details/code/JOB-099" },
  { id: 6, title: 'Network Engineer', company: 'Bharti Airtal', location: 'New Delhi, Delhi', description: 'As a Network Engineer at Bharti Airtel, you will be responsible for designing, implementing, maintaining, and optimizing the company’s vast telecom and enterprise networks.', color: 'warning', link:"job-details/code/JOB-060" },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

const PopularJobs = () => {
  return (
    <section
      className="popular-jobs-section py-5 px-3 position-relative overflow-hidden"
      style={{ background: 'radial-gradient(circle at top left, #f1f3f6, #e2e8f0)' }}
      aria-label="Trending Job Openings"
    >
      <style>{`
        /* Gradient heading text with accessibility contrast */
        .gradient-text {
          background: linear-gradient(90deg, #ff6a00, #ee0979);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          font-size: 2.75rem;
        }

        /* Floating gradient particles with smoother animation */
        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.4;
          z-index: 0;
          animation: float 18s infinite ease-in-out;
        }

        .particle1 { width: 280px; height: 280px; background: linear-gradient(135deg, #00f, #0ff); top: -80px; left: -60px; }
        .particle2 { width: 220px; height: 220px; background: linear-gradient(135deg, #f0f, #ff0); bottom: -60px; right: -40px; animation-delay: 5s; }
        .particle3 { width: 200px; height: 200px; background: linear-gradient(135deg, #0f0, #0ff); top: 25%; right: -80px; animation-delay: 8s; }
        .particle4 { width: 220px; height: 220px; background: linear-gradient(135deg, #ff416c, #ff4b2b); top: 45%; left: -90px; animation-delay: 10s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-35px) translateX(25px); }
        }

        /* Button gradient hover with smooth micro-interaction */
        .btn-gradient {
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          transform: scale(1.08);
          box-shadow: 0 0 25px rgba(0, 176, 155, 0.4);
        }

        /* Accessible card hover */
        .job-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
          transition: all 0.35s ease;
        }
      `}</style>

      {/* Floating gradient particles */}
      <div className="particle particle1"></div>
      <div className="particle particle2"></div>
      <div className="particle particle3"></div>
      <div className="particle particle4"></div>

      {/* Container */}
      <div className="container position-relative z-1">
        {/* Gradient heading */}
        <motion.h2
          className="text-center mb-5 fw-semibold gradient-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
           Trending Job Openings
        </motion.h2>

        {/* Job cards */}
        <motion.div
          className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {jobs.map((job) => (
            <motion.div key={job.id} className="col" whileHover={{ scale: 1.03 }}>
              <JobCard
                title={job.title}
                company={job.company}
                location={job.location}
                description={job.description}
                color={job.color}
                link={job.link}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="text-center mt-5">
          <a href="/job-filters" style={{ textDecoration: 'none' }}>
          <motion.button
            
            whileTap={{ scale: 0.95 }}
            className="btn btn-gradient px-5 py-3 rounded-pill text-white"
            style={{ background: 'linear-gradient(90deg, #00b09b, #96c93d)', border: 'none' }}
            aria-label="View All Jobs"
          >
            View All Jobs
          </motion.button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularJobs;
