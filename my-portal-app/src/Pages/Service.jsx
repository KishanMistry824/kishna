import React from "react";
import { motion } from "framer-motion";
import SubscribeSection from "../Components/SubscribeSection";

// UPDATED: Tailwind prefix (tw-), improved JS mapping, cleaner structure

const Service = () => {
  const services = [
    {
      icon: "bi-file-earmark-person",
      title: "Resume Review",
      desc: "Get expert feedback to optimize your resume for today’s job market.",
      color: "blue",
    },
    {
      icon: "bi-robot",
      title: "AI Job Matching",
      desc: "Smart recommendations tailored to your profile and goals.",
      color: "green",
    },
    {
      icon: "bi-mic",
      title: "Interview Coaching",
      desc: "One-on-one sessions to boost your confidence.",
      color: "yellow",
    },
    {
      icon: "bi-bar-chart-line",
      title: "Skill Assessments",
      desc: "Measure technical & soft skills with real-world tests.",
      color: "cyan",
    },
    {
      icon: "bi-building-check",
      title: "Employer Branding",
      desc: "Showcase your company and attract top talent.",
      color: "red",
    },
  ];

  const testimonials = [
    {
      name: "Aisha Khan",
      role: "Job Seeker",
      feedback:
        "SmartHired made my job search smooth and effective. I landed interviews within a week!",
    },
    {
      name: "Raj Patel",
      role: "Recruiter",
      feedback: "SmartHired’s AI filtering saved us hours every week.",
    },
    {
      name: "Sneha Mehta",
      role: "HR Lead",
      feedback:
        "We saw a 40% increase in hiring efficiency using SmartHired’s premium tools.",
    },
  ];

  const stats = [
    {
      icon: "bi-people",
      title: "5K+ Users",
      desc: "Trusted by job seekers & recruiters",
    },
    {
      icon: "bi-lightning-charge",
      title: "Fast Matching",
      desc: "AI-powered job matching",
    },
    {
      icon: "bi-bar-chart",
      title: "90% Success Rate",
      desc: "Smart decisions made easier",
    },
    {
      icon: "bi-shield-check",
      title: "Secure",
      desc: "Protected with enterprise-level encryption",
    },
  ];

  return (
    <main className="tw-font-sans tw-text-gray-800">
      {/* HERO SECTION */}
      <section
        className="tw-relative tw-text-white tw-text-center tw-flex tw-items-center tw-min-h-[85vh]
        tw-bg-gradient-to-br tw-from-[#224957] tw-to-[#2A9D8F] tw-overflow-hidden tw-py-20 tw-px-4"
      >
        <div className="tw-absolute tw-top-10 tw-left-10 tw-w-44 tw-h-44 tw-bg-white/10 tw-rounded-full tw-blur-2xl tw-animate-pulse"></div>
        <div className="tw-absolute tw-bottom-10 tw-right-10 tw-w-56 tw-h-56 tw-bg-white/10 tw-rounded-full tw-blur-3xl tw-animate-pulse"></div>

        <div className="tw-relative tw-z-10 tw-max-w-4xl tw-mx-auto">
          <motion.h1
            className="tw-text-4xl md:tw-text-6xl tw-font-extrabold tw-leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <i className="bi bi-lightning-fill tw-mr-3"></i>
            Land Your Dream Job Faster
          </motion.h1>

          <motion.p
            className="tw-text-lg md:tw-text-xl tw-mt-5 tw-opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Resume tools, AI job matches & career insights – all in one platform.
          </motion.p>

          <motion.div
            className="tw-mt-8 tw-flex tw-flex-wrap tw-justify-center tw-gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a
              href="#services"
              className="tw-bg-white tw-text-gray-900 tw-py-3 tw-px-8 tw-rounded-lg tw-shadow-md hover:tw-scale-105 tw-transition tw-font-semibold"
            >
              Explore Services <i className="bi bi-arrow-right tw-ml-2"></i>
            </a>

            <a
              href="#subscribe"
              className="tw-border tw-border-white tw-text-white tw-py-3 tw-px-8 tw-rounded-lg hover:tw-bg-white/20 tw-transition tw-font-semibold"
            >
              Subscribe <i className="bi bi-envelope-fill tw-ml-2"></i>
            </a>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="tw-py-20 tw-bg-gray-100 tw-text-center">
        <div className="tw-container tw-mx-auto tw-px-4 md:tw-px-0">
          <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold">Our Services</h2>
          <p className="tw-text-gray-600 tw-max-w-xl tw-mx-auto tw-mt-3">
            Everything you need to succeed in your career journey.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-10 tw-mt-12">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="tw-bg-white tw-rounded-2xl tw-p-8 tw-shadow-sm hover:tw-shadow-xl hover:tw-scale-[1.03] tw-transition tw-h-full"
              >
                <div
                  className={`tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-6 tw-text-${s.color}-600 tw-bg-${s.color}-100 tw-text-2xl tw-shadow-inner`}
                >
                  <i className={s.icon}></i>
                </div>
                <h3 className="tw-font-bold tw-text-xl">{s.title}</h3>
                <p className="tw-text-gray-500 tw-mt-3">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="must-have" className="tw-py-20 tw-bg-gray-100">
        <div className="tw-container tw-mx-auto tw-px-4 md:tw-px-0">
          <motion.h2
            className="tw-text-center tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-14"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Real User Testimonials
          </motion.h2>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
                className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-p-7 tw-h-full tw-border tw-border-gray-100"
              >
                <div className="tw-flex tw-items-center tw-mb-5">
                  <div className="tw-w-14 tw-h-14 tw-rounded-full tw-bg-gradient-to-br tw-from-blue-500 tw-to-purple-500 tw-flex tw-items-center tw-justify-center tw-text-white tw-font-semibold tw-text-xl tw-mr-4">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h6 className="tw-font-semibold tw-text-lg">{t.name}</h6>
                    <p className="tw-text-gray-500 tw-text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="tw-text-gray-600 tw-leading-relaxed">“{t.feedback}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="smart-addon" className="tw-py-20 tw-bg-gray-100 tw-text-center">
        <div className="tw-container tw-mx-auto tw-px-4 md:tw-px-0">
          <motion.h2
            className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Smart Add-on: Interactive Stats
          </motion.h2>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.3 }}
                className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-p-8 tw-border tw-border-gray-100"
              >
                <i className={`bi ${stat.icon} tw-text-5xl tw-text-blue-600 tw-mb-4`}></i>
                <h5 className="tw-text-xl tw-font-semibold">{stat.title}</h5>
                <p className="tw-text-gray-500 tw-mt-2">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SubscribeSection />
    </main>
  );
};

export default Service;