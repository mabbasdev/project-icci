import React, { useState, useRef, useEffect } from "react";
import { TrendingUp } from "lucide-react";

// Reusable micro-counter component with premium smooth ease-out acceleration
function AnimatedCounter({ target, duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const startValue = 0;
        const endValue = parseInt(target, 10);

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease-out calculation formula for a professional feel
            const easeOutQuad = progress * (2 - progress);
            setCount(Math.floor(easeOutQuad * (endValue - startValue) + startValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration]);

    return <>{count}</>;
}

export default function Achievements() {
    return (
        <section className="w-full bg-[#114b3e] text-white py-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background Decorative Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-100 600C200 400 400 700 800 500C1200 300 1300 600 1600 450" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M-50 650C250 450 450 750 850 550C1250 350 1350 650 1650 500" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Column: Vision & Floating Stats */}
                <div className="lg:col-span-4 space-y-8 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                        <span className="text-[11px] font-extrabold tracking-widest text-[#114b3e] uppercase bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100 inline-block">
                            Achievements
                        </span>
                        <h2 className="text-3xl md:text-[38px] font-bold tracking-tight leading-tight max-w-xs">
                            Be a voice for business growth
                        </h2>
                        <p className="text-emerald-100/70 text-[13px] leading-relaxed max-w-sm">
                            ICCI actively represents the trade, industry and services sectors, ensuring policy reforms and a thriving business environment.
                        </p>
                    </div>

                    {/* Stats Floating Block Layer */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-12">
                        {/* 40+ Years Badge */}
                        <div className="bg-[#0b332a] border border-emerald-800/30 rounded-[20px] p-6 flex-1 min-w-[160px]">
                            <div className="text-4xl font-black tracking-tight text-white flex items-baseline">
                                <AnimatedCounter target={40} />
                                <span className="text-xl font-bold text-emerald-400 ml-0.5">+</span>
                                <span className="text-[13px] font-bold uppercase tracking-wider text-emerald-400 ml-1">Years</span>
                            </div>
                            <div className="text-[12px] text-emerald-100/60 font-medium mt-1">
                                Years of Excellence
                            </div>
                        </div>

                        {/* 14K+ Members Badge */}
                        <div className="bg-white text-[#114b3e] rounded-[20px] p-5 flex-1 min-w-[180px] flex items-center gap-4 shadow-xl">
                            <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                                <TrendingUp className="w-6 h-6 stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="text-2xl font-black tracking-tight leading-none">
                                    <AnimatedCounter target={14} />K+
                                </div>
                                <div className="text-[12px] text-slate-400 font-semibold mt-1">Members</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Column: 3D Interactive Pure-CSS Crystal Star Trophy Canvas */}
                <div className="lg:col-span-4 flex justify-center items-center py-8">
                    <Interactive3DTrophy />
                </div>

                {/* Right Column: Awards Description & Action Button */}
                <div className="lg:col-span-4 space-y-6 lg:pl-4 flex flex-col justify-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-[38px] font-bold tracking-tight leading-tight">
                            Awards & Recognition
                        </h2>
                        <p className="text-emerald-100/70 text-[13px] leading-relaxed">
                            ICCI has won some national and international prestigious awards for its tremendous efforts for entrepreneurship culture and youth.
                        </p>
                    </div>

                    <div className="pt-2">
                        <button className="bg-[#8b6e4b] hover:bg-[#765d3f] hover:cursor-pointer text-white font-bold text-[13px] tracking-wide px-8 py-3.5 rounded-full transition-colors duration-300 shadow-md">
                            Read More
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}

function Interactive3DTrophy() {
    const containerRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const card = containerRef.current;
        const rect = card.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        const rX = -(mouseY / height) * 35;
        const rY = (mouseX / width) * 35;

        setRotate({ x: rX, y: rY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-80 h-96 flex items-center justify-center cursor-pointer select-none"
            style={{ perspective: "1200px" }}
        >
            {/* Ambient Backlight Glow */}
            <div
                className={`absolute w-64 h-64 bg-emerald-400/20 rounded-full filter blur-3xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-30'}`}
            />

            {/* Main Interactive Matrix */}
            <div
                className="w-full h-full flex flex-col items-center justify-center transition-all duration-200 ease-out relative"
                style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Geometrical Background Orbit Ring */}
                <div
                    className="absolute border-2 border-dashed border-emerald-500/20 rounded-full w-64 h-64 transition-transform duration-700 pointer-events-none"
                    style={{
                        transform: isHovered ? "translateZ(-30px) rotate(45deg) scale(1.05)" : "translateZ(-15px) rotate(0deg) scale(1)"
                    }}
                />

                {/* THE PILLAR & STAR TROPHY ASSEMBLY */}
                <div
                    className="relative flex flex-col items-center drop-shadow-[0_25px_60px_rgba(16,185,129,0.3)]"
                    style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                >
                    {/* 1. Large Crowned Geometric Sharp Star */}
                    <div
                        className="w-32 h-32 bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-500 flex items-center justify-center relative z-30 transition-transform duration-500 shadow-lg"
                        style={{
                            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                            transform: isHovered ? "translateZ(30px) scale(1.1) rotate(12deg)" : "translateZ(10px) scale(1) rotate(0deg)"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" style={{ transform: 'skewX(-30deg)' }} />
                    </div>

                    {/* 2. Abstract Geometric Crystal Pillar Column */}
                    <div
                        className="w-16 h-36 bg-gradient-to-b from-emerald-500/80 via-emerald-600/90 to-emerald-950 border border-emerald-400/30 mt-[-15px] relative z-20 shadow-xl backdrop-blur-xs"
                        style={{
                            clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)",
                            transform: "translateZ(0px)"
                        }}
                    >
                        <div className="absolute inset-x-4 top-0 bottom-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
                    </div>

                    {/* 3. Upper Pedestal Mount Ring */}
                    <div className="w-20 h-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-sm shadow-md relative z-20 mt-[-2px]" />

                    {/* 4. Tiered Heavy Architectural Base Blocks */}
                    <div className="w-36 h-6 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 rounded-t-md border-t border-stone-600 relative z-10 shadow-lg mt-1" />
                    <div className="w-44 h-8 bg-gradient-to-r from-stone-900 via-[#1f1a14] to-stone-900 rounded-t-lg border-t border-stone-700 shadow-2xl relative z-10 flex items-center justify-center">
                        <div className="w-24 h-4 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-xs flex items-center justify-center border border-yellow-300/40 shadow-xs">
                            <span className="text-[6px] text-stone-950 font-extrabold tracking-widest uppercase">ICCI CORPORATE STAR</span>
                        </div>
                    </div>
                </div>

                {/* Floating Ambient Sparks */}
                <div
                    className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-60 transition-all duration-500"
                    style={{
                        transform: isHovered ? "translate3d(-70px, -110px, 60px)" : "translate3d(0,0,0)",
                        boxShadow: "0 0 12px #34d399"
                    }}
                />
                <div
                    className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-80 transition-all duration-700"
                    style={{
                        transform: isHovered ? "translate3d(90px, -40px, 90px)" : "translate3d(0,0,0)",
                        boxShadow: "0 0 10px #fbbf24"
                    }}
                />
            </div>
        </div>
    );
}