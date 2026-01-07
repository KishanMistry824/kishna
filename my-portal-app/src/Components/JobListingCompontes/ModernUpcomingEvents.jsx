

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

const arrowStyle = {
  background: "#1a1a1a",
  borderRadius: "50%",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  cursor: "pointer",
};

const darkGradients = [
  "linear-gradient(145deg, #0f2027, #203a43, #2c5364)",
  "linear-gradient(145deg, #232526, #414345)",
  "linear-gradient(145deg, #0f0c29, #302b63, #24243e)",
  "linear-gradient(145deg, #1c1c1c, #3a3a3a)",
];

const events = [
    {
    "id": 1,
    "title": "AI for Everyone — Introductory Webinar",
    "organizer": "Coursera",
    "category": ["AI", "Machine Learning", "Beginner"],
    "date": "15 Aug, 6:00 PM",
    "enrolled": 320,
    "badge1": "Entry closes by 14 Aug",
    "badge2": "Free Webinar",
    "img": "Image/Ai.jpg",
    "logo": "/Image/register.png",
    "offer": "Certificate Available",
    "registrationLink": "https://www.coursera.org/webinars/ai-for-everyone",
    "description": "A beginner-friendly introduction to AI concepts, applications, and career paths. Ideal for non-tech audiences."
  },
  {
    "id": 2,
    "title": "Hack the Future — Global Hackathon",
    "organizer": "DevPost",
    "category": ["Hackathon", "Full Stack", "Innovation"],
    "date": "22 Aug, 9:00 AM",
    "enrolled": 1240,
    "badge1": "Entry closes in 7d",
    "badge2": "Global Challenge",
    "img": "Image/Hackthon.jpg",
    "logo": "Image/Education.png",
    "offer": "$10,000 Prize Pool",
    "registrationLink": "https://devpost.com/hackathons/hack-the-future",
    "description": "Join developers worldwide to build innovative full-stack solutions and compete for cash prizes and recognition."
  },
  {
    "id": 3,
    "title": "Building Scalable Apps with React & Node",
    "organizer": "Udemy",
    "category": ["React", "Node.js", "Web Development"],
    "date": "18 Aug, 5:00 PM",
    "enrolled": 540,
    "badge1": "Entry closes in 5d",
    "badge2": "Live Coding",
    "img": "Image/jobs.jpg",
    "logo": "Image/Education.png",
    "offer": "Lifetime Access",
    "registrationLink": "https://www.udemy.com/course/scalable-react-node-apps",
    "description": "Master full-stack development with hands-on coding sessions focused on building scalable web applications."
  },
  {
    "id": 4,
    "title": "CyberSec Bootcamp — Capture The Flag",
    "organizer": "HackerRank",
    "category": ["Cybersecurity", "CTF", "Ethical Hacking"],
    "date": "25 Aug, 11:00 AM",
    "enrolled": 860,
    "badge1": "Entry closes in 10d",
    "badge2": "Competition",
    "img": "Image/jobs.jpg",
    "logo": "Image/Education.png",
    "offer": "Job Offer Opportunities",
    "registrationLink": "https://www.hackerrank.com/contests/cybersec-bootcamp-ctf",
    "description": "Test your cybersecurity skills in a competitive CTF environment and unlock potential job opportunities."
  },
  {
    "id": 5,
    "title": "Next.js World Conference 2025",
    "organizer": "Vercel",
    "category": ["Next.js", "TypeScript", "SSR"],
    "date": "28 Aug, 9:00 AM",
    "enrolled": 2100,
    "badge1": "Entry closes in 13d",
    "badge2": "Tech Conference",
    "img": "Image/jobs.jpg",
    "logo": "Image/Education.png",
    "offer": "Early Bird Tickets",
    "registrationLink": "https://vercel.com/events/nextjs-world-2025",
    "description": "Explore the future of web development with Next.js, featuring talks from industry leaders and Vercel engineers."
  },
  {
    "id": 6,
    "title": "Kubernetes in Production — Masterclass",
    "organizer": "Cloud Native Foundation",
    "category": ["Kubernetes", "DevOps", "Cloud"],
    "date": "19 Aug, 4:00 PM",
    "enrolled": 680,
    "badge1": "Entry closes in 4d",
    "badge2": "Expert Session",
    "img": "Image/jobs.jpg",
    "logo": "Image/Education.png",
    "offer": "Hands-on Labs",
    "registrationLink": "https://www.cncf.io/events/kubernetes-masterclass",
    "description": "Deep dive into Kubernetes best practices for production environments with hands-on labs and expert guidance."
  },
  {
    "id": 7,
    "title": "Quantum Computing & Cryptography Symposium",
    "organizer": "QuantumLeap Labs",
    "category": ["Quantum Computing", "Cryptography", "Research"],
    "date": "30 Aug, 10:00 AM",
    "enrolled": 420,
    "badge1": "Entry closes in 15d",
    "badge2": "Research Symposium",
    "img": "Image/jobs.jpg",
    "logo": "/Image/register.png",
    "offer": "Published Proceedings",
    "registrationLink": "https://quantumleaplabs.org/events/qc-cryptography-symposium",
    "description": "Explore cutting-edge research in quantum computing and cryptography with academic and industry experts."
  },
  {
    "id": 8,
    "title": "Generative AI Models: Building the Future",
    "organizer": "OpenAI",
    "category": ["AI", "Generative Models", "Deep Learning"],
    "date": "20 Aug, 3:00 PM",
    "enrolled": 1500,
    "badge1": "Entry closes in 6d",
    "badge2": "Tech Talk",
    "img": "Image/jobs.jpg",
    "logo": "Image/Education.png",
    "offer": "Exclusive Demo Access",
    "registrationLink": "https://openai.com/events/generative-models-future",
    "description": "Discover the latest advancements in generative AI and get exclusive access to model demos and insights."
  },
  {
    "id": 9,
    "title": "Revolutionary Tech Ideas — Startup Pitch Fest",
    "organizer": "TechXcelerate",
    "category": ["Innovation", "Startups", "Tech Ideas"],
    "date": "27 Aug, 2:00 PM",
    "enrolled": 300,
    "badge1": "Entry closes in 12d",
    "badge2": "Pitch Competition",
    "img": "Image/jobs.jpg",
    "logo": "/Image/register.png",
    "offer": "Investor Networking",
    "registrationLink": "https://techxcelerate.com/events/startup-pitch-fest",
    "description": "Pitch your startup ideas to top investors and tech leaders in a high-energy innovation showcase."
  },
  {
    "id": 10,
    "title": "Advanced Cybersecurity Strategies 2025",
    "organizer": "CyberSafe Institute",
    "category": ["Cybersecurity", "Threat Intelligence", "Enterprise"],
    "date": "23 Aug, 1:00 PM",
    "enrolled": 980,
    "badge1": "Entry closes in 8d",
    "badge2": "Expert Panel",
    "img": "Image/jobs.jpg",
    "logo": "Image/Education.png",
    "offer": "Industry Certification",
    "registrationLink": "https://cybersafeinstitute.org/events/advanced-strategies-2025",
    "description": "Learn enterprise-grade cybersecurity strategies from top experts and earn a recognized industry certification."
  },
  {
    "id": 11,
    "title": "AI Ethics & Responsible Innovation Forum",
    "organizer": "Ethics in Tech",
    "category": ["AI", "Ethics", "Policy"],
    "date": "29 Aug, 11:00 AM",
    "enrolled": 600,
    "badge1": "Entry closes in 14d",
    "badge2": "Discussion Forum",
    "img": "Image/jobs.jpg",
    "logo": "/Image/register.png",
    "offer": "Whitepaper Download",
    "registrationLink": "https://ethicsintech.org/events/ai-ethics-forum",
    "description": "Engage in meaningful discussions on ethical AI development and responsible innovation with policy leaders."
  },
  {
    "id": 12,
    "title": "Next-Gen IoT & Smart Cities Summit",
    "organizer": "SmartCity Alliance",
    "category": ["IoT", "Smart Cities", "Connectivity"],
    "date": "24 Aug, 10:00 AM",
    "enrolled": 1120,
    "badge1": "Entry closes in 9d",
    "badge2": "Global Summit",
    "img": "Image/jobs.jpg",
    "logo": "Image/Education.png",
    "offer": "Networking Opportunities",
    "registrationLink": "https://smartcityalliance.org/events/iot-smart-cities-summit",
    "description": "Explore the future of connected cities and IoT innovations with global leaders and urban tech pioneers."
  },
];

const ModernUpcomingEvents = () => {
  return (
    <div className="container py-5 position-relative">
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-md-4 text-center text-md-start mb-4 mb-md-0 position-relative">
          {/* Heading */}
          <h3
            className="fw-bold mb-3"
            style={{
              fontSize: "2rem",
              background: "linear-gradient(90deg, #00ffff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              letterSpacing: "0.5px",
            }}
          >
            Next-Gen Tech Events
            <span
              style={{
                position: "absolute",
                bottom: -6,
                left: 0,
                width: "60px",
                height: "4px",
                background: "linear-gradient(90deg, #00ffff, #0066ff)",
                borderRadius: "2px",
                boxShadow: "0 0 12px #00ffff, 0 0 20px #0066ff",
              }}
            ></span>
          </h3>

          {/* Subheading */}
          <p
            className="text-light small mb-3"
            style={{
              lineHeight: "1.5",
              maxWidth: "320px",
              fontStyle: "italic",
              color: "#c0f7ff",
              textShadow: "0 0 6px rgba(0,255,255,0.4)",
            }}
          >
            Explore cutting-edge webinars, hackathons, and challenges shaping the future of technology.
          </p>

          {/* Illustration */}
          <motion.img
            src="Image/engineering.png"
            alt="Illustration"
            className="img-fluid"
            style={{ maxWidth: "200px", zIndex: 1 }}
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating tech accent */}
          <div
            style={{
              position: "absolute",
              top: "-12px",
              right: "-12px",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "rgba(0,255,255,0.15)",
              boxShadow: "0 0 25px rgba(0,255,255,0.5)",
              zIndex: 0,
              transform: "rotate(45deg)",
            }}
          ></div>

          {/* Additional subtle glow accent */}
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "-10px",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "rgba(0,102,255,0.1)",
              boxShadow: "0 0 15px rgba(0,102,255,0.4)",
              zIndex: 0,
              transform: "rotate(-30deg)",
            }}
          ></div>
        </div>



        {/* Right Section */}
        <div className="col-md-8 position-relative">
          {/* External Navigation Arrows */}
          <div
            className="swiper-button-prev-custom"
            style={{ ...arrowStyle, position: "absolute", top: "40%", left: "-25px", zIndex: 10 }}
          >
            <FiChevronLeft size={20} />
          </div>
          <div
            className="swiper-button-next-custom"
            style={{ ...arrowStyle, position: "absolute", top: "40%", right: "-25px", zIndex: 10 }}
          >
            <FiChevronRight size={20} />
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
          >
            {events.map((event, index) => {
              const gradient = darkGradients[index % darkGradients.length];

              return (
                <SwiperSlide key={event.id}>
                  <div
                    className="card h-100 text-white border-0 shadow-lg"
                    style={{
                      borderRadius: "1.5rem",
                      overflow: "hidden",
                      background: gradient,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Top Image & Badges */}
                    <div className="position-relative">
                      <img src={event.img} className="w-100" alt={event.title} style={{ filter: "brightness(0.85)" }} />
                      <div className="position-absolute top-0 start-0 p-2 d-flex gap-2 flex-column">
                        <span className="badge bg-gradient text-white rounded-pill px-3 py-2" style={{ background: "#ff416c" }}>
                          {event.badge1}
                        </span>
                        <span className="badge bg-gradient text-white rounded-pill px-3 py-2" style={{ background: "#00c6ff" }}>
                          {event.badge2}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <img
                          src={event.logo}
                          alt={event.organizer}
                          className="rounded me-2 border border-white"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <div>
                          <h6 className="fw-bold mb-0">{event.title}</h6>
                          <small className="text-white-50">{event.organizer}</small>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mb-2">
                        {event.category.map((cat, i) => (
                          <span
                            key={i}
                            className="badge rounded-pill me-1"
                            style={{ background: "#ffffff10", color: "#fff" }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Date & Enrollment */}
                      <div className="d-flex justify-content-between small text-white-50">
                        <span>📅 {event.date}</span>
                        <span>👥 {event.enrolled} Enrolled</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="card-footer border-0 d-flex justify-content-between" style={{ background: "rgba(0,0,0,0.25)" }}>
                      <span className="badge rounded-pill text-white px-3 py-2" style={{ background: "#ff6a00" }}>
                        {event.offer}
                      </span>
                      <a href="/" className="fw-bold text-white text-decoration-none">
                        View details →
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ModernUpcomingEvents;
