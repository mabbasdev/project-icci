import React, { useState, useRef } from "react";

const LEADERS_DATA = [
    {
        id: 1,
        name: "Tahir Ayub",
        role: "Senior Vice President",
        image: "https://i0.wp.com/icci.com.pk/wp-content/uploads/2026/05/Tahir-Ayub.png",
        tenure: "ICCI 2025-2026",
        // Senior VP: Order 2 on mobile, Order 1 on desktop (left side)
        orderClass: "order-2 md:order-1"
    },
    {
        id: 2,
        name: "Sardar Tahir Mehmood",
        role: "President",
        image: "https://i0.wp.com/icci.com.pk/wp-content/uploads/2026/05/Sardar-Tahir-Mehmood.png",
        tenure: "ICCI 2025-2026",
        // President: Order 1 on mobile, Order 2 on desktop (center slot)
        orderClass: "order-1 md:order-2 md:-translate-y-4 md:shadow-lg md:border-emerald-200/50",
        isPresident: true
    },
    {
        id: 3,
        name: "Muhammad Irfan Chaudhry",
        role: "Vice President",
        image: "https://i0.wp.com/icci.com.pk/wp-content/uploads/2026/05/Irfan-Chaudhry.png",
        tenure: "ICCI 2025-2026",
        // VP: Order 3 on mobile, Order 3 on desktop (right side)
        orderClass: "order-3 md:order-3"
    }
];

export default function Leadership() {
    return (
        <section className="w-full bg-[#f4f9f7]/40 py-24 px-4 md:px-8 border-b border-slate-100">
            <div className="mx-auto max-w-5xl">

                {/* Centered Institutional Header */}
                <div className="text-center mb-16 space-y-2">
                    <span className="text-[11px] font-extrabold tracking-widest text-[#114b3e] uppercase bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100 inline-block">
                        Executive Leadership
                    </span>
                    <h2 className="text-3xl md:text-[36px] font-bold text-[#114b3e] tracking-tight">
                        Meet Our Office Bearers
                    </h2>
                    <p className="text-[#5c7a6e] text-[14px] max-w-md mx-auto">
                        Driving strategic growth and industrial policy advocacy for the corporate ecosystem of Islamabad.
                    </p>
                </div>

                {/* 3-Column Centered Executive Layout with Desktop Alignment Cushioning */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-center justify-center pt-4">
                    {LEADERS_DATA.map((leader) => (
                        <InteractiveLeaderCard key={leader.id} leader={leader} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function InteractiveLeaderCard({ leader }) {
    const cardRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative bg-white rounded-[24px] overflow-hidden border border-slate-200/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col text-center ${leader.orderClass}`}
        >
            {/* Dynamic Spotlight Glow Layer */}
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, ${leader.isPresident ? 'rgba(16, 185, 129, 0.1)' : 'rgba(17, 75, 62, 0.08)'}, transparent 80%)`
                }}
            />

            {/* Profile Image Shell — Explicit 600x637 Responsive Aspect Ratio scaling */}
            <div className="w-full aspect-[600/637] bg-slate-100 overflow-hidden relative z-0">
                <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Details Content Container */}
            <div className="p-6 flex flex-col items-center flex-1 relative z-20 bg-transparent">
                <span className={`text-[12px] font-bold uppercase tracking-wider mb-1 ${leader.isPresident ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {leader.role}
                </span>
                <h3 className="text-[18px] font-bold text-[#114b3e] tracking-tight leading-snug mb-1">
                    {leader.name}
                </h3>
                <p className="text-slate-400 text-[12px] font-medium">
                    {leader.tenure}
                </p>
            </div>
        </div>
    );
}