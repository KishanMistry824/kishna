// ContactHero.jsx - Cyberpunk Version with Dancing Script + Neon Frame + Contact Form
// ContactHeroCyberpunk.jsx
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// number of particles (heavy intensity)
const PARTICLE_COUNT = 40;

export default function ContactHeroCyberpunk() {
  const sectionRef = useRef(null);

  // motion values for cursor-based parallax/background movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // heavy intensity: stronger offsets
  const backgroundPosition = useTransform([mouseX, mouseY], ([x, y]) => `${x / 18}px ${y / 18}px`);
  const blobRotate = useTransform([mouseX, mouseY], ([x]) => `${(x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) / 120}deg`);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    const node = sectionRef.current;
    const handleMove = (e) => {
      const rect = node.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    node.addEventListener("mousemove", handleMove);
    return () => node.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  // Generate particles one time for layout
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 4 + Math.round(Math.random() * 10),
    dur: 3 + Math.random() * 4,
    delay: Math.random() * 2,
    colorSeed: Math.random(),
  }));

  return (
    <motion.section
      ref={sectionRef}
      aria-labelledby="contact-hero-title"
      className="tw-relative tw-overflow-hidden tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-min-h-screen tw-py-20 tw-px-6 tw-text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        // layered heavy RGB gradient background — transforms via backgroundPosition motion value
        backgroundImage:
          "radial-gradient(circle at 10% 10%, rgba(123,226,255,0.06), transparent 12%), radial-gradient(circle at 90% 90%, rgba(255,107,247,0.06), transparent 12%), linear-gradient(120deg, #020014 0%, #05002a 30%, #12002f 70%, #000000 100%)",
        backgroundSize: "400% 400%",
        backgroundPosition,
      }}
    >
      {/* ---------- Cyberpunk Layers (heavy intensity) ---------- */}

      {/* Animated RGB morphing blobs */}
      <motion.div
        aria-hidden
        className="tw-absolute -tw-top-56 -tw-left-56 tw-w-[840px] tw-h-[840px] tw-rounded-full tw-blur-[160px] tw-opacity-80 tw-pointer-events-none -tw-z-30"
        style={{
          background:
            "radial-gradient(circle at 25% 30%, rgba(0,240,255,0.14), transparent 18%), radial-gradient(circle at 75% 70%, rgba(255,0,247,0.14), transparent 22%), radial-gradient(circle at 50% 50%, rgba(0,255,127,0.12), transparent 28%)",
          transformOrigin: "center",
        }}
        animate={{ rotate: ["0deg", "8deg", "0deg"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        aria-hidden
        className="tw-absolute -tw-bottom-56 -tw-right-56 tw-w-[700px] tw-h-[700px] tw-rounded-full tw-blur-[140px] tw-opacity-70 tw-pointer-events-none -tw-z-30"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(0,200,255,0.10), transparent 20%), radial-gradient(circle at 60% 60%, rgba(255,80,200,0.10), transparent 22%)",
        }}
        animate={{ rotate: ["0deg", "-10deg", "0deg"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* Polygon mesh layer (SVG) */}
      <svg
        aria-hidden
        className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-pointer-events-none tw-opacity-12 -tw-z-25"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="meshG" x1="0" x2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#ff00f7" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <g stroke="url(#meshG)" strokeWidth="0.8" fill="none">
          {[...Array(18)].map((_, i) => (
            <line key={i} x1={`${i * 6}%`} y1="0" x2={`${i * 6}%`} y2="100%" />
          ))}
          {[...Array(12)].map((_, i) => (
            <line key={"h" + i} y1={`${i * 8.33}%`} x1="0" y2={`${i * 8.33}%`} x2="100%" />
          ))}
        </g>
      </svg>

      {/* Cyber circuit grid (subtle) */}
      <div aria-hidden className="tw-absolute tw-inset-0 -tw-z-24 tw-pointer-events-none">
        <svg className="tw-w-full tw-h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="circuitDots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="rgba(123,226,255,0.035)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuitDots)" />
        </svg>
      </div>

      {/* Glitch scanline overlay (heavy) */}
      <div aria-hidden className="tw-absolute tw-inset-0 -tw-z-20 tw-pointer-events-none">
        <div
          className="tw-absolute tw-inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 5px)",
            mixBlendMode: "overlay",
            opacity: 0.28,
          }}
        />
        {/* occasional glitch blocks */}
        <div className="tw-absolute tw-top-28 tw-left-0 tw-w-1/2 tw-h-6 tw-bg-white/5 tw-filter tw-blur-sm tw-opacity-6 tw-transform -tw-skew-x-6 tw-animate-[glitchShift_6s_infinite]"></div>
        <div className="tw-absolute tw-top-1/2 tw-right-0 tw-w-1/3 tw-h-4 tw-bg-white/6 tw-opacity-5 tw-filter tw-blur-sm tw-animate-[glitchShift2_7s_infinite]"></div>
      </div>

      {/* Animated digital frame corners (pulsing) */}
      <div aria-hidden className="tw-absolute tw-inset-0 tw-pointer-events-none -tw-z-10">
        <div className="tw-absolute tw-top-6 tw-left-6 tw-w-16 tw-h-16 tw-border-t-4 tw-border-l-4 tw-border-cyan-400 tw-rounded-sm tw-shadow-[0_0_18px_#00eaff] tw-animate-[pulseFrame_2.6s_infinite]" />
        <div className="tw-absolute tw-top-6 tw-right-6 tw-w-16 tw-h-16 tw-border-t-4 tw-border-r-4 tw-border-fuchsia-400 tw-rounded-sm tw-shadow-[0_0_18px_#ff00ff] tw-animate-[pulseFrame_2.6s_infinite]" />
        <div className="tw-absolute tw-bottom-6 tw-left-6 tw-w-16 tw-h-16 tw-border-b-4 tw-border-l-4 tw-border-purple-400 tw-rounded-sm tw-shadow-[0_0_18px_#b400ff] tw-animate-[pulseFrame_2.6s_infinite]" />
        <div className="tw-absolute tw-bottom-6 tw-right-6 tw-w-16 tw-h-16 tw-border-b-4 tw-border-r-4 tw-border-blue-400 tw-rounded-sm tw-shadow-[0_0_18px_#009dff] tw-animate-[pulseFrame_2.6s_infinite]" />
      </div>

      {/* Cursor reactive RGB glow (follows pointer) */}
      <div
        id="cyber-cursor-glow"
        aria-hidden
        className="tw-pointer-events-none tw-absolute tw-w-28 tw-h-28 tw-rounded-full tw-blur-3xl tw-opacity-0 -tw-z-5"
        style={{
          background:
            "radial-gradient(circle, rgba(0,240,255,0.22), rgba(255,0,247,0.18) 35%, rgba(0,255,127,0.12) 60%, transparent 70%)",
          transform: "translate3d(-50%, -50%, 0)",
          transition: "opacity 120ms linear, transform 120ms linear",
        }}
      />

      {/* ---------- Content ---------- */}
      <div className="tw-relative tw-z-30 tw-w-full tw-max-w-5xl tw-px-4">
        {/* Hologram shine sweep on heading */}
        <div className="tw-relative tw-inline-block tw-mx-auto">
          <h1
            id="contact-hero-title"
            className="tw-text-5xl md:tw-text-6xl tw-font-dancing tw-font-extrabold tw-leading-tight"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(90deg,#00e6ff,#7be2ff,#ff6bf7)",
              backgroundSize: "200% 100%",
            }}
          >
            Let’s Connect & Collaborate
          </h1>

          {/* hologram sweep */}
          <span
            aria-hidden
            className="tw-absolute -tw-inset-0 tw-left-0 tw-top-0 tw-h-full tw-w-full tw-pointer-events-none tw-overflow-hidden"
            style={{ mixBlendMode: "screen" }}
          >
            <span className="tw-absolute tw-left-[-40%] tw-top-0 tw-h-full tw-w-1/3 tw-transform -tw-skew-x-12 tw-bg-gradient-to-r tw-from-white/40 tw-via-white/10 tw-to-transparent tw-animate-[shine_2.8s_linear_infinite]" />
          </span>
        </div>

        <h3 className="tw-mt-5 tw-text-lg md:tw-text-xl tw-font-medium tw-text-gray-200 tw-max-w-3xl tw-mx-auto">
          <Typewriter
            words={["We’d love to hear from you 💬", "Let's start your next journey 🌍", "Reach out — we're listening 👋"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={58}
            deleteSpeed={38}
            delaySpeed={1600}
          />
        </h3>

        <p className="tw-mt-6 tw-text-gray-300 tw-max-w-2xl tw-mx-auto">
          Got questions, feedback, or ideas? We're always happy to chat. Our team typically responds in{" "}
          <strong className="tw-text-white">under 2 hours</strong>.
        </p>

        {/* Contact quick cards */}
        <div className="tw-mt-10 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-items-stretch">
          {[
            { icon: <Mail size={20} />, label: "Email", value: "hello@jobportal.com" },
            { icon: <Phone size={20} />, label: "Call", value: "+91 98765 43210" },
            { icon: <MessageCircle size={20} />, label: "Live Chat", value: "24/7 Available" },
            { icon: <MapPin size={20} />, label: "Location", value: "Ahmedabad, India" },
          ].map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={prefersReducedMotion() ? {} : { scale: 1.04, y: -6 }}
              className="tw-relative tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-p-5 tw-rounded-2xl tw-bg-white/6 tw-backdrop-blur tw-border tw-border-white/10 tw-shadow-[0_8px_40px_rgba(0,0,0,0.4)] tw-transition"
              style={{ minHeight: 130 }}
              aria-label={`${item.label}: ${item.value}`}
            >
              <div className="tw-text-cyan-200">{item.icon}</div>
              <div className="tw-font-semibold tw-text-white">{item.label}</div>
              <div className="tw-text-sm tw-text-gray-300">{item.value}</div>
              {/* neon bottom line */}
              <span
                aria-hidden
                className="tw-absolute -tw-bottom-1 tw-left-4 tw-right-4 tw-h-px"
                style={{
                  background: "linear-gradient(90deg, rgba(0,212,255,0.7), rgba(255,107,247,0.6), rgba(0,255,127,0.5))",
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ---------- Heavy RGB Particle Drift (framer) ---------- */}
      {particles.map((p) => {
        const hue = Math.floor(180 + p.colorSeed * 180); // variety of hues
        const bg = `radial-gradient(circle at 30% 30%, hsla(${hue},90%,60%,0.18), transparent 40%)`;
        return (
          <motion.span
            aria-hidden
            key={p.id}
            className="tw-absolute tw-rounded-full -tw-z-20"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: bg,
              filter: "blur(8px)",
              opacity: 0.9,
            }}
            animate={prefersReducedMotion() ? {} : { y: [0, -22 - (p.size % 6), 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        );
      })}

      {/* Availability badge */}
      <motion.div
        className="tw-absolute tw-left-1/2 -tw-translate-x-1/2 tw-bottom-6 tw-z-30 tw-flex tw-items-center tw-gap-3 tw-bg-white/6 tw-backdrop-blur tw-px-4 tw-py-2 tw-rounded-full tw-border tw-border-white/10"
        animate={prefersReducedMotion() ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        role="status"
        aria-live="polite"
      >
        <span className="tw-w-2 tw-h-2 tw-rounded-full" style={{ backgroundColor: "#00cc66", boxShadow: "0 0 8px rgba(0,204,102,0.7)" }} />
        <span className="tw-text-sm tw-font-medium tw-text-gray-100">We’re Online — Ready to Help!</span>
      </motion.div>

      {/* ---------- Inline styles & keyframes (kept here for portability) ---------- */}
      <style>{`
        /* hologram shine */
        @keyframes shine {
          0% { left: -40%; }
          50% { left: 130%; opacity: 1; }
          100% { left: 130%; opacity: 0; }
        }
        .tw-animate-\\[shine\\_2\\.8s\\_linear\\_infinite\\] { animation: shine 2.8s linear infinite; }

        /* frame pulse */
        @keyframes pulseFrame {
          0% { box-shadow: 0 0 12px rgba(0,230,255,0.18); opacity: 0.9; transform: scale(1); }
          50% { box-shadow: 0 0 30px rgba(255,0,247,0.2); opacity: 1; transform: scale(1.02); }
          100% { box-shadow: 0 0 12px rgba(0,230,255,0.18); opacity: 0.9; transform: scale(1); }
        }
        .tw-animate-\\[pulseFrame\\_2\\.6s\\_infinite\\] { animation: pulseFrame 2.6s infinite; }

        /* glitch shifts */
        @keyframes glitchShift {
          0% { transform: translateX(0); opacity: 0.06; }
          40% { transform: translateX(6px); opacity: 0.18; }
          70% { transform: translateX(-4px); opacity: 0.12; }
          100% { transform: translateX(0); opacity: 0.06; }
        }
        @keyframes glitchShift2 {
          0% { transform: translateX(0); opacity: 0.05; }
          50% { transform: translateX(-8px); opacity: 0.14; }
          100% { transform: translateX(0); opacity: 0.05; }
        }
        .tw-animate-\\[glitchShift\\_6s\\_infinite\\] { animation: glitchShift 6s linear infinite; }
        .tw-animate-\\[glitchShift2\\_7s\\_infinite\\] { animation: glitchShift2 7s linear infinite; }

        /* hologram sweep helper */
        .tw-animate-\\[shine\\_2\\.8s\\_linear\\_infinite\\] { animation: shine 2.8s linear infinite; }

        /* reduce motion safety */
        @media (prefers-reduced-motion: reduce) {
          .tw-animate-\\[pulseFrame\\_2\\.6s\\_infinite\\],
          .tw-animate-\\[glitchShift\\_6s\\_infinite\\],
          .tw-animate-\\[glitchShift2\\_7s\\_infinite\\],
          .tw-animate-\\[shine\\_2\\.8s\\_linear\\_infinite\\] {
            animation: none !important;
          }
        }

        /* small utility for debug (remove in prod) */
        /* .debug-outline { outline: 1px dashed rgba(255,255,255,0.06); } */
      `}</style>
    </motion.section>
  );
}

