import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Kishan M.",
    role: "Frontend Developer at Google",
    image: "/image/register.png",
    message:
      "This platform helped me get hired at my dream company in just 2 weeks! The process was smooth and fast.",
    rating: 5,
  },
  {
    name: "Vishal J.",
    role: "HR Manager at StartTech",
    image: "/image/register.png",
    message:
      "We found amazing candidates through this portal. It saved us hours of effort and gave great results.",
    rating: 4,
  },
  {
    name: "Monil M.",
    role: "Full-Stack Developer at Microsoft",
    image: "/image/register.png",
    message:
      "Perfect place to search for jobs that match your skills. UI is easy, and results are accurate.",
    rating: 5,
  },
  {
    name: "Meet V.",
    role: "Full-Stack Developer at Microsoft",
    image: "/image/register.png",
    message:
      "Perfect place to search for jobs that match your skills. UI is easy, and results are accurate.",
    rating: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const starVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const Testimonials = () => {
  return (
    <section className="py-5 position-relative overflow-hidden" 
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      }}
    >
      {/* Floating gradient blobs */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(0,201,255,0.2), transparent 70%)",
          top: "-80px",
          left: "-80px",
          filter: "blur(120px)",
          zIndex: 0,
          animation: "float 20s infinite ease-in-out",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(255,0,201,0.2), transparent 70%)",
          bottom: "-80px",
          right: "-60px",
          filter: "blur(120px)",
          zIndex: 0,
          animation: "float 25s infinite ease-in-out",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, rgba(0,255,123,0.15), transparent 70%)",
          top: "35%",
          right: "-100px",
          filter: "blur(140px)",
          zIndex: 0,
          animation: "float 30s infinite ease-in-out",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(15px); }
        }
      `}</style>

      <div className="container position-relative z-1">
        <h2
          className="text-center fw-bold mb-2 display-6"
          style={{
            background: "linear-gradient(to right, #007cf0, #00dfd8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
           What Our Users Say
        </h2>
        <p className="text-center text-muted mb-5">
          Real stories. Real results. 
        </p>

        {/* Desktop Grid */}
        <div className="d-none d-md-block">
          <div className="row g-4 justify-content-center">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="col-md-6 col-lg-4"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div
                  className="card bg-white text-dark h-100 shadow-sm border-0 p-4"
                  style={{
                    borderRadius: "2rem",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="p-1 rounded-circle"
                      style={{
                        background: "linear-gradient(135deg, #007cf0, #00dfd8)",
                        padding: "3px",
                        display: "inline-block",
                        boxShadow:
                          "0 0 15px rgba(0, 201, 255, 0.5), 0 0 30px rgba(0, 201, 255, 0.2)",
                      }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-circle"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          border: "3px solid white",
                        }}
                      />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                  <motion.p
                    className="mb-3"
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    "{testimonial.message}"
                  </motion.p>
                  <div className="d-flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.i
                        key={i}
                        className="bi bi-star-fill text-warning me-1"
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={starVariants}
                      />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star text-warning me-1"></i>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Swiper */}
        <div className="d-md-none">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="card bg-white text-dark shadow-sm border-0 p-4 mx-3"
                  style={{
                    borderRadius: "2rem",
                    backdropFilter: "blur(8px)",
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="p-1 rounded-circle"
                      style={{
                        background: "linear-gradient(135deg, #007cf0, #00dfd8)",
                        padding: "3px",
                        display: "inline-block",
                        boxShadow:
                          "0 0 15px rgba(0, 201, 255, 0.5), 0 0 30px rgba(0, 201, 255, 0.2)",
                      }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-circle"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          border: "3px solid white",
                        }}
                      />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                  <p className="mb-3">"{testimonial.message}"</p>
                  <div className="d-flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.i
                        key={i}
                        className="bi bi-star-fill text-warning me-1"
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={starVariants}
                      />
                    ))}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm">
            View All Testimonials
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
