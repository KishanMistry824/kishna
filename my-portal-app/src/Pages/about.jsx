// About.jsx — Full Cyberpunk Dark Version (Tailwind tw-prefix)

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaGlobe, FaUsers, FaBriefcase, FaUserTie } from "react-icons/fa";
import TimeLine from "../Components/TimeLine";
import EngagementSections from "../Components/EngagementSections";
import WhyChooseUs from "../Components/WhyChooseUs";

// Team data
const teamMembers = [
  {
    name: "Kishan Mistry",
    role: "Lead Full Stack Developer",
    image: "/Image/kishan.jpg",
    status: "Active",
    skills: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "System Design"],
    bio: "Full-stack developer leading UI/UX & backend integrations. Enjoys designing scalable systems and delivering polished user experiences.",
    socials: [
      { icon: "linkedin", link: "https://linkedin.com/in/kishanmistry" },
      { icon: "github", link: "https://github.com/kishanmistry" }
    ]
  },

  {
    name: "Monil Meshuriya",
    role: "Frontend Engineer",
    image: "/Image/monil.jpg",
    status: "Active",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Figma", "Framer Motion"],
    bio: "Frontend engineer crafting smooth interfaces with strong attention to detail, animations, and user-centric design.",
    socials: [
      { icon: "linkedin", link: "https://linkedin.com/in/monilmeshuriya" }
    ]
  },

  {
    name: "Vishal Jariwala",
    role: "Senior Backend Developer",
    image: "/Image/vishal.jpg",
    status: "On Project",
    skills: ["Node.js", "Express.js", "MongoDB", "Redis", "API Security"],
    bio: "Backend developer focused on high-performance APIs, authentication systems, and secure data flow management.",
    socials: [
      { icon: "github", link: "https://github.com/vishalj" }
    ]
  },

  {
    name: "Meet Vasava",
    role: "Backend & DevOps Engineer",
    image: "/Image/meet.jpg",
    status: "On Project",
    skills: ["Node.js", "Docker", "SQL", "JWT", "CI/CD"],
    bio: "Backend & DevOps engineer passionate about automation, containerization, and building reliable deployment pipelines.",
    socials: [
      { icon: "linkedin", link: "https://linkedin.com/in/meetvasava" }
    ]
  }
];



const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const About = () => {
  // Cursor reactive spotlight (uses CSS variables for perf)
  useEffect(() => {
    const spot = document.getElementById('cyber-spotlight-about');
    const neon = document.getElementById('cyber-neon-streak-about');
    if (!spot) return;
    const onMove = (e) => {
      spot.style.setProperty('--mx', e.clientX + 'px');
      spot.style.setProperty('--my', e.clientY + 'px');
      neon && neon.style.setProperty('--mx', e.clientX + 'px');
      neon && neon.style.setProperty('--my', e.clientY + 'px');
      spot.style.opacity = '1';
      neon && (neon.style.opacity = '1');
    };
    if (!prefersReducedMotion()) document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  // Particle drift (lightweight CSS + small JS offset)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const parts = Array.from(document.querySelectorAll('.cyber-pt'));
    let t = 0;
    let rafId = null;
    const step = () => {
      t += 0.008;
      parts.forEach((p, i) => {
        const dx = Math.sin(t + i) * (8 + (i % 3) * 3);
        const dy = Math.cos(t + i * 0.7) * (6 + (i % 4) * 2);
        p.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const stats = [
    { icon: <FaUsers />, label: 'Active Users', value: 10500, color: '#3b82f6' },
    { icon: <FaBriefcase />, label: 'Jobs Created', value: 3400, color: '#10b981' },
    { icon: <FaUserTie />, label: 'Jobs Posted', value: 12000, color: '#f59e0b' }
  ];

  return (
    <section className="tw-relative tw-overflow-hidden tw-py-24 tw-text-white" aria-labelledby="about-title">

      {/* Background base gradient (dark->deep) */}
      <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-br tw-from-[#020205] tw-via-[#071428] tw-to-[#0b0610] -tw-z-40" />

      {/* RGB Neon cycling blobs */}
      <div className="tw-absolute -tw-top-44 -tw-left-44 tw-w-[720px] tw-h-[720px] tw-rounded-full tw-blur-[140px] tw-opacity-60 tw-animate-rgb-blob -tw-z-30" aria-hidden />
      <div className="tw-absolute -tw-bottom-44 -tw-right-44 tw-w-[620px] tw-h-[620px] tw-rounded-full tw-blur-[140px] tw-opacity-50 tw-animate-rgb-blob-delay -tw-z-30" aria-hidden />

      {/* Polygon mesh (subtle) */}
      <svg className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-pointer-events-none tw-opacity-10 -tw-z-25" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ff00f7" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <g stroke="url(#g1)" strokeWidth="0.6" fill="none">
          {[...Array(12)].map((_, i) => (
            <line key={i} x1={`${i * 9}%`} y1="0" x2={`${i * 9}%`} y2="100%" />
          ))}
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} y1={`${i * 12.5}%`} x1="0" y2={`${i * 12.5}%`} x2="100%" />
          ))}
        </g>
      </svg>

      {/* Cyber circuit grid (subtle dots/lines) */}
      <div className="tw-absolute tw-inset-0 -tw-z-24 tw-pointer-events-none" aria-hidden>
        <svg className="tw-w-full tw-h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(123,226,255,0.04)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Scanline glitch overlay */}
      <div className="tw-absolute tw-inset-0 tw-pointer-events-none -tw-z-20" aria-hidden>
        <div className="tw-absolute tw-inset-0 tw-bg-[repeating-linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 1px, transparent 1px, transparent 5px)] tw-opacity-20 tw-animation-scanline" />
        {/* occasional horizontal glitch block */}
        <div className="tw-absolute tw-top-1/3 tw-left-0 tw-w-1/2 tw-h-6 tw-bg-white/2 tw-opacity-5 tw-transform -tw-skew-x-6 tw-animate-glitch" />
      </div>

      {/* Digital frame corners */}
      <div className="tw-absolute tw-top-6 tw-left-6 tw-w-16 tw-h-16 tw-border-t-2 tw-border-l-2 tw-border-[#7be2ff]/40 tw-rounded-sm -tw-z-10" aria-hidden />
      <div className="tw-absolute tw-bottom-6 tw-right-6 tw-w-16 tw-h-16 tw-border-b-2 tw-border-r-2 tw-border-[#ff6bf7]/40 tw-rounded-sm -tw-z-10" aria-hidden />

      {/* Cursor spotlight (uses CSS variables for position) */}
      <div id="cyber-spotlight-about" className="tw-absolute tw-inset-0 tw-pointer-events-none tw-opacity-0 -tw-z-15" style={{ transition: 'opacity 160ms linear' }} aria-hidden>
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(123,226,255,0.06), transparent 8%)', mixBlendMode: 'screen' }} />
      </div>

      {/* Neon streak following cursor */}
      <div id="cyber-neon-streak-about" style={{ position: 'absolute', width: 96, height: 96, borderRadius: '50%', pointerEvents: 'none', opacity: 0, transform: 'translate3d(0,0,0)', transition: 'opacity 160ms' }} className="-tw-z-14" aria-hidden>
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(123,226,255,0.25), rgba(255,107,247,0.18), rgba(0,255,127,0.12))', filter: 'blur(24px)' }} />
      </div>

      {/* lightweight RGB particles (DOM for JS transform) */}
      {[...Array(28)].map((_, i) => (
        <span key={i} className="cyber-pt tw-absolute tw-w-1 tw-h-1 tw-rounded-full" style={{ left: `${(i * 59) % 100}%`, top: `${(i * 37) % 100}%`, background: 'rgba(255,255,255,0.6)' }} aria-hidden />
      ))}

      {/* Content */}
      <div className="container tw-relative tw-z-10">
        <motion.h2 id="about-title" className="tw-text-center tw-text-4xl md:tw-text-5xl tw-font-extrabold tw-mb-4" initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }}>
          About <span className="tw-text-[#7be2ff]">SmartHire</span>
        </motion.h2>

        <motion.p className="tw-text-center tw-text-gray-300 tw-mb-10 tw-max-w-2xl tw-mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          Futuristic AI-powered job matching with immersive cyberpunk visuals and intelligent, user-first experiences.
        </motion.p>

        {/* feature cards */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 tw-mb-10">
          {[{ icon: <FaGlobe />, title: 'Global Reach', text: 'Connecting talent worldwide.' }, { icon: <FaUsers />, title: 'Community Driven', text: 'Strong professional network.' }, { icon: <FaBriefcase />, title: 'Career Focused', text: 'From internships to leadership.' }].map((f, i) => (
            <motion.div key={i} className="tw-bg-white/6 tw-backdrop-blur tw-rounded-2xl tw-p-6 tw-shadow-lg tw-border tw-border-white/10 hover:tw-scale-105 tw-transition-transform" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
              <div className="tw-flex tw-items-center tw-gap-4 tw-mb-3">
                <div className="tw-text-[#7be2ff] tw-text-2xl">{f.icon}</div>
                <h4 className="tw-font-semibold tw-text-lg">{f.title}</h4>
              </div>
              <p className="tw-text-gray-300 tw-text-sm">{f.text}</p>
            </motion.div>
          ))}
        </div>

        {/* mission */}
        <div className="tw-mb-8 tw-bg-gradient-to-br tw-from-[#00172f] tw-to-[#120018] tw-p-6 tw-rounded-2xl tw-border tw-border-white/8 tw-shadow-xl">
          <h3 className="tw-font-bold tw-text-xl tw-mb-2">Our Mission</h3>
          <p className="tw-text-gray-300">Revolutionize job search with intelligent, user-first experiences.</p>
        </div>

        {/* timeline */}
        <div className="tw-mb-12"><TimeLine /></div>

        {/* Team grid (flip-cards) */}
        <div className="tw-mb-16">
          <div className="tw-text-center tw-mb-10">
            <h3 className="tw-text-4xl tw-font-bold tw-font-Poppins">
              Meet Our <span className="tw-text-[#7be2ff] tw-font-dancing">Amazing Team</span>
            </h3>
          </div>

          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="hover:tw-scale-[1.02] tw-transition-transform tw-duration-300"
              >
                <div className="flip-card tw-rounded-2xl" style={{ perspective: 1200 }}>
                  <div
                    className="flip-card-inner tw-relative tw-w-full tw-h-full tw-transition-transform tw-duration-700 tw-rounded-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >

                    {/* FRONT */}
                    <div
                      className="flip-card-front tw-rounded-2xl tw-p-6 tw-text-center tw-bg-gradient-to-br tw-from-[#13172A] tw-to-[#22122B] tw-shadow-xl"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* STATUS BADGE */}
                      {member.status && (
                        <span
                          className={`tw-inline-block tw-text-xs tw-px-3 tw-py-1 tw-rounded-full tw-font-semibold tw-mb-4
                    ${member.status === "Active"
                              ? "tw-bg-[#7be2ff]/20 tw-text-[#7be2ff]"
                              : "tw-bg-yellow-400/20 tw-text-yellow-300"
                            }`}
                        >
                          {member.status}
                        </span>
                      )}

                      {/* IMAGE */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="tw-w-28 tw-h-28 tw-rounded-full tw-mx-auto tw-mb-3 tw-shadow-lg tw-object-cover"
                      />

                      {/* NAME & ROLE */}
                      <h5 className="tw-font-bold tw-text-lg tw-text-white tw-mb-1">{member.name}</h5>
                      <p className="tw-text-gray-400 tw-text-sm tw-mb-3">{member.role}</p>

                      {/* SKILLS */}
                      <div className="tw-flex tw-flex-wrap tw-gap-2 tw-justify-center">
                        {member.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="tw-bg-white/10 tw-text-white tw-text-xs tw-px-2 tw-py-1 tw-rounded-full tw-border tw-border-white/10"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className="flip-card-back tw-absolute tw-inset-0 tw-rounded-2xl tw-p-6 tw-bg-gradient-to-br tw-from-[#083b8a] tw-to-[#020202] tw-text-white tw-shadow-xl"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <h5 className="tw-font-bold tw-text-lg tw-mb-2">{member.name}</h5>
                      <p className="tw-text-sm tw-leading-relaxed tw-mb-4 tw-text-gray-200">{member.bio}</p>

                      {/* SOCIALS */}
                      <div className="tw-flex tw-justify-center tw-gap-4">
                        {member.socials.map((s, idx) => (
                          <a
                            key={idx}
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            className="tw-text-white tw-text-xl hover:tw-text-[#7be2ff] tw-transition"
                          >
                            <i className={`bi bi-${s.icon}`} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Counters */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 tw-mb-16">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="tw-relative tw-p-6 tw-rounded-2xl tw-bg-white/6 tw-backdrop-blur tw-border tw-border-white/8">
              <div className="tw-absolute tw-w-28 tw-h-28 tw-rounded-full tw-opacity-20" style={{ right: '-24px', top: '-24px', background: `radial-gradient(circle, ${stat.color}40, transparent 70%)` }} aria-hidden />
              <div className="tw-text-3xl tw-font-bold tw-mb-2" style={{ color: stat.color }}>{stat.icon}</div>
              <h4 className="tw-text-3xl tw-font-extrabold"><CountUp end={stat.value} duration={2.3} separator="," />+</h4>
              <p className="tw-text-gray-300 tw-mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Engagement sections */}
        <div className="tw-mb-12"><EngagementSections /></div>
        <div className="tw-mt-12"><WhyChooseUs /></div>

      </div>

      {/* Styles (kept inside component for portability) */}
      <style>{`
        /* RGB blob animations */
        @keyframes rgbBlob { 0% { filter: hue-rotate(0deg); transform: translate(0,0) scale(1); } 25% { filter: hue-rotate(60deg); transform: translate(10px,-10px) scale(1.05); } 50% { filter: hue-rotate(140deg); transform: translate(-10px,10px) scale(0.95); } 75% { filter: hue-rotate(220deg); transform: translate(5px,5px) scale(1.02); } 100% { filter: hue-rotate(360deg); transform: translate(0,0) scale(1); } }
        .tw-animate-rgb-blob { animation: rgbBlob 18s linear infinite; }
        @keyframes rgb-blob-delay { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-10px) scale(1.05)} 100%{transform:translate(0,0) scale(1)} }
        .tw-animate-rgb-blob-delay { animation: rgb-blob-delay 22s linear infinite; }

        /* scanline */
        @keyframes scanMove { 0% { background-position: 0 0; } 100% { background-position: 0 6px; } }
        .tw-animation-scanline { animation: scanMove 3s linear infinite; }

        /* small glitch shift */
        @keyframes glitchShift { 0% { transform: translateX(0); opacity: .06 } 50% { transform: translateX(4px); opacity: .12 } 100% { transform: translateX(0); opacity: .06 } }
        .tw-animate-glitch { animation: glitchShift 6s linear infinite; }

        /* flip card hover - use class toggle to trigger on container hover */
        .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-inner { transform-style: preserve-3d; transition: transform 0.7s cubic-bezier(.2,.9,.2,1); }
        .flip-card-front, .flip-card-back { backface-visibility: hidden; border-radius: .75rem; }

        /* neon shadow helper */
        .tw-shadow-neon { box-shadow: 0 6px 30px rgba(123,226,255,0.06), inset 0 1px 0 rgba(255,255,255,0.02); }

        /* responsive tweaks */
        @media (max-width: 640px) {
          .tw-animate-rgb-blob, .tw-animate-rgb-blob-delay { opacity: 0.35; }
        }

        /* accessibility: reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .tw-animate-rgb-blob, .tw-animate-rgb-blob-delay, .tw-animation-scanline, .tw-animate-glitch { animation: none !important; }
          .flip-card-inner { transition: none !important; }
        }

      `}</style>

    </section>
  );
};

export default About;