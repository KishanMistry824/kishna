import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";

const blogData = [
  {
    title: "Top Resume Mistakes to Avoid in 2025",
    content:
      "Craft a winning resume with these practical tips and examples. Stand out from the crowd!",
    color: "info",
    icon: "fa-file-lines",
    link: "details/TopResumeMistakes",
  },
  {
    title: "Mastering Technical Interview Questions",
    content:
      "Get ready for the future with real-world technical interview tips and answers.",
    color: "success",
    icon: "fa-code",
    link: "/details/InterviwePrep",
  },
  {
    title: "In-Demand Skills for 2025",
    content:
      "Explore trending skills like AI, React, and DevOps that employers want.",
    color: "warning",
    icon: "fa-lightbulb",
    link: "/details/InDemandSkills",
  },
  // {
  //   title: "Stand Out in Online Job Applications",
  //   content:
  //     "Craft a resume that grabs recruiters’ attention and boosts interview chances.",
  //   color: "primary",
  //   icon: "fa-pen-to-square",
  //   link: "/HowtoStandOutinOnlineJobApplications",
  // },
  // {
  //   title: "Job Market Trends",
  //   content:
  //     "Stay updated with the latest hiring trends and skills in demand.",
  //   color: "danger",
  //   icon: "fa-chart-line",
  //   link: "/job-market-trends",
  // },
  // {
  //   title: "Interview Prep",
  //   content:
  //     "Get guidance on answering tough questions and showcasing your strengths.",
  //   color: "secondary",
  //   icon: "fa-user-tie",
  //   link: "/interview-prep",
  // },
];

const BlogSection = () => {
  return (
    <section
      className="py-5 px-3 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
      }}
    >
      {/* Floating blobs */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(255, 200, 0, 0.2), transparent 70%)",
          top: "-50px",
          left: "-50px",
          filter: "blur(100px)",
          zIndex: 0,
          animation: "float 20s infinite ease-in-out",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(0, 200, 255, 0.15), transparent 70%)",
          bottom: "-50px",
          right: "-50px",
          filter: "blur(100px)",
          zIndex: 0,
          animation: "float 25s infinite ease-in-out",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(circle, rgba(146, 254, 157, 0.15), transparent 70%)",
          top: "35%",
          right: "-100px",
          filter: "blur(120px)",
          zIndex: 0,
          animation: "float 30s infinite ease-in-out",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(15px); }
        }
      `}</style>

      <div className="container position-relative z-1 text-center">
        <div className="mb-5">
          <h3
            className="display-5 fw-semibold"
            style={{
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
            }}
          >
            Boost Your Career With Our Insights
          </h3>
          <p className="lead text-muted mt-2">
            Learn. Grow. Get Hired.{" "}
            <span className="fw-semibold">Your journey to success starts here!</span>
          </p>
        </div>

        {/* Slider for mobile */}
        <div className="d-md-none">
          <Swiper spaceBetween={16} slidesPerView={1.1}>
            {blogData.map((blog, index) => (
              <SwiperSlide key={index}>
                <div className={`modern-card border-${blog.color}`}>
                  <div className="card-body d-flex flex-column">
                    <div className={`icon-circle text-${blog.color} mb-3`}>
                      <i className={`fa-solid ${blog.icon}`}></i>
                    </div>
                    <h3 className="h5 fw-bold mb-3">{blog.title}</h3>
                    <p className="flex-grow-1">{blog.content}</p>
                    <Link
                      to={blog.link}
                      className={`btn btn-outline-${blog.color} rounded-pill mt-auto`}
                    >
                      Read More <i className="fa-solid fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid for desktop */}
        <div className="row row-cols-1 row-cols-md-3 g-4 d-none d-md-flex">
          {blogData.map((blog, index) => (
            <div className="col" key={index}>
              <div className={`modern-card border-${blog.color}`}>
                <div className="card-body d-flex flex-column">
                  <div className={`icon-circle text-${blog.color} mb-3`}>
                    <i className={`fa-solid ${blog.icon}`}></i>
                  </div>
                  <h3 className="h5 fw-bold mb-3">{blog.title}</h3>
                  <p className="flex-grow-1">{blog.content}</p>
                  <Link
                    to={blog.link}
                    className={`btn btn-outline-${blog.color} rounded-pill mt-auto`}
                  >
                    Read More <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link
            to="/careeTips"
            className="btn btn-gradient px-4 py-2 rounded-pill fw-semibold shadow"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Modern Styles */}
      <style jsx="true">{`
        .modern-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(0, 0, 0, 0.05);
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          padding: 20px;
          transition: all 0.3s ease;
        }
        .modern-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        .icon-circle {
          font-size: 1.8rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.05);
          margin: 0 auto;
        }
        .btn-gradient {
          background: linear-gradient(135deg, #00c853, #64dd17);
          border: none;
          color: white;
        }
        .btn-gradient:hover {
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
};
//details/TopResumeMistakes
export default BlogSection;
