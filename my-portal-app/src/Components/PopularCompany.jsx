import React, { useEffect, useState } from "react";
import PopularCompanyCard from "./PopularCompanyCard";
import { motion } from "framer-motion";

// Mock API (you can replace this with a real endpoint)
const fetchCompaniesWithJobCounts = async () => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { title: "Google", imageSrc: "/image/google.png", industry: "Tech", jobCount: 28 },
          { title: "Amazon", imageSrc: "/image/aws.png", industry: "Cloud", jobCount: 42 },
          { title: "Oracle", imageSrc: "/image/oracle.png", industry: "Database", jobCount: 18 },
          { title: "Microsoft", imageSrc: "/image/microsoft.png", industry: "Enterprise", jobCount: 31 },
          { title: "Nvidia", imageSrc: "/image/nvidia.png", industry: "AI", jobCount: 25 },
          { title: "Tesla", imageSrc: "/image/tesla.png", industry: "Automotive", jobCount: 19 },
          { title: "Volkswagen Group", imageSrc: "/image/volkswagen.png", industry: "Automotive", jobCount: 14 },
          { title: "OpenAI", imageSrc: "/image/chatgpt.png", industry: "AI", jobCount: 11 },
          { title: "PayPal", imageSrc: "/image/paypal.png", industry: "Finance", jobCount: 22 },
          { title: "IBM", imageSrc: "/image/ibm.png", industry: "Tech", jobCount: 17 },
        ]),
      1200
    )
  );
};

const PopularCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompaniesWithJobCounts()
      .then(setCompanies)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className="position-relative py-5 overflow-hidden"
      aria-labelledby="popular-companies-heading"
      style={{ background: "linear-gradient(135deg, #f3f6fa, #e0e7ff)" }}
    >
      {/* ✅ Background blur particles (optimized CSS) */}
      <div className="blur-particle blur-particle-1" />
      <div className="blur-particle blur-particle-2" />
      <div className="blur-particle blur-particle-3" />

      <style>{`
        .blur-particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          will-change: transform;
        }
        .blur-particle-1 { width: 200px; height: 200px; background: radial-gradient(circle, rgba(0,201,255,0.2), transparent 70%); top: -40px; left: -40px; }
        .blur-particle-2 { width: 180px; height: 180px; background: radial-gradient(circle, rgba(255,0,201,0.2), transparent 70%); bottom: -40px; right: -40px; }
        .blur-particle-3 { width: 220px; height: 220px; background: radial-gradient(circle, rgba(0,255,123,0.15), transparent 70%); top: 30%; right: -80px; }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(15px); }
        }
        .blur-particle { animation: float 25s infinite ease-in-out; }
        @media (max-width: 768px) {
          .blur-particle { filter: blur(40px); opacity: 0.5; }
        }
      `}</style>

      {/* Section heading */}
      <div className="container position-relative z-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1
            id="popular-companies-heading"
            className="text-center fw-semibold mb-3"
            style={{
              fontSize: "2.6rem",
              background: "linear-gradient(90deg, #007cf0, #00dfd8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
            }}
          >
            Popular Companies Hiring
          </h1>
          <p className="text-center text-success mb-5" style={{ fontSize: "1.2rem" }}>
            Discover top employers and kickstart your dream career today
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="row g-4 justify-content-center" aria-busy="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="col-6 col-md-4 col-lg-3"
                style={{
                  height: "180px",
                  borderRadius: "16px",
                  background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
                  backgroundSize: "200% 100%",
                  animation: "skeleton 1.6s linear infinite",
                }}
              ></div>
            ))}
            <style>{`
              @keyframes skeleton {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}</style>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {companies.map((company, index) => (
              <PopularCompanyCard
                key={index}
                title={company.title}
                imageSrc={company.imageSrc}
                industry={company.industry}
                jobCount={company.jobCount}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <a href="/job-filters" aria-label="View all companies hiring">
            <button className="btn btn-success px-4 py-2 rounded-pill fw-semibold shadow-sm">
              View All Companies
            </button>
          </a>
        </div>
      </div>

      {/* ✅ JSON-LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: companies.map((company, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Organization",
              name: company.title,
              description: `${company.jobCount} jobs in ${company.industry}`,
            },
          })),
        })}
      </script>
    </section>
  );
};

export default PopularCompany;
