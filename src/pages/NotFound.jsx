import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let points = [];
    const numPoints = 45;
    const maxDistance = 160; 
    const mouseRadius = 180; 

    const mouse = { x: null, y: null };

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const initPoints = () => {
      resizeCanvas();
      points = [];
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2, 
          vy: (Math.random() - 0.5) * 1.2,
        });
      }
    };

    const handleMouseMoveGlobal = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeaveGlobal = () => {
      mouse.x = null;
      mouse.y = null;
    };

    initPoints();
    window.addEventListener("resize", resizeCanvas);

    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.addEventListener("mousemove", handleMouseMoveGlobal);
      containerElem.addEventListener("mouseleave", handleMouseLeaveGlobal);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            const pushX = (dx / dist) * force * 4.5;
            const pushY = (dy / dist) * force * 4.5;
            p.x += pushX;
            p.y += pushY;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); 
        ctx.fillStyle = "rgba(52, 211, 153, 0.5)"; 
        ctx.fill();
      });

      ctx.lineWidth = 1.0;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35;
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      if (containerElem) {
        containerElem.removeEventListener("mousemove", handleMouseMoveGlobal);
        containerElem.removeEventListener("mouseleave", handleMouseLeaveGlobal);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-slate-950 min-h-screen text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans antialiased"
    >
      {/* Interactive Background Particle Plexus Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 block opacity-95"
      />

      {/* Interactive Mouse-Tracking Spotlight Ambient Overlay */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, rgba(251, 191, 36, 0.1), transparent 80%)`
            : "none"
        }}
      />

      {/* Cyber Grid Base Structure */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* High-End Vector Ambient Glow Orbs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/20 to-teal-500/0 rounded-full filter blur-[140px] animate-[pulse_8s_infinite_ease-in-out]"></div>
      </div>

      <div className="relative max-w-3xl mx-auto z-20 text-center space-y-12">
        
        {/* Futuristic Glassmorphic 404 Display */}
        <div className="relative inline-flex items-center justify-center p-12 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl shadow-2xl shadow-emerald-950/20 group select-none overflow-hidden">
          <div className="absolute -inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
          
          <h1 className="text-[130px] sm:text-[180px] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-700 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform transition-transform duration-700 group-hover:scale-105">
            404
          </h1>
          
          <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase">SYS.ERR // NULL_PTR</div>
          <div className="absolute bottom-3 right-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase">LOC // DISCONNECTED</div>
        </div>

        {/* Dynamic Context Headers */}
        <div className="space-y-4 max-w-xl mx-auto">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-5 py-2 rounded-full border border-emerald-500/30 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Network Exception Detected
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Lost in the Chamber Archive?
          </h2>
          <p className="text-slate-400 font-normal leading-relaxed text-[15px]">
            The specific resource or node path you are attempting to securely interface with does not exist or has been permanently reallocated.
          </p>
        </div>

        {/* High-Fidelity Interactive Navigation Center */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] transition-all duration-200 flex items-center justify-center space-x-2.5 transform active:scale-[0.98] min-h-[48px]"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Home</span>
          </Link>
          
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white font-bold rounded-xl backdrop-blur-md transition-all duration-100 flex items-center justify-center shadow-inner min-h-[48px]"
          >
            Report Issue
          </Link>
        </div>

      </div>
    </div>
  );
}

export default NotFound;