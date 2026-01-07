import React from "react";
import LoginForm from "../Components/LoginForm";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

const Loginpage = () => {
    const backgroundStyle = {
        minHeight: "100vh",
        backgroundImage: "url('/Image/login.png')", // Make sure the image is in the public folder
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backdropFilter: "blur(10px)", // for glass effect
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className="d-flex justify-content-center align-items-center" style={backgroundStyle}>
                <LoginForm />
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Loginpage;

// import React, { useEffect, useRef } from "react";
// import LoginForm from "../Components/LoginForm";

// // Full-scene Loginpage (Style Level C - Full Sci-Fi)
// // - Particle system (canvas, mouse-interactive)
// // - 3D floating hexagons (SVG layers)
// // - Hologram grid (CSS background grid with parallax)
// // - Neon borders & animated login card glow
// // - All CSS keyframes included inline so this works with Tailwind CDN (tw- prefix used)

// const Loginpage = () => {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const lightRef = useRef(null);

//   // Canvas particle system
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     let w = canvas.width = window.innerWidth;
//     let h = canvas.height = window.innerHeight;

//     const particles = [];
//     const PARTICLE_COUNT = Math.floor((w * h) / 40000) + 60; // responsive count

//     function rand(min, max) { return Math.random() * (max - min) + min; }

//     class Particle {
//       constructor() {
//         this.reset();
//       }
//       reset() {
//         this.x = rand(0, w);
//         this.y = rand(0, h);
//         this.vx = rand(-0.2, 0.2);
//         this.vy = rand(-0.4, -0.1);
//         this.size = rand(0.6, 3.2);
//         this.life = rand(80, 260);
//         this.ttl = this.life;
//         this.hue = rand(190, 270);
//         this.alpha = rand(0.12, 0.6);
//       }
//       update(mouse) {
//         // mouse repulse/attract subtle
//         if (mouse.x && mouse.y) {
//           const dx = this.x - mouse.x;
//           const dy = this.y - mouse.y;
//           const dist = Math.sqrt(dx*dx + dy*dy);
//           const force = Math.min(200 / (dist + 20), 0.8);
//           this.vx += dx * 0.0008 * force;
//           this.vy += dy * 0.0006 * force;
//         }

//         this.x += this.vx;
//         this.y += this.vy;
//         this.ttl -= 1;
//         if (this.ttl <= 0 || this.y < -50 || this.x < -50 || this.x > w + 50) this.reset();
//       }
//       draw(ctx) {
//         ctx.beginPath();
//         const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size*8);
//         g.addColorStop(0, `hsla(${this.hue},90%,70%,${this.alpha})`);
//         g.addColorStop(0.3, `hsla(${this.hue},85%,65%,${this.alpha*0.28})`);
//         g.addColorStop(1, `hsla(${this.hue},80%,55%,0)`);
//         ctx.fillStyle = g;
//         ctx.arc(this.x, this.y, this.size*4, 0, Math.PI*2);
//         ctx.fill();
//       }
//     }

//     for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

//     const mouse = { x: null, y: null };

//     function handleMove(e) {
//       mouse.x = e.clientX;
//       mouse.y = e.clientY;
//       // move light overlay
//       if (lightRef.current) {
//         lightRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
//       }
//     }
//     function handleLeave() { mouse.x = null; mouse.y = null; }

//     window.addEventListener('mousemove', handleMove);
//     window.addEventListener('mouseleave', handleLeave);

//     let raf = null;
//     function loop() {
//       raf = requestAnimationFrame(loop);
//       ctx.clearRect(0,0,w,h);

//       // subtle background sheen
//       ctx.globalCompositeOperation = 'lighter';
//       for (let p of particles) {
//         p.update(mouse);
//         p.draw(ctx);
//       }
//       ctx.globalCompositeOperation = 'source-over';
//     }
//     loop();

//     function onResize() {
//       w = canvas.width = window.innerWidth;
//       h = canvas.height = window.innerHeight;
//       // rebuild some particles if needed
//       while (particles.length < Math.floor((w * h) / 40000) + 60) particles.push(new Particle());
//     }
//     window.addEventListener('resize', onResize);

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener('mousemove', handleMove);
//       window.removeEventListener('mouseleave', handleLeave);
//       window.removeEventListener('resize', onResize);
//     };
//   }, []);

//   // small parallax for grid and hex layers based on mouse
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     const onMove = (e) => {
//       const rect = container.getBoundingClientRect();
//       const cx = rect.left + rect.width/2;
//       const cy = rect.top + rect.height/2;
//       const dx = (e.clientX - cx) / rect.width;
//       const dy = (e.clientY - cy) / rect.height;

//       const grid = container.querySelector('[data-grid]');
//       const hexs = container.querySelectorAll('[data-hex]');
//       const inner = container.querySelector('[data-inner]');

//       if (grid) grid.style.transform = `translate(${dx * -8}px, ${dy * -8}px)`;
//       if (inner) inner.style.transform = `translate(${dx * 10}px, ${dy * 10}px) rotate(${dx*6}deg)`;
//       hexs.forEach((h, i) => {
//         const sign = i % 2 === 0 ? 1 : -1;
//         h.style.transform = `translate(${dx * (6 + i)}px, ${dy * (6 + i)}px) rotate(${dx*8}deg)`;
//       });
//     };
//     window.addEventListener('mousemove', onMove);
//     return () => window.removeEventListener('mousemove', onMove);
//   }, []);

//   return (
//     <div ref={containerRef} className="tw-relative tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-[#0b0f13] tw-overflow-hidden">

//       {/* Canvas particles - full screen */}
//       <canvas ref={canvasRef} className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-block" />

//       {/* Hologram Grid (subtle lines) */}
//       <div data-grid className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] tw-pointer-events-none" style={{backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)'}}></div>

//       {/* Floating 3D hexagons - multiple layers */}
//       <div className="tw-absolute tw-inset-0 tw-pointer-events-none">
//         {[0,1,2].map((n) => (
//           <svg key={n} data-hex className="tw-absolute tw-opacity-40" style={{width: 420 - n*80, height: 420 - n*80, left: `${10 + n*18}%`, top: `${8 + n*10}%`}} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <linearGradient id={`g${n}`} x1="0" x2="1">
//                 <stop offset="0%" stopColor="rgba(120,200,255,0.18)" />
//                 <stop offset="100%" stopColor="rgba(200,150,255,0.12)" />
//               </linearGradient>
//             </defs>
//             <polygon points="50,2 90,25 90,75 50,98 10,75 10,25" stroke={`rgba(140,210,255,${0.25 - n*0.06})`} strokeWidth="0.9" fill={`url(#g${n})`} />
//             <polygon points="50,10 82,30 82,70 50,90 18,70 18,30" stroke={`rgba(180,230,255,${0.12 - n*0.03})`} strokeWidth="0.6" fill="none"/>
//           </svg>
//         ))}
//       </div>

//       {/* Neon border frames (outer subtle) */}
//       <div className="tw-absolute tw-inset-0 tw-pointer-events-none">
//         <div className="tw-absolute tw-left-6 tw-top-6 tw-w-[calc(100%-48px)] tw-h-[calc(100%-48px)] tw-border tw-border-white/4 tw-rounded-lg tw-shadow-[0_0_60px_rgba(120,200,255,0.04)]"></div>
//       </div>

//       {/* Center area - Login card with neon border + glow */}
//       <div className="tw-relative tw-z-20 tw-w-full tw-max-w-lg tw-p-8 tw-rounded-2xl tw-backdrop-blur-md tw-bg-white/6 tw-border tw-border-white/10 tw-shadow-[0_8px_40px_rgba(0,0,0,0.5)]" style={{boxShadow: '0 12px 50px rgba(30,40,60,0.6)'}}>

//         {/* Neon border glow around card */}
//         <div className="tw-absolute -tw-inset-px tw-rounded-2xl tw-pointer-events-none tw-z-[-1]" style={{filter: 'blur(14px)', background: 'linear-gradient(90deg, rgba(130,200,255,0.12), rgba(200,150,255,0.08))'}}></div>

//         {/* Inner glowing outline */}
//         <div className="tw-absolute -tw-inset-1 tw-rounded-2xl tw-border tw-border-gradient-to-r tw-border-transparent tw-pointer-events-none" style={{boxShadow: '0 0 30px rgba(130,200,255,0.08)'}}></div>

//         {/* Header / Optional Logo area (stylized) */}
//         <div className="tw-mb-6 tw-text-center">
//           <div className="tw-inline-flex tw-items-center tw-gap-3">
//             <div className="tw-w-12 tw-h-12 tw-rounded-lg" style={{background: 'linear-gradient(135deg, rgba(150,210,255,0.9), rgba(210,160,255,0.7))', boxShadow: '0 6px 18px rgba(120,180,255,0.12)'}}></div>
//             <h2 className="tw-text-white tw-text-2xl tw-font-semibold">Welcome back</h2>
//           </div>
//         </div>

//         {/* Login Form Component (user provided) - we wrap a glow container */}
//         <div className="tw-relative tw-p-1 tw-rounded-xl tw-bg-gradient-to-br tw-from-white/6 tw-to-white/2 tw-border tw-border-white/6 tw-backdrop-blur-sm">
//           <div className="tw-bg-[rgba(255,255,255,0.02)] tw-p-6 tw-rounded-lg">
//             <LoginForm />
//           </div>
//         </div>

//       </div>

//       {/* Interactive light that follows mouse (big soft glow) */}
//       <div ref={lightRef} className="tw-pointer-events-none tw-absolute" style={{width: 340, height: 340, marginLeft: -170, marginTop: -170, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle at 30% 30%, rgba(180,220,255,0.26), rgba(200,160,255,0.12) 40%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)', transition: 'transform 0.08s linear, opacity 0.2s linear'}}></div>

//       {/* Keyframes & small helper styles (works with Tailwind CDN) */}
//       <style>{`
//         /* soft floating for hexagons */
//         svg[data-hex] { transition: transform 0.45s ease-out, opacity 0.6s ease; }

//         /* neon card outline animation */
//         @keyframes cardGlow {
//           0% { box-shadow: 0 6px 30px rgba(120,200,255,0.04); }
//           50% { box-shadow: 0 18px 60px rgba(120,200,255,0.12); }
//           100% { box-shadow: 0 6px 30px rgba(120,200,255,0.04); }
//         }
//         .tw-relative.tw-z-20 { animation: cardGlow 4.8s ease-in-out infinite; }

//         /* subtle moving gradients */
//         @keyframes softMove { 0% { transform: translate(-8%, -8%); } 50% { transform: translate(8%, 8%); } 100% { transform: translate(-8%, -8%); } }
//         @keyframes softDrift { 0% { transform: translate(0,0); } 50% { transform: translate(12%, -12%); } 100% { transform: translate(0,0); } }

//         /* shimmer line (thin sweep) */
//         @keyframes shimmerSweep {
//           0% { opacity: 0; transform: translateX(-120%) skewX(-12deg); }
//           40% { opacity: 1; transform: translateX(0%) skewX(-6deg); }
//           100% { opacity: 0; transform: translateX(120%) skewX(0deg); }
//         }

//         /* tiny floating movement for card inner */
//         @keyframes floatCard { 0% { transform: translateY(0px); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0px); } }
//         .tw-relative.tw-z-20 { animation: floatCard 8s ease-in-out infinite; }

//         /* apply beam / gradient animations to background layers */
//         .tw-absolute.tw-inset-0.tw-bg-gradient-to-br { animation: softMove 16s ease-in-out infinite; }
//         .tw-absolute.tw-inset-0[style*="linear-gradient"] { animation: softDrift 22s linear infinite; }

//         /* shimmer element - we will create it via pseudo using a container trick */
//         .shimmer-sweep { position: absolute; left: -30%; top: 0; width: 160%; height: 14px; pointer-events: none; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0)); filter: blur(6px); transform-origin: left center; animation: shimmerSweep 3.8s ease-in-out infinite; opacity: 0.7; }

//       `}</style>

//       {/* Shimmer - appended here so it floats above */}
//       <div className="shimmer-sweep" style={{top: '26%', left: '-20%', transform: 'rotate(18deg)'}} />

//     </div>
//   );
// };

// export default Loginpage;


















