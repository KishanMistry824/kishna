// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FileText,
//   Terminal,
//   Zap,
//   TrendingUp,
//   Users,
//   BarChart3,
//   Home,
// } from "lucide-react";

// // SOLID COLORS — NO OPACITY ANYWHERE
// const blogData = [
//   {
//     title: "Top Resume Mistakes to Avoid in 2025",
//     content:
//       "Craft a winning resume with these practical tips and examples. Stand out from the crowd!",
//     path: "/details/TopResumeMistakes",
//     icon: FileText,
//     bg: "tw-bg-cyan-900",
//     text: "tw-text-cyan-300",
//   },
//   {
//     title: "Mastering Technical Interview Questions",
//     content:
//       "Get ready for the future with real-world technical interview tips and answers.",
//     path: "/details/InterviwePrep",
//     icon: Terminal,
//     bg: "tw-bg-emerald-900",
//     text: "tw-text-emerald-300",
//   },
//   {
//     title: "In-Demand Skills for 2025",
//     content:
//       "Explore trending skills like AI, React, and DevOps that employers want.",
//     path: "/details/InDemandSkills",
//     icon: Zap,
//     bg: "tw-bg-amber-900",
//     text: "tw-text-amber-300",
//   },
//   {
//     title: "Job Market Trends",
//     content:
//       "Stay updated with the latest hiring trends and skills in demand.",
//     path: "/details/JobMarketTrends",
//     icon: TrendingUp,
//     bg: "tw-bg-rose-900",
//     text: "tw-text-rose-300",
//   },
//   {
//     title: "How to Build a Strong LinkedIn Profile",
//     content:
//       "Learn how to build a professional network that opens doors to new opportunities.",
//     path: "/details/CareerTipJobApplicationDetails",
//     icon: Users,
//     bg: "tw-bg-slate-900",
//     text: "tw-text-slate-300",
//   },
//   {
//     title: "Career Growth",
//     content:
//       "Discover strategies for advancing your career and achieving your goals.",
//     path: "/details/CareerTipCareerGrowth",
//     icon: BarChart3,
//     bg: "tw-bg-blue-900",
//     text: "tw-text-blue-300",
//   },
//   {
//     title: "How to Stand Out in Online Job Applications",
//     content:
//       "Enhance productivity and stay connected in a remote or hybrid work environment.",
//     path: "/details/HowtoStandOutinOnlineJobApplications",
//     icon: Home,
//     bg: "tw-bg-purple-900",
//     text: "tw-text-purple-300",
//   },
// ];

// const CareerTips = () => {
//   return (
//     <section className="tw-relative tw-py-20 tw-px-4 tw-overflow-hidden tw-font-[Poppins]">

//       {/* SOLID Background — NO OPACITY */}
//       <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-br tw-from-blue-700 tw-via-purple-700 tw-to-cyan-700"></div>

//       {/* Gradient Title */}
//       <motion.h3
//         className="tw-text-center tw-text-4xl md:tw-text-5xl tw-font-extrabold tw-mb-14 tw-bg-gradient-to-r tw-from-cyan-300 tw-to-blue-400 tw-text-transparent tw-bg-clip-text tw-relative"
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//       >
//         Boost Your Career With Our Insights
//       </motion.h3>

//       {/* Mobile Swiper */}
//       <div className="md:tw-hidden tw-relative">
//         <Swiper spaceBetween={20} slidesPerView={1.15}>
//           {blogData.map((blog, index) => (
//             <SwiperSlide key={index}>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className={`tw-rounded-2xl tw-p-5 tw-shadow-2xl ${blog.bg} tw-border tw-border-white/10 tw-transition`}
//               >
//                 <blog.icon className={`tw-w-10 tw-h-10 tw-mb-4 ${blog.text}`} />

//                 <h3 className="tw-text-xl tw-font-bold tw-text-white tw-mb-3">
//                   {blog.title}
//                 </h3>

//                 <p className="tw-text-sm tw-text-gray-200 tw-mb-4">
//                   {blog.content}
//                 </p>

//                 <Link
//                   to={blog.path}
//                   className={`tw-inline-block tw-px-4 tw-py-2 tw-rounded-full tw-border ${blog.text} tw-border-current tw-font-medium tw-text-sm hover:tw-bg-white/10`}
//                 >
//                   Read More →
//                 </Link>
//               </motion.div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Desktop Grid */}
//       <div className="tw-hidden md:tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-10 tw-relative">
//         {blogData.map((blog, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.08 }}
//             className={`tw-rounded-2xl tw-p-6 tw-shadow-2xl ${blog.bg} tw-border tw-border-white/10 hover:tw-scale-[1.04] tw-transition`}
//           >
//             <blog.icon className={`tw-w-12 tw-h-12 tw-mb-4 ${blog.text}`} />

//             <h3 className="tw-text-xl tw-font-bold tw-text-white tw-mb-3">
//               {blog.title}
//             </h3>

//             <p className="tw-text-gray-200 tw-text-sm tw-mb-5">
//               {blog.content}
//             </p>

//             <Link
//               to={blog.path}
//               className={`tw-inline-block tw-px-4 tw-py-2 tw-rounded-full tw-border ${blog.text} tw-border-current tw-font-medium tw-text-sm hover:tw-bg-white/10`}
//             >
//               Read More →
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CareerTips;





// Enhanced CareerTips Component
// Features Added:
// ✔ Card hover glow
// ✔ Swiper pagination dots
// ✔ Search filter bar
// ✔ Category tabs
// ✔ Fade-in animation per card
// ✔ Updated premium accent colors

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Terminal,
  Zap,
  TrendingUp,
  Users,
  BarChart3,
  Home,
} from "lucide-react";

// BRAND COLORS
const ACCENT = "tw-text-blue-600";
const ACCENT_BG = "tw-bg-blue-50";
const ACCENT_BORDER = "tw-border-blue-200";

// BLOG DATA WITH CATEGORY
const blogData = [
  {
    title: "Top Resume Mistakes to Avoid in 2025",
    category: "Resume",
    content: "Craft a winning resume with practical examples.",
    path: "/details/TopResumeMistakes",
    icon: FileText,
  },
  {
    title: "Master Technical Interview Questions",
    category: "Interview",
    content: "Real technical interview tips & concise examples.",
    path: "/details/InterviwePrep",
    icon: Terminal,
  },
  {
    title: "In-Demand Skills for 2025",
    category: "Skills",
    content: "Trending skills like AI, React, DevOps.",
    path: "/details/InDemandSkills",
    icon: Zap,
  },
  {
    title: "Job Market Trends",
    category: "Career",
    content: "Latest hiring trends & insights.",
    path: "/details/JobMarketTrends",
    icon: TrendingUp,
  },
  {
    title: "Optimize Your LinkedIn Profile",
    category: "Career",
    content: "Boost your visibility & professional identity.",
    path: "/details/CareerTipJobApplicationDetails",
    icon: Users,
  },
  {
    title: "Career Growth Strategies",
    category: "Career",
    content: "Level up your career with proven methods.",
    path: "/details/CareerTipCareerGrowth",
    icon: BarChart3,
  },
  {
    title: "Stand Out in Online Job Applications",
    category: "Resume",
    content: "Tips to make your application shine.",
    path: "/details/HowtoStandOutinOnlineJobApplications",
    icon: Home,
  },
];

const categories = ["All", "Resume", "Interview", "Skills", "Career"];

// CARD UI COMPONENT
const Card = ({ blog, index }) => {
  const Icon = blog.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="tw-rounded-2xl tw-p-6 tw-bg-white tw-border tw-border-slate-200 tw-shadow-sm
                 hover:tw-shadow-2xl hover:tw-shadow-blue-200/50 hover:tw-scale-[1.03]
                 tw-transition tw-duration-300 tw-ease-out"
    >
      <div className="tw-flex tw-items-start tw-gap-4">
        <div
          className={`tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-rounded-xl
                      ${ACCENT_BG} ${ACCENT_BORDER}`}
        >
          <Icon className={`tw-w-7 tw-h-7 ${ACCENT}`} />
        </div>

        <div className="tw-flex-1">
          <h3 className="tw-text-lg tw-font-semibold tw-text-slate-900 tw-mb-1">
            {blog.title}
          </h3>

          <p className="tw-text-sm tw-text-slate-600 tw-mb-4">{blog.content}</p>

          <Link
            to={blog.path}
            className={`tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full
                        tw-text-sm tw-font-medium tw-text-blue-700 tw-bg-blue-50 tw-border
                        tw-border-blue-200 hover:tw-bg-blue-100 hover:tw-border-blue-300
                        focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-300 tw-transition`}
                        style={{textDecoration: "none" }}
        > 
            Read More →
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const CareerTips = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredData = blogData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="tw-py-16 tw-px-4 tw-bg-slate-100 tw-font-sans">
      <div className="tw-max-w-6xl tw-mx-auto">

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tw-text-center tw-mb-10"
        >
          <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-slate-900">
            Career Insights & Tips
          </h2>
          <p className="tw-text-slate-600 tw-mt-2">Grow your career with expert guidance.</p>
        </motion.header>

        {/* SEARCH BAR */}
        <div className="tw-flex tw-justify-center tw-mb-6">
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tw-w-full md:tw-w-1/2 tw-px-4 tw-py-2 tw-rounded-xl tw-border tw-border-slate-300
                       focus:tw-ring-2 focus:tw-ring-blue-300 tw-outline-none"
          />
        </div>

        {/* CATEGORY TABS */}
        <div className="tw-flex tw-gap-3 tw-flex-wrap tw-justify-center tw-mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-medium
                tw-border tw-transition
                ${selectedCategory === cat
                  ? "tw-bg-blue-600 tw-text-white tw-border-blue-600"
                  : "tw-bg-white tw-text-slate-700 tw-border-slate-300 hover:tw-bg-slate-50"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MOBILE SWIPER WITH PAGINATION */}
        <div className="md:tw-hidden tw-mb-6">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1.05}
          >
            {filteredData.map((blog, i) => (
              <SwiperSlide key={i}>
                <Card blog={blog} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP GRID */}
        <div className="tw-hidden md:tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-6">
          {filteredData.map((blog, i) => (
            <Card key={i} blog={blog} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTips;
