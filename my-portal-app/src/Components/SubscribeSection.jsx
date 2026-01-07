import React, { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    type: "Basic Access",
    price: "₹249/mo",
    gradient: "tw-bg-gradient-to-br tw-from-indigo-600 tw-via-indigo-700 tw-to-purple-700",
    buttonGradient: "tw-bg-gradient-to-r tw-from-indigo-500 tw-to-purple-600",
    highlights: "Best for job seekers",
    features: [
      "Access to all services",
      "Basic career guidance",
      "Resume review",
      "AI job matching",
      "Job Alerts",
    ],
    aiFeatures: [],
  },
  {
    type: "Career Boost",
    price: "₹699",
    gradient: "tw-bg-gradient-to-br tw-from-purple-600 tw-via-violet-600 tw-to-fuchsia-600",
    buttonGradient: "tw-bg-gradient-to-r tw-from-fuchsia-500 tw-to-purple-600",
    highlights: "Perfect for serious growth",
    features: [
      "Access to all services",
      "3 one-on-one coaching sessions",
      "Resume review",
      "AI job matching",
      "Job Alerts",
    ],
    aiFeatures: [],
  },
  {
    type: "Elite Pro",
    price: "₹1999",
    gradient: "tw-bg-gradient-to-br tw-from-blue-700 tw-via-indigo-700 tw-to-purple-700",
    buttonGradient: "tw-bg-gradient-to-r tw-from-blue-500 tw-to-indigo-600",
    highlights: "Best for long-term success",
    features: [
      "Access to all services",
      "12 one-on-one coaching sessions",
      "Priority Support",
      "Resume review",
      "Exclusive Webinars",
      "AI job matching",
      "Job Alerts",
      "Mock Interviews",
    ],
    aiFeatures: [
      "AI-driven job recommendations",
      "Skill gap analysis",
      "AI Resume Matching (2026)",
      "Mock AI Interviewer (2026)",
    ],
  },
];

const SubscribeSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const handleSubscribe = (planType) => setSelectedPlan(planType);

  return (
    <section className="tw-py-12 tw-text-center" id="pricing">
      <div className="container">

        {/* Heading */}
        <motion.h2
          className="tw-font-bold tw-mb-3 tw-text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <i className="bi bi-stars tw-me-2 tw-text-purple-500"></i>
          Choose Your Plan
        </motion.h2>

        <motion.p
          className="tw-text-gray-600 tw-mb-10 tw-max-w-xl tw-mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Unlock <strong>AI-powered tools</strong> and premium career growth features.
        </motion.p>

        {/* Pricing Cards */}
        <div className="row g-4 tw-justify-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="tw-relative tw-rounded-2xl tw-p-[2px] tw-overflow-hidden">

                {/* Premium Gradient Border */}
                <div
                  className={`${plan.gradient} tw-absolute tw-inset-0 tw-rounded-2xl tw-opacity-90 tw-pointer-events-none`}
                ></div>

                {/* Inner Card */}
                <div className="tw-relative tw-z-[2] tw-bg-white tw-rounded-2xl tw-shadow-xl tw-h-full">

                  {/* Header */}
                  <div className="tw-text-center tw-py-5 tw-bg-black/10 tw-backdrop-blur tw-rounded-t-2xl">
                    <h4 className="tw-font-bold tw-text-gray-900">{plan.type}</h4>
                    <h2 className="tw-font-bold tw-text-2xl tw-text-gray-900">{plan.price}</h2>
                    <span className="tw-bg-black/80 tw-text-white tw-text-xs tw-rounded-full tw-px-3 tw-py-1 tw-mt-2 tw-inline-block">
                      {plan.highlights}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="tw-text-left tw-px-6 tw-py-5">
                    <h6 className="tw-text-gray-700 tw-mb-3">Core Features:</h6>

                    <ul className="tw-list-none tw-mb-4">
                      {plan.features.map((item, i) => (
                        <li key={i} className="tw-mb-2 tw-flex tw-items-center">
                          <i className="bi bi-check-circle-fill tw-text-green-500 tw-me-2"></i>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {plan.aiFeatures.length > 0 && (
                      <>
                        <hr className="tw-my-3" />
                        <h6 className="tw-text-gray-700 tw-mb-3">AI Additions (2026):</h6>

                        <ul className="tw-list-none">
                          {plan.aiFeatures.map((item, i) => (
                            <li key={i} className="tw-mb-2 tw-flex tw-items-center">
                              <i className="bi bi-cpu tw-text-blue-600 tw-me-2"></i>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Button */}
                    <div className="tw-text-center tw-mt-6 tw-mb-4">
                      <button
                        className={`${plan.buttonGradient} tw-text-white tw-rounded-full tw-px-6 tw-py-2 tw-shadow-lg tw-transition-all hover:tw-scale-105`}
                        onClick={() => handleSubscribe(plan.type)}
                      >
                        {selectedPlan === plan.type ? (
                          <>
                            <i className="bi bi-check2-circle tw-me-2"></i> Selected
                          </>
                        ) : (
                          <>
                            <i className="bi bi-arrow-right-circle tw-me-2"></i> Subscribe
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Alert */}
        {selectedPlan && (
          <div className="tw-mt-8 tw-bg-indigo-100 tw-text-indigo-700 tw-p-3 tw-rounded-lg tw-shadow-md">
            <i className="bi bi-info-circle-fill tw-me-2"></i>
            You selected the <strong>{selectedPlan}</strong> plan.
          </div>
        )}

        {/* Footer */}
        <div className="tw-text-center tw-mt-10 tw-text-gray-600 tw-text-sm">
          Developed by <strong>Team Nova</strong> • Guided by{" "}
          <strong>Kishan Mistry (Team Lead)</strong>
        </div>

      </div>
    </section>
  );
};

export default SubscribeSection;
