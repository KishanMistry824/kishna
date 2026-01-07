// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom"
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const featuredCompanies = [
//   { id: 1, name: "Tech Innovations Inc.", logo: "Image/register.png", openJobs: 12, rating: 4.5, reviews: 124, industry: "Software Development", url: "/companies/tech-innovations" },
//   { id: 2, name: "Green Energy Corp.", logo: "Image/register.png", openJobs: 7, rating: 4.2, reviews: 88, industry: "Renewable Energy", url: "/companies/green-energy" },
//   { id: 3, name: "FinTech Solutions", logo: "Image/register.png", openJobs: 15, rating: 4.7, reviews: 210, industry: "Financial Technology", url: "/companies/fintech-solutions" },
//   { id: 4, name: "Creative Labs", logo: "Image/register.png", openJobs: 4, rating: 4.0, reviews: 47, industry: "Design & Marketing", url: "/companies/creative-labs" },
//   { id: 5, name: "HealthPlus", logo: "Image/register.png", openJobs: 9, rating: 4.3, reviews: 65, industry: "Healthcare Services", url: "/companies/healthplus" },
//   { id: 6, name: "EduSmart", logo: "Image/register.png", openJobs: 5, rating: 4.6, reviews: 75, industry: "Education Technology", url: "/companies/edusmart" },
//   { id: 7, name: "LogiTrans", logo: "Image/register.png", openJobs: 8, rating: 4.1, reviews: 58, industry: "Logistics & Transportation", url: "/companies/logitrans" },
//   { id: 8, name: "SmartRetail", logo: "Image/register.png", openJobs: 10, rating: 4.4, reviews: 90, industry: "Retail & E-commerce", url: "/companies/smartretail" },
// ];

// function StarRating({ rating }) {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5;
//   for (let i = 1; i <= 5; i++) {
//     if (i <= fullStars) {
//       stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
//     } else if (i === fullStars + 1 && halfStar) {
//       stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
//     } else {
//       stars.push(<i key={i} className="bi bi-star text-warning"></i>);
//     }
//   }
//   return <div className="small">{stars}</div>;
// }

// export default function FeaturedCompaniesCarousel() {
//   return (
//     <section
//       className="py-5 position-relative"
//       style={{
//         backgroundColor: "#f8f9fa",
//         backgroundImage:
//           "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.02) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.02) 0%, transparent 40%)",
//       }}
//     >
//       <style>
//         {`
//           /* Pagination styling */
//           .swiper-pagination-bullet {
//             background: #ccc;
//             opacity: 1;
//             width: 10px;
//             height: 10px;
//             transition: all 0.3s ease;
//           }
//           .swiper-pagination-bullet-active {
//             background: linear-gradient(90deg, #0066ff, #00ffff);
//             transform: scale(1.2);
//             box-shadow: 0 0 6px rgba(0, 255, 255, 0.6);
//           }

//           /* Arrow styling */
//           .swiper-button-prev, .swiper-button-next {
//             background: linear-gradient(135deg, #0066ff, #00ffff);
//             width: 42px;
//             height: 42px;
//             border-radius: 50%;
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: all 0.3s ease;
//             color: white;
//           }
//           .swiper-button-prev:hover, .swiper-button-next:hover {
//             transform: scale(1.15);
//             box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
//           }
//           .swiper-button-prev::after, .swiper-button-next::after {
//             font-size: 16px;
//             font-weight: bold;
//           }
//         `}
//       </style>

//       <div className="container">
//         <h3 className="mb-5 text-center fw-bold fs-4">
//           Featured Companies <br />
//           <small className="fw-light text-black">
//             Explore top employers actively hiring now
//           </small>
//         </h3>

//         {/* Swiper for all devices */}
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           loop={true}
//           spaceBetween={20}
//           breakpoints={{
//             0: { slidesPerView: 1.2 },
//             576: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             992: { slidesPerView: 4 },
//           }}
//           style={{ paddingBottom: "2rem" }}
//         >
//           {featuredCompanies.map((company, index) => (
//             <SwiperSlide key={company.id}>
//               <motion.a
//                 href={company.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-decoration-none text-dark p-4 rounded-5 d-block h-100"
//                 style={{
//                   background: "rgba(255, 255, 255, 0.65)",
//                   backdropFilter: "blur(16px)",
//                   border: "1px solid rgba(255,255,255,0.35)",
//                   boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
//                   transition: "all 0.35s ease",
//                   borderRadius: "1.5rem",
//                 }}
//                 whileHover={{
//                   y: -8,
//                   boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
//                   border: "1px solid rgba(0,255,255,0.5)",
//                 }}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <img
//                   src={company.logo}
//                   alt={`${company.name} logo`}
//                   className="mb-3 mx-auto d-block"
//                   style={{
//                     width: "90px",
//                     height: "90px",
//                     objectFit: "contain",
//                     borderRadius: "16px",
//                     background: "rgba(255,255,255,0.9)",
//                     padding: "8px",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                   }}
//                 />
//                 <h6 className="fw-semibold text-center">{company.name}</h6>
//                 <p className="text-center mb-2">
//                   <span className="badge bg-light text-secondary rounded-pill px-3 py-1">
//                     {company.industry}
//                   </span>
//                 </p>

//                 <div className="d-flex align-items-center justify-content-center mb-2">
//                   <span
//                     className="badge bg-success text-white me-2"
//                     style={{ fontSize: "0.75rem" }}
//                   >
//                     ✅ Actively Hiring
//                   </span>
//                   <small className="fw-semibold text-primary">
//                     {company.openJobs} Open Positions
//                   </small>
//                 </div>

//                 <div className="d-flex align-items-center justify-content-between">
//                   <StarRating rating={company.rating} />
//                   <small className="text-muted">
//                     ({company.reviews} reviews)
//                   </small>
//                 </div>
//               </motion.a>

//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* CTA Button */}
//         <div className="text-center mt-5">
//           <Link to="/job-filters">
//           <motion.button
//             className="btn btn-lg fw-lighter text-white px-5 py-3 rounded-pill"
//             style={{
//               background: "linear-gradient(to right, #0066ff, #00ffff)",
//               border: "none",
//             }}
//             whileHover={{ scale: 1.08, boxShadow: "0 0 15px #00ffff" }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Explore All Categories
//           </motion.button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    else if (i === fullStars + 1 && halfStar) stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
    else stars.push(<i key={i} className="bi bi-star text-warning"></i>);
  }
  return <div className="small">{stars}</div>;
}

export default function FeaturedCompaniesCarousel() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/companies") // Your backend URL
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error("Error fetching companies:", err));
  }, []);

  const darkGradients = [
    "linear-gradient(135deg, #1e3c72, #2a5298)", // dark blue gradient
    "linear-gradient(135deg, #0f2027, #203a43)", // navy → deep blue
    "linear-gradient(135deg, #232526, #414345)", // dark grey gradient
    "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", // purple → dark gradient
  ];

  return (
    <section
      className="py-5 position-relative"
      
    >
      <style>{`
        .swiper-pagination-bullet { background: #555; opacity: 1; width: 10px; height: 10px; transition: all 0.3s ease; }
        .swiper-pagination-bullet-active { background: linear-gradient(90deg, #00ffff, #0066ff); transform: scale(1.3); box-shadow: 0 0 8px rgba(0, 255, 255, 0.7); }
        .swiper-button-prev, .swiper-button-next { background: linear-gradient(135deg, #00ffff, #0066ff); width: 44px; height: 44px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; color: white; transition: all 0.3s ease; }
        .swiper-button-prev:hover, .swiper-button-next:hover { transform: scale(1.15); box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); }
        .swiper-button-prev::after, .swiper-button-next::after { font-size: 16px; font-weight: bold; }
      `}</style>

      <div className="container">
        <h3 className="mb-5 text-center fw-semibold fs-4 text-black">
          Featured Companies <br />
          <small className="fw-light text-primary">Explore top employers actively hiring now</small>
        </h3>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
          style={{ paddingBottom: "2rem" }}
        >
          {companies.map((company, index) => (
            <SwiperSlide key={company._id}>
              <motion.a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white p-4 rounded-5 d-block h-100"
                style={{
                  background: darkGradients[index % darkGradients.length], // dark gradient card
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
                  transition: "all 0.35s ease",
                  borderRadius: "1.5rem",
                  color: "#fff",
                }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 45px rgba(0,255,255,0.25)",
                  border: "1px solid rgba(0,255,255,0.4)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="mb-3 mx-auto d-block"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "contain",
                    borderRadius: "1rem",
                    background: "rgba(255,255,255,0.1)",
                    padding: "8px",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                  }}
                />
                <h6 className="fw-semibold text-center mb-1">{company.name}</h6>
                <p className="text-center mb-2">
                  <span className="badge bg-light text-dark rounded-pill px-3 py-1">
                    {company.industry}
                  </span>
                </p>
                <div className="d-flex align-items-center justify-content-center mb-2 flex-wrap gap-2">
                  <span
                    className="badge bg-success text-white px-3 py-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    ✅ Actively Hiring
                  </span>
                  <small className="fw-semibold text-info">{company.openJobs} Open Positions</small>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <StarRating rating={company.rating} />
                  <small className="text-light">({company.reviews} reviews)</small>
                </div>
              </motion.a>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-5">
          <Link to="/job-filters">
            <motion.button
              className="btn btn-lg fw-lighter text-white px-5 py-3 rounded-pill"
              style={{
                background: "linear-gradient(to right, #00ffff, #0066ff)",
                border: "none",
              }}
              whileHover={{ scale: 1.08, boxShadow: "0 0 15px #00ffff" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Categories
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
