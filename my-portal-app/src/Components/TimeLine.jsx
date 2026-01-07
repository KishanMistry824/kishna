import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "end 0.1"],
  });

  // Animate line fill height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const journey = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started with a vision to transform the industry.",
      highlight: "3 Founding Members",
      icon: "bi-lightbulb",
      dotColor: "#6366f1",
    },
    {
      year: "2021",
      title: "First Milestone",
      description: "Launched our flagship product and reached 1,000+ users.",
      highlight: "1K+ Users",
      icon: "bi-trophy",
      dotColor: "#3b82f6",
    },
    {
      year: "2022",
      title: "Growth & Expansion",
      description: "Expanded to 3 new regions and scaled our platform.",
      highlight: "Global Reach",
      icon: "bi-globe",
      dotColor: "#06b6d4",
    },
    {
      year: "2023",
      title: "Innovation Phase",
      description: "Introduced AI-driven solutions for automation.",
      highlight: "AI Launch",
      icon: "bi-cpu",
      dotColor: "#8b5cf6",
    },
    {
      year: "2024",
      title: "Community Building",
      description: "Formed partnerships with global innovators.",
      highlight: "50+ Partners",
      icon: "bi-people",
      dotColor: "#ec4899",
    },
  ];

  return (
    <>
      <div
        ref={ref}
        className="container tw-relative tw-overflow-hidden tw-py-16"
      >
        {/* Title */}
        <h2 className="tw-text-center tw-font-extrabold tw-text-3xl md:tw-text-4xl tw-mb-14 tw-bg-gradient-to-r tw-from-indigo-500 tw-to-blue-500 tw-bg-clip-text tw-text-transparent">
          Our Journey
        </h2>

        {/* Main Timeline Wrapper */}
        <div className="tw-relative tw-w-full tw-max-w-6xl tw-mx-auto tw-px-2">

          {/* Center Animated Vertical Line */}
          <div className="tw-absolute tw-top-0 tw-bottom-0 tw-left-1/2 tw--translate-x-1/2 tw-w-[6px] tw-rounded-full 
          tw-bg-slate-300 tw-overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="tw-w-full tw-bg-gradient-to-b tw-from-indigo-500 tw-via-pink-500 tw-to-blue-500 tw-animate-pulse tw-rounded-full"
            />
          </div>

          {/* Timeline Items */}
          <div className="tw-space-y-16">
            {journey.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`tw-relative tw-flex tw-items-start ${
                    isLeft ? "tw-justify-end" : "tw-justify-start"
                  }`}
                >
                  {/* CARD */}
                  <div
                    className={`
                      tw-max-w-[520px] tw-p-6 tw-rounded-3xl tw-shadow-xl tw-backdrop-blur-xl
                      tw-bg-gradient-to-br tw-from-white/80 tw-to-indigo-50/60
                      tw-transition-all tw-duration-300 hover:tw-translate-y-[-6px] 
                      hover:tw-shadow-2xl tw-border-[4px]
                      ${
                        isLeft
                          ? "tw-border-l-indigo-500"
                          : "tw-border-r-blue-500"
                      }
                    `}
                    style={{ zIndex: 2 }}
                  >
                    {/* Year + Icon */}
                    <div className="tw-flex tw-gap-3 tw-items-center">
                      <i className={`bi ${item.icon} tw-text-2xl tw-text-indigo-600`}></i>
                      <h3 className="tw-text-xl tw-font-bold tw-text-indigo-700">
                        {item.year}
                      </h3>
                    </div>

                    <h4 className="tw-text-gray-900 tw-font-semibold tw-mt-2">
                      {item.title}
                    </h4>

                    <p className="tw-text-gray-600 tw-mt-2">{item.description}</p>

                    {/* Highlight */}
                    {item.highlight && (
                      <span className="tw-inline-block tw-mt-3 tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-bg-indigo-100 tw-text-indigo-600 tw-rounded-full">
                        {item.highlight}
                      </span>
                    )}
                  </div>

                  {/* CENTER DOT */}
                  <div
                    className="tw-absolute tw-top-6 tw-left-1/2 tw--translate-x-1/2 
                    tw-w-[32px] tw-h-[32px] tw-rounded-full tw-flex tw-items-center tw-justify-center 
                    tw-shadow-2xl tw-animate-pulse"
                    style={{
                      background: `radial-gradient(circle, ${item.dotColor}, #000000)`,
                      zIndex: 3,
                    }}
                  >
                    <i className={`bi ${item.icon} tw-text-white tw-text-sm`}></i>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Infinity Symbol */}
          <div className="tw-text-center tw-mt-20 tw-flex tw-flex-col tw-items-center">
            <div className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-gradient-to-br tw-from-indigo-500 tw-to-blue-600 tw-flex tw-items-center tw-justify-center tw-shadow-2xl">
              <i className="bi bi-infinity tw-text-3xl tw-text-white"></i>
            </div>
            <p className="tw-text-slate-500 tw-font-semibold tw-mt-3 tw-text-sm">
              The journey continues...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
