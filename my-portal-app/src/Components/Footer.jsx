import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const floatAnimation = {
    y: [0, -5, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  const socialHover = {
    scale: 1.2,
    transition: { type: "spring", stiffness: 200, duration: 0.3 },
  };

  const shimmer = {
    backgroundPosition: ["-200% 0%", "200% 0%"],
    transition: { duration: 2, repeat: Infinity, ease: "linear" },
  };

  return (
    <footer className="footer-section py-5 position-relative overflow-hidden">
      {/* Animated Gradient Shimmer Background */}
      <motion.div
        className="gradient-shimmer-bg"
        animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      <div className="container position-relative">
        <div className="row gy-4">
          {/* Brand Section */}
          <div className="col-md-3">
            <motion.h5
              className="fs-4 fw-bold mb-3 brand-text"
              whileHover={{ scale: 1.05 }}
            >
              <i className="fas fa-briefcase"></i> Job Portal
            </motion.h5>
            <p className="small text-secondary">
              Find Jobs. Get Hired. Grow Your Career with us.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="fw-bold mb-3 link-title">Quick Links</h6>
            <ul className="list-unstyled small">
              {[
                { name: "Home", path: "/" },
                { name: "Jobs", path: "/jobs-listing" },
                { name: "About Us", path: "/about" },
                { name: "Privacy Policy", path: "/privacy-policy" },
              ].map((link) => (
                <li key={link.name}>
                  <motion.div animate={shimmer} className="shimmer-wrapper">
                    <Link
                      to={link.path}
                      className="text-decoration-none footer-link"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>


          {/* Job Seekers */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3 link-title">Job Seekers</h6>
            <ul className="list-unstyled small">
              {[
                {name: "Browse Jobs", path: "/job-filters"}, 
                {name: "Create Profile", path:"/dashboard"}, 
                {name: "Career Advice", path:"/careeTips"}

              ].map(
                (item) => (
                  <li key={item.name}>
                    <motion.div animate={shimmer} className="shimmer-wrapper">
                      <Link to={item.path} className="text-decoration-none footer-link">
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-4">
            <h6 className="fw-bold mb-3 link-title">Stay Updated</h6>
            <p className="small text-secondary">
              Subscribe to get job updates directly to your inbox.
            </p>
            <form className="d-flex flex-wrap gap-2">
              <motion.input
                type="email"
                className="form-control newsletter-input shimmer-input"
                placeholder="Your Email"
                animate={shimmer}
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 8px #bfa055" }}
                whileTap={{ scale: 0.95 }}
                className="btn newsletter-btn px-3"
                type="submit"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="mt-5 mb-3 divider"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          animate={{ scaleX: [1, 0.95, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Social Links */}
        <div className="d-flex justify-content-center gap-3 fs-5 mb-4">
          {[
            { icon: "twitter", link: "/" },
            { icon: "facebook", link: "/" },
            { icon: "linkedin", link: "/" },
            { icon: "instagram", link: "/" },
            { icon: "github", link: "/" },
          ].map((social) => (
            <motion.a
              animate={floatAnimation}
              whileHover={socialHover}
              whileTap={{ scale: 0.9 }}
              key={social.icon}
              href={social.link}
              className="text-dark footer-social"
            >
              <i className={`fab fa-${social.icon}`}></i>
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-secondary small">
          © 2025 <span className="text-gold fw-semibold">Job Portal</span> —
          All Rights Reserved. <br />
          Crafted By <span className="text-gold"> Kishan Mistry & Team</span>
        </div>
      </div>

      {/* Scroll-to-top button */}
      <motion.button
        animate={{ y: [0, -3, 0] }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 8px #bfa055" }}
        className="btn scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fas fa-chevron-up"></i>
      </motion.button>

      {/* Styles */}
      <style jsx="true">{`
        :root {
          --gold: #bfa055;
          --dark-text: #343a40;
          --light-bg: #f8f9fa;
        }

        .footer-section {
          background-color: var(--light-bg);
        }

        /* Gradient shimmer background */
        .gradient-shimmer-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.15),
            rgba(255, 255, 255, 0.05)
          );
          background-size: 200% 200%;
          pointer-events: none;
        }

        .brand-text {
          color: var(--gold);
          position: relative;
          z-index: 1;
        }

        .link-title {
          color: var(--dark-text);
          position: relative;
          z-index: 1;
        }

        .footer-link {
          display: block;
          color: var(--dark-text);
          margin: 0.25rem 0;
          position: relative;
          transition: color 0.3s ease;
          z-index: 1;
        }

        .footer-link::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--gold);
          transition: width 0.3s ease;
        }

        .footer-link:hover {
          color: var(--gold);
        }

        .footer-link:hover::after {
          width: 100%;
        }

        .shimmer-wrapper {
          overflow: hidden;
          display: inline-block;
        }

        .newsletter-input {
          flex: 1;
          border: 1px solid #ddd;
          padding: 0.5rem 0.75rem;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .shimmer-input {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.02)
          );
          background-size: 200% 100%;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 8px var(--gold);
        }

        .newsletter-btn {
          background-color: var(--gold);
          color: #fff;
          border: none;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .newsletter-btn:hover {
          background-color: #d4b850;
        }

        .divider {
          height: 1px;
          width: 100%;
          background-color: #ddd;
          z-index: 1;
        }

        .footer-social {
          color: var(--dark-text);
          transition: all 0.3s ease;
          z-index: 1;
        }

        .footer-social:hover {
          color: var(--gold);
        }

        .scroll-top-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--gold);
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .footer-section .row {
            text-align: center;
          }
          .scroll-top-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;











// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   ArrowUp,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
// } from "lucide-react";

// const animations = {
//   float: {
//     y: [0, -4, 0],
//     transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
//   },
// };

// const Footer = ({
//   brandName = "Job Portal",
//   socialLinks = {
//     facebook: "#",
//     twitter: "#",
//     linkedin: "#",
//     instagram: "#",
//   },
//   onNewsletterSubmit = (email) => console.log("Subscribed:", email),
// }) => {
//   const [email, setEmail] = useState("");
//   const [showScroll, setShowScroll] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setShowScroll(window.scrollY > 300);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email.trim()) return alert("Please enter your email");
//     onNewsletterSubmit(email);
//     setEmail("");
//   };

//   return (
//     <>
//       <footer className="footer-container">
//         {/* Shimmer background */}
//         <div className="footer-shimmer" />

//         <div className="footer-content">
//           {/* Brand */}
//           <div className="footer-brand">
//             <h3>{brandName}</h3>
//             <p>Connecting talent with opportunity.</p>
//             <div className="footer-icons">
//               {Object.entries(socialLinks).map(([name, url], index) => (
//                 <motion.a
//                   key={index}
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={name}
//                   whileHover={{ scale: 1.2 }}
//                   {...animations.float}
//                 >
//                   {name === "facebook" && <Facebook />}
//                   {name === "twitter" && <Twitter />}
//                   {name === "linkedin" && <Linkedin />}
//                   {name === "instagram" && <Instagram />}
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="footer-links">
//             <h4>Quick Links</h4>
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/jobs">Jobs</Link></li>
//               <li><Link to="/about">About Us</Link></li>
//               <li><Link to="/contact">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Job Seekers */}
//           <div className="footer-links">
//             <h4>Job Seekers</h4>
//             <ul>
//               <li><Link to="/resume-tips">Resume Tips</Link></li>
//               <li><Link to="/career-advice">Career Advice</Link></li>
//               <li><Link to="/faq">FAQs</Link></li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="footer-newsletter">
//             <h4>Subscribe</h4>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 aria-label="Email address"
//               />
//               <button type="submit">Join</button>
//             </form>
//           </div>
//         </div>

//         {/* Scroll to top */}
//         {showScroll && (
//           <motion.button
//             className="scroll-top"
//             aria-label="Scroll to top"
//             whileHover={{ scale: 1.2 }}
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           >
//             <ArrowUp />
//           </motion.button>
//         )}

//         <p className="footer-bottom">
//           © {new Date().getFullYear()} {brandName}. All rights reserved.
//         </p>
//       </footer>

//       {/* ✅ Inline CSS (valid JSX syntax) */}
//       <style>{`
//         .footer-container {
//           position: relative;
//           overflow: hidden;
//           background: #111;
//           color: #ddd;
//           padding: 4rem 2rem 2rem;
//         }

//         .footer-shimmer {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(120deg, #111, #222, #bfa055, #222, #111);
//           background-size: 300% 300%;
//           animation: shimmer 15s infinite linear;
//           opacity: 0.15;
//           z-index: 0;
//         }

//         @keyframes shimmer {
//           0% { background-position: 0% 50%; }
//           100% { background-position: 100% 50%; }
//         }

//         .footer-content {
//           position: relative;
//           z-index: 1;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 2rem;
//         }

//         .footer-brand h3 {
//           color: #bfa055;
//           margin-bottom: 0.5rem;
//         }

//         .footer-icons a {
//           color: #bfa055;
//           margin-right: 1rem;
//           display: inline-block;
//           transition: color 0.3s ease;
//         }

//         .footer-icons a:hover {
//           color: #fff;
//         }

//         .footer-links h4,
//         .footer-newsletter h4 {
//           margin-bottom: 1rem;
//           color: #fff;
//         }

//         .footer-links ul {
//           list-style: none;
//           padding: 0;
//         }

//         .footer-links li a {
//           color: #ccc;
//           text-decoration: none;
//           transition: color 0.3s ease;
//         }

//         .footer-links li a:hover {
//           color: #bfa055;
//         }

//         .footer-newsletter form {
//           display: flex;
//           gap: 0.5rem;
//           flex-wrap: wrap;
//         }

//         .footer-newsletter input {
//           flex: 1;
//           padding: 0.5rem;
//           border-radius: 6px;
//           border: none;
//           outline: none;
//         }

//         .footer-newsletter button {
//           background: #bfa055;
//           color: #111;
//           border: none;
//           padding: 0.5rem 1rem;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: background 0.3s ease;
//         }

//         .footer-newsletter button:hover {
//           background: #fff;
//           color: #111;
//         }

//         .scroll-top {
//           position: fixed;
//           bottom: 2rem;
//           right: 2rem;
//           background: #bfa055;
//           border: none;
//           padding: 0.6rem;
//           border-radius: 50%;
//           cursor: pointer;
//           z-index: 10;
//         }

//         .footer-bottom {
//           text-align: center;
//           margin-top: 2rem;
//           color: #999;
//           font-size: 0.9rem;
//         }

//         @media (max-width: 600px) {
//           .footer-newsletter form {
//             flex-direction: column;
//           }
//           .footer-newsletter button {
//             width: 100%;
//           }
//           .footer-icons a {
//             margin-right: 0.5rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Footer;












// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   ArrowUp,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
// } from "lucide-react";

// const animations = {
//   float: {
//     y: [0, -4, 0],
//     transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
//   },
// };

// const Footer = ({
//   brandName = "Job Portal",
//   socialLinks = {
//     facebook: "#",
//     twitter: "#",
//     linkedin: "#",
//     instagram: "#",
//   },
//   onNewsletterSubmit = (email) => console.log("Subscribed:", email),
// }) => {
//   const [email, setEmail] = useState("");
//   const [showScroll, setShowScroll] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setShowScroll(window.scrollY > 300);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email.trim()) return alert("Please enter your email");
//     onNewsletterSubmit(email);
//     setEmail("");
//   };

//   return (
//     <>
//       <footer className="footer-container">
//         {/* Shimmer background */}
//         <div className="footer-shimmer" />

//         <div className="footer-content">
//           {/* Brand + Contact Info */}
//           <div className="footer-brand">
//             <h3>{brandName}</h3>
//             <p>Connecting talent with opportunity.</p>
//             <div className="footer-contact">
//               <p><Mail size={16} /> contact@jobportal.com</p>
//               <p><Phone size={16} /> +91 12345 67890</p>
//               <p><MapPin size={16} /> 123 Main Street, India</p>
//             </div>
//             <div className="footer-icons">
//               {Object.entries(socialLinks).map(([name, url], index) => (
//                 <motion.a
//                   key={index}
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={name}
//                   whileHover={{ scale: 1.2 }}
//                   {...animations.float}
//                 >
//                   {name === "facebook" && <Facebook />}
//                   {name === "twitter" && <Twitter />}
//                   {name === "linkedin" && <Linkedin />}
//                   {name === "instagram" && <Instagram />}
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="footer-links">
//             <h4>Quick Links</h4>
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/jobs">Jobs</Link></li>
//               <li><Link to="/about">About Us</Link></li>
//               <li><Link to="/contact">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Job Seekers */}
//           <div className="footer-links">
//             <h4>Job Seekers</h4>
//             <ul>
//               <li><Link to="/resume-tips">Resume Tips</Link></li>
//               <li><Link to="/career-advice">Career Advice</Link></li>
//               <li><Link to="/faq">FAQs</Link></li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="footer-newsletter">
//             <h4>Subscribe</h4>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 aria-label="Email address"
//               />
//               <button type="submit">Join</button>
//             </form>
//           </div>
//         </div>

//         {/* Scroll to top */}
//         {showScroll && (
//           <motion.button
//             className="scroll-top"
//             aria-label="Scroll to top"
//             whileHover={{ scale: 1.2 }}
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           >
//             <ArrowUp />
//           </motion.button>
//         )}

//         <p className="footer-bottom">
//           © {new Date().getFullYear()} {brandName}. All rights reserved.
//         </p>
//       </footer>

//       {/* Inline CSS */}
//       <style>{`
//         .footer-container {
//           position: relative;
//           overflow: hidden;
//           background: #fff; /* changed to white */
//           color: #333;
//           padding: 4rem 2rem 2rem;
//           font-family: sans-serif;
//         }

//         .footer-shimmer {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(120deg, #fff, #f8f8f8, #bfa055, #f8f8f8, #fff);
//           background-size: 300% 300%;
//           animation: shimmer 15s infinite linear;
//           opacity: 0.1;
//           z-index: 0;
//         }

//         @keyframes shimmer {
//           0% { background-position: 0% 50%; }
//           100% { background-position: 100% 50%; }
//         }

//         .footer-content {
//           position: relative;
//           z-index: 1;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 2rem;
//         }

//         .footer-brand h3 {
//           color: #bfa055; /* golden accent */
//           margin-bottom: 0.5rem;
//         }

//         .footer-contact p {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: #555;
//           font-size: 0.9rem;
//           margin: 0.3rem 0;
//         }

//         .footer-icons a {
//           color: #bfa055;
//           margin-right: 1rem;
//           display: inline-block;
//           transition: color 0.3s ease;
//         }

//         .footer-icons a:hover {
//           color: #333;
//         }

//         .footer-links h4,
//         .footer-newsletter h4 {
//           margin-bottom: 1rem;
//           color: #bfa055;
//         }

//         .footer-links ul {
//           list-style: none;
//           padding: 0;
//         }

//         .footer-links li a {
//           color: #555;
//           text-decoration: none;
//           transition: color 0.3s ease;
//         }

//         .footer-links li a:hover {
//           color: #bfa055;
//         }

//         .footer-newsletter form {
//           display: flex;
//           gap: 0.5rem;
//           flex-wrap: wrap;
//         }

//         .footer-newsletter input {
//           flex: 1;
//           padding: 0.5rem;
//           border-radius: 6px;
//           border: 1px solid #ccc;
//           outline: none;
//         }

//         .footer-newsletter button {
//           background: #bfa055;
//           color: #fff;
//           border: none;
//           padding: 0.5rem 1rem;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: background 0.3s ease;
//         }

//         .footer-newsletter button:hover {
//           background: #333;
//         }

//         .scroll-top {
//           position: fixed;
//           bottom: 2rem;
//           right: 2rem;
//           background: #bfa055;
//           border: none;
//           padding: 0.6rem;
//           border-radius: 50%;
//           cursor: pointer;
//           z-index: 10;
//           color: #fff;
//         }

//         .footer-bottom {
//           text-align: center;
//           margin-top: 2rem;
//           color: #999;
//           font-size: 0.9rem;
//         }

//         @media (max-width: 600px) {
//           .footer-newsletter form {
//             flex-direction: column;
//           }
//           .footer-newsletter button {
//             width: 100%;
//           }
//           .footer-icons a {
//             margin-right: 0.5rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Footer;
