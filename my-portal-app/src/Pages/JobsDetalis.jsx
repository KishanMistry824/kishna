import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // ✅ Use axios instead of JSON import
import { shareJob, copyJobLink } from "../utils/ShareUtils";



/**
 * JobDetailsPage component displays detailed information about a specific job,
 * including company details, job overview, description, responsibilities, requirements,
 * skills, compensation & benefits, recent company updates, and related/similar jobs.
 *
 * Features:
 * - Fetches job data by jobCode from API.
 * - Shows company logo, name, industry, and quick stats.
 * - Displays job overview with experience, type, salary, posted date, deadline, and location.
 * - Renders job description, responsibilities, requirements, and skills.
 * - Lists compensation, benefits, and perks if available.
 * - Shows recent company updates.
 * - Sidebar with quick actions (apply, save, share), highlights, and lists of related and similar jobs.
 * - Includes animated UI elements using Framer Motion.
 *
 * @component
 * @returns {JSX.Element} The rendered job details page.
 */
const JobDetailsPage = () => {
  const { jobCode } = useParams(); // URL param
  const [job, setJob] = useState(null);
  const [relatedCompanyJobs, setRelatedCompanyJobs] = useState([]);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const companyUpdates = [
    " Company launched new AI initiative",
    " Ranked among Best Places to Work",
    " Expanded Cloud Data Centers in India",
    //🏆🚀☁️
  ];

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // ✅ Fetch specific job by jobCode
        const { data } = await axios.get(`http://localhost:5000/api/jobs/code/${jobCode}`);
        setJob(data);

        // ✅ Fetch related company jobs
        const { data: allJobs } = await axios.get("http://localhost:5000/api/jobs");
        const sameCompanyJobs = allJobs.filter(
          (item) => item.company.name === data.company.name && item.jobCode !== data.jobCode
        );
        setRelatedCompanyJobs(sameCompanyJobs);

        // ✅ Fetch similar category jobs
        const sameCategoryJobs = allJobs.filter(
          (item) => item.category === data.category && item.jobCode !== data.jobCode
        );
        setSimilarJobs(sameCategoryJobs);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  }, [jobCode]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  if (!job) return <p className="text-center py-5">Loading job details...</p>;



  return (
    <div className="container my-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="row g-4">
        {/* MAIN CONTENT */}
        <div className="col-lg-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="tw-rounded-3xl tw-overflow-hidden tw-mb-6 tw-shadow-xl tw-backdrop-blur-xl hover:tw-shadow-2xl hover:tw-scale-105 tw-transition-all tw-duration-300"
            style={{
              background: "linear-gradient(135deg, #fef3f8 0%, #e0f7ff 100%)", // pastel pink → light blue gradient
            }}
          >
            <div className="tw-relative tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-p-6">
              {/* Floating light orbs */}
              <span className="tw-absolute tw-w-16 tw-h-16 tw-bg-pink-200 tw-rounded-full tw-blur-3xl tw-top-0 tw-left-4 tw-opacity-50"></span>
              <span className="tw-absolute tw-w-24 tw-h-24 tw-bg-blue-200 tw-rounded-full tw-blur-3xl tw-bottom-0 tw-right-6 tw-opacity-40"></span>

              {/* Company Logo */}
              <div className="tw-rounded-full tw-bg-white tw-shadow-md tw-flex tw-items-center tw-justify-center tw-w-24 tw-h-24 z-10">
                <img
                  src={job.company.logoUrl}
                  alt={job.company.name}
                  className="tw-max-h-16 tw-w-auto"
                />
              </div>

              {/* Job Info */}
              <div className="tw-flex-1 z-10">
                <h2 className="tw-text-3xl tw-font-bold tw-mb-2 tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-pink-400 tw-via-purple-400 tw-to-blue-400">
                  {job.title}
                </h2>

                <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2 tw-mb-2 tw-text-sm tw-text-gray-700">
                  <span className="tw-flex tw-items-center tw-gap-1">
                    <i className="bi bi-building tw-text-blue-400"></i>
                    {job.company.name}
                  </span>
                  <span className="tw-bg-yellow-200 tw-text-gray-800 tw-text-xs tw-px-2 tw-py-1 tw-rounded-full">
                    {job.company.industry}
                  </span>
                </div>

                <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-text-sm tw-text-gray-600">
                  <span className="tw-flex tw-items-center tw-gap-1">
                    <i className="bi bi-geo-alt tw-text-red-400"></i>
                    {job.locations[0]?.city}, {job.locations[0]?.state}
                  </span>
                  <span className="tw-flex tw-items-center tw-gap-1">
                    <i className="bi bi-laptop tw-text-green-400"></i>
                    {job.remoteOptions || "On-site"}
                  </span>
                  <span className="tw-flex tw-items-center tw-gap-1">
                    <i className="bi bi-calendar-event tw-text-blue-400"></i>
                    Posted {job.postedDate || "Recently"}
                  </span>
                </div>
              </div>

              {/* Job Type Badge */}
              <div className="z-10">
                <span className="tw-px-4 tw-py-2 tw-rounded-full tw-text-xs tw-font-semibold tw-uppercase tw-text-white tw-bg-gradient-to-r tw-from-pink-400 tw-via-purple-400 tw-to-blue-400 tw-shadow-md">
                  {job.employmentType || "Full-time"}
                </span>
              </div>
            </div>
          </motion.div>






          {/* Job Overview */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="tw-rounded-3xl tw-mb-6 tw-shadow-2xl tw-overflow-hidden tw-transition-all tw-duration-500 hover:tw-scale-105 tw-backdrop-blur-xl tw-relative"
            style={{
              background: "linear-gradient(145deg, #fefafc, #e0f7ff)", // soft pastel gradient
            }}
          >
            {/* Optional floating gradient orbs */}
            <span className="tw-absolute tw-w-20 tw-h-20 tw-bg-pink-200 tw-rounded-full tw-blur-3xl tw-top-4 tw-left-6 tw-opacity-30 tw-animate-pulse"></span>
            <span className="tw-absolute tw-w-24 tw-h-24 tw-bg-blue-200 tw-rounded-full tw-blur-3xl tw-bottom-2 tw-right-8 tw-opacity-20 tw-animate-pulse"></span>

            <div className="tw-p-8">
              {/* Header */}
              <h4 className="tw-text-3xl tw-font-bold tw-mb-8 tw-text-center tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-400 tw-via-purple-400 tw-to-blue-400 tw-drop-shadow-md">
                Job Overview
              </h4>

              {/* Cards Grid */}
              <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6">
                {[
                  { label: "Experience", value: job.experienceLevel, icon: "/Image/case.png", color: "bg-gradient-to-tr from-cyan-400 to-blue-500" },
                  { label: "Type", value: job.type, icon: "/Image/clock1.png", color: "bg-gradient-to-tr from-orange-400 to-yellow-400" },
                  { label: "Salary", value: `${job.salary?.min} - ${job.salary?.max} ${job.salary?.currency}`, icon: "/Image/rupees.png", color: "bg-gradient-to-tr from-sky-400 to-blue-600" },
                  { label: "Posted", value: job.postedAt, icon: "/Image/calendar.png", color: "bg-gradient-to-tr from-pink-400 to-pink-200" },
                  { label: "Deadline", value: job.deadline, icon: "/Image/calendar1.png", color: "bg-gradient-to-tr from-green-400 to-teal-300" },
                  { label: "Location", value: job.locations[0]?.city, icon: "/Image/location.png", color: "bg-gradient-to-tr from-pink-500 to-orange-400" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                    transition={{ type: "spring", stiffness: 250 }}
                    className="tw-rounded-3xl tw-backdrop-blur-2xl tw-bg-white/60 tw-p-6 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-transition-all tw-duration-300 hover:tw-shadow-lg"
                  >
                    {/* Icon */}
                    <div className={`tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-rounded-full tw-text-white tw-text-2xl tw-shadow-md ${item.color} tw-transform hover:tw-scale-110 tw-transition-transform tw-duration-300`}>
                      <img src={item.icon} alt={item.label} className="tw-w-8 tw-h-8" />
                    </div>

                    {/* Label & Value */}
                    <p className="tw-text-sm tw-font-semibold tw-text-gray-600">{item.label}</p>
                    <p className="tw-text-base tw-font-bold tw-text-gray-800 tw-text-center">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>



          {/* Job Description */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="tw-relative tw-rounded-3xl tw-mb-6 tw-shadow-2xl tw-overflow-hidden tw-transition-all tw-duration-500 tw-backdrop-blur-xl tw-border tw-border-gray-100 tw-bg-white/70"
            style={{
              background: "linear-gradient(145deg, #fefafc, #e0f7ff)", // soft pastel gradient
            }}
          >
            {/* Floating gradient orbs */}
            <span className="tw-absolute tw-w-20 tw-h-20 tw-bg-pink-200 tw-rounded-full tw-blur-3xl tw-top-4 tw-left-6 tw-opacity-30 tw-animate-pulse"></span>
            <span className="tw-absolute tw-w-24 tw-h-24 tw-bg-blue-200 tw-rounded-full tw-blur-3xl tw-bottom-4 tw-right-8 tw-opacity-20 tw-animate-pulse"></span>
            <span className="tw-absolute tw-w-28 tw-h-28 tw-bg-purple-200 tw-rounded-full tw-blur-3xl tw-top-20 tw-right-10 tw-opacity-25 tw-animate-pulse"></span>

            <div className="tw-p-6 tw-relative tw-z-10">
              {/* Job Description Header */}
              <h4 className="tw-font-bold tw-mb-4 tw-text-2xl tw-text-center tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-purple-500 tw-via-indigo-500 tw-to-blue-400">
                Job Description
              </h4>

              {/* Job Description Text */}
              <p className="tw-text-gray-700 tw-leading-relaxed">{job.description}</p>

              {/* Key Responsibilities */}
              <h5 className="tw-font-semibold tw-mt-6 tw-mb-2 tw-text-gray-900">Key Responsibilities</h5>
              <ul className="tw-list-none tw-ps-4 tw-space-y-2">
                {job.responsibilities.map((res, idx) => (
                  <li key={idx} className="tw-flex tw-items-start tw-gap-2">
                    <span className="tw-text-green-500 tw-text-lg">✔</span>
                    <span className="tw-text-gray-700">{res}</span>
                  </li>
                ))}
              </ul>

              {/* Requirements */}
              <h5 className="tw-font-semibold tw-mt-6 tw-mb-2 tw-text-gray-900">Requirements</h5>
              <ul className="tw-list-none tw-ps-4 tw-space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="tw-flex tw-items-start tw-gap-2">
                    <span className="tw-text-blue-500 tw-text-lg">•</span>
                    <span className="tw-text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>

              {/* Skills */}
              <h5 className="tw-font-semibold tw-mt-6 tw-mb-3 tw-text-gray-900">Skills</h5>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                {job.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.1, boxShadow: "0 6px 15px rgba(0,0,0,0.15)" }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="tw-rounded-full tw-px-3 tw-py-1 tw-shadow-sm tw-cursor-default"
                    style={{
                      background: "linear-gradient(135deg,#ff7e5f,#feb47b)", // soft orange → peach
                      color: "#fff",
                      fontSize: "0.85rem",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Compensation & Benefits */}
          {(job.benefits?.length > 0 || job.perks?.length > 0) && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.4 }}
              className="tw-rounded-3xl tw-mb-6 tw-shadow-2xl tw-overflow-hidden tw-transition-all tw-duration-500 tw-backdrop-blur-xl tw-border tw-border-gray-100 tw-bg-white/70"
              style={{
                background: "linear-gradient(145deg, #fefafc, #e0f7ff)", // soft pastel gradient
              }}
            >
              <div className="tw-p-6">
                {/* Header */}
                <h3 className="tw-font-bold tw-mb-6 tw-text-2xl tw-text-center tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-purple-500 tw-via-indigo-500 tw-to-blue-400">
                  Compensation & Benefits
                </h3>

                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
                  {/* Benefits */}
                  {job.benefits?.map((benefit, idx) => (
                    <motion.div
                      key={`benefit-${idx}`}
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="tw-flex tw-items-center tw-gap-3 tw-p-4 tw-rounded-2xl tw-bg-white/80 tw-shadow-sm tw-border tw-border-gray-100 tw-transition-all hover:tw-shadow-lg hover:tw-bg-white/90">
                        <img
                          src="/Image/check.png" // replace with your PNG path
                          alt="benefit icon"
                          className="tw-w-6 tw-h-6"
                        />
                        <span className="tw-font-semibold tw-text-gray-700">{benefit}</span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Perks */}
                  {job.perks?.map((perk, idx) => (
                    <motion.div
                      key={`perk-${idx}`}
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="tw-flex tw-items-center tw-gap-3 tw-p-4 tw-rounded-2xl tw-bg-white/80 tw-shadow-sm tw-border tw-border-gray-100 tw-transition-all hover:tw-shadow-lg hover:tw-bg-white/90">
                        <img
                          src="/Image/star.png" // replace with your PNG path
                          alt="perk icon"
                          className="tw-w-6 tw-h-6"
                        />
                        <span className="tw-font-semibold tw-text-gray-700">{perk}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Company Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tw-rounded-3xl tw-shadow-2xl tw-overflow-hidden tw-mt-6 tw-p-6 tw-border tw-border-gray-100 tw-bg-white/70 tw-backdrop-blur-xl tw-transition-all tw-duration-500 hover:tw-scale-105"
            style={{
              background: "linear-gradient(145deg, #fefafc, #e0f7ff)", // soft pastel gradient
            }}
          >
            {/* Header: Logo + Name */}
            <div className="tw-flex tw-items-center tw-mb-5">
              <div className="tw-rounded-full tw-w-20 tw-h-20 tw-flex tw-items-center tw-justify-center tw-me-4 tw-shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                }}>
                <img
                  src={job.company.logoUrl}
                  alt={job.company.name}
                  className="tw-rounded-full"
                  style={{ width: "50px", height: "50px", objectFit: "contain" }}
                />
              </div>
              <div>
                <h4 className="tw-font-bold tw-mb-1 tw-text-gray-900">{job.company.name}</h4>
                <span className="tw-bg-gray-100 tw-text-gray-800 tw-border tw-rounded-full tw-px-3 tw-py-1 tw-me-2 tw-text-sm">
                  {job.company.industry}
                </span>
                <span className="tw-bg-blue-100 tw-text-blue-800 tw-rounded-full tw-px-3 tw-py-1 tw-text-sm">
                  {job.company.companyType}
                </span>
              </div>
            </div>

            {/* Company Quick Stats */}
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-3 tw-gap-4 tw-mb-5">
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                  style={{
                    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                  }}>
                  <i className="bi bi-geo-alt-fill tw-text-white"></i>
                </span>
                <span className="tw-text-gray-700">{job.locations[0]?.city}, {job.locations[0]?.state}</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                  style={{
                    background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
                  }}>
                  <i className="bi bi-building tw-text-white"></i>
                </span>
                <span className="tw-text-gray-700">Founded: 1946</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center"
                  style={{
                    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                  }}>
                  <i className="bi bi-people-fill tw-text-white"></i>
                </span>
                <span className="tw-text-gray-700">10,000+ Employees</span>
              </div>
            </div>

            {/* About Text */}
            <p className="tw-text-gray-700 tw-mb-5">
              {job.company.name} is a leading player in the {job.company.industry} sector. We are committed to innovation, growth, and providing exciting career opportunities for passionate professionals.
            </p>

            {/* Links */}
            <div className="tw-flex tw-flex-wrap tw-gap-3">
              <a
                href={job.company?.website}
                target="_blank"
                rel="noreferrer"
                className="tw-flex tw-items-center tw-gap-2 tw-border tw-border-gray-300 tw-rounded-full tw-px-4 tw-py-2 tw-text-gray-700 tw-transition tw-no-underline hover:tw-bg-gray-100 hover:tw-shadow-sm"
                style={{ textDecoration: "none" }}
              >
                <i className="bi bi-globe"></i>
                Website
              </a>

              <a
                href={job.company.linkedin}
                target="_blank"
                rel="noreferrer"
                className="tw-flex tw-items-center tw-gap-2 tw-border tw-border-blue-300 tw-rounded-full tw-px-4 tw-py-2 tw-text-blue-700 hover:tw-bg-blue-50 tw-transition"
                 style={{ textDecoration: "none" }}
              >
                <i className="bi bi-linkedin"></i> LinkedIn
              </a>
              <a
                href={job.company.glassdoor}
                target="_blank"
                rel="noreferrer"
                className="tw-flex tw-items-center tw-gap-2 tw-border tw-border-green-300 tw-rounded-full tw-px-4 tw-py-2 tw-text-green-700 hover:tw-bg-green-50 tw-transition"
                 style={{ textDecoration: "none" }}
              >
                <i className="bi bi-star-fill"></i> Glassdoor
              </a>
            </div>
          </motion.div>


          {/* Company Updates */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card border-0 rounded-4 mb-5 mt-4 shadow-lg overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #fefafc, #e0f7ff)", // soft pastel gradient
            }}
          >
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 d-flex align-items-center text-gradient">
                <img
                  src="/Image/loudspeaker.png"
                  alt="megaphone"
                  width={28}
                  height={28}
                  className="me-2"
                />
                Recent Company Updates
              </h4>

              <ul className="list-unstyled mb-0">
                {companyUpdates.map((update, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mb-3 d-flex align-items-center justify-content-between p-3 rounded-3 shadow-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Left Side */}
                    <div className="d-flex align-items-center">
                      <img
                        src="/Image/check.png"
                        alt="check"
                        width={22}
                        height={22}
                        className="me-2"
                      />
                      <span className="fw-medium text-dark">{update}</span>
                    </div>

                    {/* Badge */}
                    <span
                      className="badge px-3 py-2 rounded-pill shadow-sm"
                      style={{
                        background: "linear-gradient(135deg,#667eea,#764ba2)",
                        color: "white",
                        fontSize: "0.8rem",
                      }}
                    >
                      New
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>


        </div>

        {/* SIDEBAR */}
        <div className="col-lg-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card border-0 rounded-4 shadow-lg p-4 position-sticky"
            style={{
              top: "100px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,244,255,0.9))",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            {/* Quick Actions */}
            <h5 className="fw-bold mb-3 text-gradient">Quick Actions</h5>

            {/* Apply Button */}
            <button className="btn w-100 mb-2 fw-semibold rounded-pill shadow-sm" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)", color: "white", }} > <i className="bi bi-send-fill me-2"></i> Apply Now </button>

            {/* Save Button */}
            <button className="btn btn-outline-dark w-100 mb-4 fw-semibold rounded-pill shadow-sm hover-scale"> <i className="bi bi-bookmark me-2"></i> Save Job </button>

            {/* Highlights */}
            <h6 className="fw-bold mb-3 text-dark">Highlights</h6>
            <ul className="list-unstyled small">
              <li className="mb-3 d-flex align-items-center">
                <img src="/Image/rupees.png" width={18} className="me-2" />
                <span>{job.salary?.min} - {job.salary?.max} {job.salary?.currency}</span>
              </li>

              <li className="mb-3 d-flex align-items-center">
                <img src="/Image/location.png" width={18} className="me-2" />
                <span>{job.locations[0]?.city}, {job.locations[0]?.state}</span>
              </li>

              <li className="mb-3 d-flex align-items-center">
                <img src="/Image/clock1.png" width={18} className="me-2" />
                <span>{job.type}</span>
              </li>

              <li className="mb-3 d-flex align-items-center">
                <img src="/Image/calendar1.png" width={18} className="me-2" />
                <span>Apply before {job.deadline}</span>
              </li>
            </ul>

            <hr />

            {/* Share Job */}
            <h6 className="fw-bold mb-2">🔗 Share this Job</h6>
            <div className="d-flex gap-2 mb-4">

              {/* Social Buttons */}
              {[
                { platform: "linkedin", icon: "/Image/linkedin.png", color: "#0a66c2" },
                { platform: "whatsapp", icon: "/Image/whatsapp.png", color: "#25d366" },
                { platform: "x", icon: "/Image/x.png", color: "#000" },
              ].map((social, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => shareJob(social.platform, job)}
                  className="btn btn-sm rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: social.color,
                    border: "none",
                  }}
                >
                  <img src={social.icon} width={18} />
                </motion.button>
              ))}

              {/* Copy Link */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                onClick={async () => {
                  const success = await copyJobLink();
                  if (success) {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                  }
                }}
                className="btn btn-sm btn-outline-secondary rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                style={{ width: "40px", height: "40px" }}
              >
                <img src="/Image/link.png" width={18} />
              </motion.button>
            </div>

            {/* Toast */}
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow-lg"
                style={{
                  zIndex: 2000,
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderLeft: "5px solid #4caf50",
                  minWidth: "260px",
                }}
              >
                <div className="d-flex align-items-start">
                  {/* Icon */}
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "linear-gradient(135deg,#4caf50,#1b8f3b)",
                      color: "white",
                      fontSize: "1.3rem",
                    }}
                  >
                    ✓
                  </div>

                  {/* Text */}
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1" style={{ color: "#1b8f3b" }}>
                      Link Copied!
                    </h6>
                    <p className="mb-0 small text-dark">
                      Job link successfully copied to clipboard.
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setShowToast(false)}
                    className="btn-close"
                    style={{
                      filter: "invert(0.5)",
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.filter = "invert(0.8)")}
                    onMouseLeave={(e) => (e.target.style.filter = "invert(0.5)")}
                  ></button>
                </div>
              </motion.div>
            )}


            {/* More Jobs */}
            <h6 className="fw-bold mb-3 mt-3">
              More Jobs at {job.company.name}
            </h6>

            {relatedCompanyJobs.length > 0 ? (
              relatedCompanyJobs.map((rjob, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.035, y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="p-3 mb-3 rounded-4 shadow-sm bg-white"
                  style={{
                    cursor: "default",
                    border: "1px solid rgba(0,0,0,0.07)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Job Title */}
                  <h6 className="fw-bold text-dark mb-2">
                    {rjob.title.length > 40 ? rjob.title.slice(0, 40) + "..." : rjob.title}
                  </h6>

                  {/* Location */}
                  <div className="d-flex align-items-center text-muted small mb-2">
                    <img
                      src="/Image/location.png"
                      width={15}
                      className="me-2 opacity-75"
                      alt="location"
                    />
                    <span>
                      {rjob.locations?.[0]?.city || "N/A"},{" "}
                      {rjob.locations?.[0]?.state || "N/A"}
                    </span>
                  </div>

                  {/* Salary */}
                  <div
                    className="fw-semibold text-success d-flex align-items-center small"
                  >
                    <img
                      src="/Image/rupees.png"
                      width={15}
                      className="me-2 opacity-75"
                      alt="salary"
                    />
                    ₹{rjob.salary?.min || "0"} – ₹{rjob.salary?.max || "0"} {rjob.salary?.currency}
                  </div>

                  {/* Bottom Accent Bar */}
                  <div
                    className="mt-3 rounded-pill"
                    style={{
                      height: "4px",
                      background: "linear-gradient(to right, #4ade80, #16a34a)",
                    }}
                  ></div>
                </motion.div>
              ))
            ) : (
              <p className="text-muted small">No other jobs at this company.</p>
            )}

            <hr />

            {/* Similar Jobs */}
            <h6 className="fw-bold mb-3">Similar Jobs You May Like</h6>
            {similarJobs.length > 0 ? (
              similarJobs.slice(0, 3).map((sjob, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.035, y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="p-3 mb-3 rounded-4 shadow-sm bg-white"
                  style={{
                    cursor: "pointer",
                    border: "1px solid rgba(0,0,0,0.07)",
                    transition: "all 0.3s ease",
                  }}
                //onClick={() => navigate(`/jobs/${sjob._id}`)} // optional
                >
                  {/* Job Title */}
                  <h6 className="fw-bold text-dark mb-2">
                    {sjob.title.length > 40 ? sjob.title.slice(0, 40) + "..." : sjob.title}
                  </h6>

                  {/* Location Row */}
                  <div className="d-flex align-items-center text-muted small mb-2">
                    <img
                      src="/Image/location.png"
                      width={15}
                      className="me-2 opacity-75"
                      alt="location"
                    />
                    <span>
                      {sjob.locations?.[0]?.city || "N/A"},{" "}
                      {sjob.locations?.[0]?.state || "N/A"}
                    </span>
                  </div>

                  {/* Salary */}
                  <div
                    className="fw-semibold text-success"
                    style={{ fontSize: "0.95rem" }}
                  >
                    ₹{sjob.salary?.min || "0"} – ₹{sjob.salary?.max || "0"}{" "}
                    {sjob.salary?.currency || ""}
                  </div>

                  {/* Subtle bottom highlight */}
                  <div
                    className="mt-3 rounded-pill"
                    style={{
                      height: "4px",
                      background: "linear-gradient(to right, #4ade80, #16a34a)",
                    }}
                  ></div>
                </motion.div>
              ))
            ) : (
              <p className="text-muted small">No similar jobs available.</p>
            )}

          </motion.div>
        </div>

      </div>
    </div>
  );
};


export default JobDetailsPage;


// The JobDetailsPage component is a React functional component designed to display detailed information about a specific job posting.
//  It uses React hooks such as useState and useEffect to manage state and side effects.
// The job code is extracted from the URL using useParams, which allows the component to fetch the relevant job data from the backend API.
// Upon mounting or when the job code changes, the component fetches the job details, related jobs from the same company,
// and similar jobs from the same category, storing these in their respective state variables.

// The UI is structured using Bootstrap grid classes and enhanced with Framer Motion for smooth animations.
// The main content area displays the job’s title, company logo, company name, industry, location, remote options, and posting date.It also shows a badge for the job type.
// The job overview section presents key attributes such as experience level, job type, salary range, posting date, application deadline, and location, each with an icon and styled background.

// Further down, the job description, key responsibilities, requirements, and required skills are listed, with each skill rendered as a stylized badge.
// If available, compensation and benefits, as well as perks, are displayed in a visually appealing card layout.The company details section provides more information about the employer, including quick stats,
// a brief description, and links to the company’s website, LinkedIn, and Glassdoor profiles.

// On the sidebar, users can quickly apply for the job or save it.Highlights such as salary, location, job type, and application deadline are summarized for convenience.
// The sidebar also includes sharing options for LinkedIn, WhatsApp, and X(Twitter), as well as a button to copy the job link to the clipboard, with a toast notification for feedback.Finally,
// the sidebar lists more jobs from the same company and similar jobs from the same category, allowing users to explore related opportunities.The component’s design emphasizes clarity, interactivity,
//  and a modern look, making it user - friendly and visually engaging.