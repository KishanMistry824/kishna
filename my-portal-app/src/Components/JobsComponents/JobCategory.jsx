// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   BsBuilding,
//   BsBoxSeam,
//   BsHeadset,
//   BsRocket,
//   BsBank,
//   BsBriefcase,
//   BsHeart,
//   BsPerson,
//   BsPersonBadge,
//   BsMortarboard,
// } from "react-icons/bs";

// const companyType = [
//   { icon: <BsBuilding />, label: "MNC (Multinational Corporation)" },
//   { icon: <BsBoxSeam />, label: "Product-Based Company" },
//   { icon: <BsHeadset />, label: "Service-Based Company" },
//   { icon: <BsRocket />, label: "Startup" },
//   { icon: <BsBank />, label: "Government Organization / PSU" },
//   { icon: <BsBriefcase />, label: "Private Limited Company (Pvt. Ltd.)" },
//   { icon: <BsBuilding />, label: "Public Limited Company (Ltd.)" },
//   { icon: <BsHeart />, label: "Non-Profit Organization / NGO" },
//   { icon: <BsPerson />, label: "Freelancer / Self-Employed" },
//   { icon: <BsPersonBadge />, label: "Recruitment / Staffing Agency" },
//   { icon: <BsMortarboard />, label: "Educational Institution" },
// ];

// const gradients = [
//   "linear-gradient(135deg, #f093fb, #f5576c)",
//   "linear-gradient(135deg, #6a11cb, #2575fc)",
//   "linear-gradient(135deg, #43e97b, #38f9d7)",
//   "linear-gradient(135deg, #fa709a, #fee140)",
//   "linear-gradient(135deg, #30cfd0, #330867)",
//   "linear-gradient(135deg, #43cea2, #185a9d)",
//   "linear-gradient(135deg, #1e3c72, #2a5298)",
//   "linear-gradient(135deg, #00c6ff, #0072ff)",
//   "linear-gradient(135deg, #f7971e, #ffd200)",
//   "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//   "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
//   "linear-gradient(135deg, #667eea, #764ba2)",
// ];

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
//   hover: { scale: 1.08, boxShadow: "0 12px 30px rgba(0,0,0,0.3)" },
// };

// const JobCategories = () => {
//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-5 display-5 fw-lighter">
//         Explore Hiring Organization Categories
//       </h2>

//       <div className="row g-4 justify-content-center">
//         {companyType.map((cat, index) => (
//           <motion.div
//             key={index}
//             className="col-6 col-sm-4 col-md-3 col-lg-2"
//             variants={cardVariants}
//             initial="hidden"
//             whileInView="visible"
//             whileHover="hover"
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
//           >
//             <Link
//               to={`/job-filters?CompanyType=${encodeURIComponent(cat.label)}`}
//               className="text-decoration-none"
//             >
//               <div
//                 className="card rounded-4 h-100 text-center p-3 border-0 shadow-lg"
//                 style={{
//                   background: gradients[index % gradients.length],
//                   color: "#fff",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 }}
//               >
//                 <div
//                   className="d-flex justify-content-center align-items-center mb-3 mx-auto"
//                   style={{
//                     width: "60px",
//                     height: "60px",
//                     borderRadius: "50%",
//                     background: "rgba(255,255,255,0.2)",
//                     fontSize: "1.8rem",
//                   }}
//                 >
//                   {cat.icon}
//                 </div>
//                 <h6 className="mb-1 fw-bold small">{cat.label}</h6>
//                 <motion.div
//                   className="mt-2"
//                   whileHover={{ x: 5 }}
//                   style={{ fontSize: "1.1rem" }}
//                 >
//                   <i className="bi bi-arrow-right"></i>
//                 </motion.div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       <div className="text-center mt-5">
//         <Link to="/job-filters">
//           <motion.button
//             className="btn btn-lg fw-semibold px-5 py-3 rounded-pill"
//             style={{
//               background: "linear-gradient(to right, #0066ff, #00ffff)",
//               color: "#fff",
//               border: "none",
//               transition: "all 0.3s ease",
//             }}
//             whileHover={{ scale: 1.08, boxShadow: "0 0 20px #00ffff" }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Explore All Categories
//           </motion.button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default JobCategories;




















import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsBuilding,
  BsBoxSeam,
  BsHeadset,
  BsRocket,
  BsBank,
  BsBriefcase,
  BsHeart,
  BsPerson,
  BsPersonBadge,
  BsMortarboard,
  BsGraphUp,
  BsSearch,
  BsArrowRight,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const companyType = [
  { icon: <BsBuilding />, label: "MNC (Multinational Corporation)", group: "Private", jobs: 1523, growth: 8 },
  { icon: <BsBoxSeam />, label: "Product-Based Company", group: "Private", jobs: 987, growth: 15 },
  { icon: <BsHeadset />, label: "Service-Based Company", group: "Private", jobs: 1845, growth: 6 },
  { icon: <BsRocket />, label: "Startup", group: "Private", jobs: 1123, growth: 22 },
  { icon: <BsBank />, label: "Government / PSU", group: "Government", jobs: 732, growth: 3 },
  { icon: <BsBriefcase />, label: "Private Limited Company (Pvt. Ltd.)", group: "Private", jobs: 1268, growth: 10 },
  { icon: <BsBuilding />, label: "Public Limited Company (Ltd.)", group: "Private", jobs: 512, growth: 5 },
  { icon: <BsHeart />, label: "Non-Profit Organization / NGO", group: "Non-Profit", jobs: 341, growth: 9 },
  { icon: <BsPerson />, label: "Freelancer", group: "Freelance", jobs: 678, growth: 13 },
  { icon: <BsPersonBadge />, label: "Recruitment / Staffing Agency", group: "Private", jobs: 412, growth: 7 },
  { icon: <BsMortarboard />, label: "Educational Institution", group: "Education", jobs: 955, growth: 11 },
];

const gradients = [
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #6a11cb, #2575fc)",
  "linear-gradient(135deg, #43e97b, #38f9d7)",
  "linear-gradient(135deg, #fa709a, #fee140)",
  "linear-gradient(135deg, #30cfd0, #330867)",
  "linear-gradient(135deg, #43cea2, #185a9d)",
  "linear-gradient(135deg, #1e3c72, #2a5298)",
  "linear-gradient(135deg, #00c6ff, #0072ff)",
  "linear-gradient(135deg, #f7971e, #ffd200)",
  "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05, y: -5 },
};

const JobCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const filteredCategories = useMemo(() => {
    let result = [...companyType];
    if (searchTerm.trim()) {
      result = result.filter((cat) =>
        cat.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter !== "All") {
      result = result.filter((cat) => cat.group === filter);
    }
    switch (sortOption) {
      case "name-asc":
        result.sort((a, b) => a.label.localeCompare(b.label));
        break;
      case "name-desc":
        result.sort((a, b) => b.label.localeCompare(a.label));
        break;
      case "jobs-desc":
        result.sort((a, b) => b.jobs - a.jobs);
        break;
      case "jobs-asc":
        result.sort((a, b) => a.jobs - b.jobs);
        break;
      case "growth-desc":
        result.sort((a, b) => b.growth - a.growth);
        break;
      default:
        break;
    }
    return result;
  }, [searchTerm, filter, sortOption]);

  const totalJobs = companyType.reduce((sum, c) => sum + c.jobs, 0);
  const avgGrowth = (
    companyType.reduce((sum, c) => sum + c.growth, 0) / companyType.length
  ).toFixed(1);

  const groups = ["All", "Private", "Government", "Non-Profit", "Freelance", "Education"];

  return (
    <div
      className="container py-5"
      style={{
       // background: "linear-gradient(135deg, #eef2ff, #f8f9ff)",
        //borderRadius: "20px",
      }}
    >
      <h2 className="text-center mb-3 display-6 fw-semibold">
        Explore Hiring Organization Categories
      </h2>
      <p className="text-center text-muted mb-5">
        Browse companies by type, jobs, and growth trends.
      </p>

      {/* Stats */}
      <div className="row g-3 justify-content-center mb-4 text-center">
        <div className="col-md-3">
          <div className="bg-white shadow-sm rounded-4 p-3">
            <h5 className="fw-bold mb-0">{companyType.length}</h5>
            <small className="text-muted">Categories</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-white shadow-sm rounded-4 p-3">
            <h5 className="fw-bold mb-0">{totalJobs.toLocaleString()}</h5>
            <small className="text-muted">Total Jobs</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-white shadow-sm rounded-4 p-3">
            <h5 className="fw-bold mb-0">
              <BsGraphUp className="me-1" />
              {avgGrowth}%
            </h5>
            <small className="text-muted">Avg. Growth</small>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
        {/* Search */}
        <div className="d-flex align-items-center bg-white shadow-sm rounded-pill px-3 py-2">
          <BsSearch className="text-muted me-2" />
          <input
            type="text"
            placeholder="Search category..."
            className="form-control border-0 shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: "0.95rem" }}
          />
        </div>

        {/* Filter */}
        <select
          className="form-select shadow-sm rounded-pill px-3"
          style={{ maxWidth: "200px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {groups.map((g, i) => (
            <option key={i} value={g}>
              {g === "All" ? "All Categories" : g}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="form-select shadow-sm rounded-pill px-3"
          style={{ maxWidth: "200px" }}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort by...</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="jobs-desc">Jobs (High → Low)</option>
          <option value="jobs-asc">Jobs (Low → High)</option>
          <option value="growth-desc">Growth (High → Low)</option>
        </select>
      </div>

      {/* Grid for Desktop / Swiper for Mobile */}
      <div className="d-none d-md-block">
        {/* Desktop Grid */}
        <motion.div layout className="row g-4 justify-content-center">
          <AnimatePresence>
            {filteredCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover="hover"
              >
                <Link
                  to={`/job-filters?companyType=${encodeURIComponent(cat.label)}`}
                  className="text-decoration-none"
                >
                  <motion.div
                    className="rounded-4 p-4 text-center shadow-lg"
                    style={{
                      background: gradients[i % gradients.length],
                      color: "#fff",
                      backdropFilter: "blur(12px)",
                      minHeight: "220px",
                    }}
                  >
                    <div
                      className="mx-auto d-flex justify-content-center align-items-center mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.25)",
                        fontSize: "1.9rem",
                      }}
                    >
                      {cat.icon}
                    </div>
                    <h6 className="fw-bold">{cat.label}</h6>
                    <p className="small mb-1">{cat.jobs} Jobs</p>
                    <p className="small mb-2">Growth: <strong>{cat.growth}%</strong></p>
                    <motion.div whileHover={{ x: 8 }}>
                      <BsArrowRight />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Swiper for Mobile */}
      <div className="d-block d-md-none">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
        >
          {filteredCategories.map((cat, i) => (
            <SwiperSlide key={i}>
              <Link
                to={`/job-filters?CompanyType=${encodeURIComponent(cat.label)}`}
                className="text-decoration-none"
              >
                <motion.div
                  className="rounded-4 p-4 text-center shadow-lg"
                  style={{
                    background: gradients[i % gradients.length],
                    color: "#fff",
                    backdropFilter: "blur(10px)",
                    minHeight: "220px",
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div
                    className="mx-auto d-flex justify-content-center align-items-center mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.25)",
                      fontSize: "1.9rem",
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h6 className="fw-bold">{cat.label}</h6>
                  <p className="small mb-1">{cat.jobs} Jobs</p>
                  <p className="small mb-2">Growth: <strong>{cat.growth}%</strong></p>
                  <BsArrowRight />
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA */}
      <div className="text-center mt-5">
        <Link to="/job-filters">
          <motion.button
            className="btn btn-lg fw-semibold px-5 py-3 rounded-pill"
            style={{
              background: "linear-gradient(to right, #0066ff, #00ffff)",
              color: "#fff",
              border: "none",
            }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 20px #00ffff" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Categories
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default JobCategories;
