import React from "react";
import { FaMapMarkerAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const PopularJobsCard = ({
  title,
  company,
  location,
  description,
  color,
  link,
  jobType = "Full-time",
  postedDate = "2 days ago",
}) => {
  const gradientMap = {
    primary: "tw-from-blue-600 tw-to-blue-400",
    success: "tw-from-green-500 tw-to-lime-400",
    danger: "tw-from-rose-500 tw-to-orange-500",
    warning: "tw-from-yellow-500 tw-to-amber-300",
    info: "tw-from-cyan-400 tw-to-blue-500",
    secondary: "tw-from-slate-500 tw-to-gray-300",
    dark: "tw-from-gray-900 tw-to-gray-700",
  };

  const gradient = gradientMap[color] || "tw-from-gray-400 tw-to-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className="tw-group tw-relative tw-bg-white tw-rounded-3xl tw-shadow-md tw-border tw-border-gray-100 tw-overflow-hidden tw-transition-all tw-duration-500 hover:tw-shadow-2xl hover:tw--translate-y-1"
      >
        {/* 🔹 Decorative Hover Background */}
        <div
          className={`tw-absolute tw-inset-0 tw-opacity-0 group-hover:tw-opacity-10 tw-transition-all tw-duration-500 tw-bg-gradient-to-br ${gradient}`}
        ></div>

        {/* 🔹 Decorative Corner Accent */}
        <div className="tw-absolute tw-top-0 tw-right-0 tw-w-20 tw-h-20 tw-bg-gradient-to-br tw-from-gray-100 tw-to-transparent tw-rounded-bl-3xl group-hover:tw-opacity-80 tw-opacity-40"></div>

        {/* 🔹 Top Accent Line (Animated on Hover) */}
        <div
          className={`tw-h-1.5 tw-w-full tw-bg-gradient-to-r ${gradient} tw-scale-x-0 group-hover:tw-scale-x-100 tw-origin-left tw-transition-all tw-duration-500`}
        />

        <div className="tw-relative tw-p-6 tw-z-10">
          {/* 🏢 Company Badge */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`tw-inline-block tw-mb-4 tw-px-4 tw-py-1.5 tw-text-xs tw-font-semibold tw-text-white tw-rounded-full tw-bg-gradient-to-r ${gradient} tw-shadow`}
          >
            {company}
          </motion.span>

          {/* 📝 Title with Gradient Hover */}
          <h3
            className={`
              tw-text-lg tw-font-bold tw-text-gray-900 tw-mb-2 
              group-hover:tw-bg-gradient-to-r ${gradient} 
              group-hover:tw-text-transparent group-hover:tw-bg-clip-text 
              tw-transition-all tw-duration-500
            `}
          >
            {title}
          </h3>

          {/* 📍 Location */}
          <p className="tw-flex tw-items-center tw-text-sm tw-text-gray-500 tw-mb-2">
            <FaMapMarkerAlt className="tw-mr-2 tw-text-gray-700 group-hover:tw-text-blue-600 tw-transition-all" />
            {location}
          </p>

          {/* 🕒 Posted Date + Job Type */}
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
            <span className="tw-flex tw-items-center tw-text-xs tw-text-gray-500">
              <FaClock className="tw-mr-1" /> {postedDate}
            </span>

            <span className="tw-text-xs tw-bg-gray-100 tw-text-gray-700 tw-font-semibold tw-px-3 tw-py-1 tw-rounded-full tw-shadow-sm">
              {jobType}
            </span>
          </div>

          {/* 📄 Description (Line Clamp for equal card height) */}
          <p className="tw-text-sm tw-text-gray-600 tw-leading-relaxed tw-line-clamp-3">
            {description}
          </p>

          {/* Divider */}
          <div className="tw-my-4 tw-border-b tw-border-gray-200"></div>

          {/* 🔘 CTA Button with Animated Arrow */}
          <motion.a
            href={link}
            whileTap={{ scale: 0.96 }}
            style={{ textDecoration: "none" }}
            className={`
              tw-inline-flex tw-items-center tw-gap-2 tw-font-semibold tw-text-white 
              tw-px-5 tw-py-2.5 tw-rounded-full 
              tw-bg-gradient-to-r ${gradient}
              tw-shadow-md hover:tw-shadow-xl tw-transition-all tw-duration-500
            `}
          >
            View Details
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            >
              <FaArrowRight />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopularJobsCard;
