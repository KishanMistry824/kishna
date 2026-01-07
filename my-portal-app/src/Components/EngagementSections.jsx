import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Paste into your page and render <EngagementSections /> where needed.
 * Requires: framer-motion, Tailwind with prefix `tw-`
 */

const EngagementSections = () => {
  // generic tilt handler factory
  const createTiltHandlers = (ref) => {
    let frame = null;
    const handleMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      const rotateY = (px - 0.5) * 18; // -9 .. 9 deg
      const rotateX = (0.5 - py) * 12; // -6 .. 6 deg
      const translateZ = 12 + (0.5 - Math.abs(0.5 - px) - Math.abs(0.5 - py)) * 18; // subtle pop
      // update var in rAF
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ref.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        // parallax blob positions: set CSS var for child blobs if present
        ref.current.style.setProperty("--tilt-x", `${(px - 0.5) * 40}px`);
        ref.current.style.setProperty("--tilt-y", `${(py - 0.5) * 40}px`);
      });
    };
    const handleLeave = () => {
      if (!ref.current) return;
      if (frame) cancelAnimationFrame(frame);
      ref.current.style.transition = "transform 600ms cubic-bezier(.2,.9,.2,1)";
      ref.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      ref.current.style.setProperty("--tilt-x", `0px`);
      ref.current.style.setProperty("--tilt-y", `0px`);
      setTimeout(() => {
        if (ref.current) ref.current.style.transition = "";
      }, 600);
    };
    return { handleMove, handleLeave };
  };

  // refs for all cards (success stories & awards)
  const storyRefs = [useRef(null), useRef(null)];
  const awardRefs = [useRef(null), useRef(null), useRef(null)];
  const testimonialContainerRef = useRef(null);

  // initialize tilt handlers on mount
  useEffect(() => {
    const els = [...storyRefs, ...awardRefs].map((r) => r.current).filter(Boolean);
    const handlers = els.map((el) => {
      // attach pointer events
      const refObj = { current: el };
      const { handleMove, handleLeave } = createTiltHandlers(refObj);
      el.addEventListener("pointermove", handleMove);
      el.addEventListener("pointerenter", handleMove);
      el.addEventListener("pointerleave", handleLeave);
      el.addEventListener("pointercancel", handleLeave);
      return { el, handleMove, handleLeave };
    });

    // cleanup
    return () => {
      handlers.forEach(({ el, handleMove, handleLeave }) => {
        if (!el) return;
        el.removeEventListener("pointermove", handleMove);
        el.removeEventListener("pointerenter", handleMove);
        el.removeEventListener("pointerleave", handleLeave);
        el.removeEventListener("pointercancel", handleLeave);
      });
    };
  }, []); // empty: refs already created

  // testimonials drag constraints calculation
  useEffect(() => {
    const cont = testimonialContainerRef.current;
    if (!cont) return;
    const resize = () => {
      // no-op placeholder; framer drag constraints handled inline via style
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // data
  const stories = [
    {
      name: "Ritika Sharma",
      story: "JobSphere helped me land my dream job at a unicorn startup in just 2 weeks!",
      image: "https://i.pravatar.cc/150?img=47",
      company: "StartUpX",
    },
    {
      name: "Kunal Verma",
      story: "As a fresher, I got internship offers from 3 top tech firms via JobSphere.",
      image: "https://i.pravatar.cc/150?img=12",
      company: "TechNova",
    },
  ];

  const awards = [
    { title: "Top Startup 2024", logo: "/Image/Innovation.png" },
    { title: "Fastest Growing Job Platform", logo: "/Image/Innovation.png" },
    { title: "ISO Certified Hiring System", logo: "/Image/Innovation.png" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      feedback:
        "JobSphere helped me land my dream job within 2 weeks! The platform is intuitive and full of genuine listings.",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Rahul Mehta",
      role: "HR Manager at TechNova",
      feedback:
        "We hired 3 interns via JobSphere. The AI matching saved us hours of screening time.",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Anita Joshi",
      role: "Recent Graduate",
      feedback:
        "As a fresher, JobSphere gave me confidence. The internship listings are amazing and authentic!",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
  ];

  // CSS for blobs + coverflow feel (scoped via style tag)
  return (
    <>
      <style>{`
        /* Floating blobs animation */
        .blob {
          animation: blobMove 8s ease-in-out infinite;
          transform-origin: center;
          will-change: transform, opacity;
        }
        .blob--slow { animation-duration: 12s; }
        @keyframes blobMove {
          0%{ transform: translate3d(0,0,0) scale(1); opacity: .95; }
          50%{ transform: translate3d(8px,-6px,0) scale(1.06); opacity: .9; }
          100%{ transform: translate3d(0,0,0) scale(1); opacity: .95; }
        }

        /* 3D effect helpers */
        .card-3d {
          transform-style: preserve-3d;
          will-change: transform;
          backface-visibility: hidden;
        }

        /* testimonials coverflow item base transforms */
        .coverflow-item {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        /* small shadow glow (accent) */
        .glow-accent {
          box-shadow: 0 12px 30px rgba(99,102,241,0.12), 0 6px 18px rgba(59,130,246,0.06);
        }

        /* custom css vars used by tilt */
        .tilt-root { --tilt-x: 0px; --tilt-y: 0px; }

        /* hide scrollbar (for horizontal carousel) */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Success Stories */}
      <div className="tw-mt-20">
        <motion.h4
          className="tw-text-center tw-font-extrabold tw-text-2xl md:tw-text-3xl tw-mb-12 tw-bg-gradient-to-r tw-from-indigo-500 tw-to-blue-500 tw-bg-clip-text tw-text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Success Stories
        </motion.h4>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
          {stories.map((user, i) => {
            const r = storyRefs[i];
            return (
              <motion.div
                key={i}
                ref={r}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="tw-relative tw-bg-white tw-rounded-3xl tw-shadow-lg tw-p-7 tw-flex tw-gap-4 tw-items-start tw-border tw-border-gray-100 hover:tw-shadow-2xl tw-duration-300 tw-overflow-hidden tilt-root card-3d"
                style={{ transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)" }}
              >
                {/* Floating Gradient Blob (parallax via CSS var) */}
                <div
                  className="blob tw-absolute tw-w-40 tw-h-40 tw-bg-gradient-to-br tw-from-indigo-400 tw-to-blue-300 tw-opacity-20 tw-rounded-full tw-blur-3xl"
                  style={{
                    top: "-28px",
                    right: "-28px",
                    transform: "translate3d(var(--tilt-x), var(--tilt-y), 0)",
                  }}
                />

                {/* Avatar with tilt + 3D pop on hover */}
                <motion.img
                  src={user.image}
                  alt={user.name}
                  className="tw-rounded-full tw-w-[70px] tw-h-[70px] tw-object-cover tw-shadow-md"
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  style={{ transform: "translateZ(28px)" }} // slight pop out
                />

                <div className="tw-relative tw-z-10">
                  <h6 className="tw-font-bold tw-text-gray-800">{user.name}</h6>
                  <small className="tw-text-indigo-500 tw-font-medium">{user.company}</small>
                  <p className="tw-text-gray-600 tw-mt-2 tw-italic">"{user.story}"</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Awards Section */}
      <div className="tw-mt-24">
        <motion.h4
          className="tw-text-center tw-font-extrabold tw-text-2xl md:tw-text-3xl tw-mb-12 tw-bg-gradient-to-r tw-from-blue-500 tw-to-indigo-500 tw-bg-clip-text tw-text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          In the Press & Awards
        </motion.h4>

        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-8 tw-place-items-center">
          {awards.map((award, idx) => {
            const r = awardRefs[idx];
            return (
              <motion.div
                key={idx}
                ref={r}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.12 }}
                className="tw-relative tw-bg-white tw-rounded-3xl tw-p-8 tw-shadow-lg tw-w-full tw-max-w-xs hover:tw-shadow-2xl hover:tw-scale-[1.04] tw-duration-300 tw-border tw-border-gray-100 tw-overflow-hidden tilt-root card-3d"
                style={{ transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)" }}
              >
                {/* Floating Blob */}
                <div
                  className="blob tw-absolute tw-w-36 tw-h-36 tw-bg-gradient-to-br tw-from-blue-400 tw-to-indigo-300 tw-opacity-22 tw-rounded-full tw-blur-3xl"
                  style={{
                    top: "-20px",
                    left: "-20px",
                    transform: "translate3d(calc(var(--tilt-x) / -3), calc(var(--tilt-y) / -3), 0)",
                  }}
                />

                <div className="tw-flex tw-flex-col tw-items-center tw-gap-4">
                  <div className="tw-w-20 tw-h-20 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-bg-white tw-shadow-inner glow-accent">
                    <img src={award.logo} alt={award.title} className="tw-object-contain tw-h-12" />
                  </div>
                  <p className="tw-text-center tw-font-semibold tw-text-gray-800">{award.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section with draggable 3D coverflow */}
      <div className="tw-mt-24">
        <motion.h4
          className="tw-text-center tw-font-extrabold tw-text-2xl md:tw-text-3xl tw-mb-12 tw-bg-gradient-to-r tw-from-indigo-500 tw-to-purple-600 tw-bg-clip-text tw-text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          What Our Users Say
        </motion.h4>

        {/* draggable container */}
        <motion.div
          ref={testimonialContainerRef}
          className="tw-relative tw-overflow-hidden tw-pb-6"
          initial={{ opacity: 1 }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -800, right: 0 }}
            whileTap={{ cursor: "grabbing" }}
            className="tw-flex tw-gap-6 no-scrollbar"
            style={{ cursor: "grab", paddingLeft: 24, paddingRight: 24 }}
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="coverflow-item tw-min-w-[280px] md:tw-min-w-[340px] tw-bg-white tw-rounded-3xl tw-shadow-lg tw-p-6 tw-text-center tw-border tw-border-gray-100 tw-overflow-hidden"
                whileHover={{ scale: 1.04, translateZ: 12 }}
                transition={{ type: "spring", stiffness: 220 }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1200,
                }}
              >
                {/* Gradient Blob */}
                <div
                  className="blob tw-absolute tw-w-40 tw-h-40 tw-bg-gradient-to-br tw-from-purple-400 tw-to-indigo-300 tw-opacity-18 tw-rounded-full tw-blur-3xl"
                  style={{
                    top: "-20px",
                    right: "-28px",
                    transform: "translate3d(var(--tilt-x), var(--tilt-y), 0)",
                  }}
                />

                {/* Avatar with small 3D pop */}
                <motion.img
                  src={t.avatar}
                  alt={t.name}
                  className="tw-w-[75px] tw-h-[75px] tw-rounded-full tw-object-cover tw-mx-auto tw-mb-4 tw-shadow-lg"
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  style={{ transform: "translateZ(32px)" }}
                />

                <p className="tw-text-gray-600 tw-italic">"{t.feedback}"</p>
                <h6 className="tw-font-bold tw-text-gray-800 tw-mt-4">{t.name}</h6>
                <small className="tw-text-indigo-500 tw-font-medium">{t.role}</small>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default EngagementSections;
