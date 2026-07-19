import React, { useState, useRef, useEffect } from "react";
import { Globe, DollarSign, Megaphone, Info, Users, ArrowRight } from "lucide-react";

// Counter component that triggers only when visible on screen
function AnimatedCounter({ target, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime = null;
        const startValue = 0;
        const endValue = parseInt(target, 10);

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            const easeOutQuad = progress * (2 - progress);
            setCount(Math.floor(easeOutQuad * (endValue - startValue) + startValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration, hasStarted]);

    return <span ref={elementRef}>{count}</span>;
}

export default function Departments() {
    const departmentsData = [
        {
            title: "International Trade & Facilitation Center",
            desc: "Supports global trade, export documentation, and business networking.",
            icon: Globe,
        },
        {
            title: "Finance & Accounts Department",
            desc: "Handles financial transactions, budgeting, and compliance for smooth operations.",
            icon: DollarSign,
        },
        {
            title: "Media & PR Department",
            desc: "Promotes initiatives through media, public relations, and digital communication.",
            icon: Megaphone,
        },
        {
            title: "Information & Business Development",
            desc: "Provides business insights, research, and updates to keep members competitive.",
            icon: Info,
        },
        {
            title: "Membership Department",
            desc: "Manages member registrations, renewals, and support, ensuring seamless engagement.",
            icon: Users,
        }
    ];

    const logoUrls = [
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/56.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/57.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/58.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/59.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/60.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/61.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/ICCI-partener.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/icci-partener-1.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/icci-partener-2.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/icci-partener-3.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/icci-partener-4.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/icci-partener-5.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/icci-partener-6.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/1.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/2.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/3.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/4.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/5.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/6.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/7.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/8.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/9.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/10.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/11.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/12.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/13.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/14.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/15.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/16.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/17.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/18.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/19.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/20.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/21.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/22.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/23.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/24.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/25.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/26.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/27.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/28.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/29.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/30.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/31.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/32.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/33.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/34.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/35.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/36.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/37.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/38.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/39.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/40.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/41.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/42.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/43.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/44.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/45.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/46.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/47.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/48.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/49.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/50.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/51.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/52.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/53.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/54.jpg",
        "https://i0.wp.com/icci.com.pk/wp-content/uploads/2025/04/55.jpg"
    ];

    const uniqueLogos = [...new Set(logoUrls)];

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 80s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />

            <section className="w-full bg-[#f4f7f5] py-16 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
                <div className="mx-auto max-w-6xl relative z-10">

                    {/* Asymmetrical Header Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12 md:mb-16">
                        <div className="lg:col-span-5 space-y-3">
                            <span className="text-[11px] font-extrabold tracking-widest text-[#114b3e] uppercase bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100 inline-block">
                                Departments
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold text-[#114b3e] tracking-tight leading-tight">
                                Various reasons to choose us
                            </h2>
                            <div className="w-12 h-[3px] bg-[#8b6e4b]" />
                        </div>
                        <div className="lg:col-span-7 lg:pt-2">
                            <p className="text-slate-600 text-[14px] sm:text-[15px] max-w-xl">
                                We provide targeted institutional services across core administrative wings, ensuring your business has the backing it needs to scale smoothly.
                            </p>
                        </div>
                    </div>

                    {/* Matrix Grid: Comfortably scales through 1, 2, and 3 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20">
                        {departmentsData.map((dept, idx) => (
                            <DepartmentCard
                                key={idx}
                                title={dept.title}
                                desc={dept.desc}
                                Icon={dept.icon}
                            />
                        ))}
                        <InteractiveCTACard />
                    </div>

                    {/* Metrics Layout: Balanced stack handling for tablets and mobile */}
                    <div className="pt-12 border-t border-slate-300/50 mb-16 md:mb-20">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-300/60">
                            <div className="flex flex-col items-center justify-center pb-6 sm:pb-0">
                                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#114b3e] tracking-tight mb-2">
                                    <AnimatedCounter target={14} />k
                                </div>
                                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                    Members
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center py-6 sm:py-0 sm:px-4">
                                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#114b3e] tracking-tight mb-2">
                                    <AnimatedCounter target={40} />
                                </div>
                                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                    Years of Excellence
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-6 sm:pt-0">
                                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#114b3e] tracking-tight mb-2">
                                    <AnimatedCounter target={60} />+
                                </div>
                                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500 max-w-[200px] leading-relaxed">
                                    National & International Partners
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logo Container: Standard static slide widths on intermediate views prevent right-side overflow */}
                    <div className="pt-12 border-t border-slate-300/30">
                        <h4 className="text-center text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                            Our Trusted Members & Core Partners
                        </h4>

                        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
                            <div className="flex gap-4 w-max animate-marquee">
                                {uniqueLogos.map((url, index) => (
                                    <div
                                        key={`slide-1-${index}`}
                                        className="w-[120px] sm:w-[140px] md:w-[150px] lg:w-[160px] bg-white p-3 rounded-xl border border-slate-200/40 flex items-center justify-center hover:shadow-xs hover:border-emerald-700/10 transition-all duration-200 group shrink-0"
                                    >
                                        <img
                                            loading="lazy"
                                            src={`${url}?fit=147%2C81&ssl=1`}
                                            alt="ICCI Member Logo"
                                            className="w-full h-auto max-h-8 sm:max-h-10 object-contain opacity-75 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                                        />
                                    </div>
                                ))}
                                {uniqueLogos.map((url, index) => (
                                    <div
                                        key={`slide-2-${index}`}
                                        className="w-[120px] sm:w-[140px] md:w-[150px] lg:w-[160px] bg-white p-3 rounded-xl border border-slate-200/40 flex items-center justify-center hover:shadow-xs hover:border-emerald-700/10 transition-all duration-200 group shrink-0"
                                    >
                                        <img
                                            loading="lazy"
                                            src={`${url}?fit=147%2C81&ssl=1`}
                                            alt="ICCI Member Logo"
                                            className="w-full h-auto max-h-8 sm:max-h-10 object-contain opacity-75 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

function DepartmentCard({ title, desc, Icon }) {
    const cardRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="border border-slate-300/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-emerald-800/20 hover:shadow-[0_15px_40px_rgba(17,75,62,0.04)] relative overflow-hidden flex flex-col justify-between  sm:min-h-[250px] group w-full"
        >
            <div
                className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background: isHovered
                        ? `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(17, 75, 62, 0.04), transparent 80%)`
                        : "none"
                }}
            />
            <div className="space-y-4 sm:space-y-5 relative z-20 text-center">
                <div className="h-10 w-10 sm:h-12 sm:w-12 mx-auto rounded-xl bg-emerald-50 text-[#114b3e] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs">
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                    <h2 className="font-bold text-[#114b3e] text-[15px] sm:text-[17px] tracking-tight leading-snug">
                        {title}
                    </h2>
                    <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
}

function InteractiveCTACard() {
    const cardRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-gradient-to-br from-[#114b3e] to-[#0c372d] text-white p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-between  sm:min-h-[250px] group border border-[#114b3e] relative overflow-hidden transition-all duration-300 w-full"
        >
            <div
                className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background: isHovered
                        ? `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(251, 191, 36, 0.15), transparent 80%)`
                        : "none"
                }}
            />
            <div className="space-y-2 sm:space-y-3 relative z-20">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">Explore all operational structures</h3>
                <p className="text-emerald-100/70 text-[12px] sm:text-[13px] leading-relaxed">
                    Discover how our dedicated departments work in unison to drive overarching business success.
                </p>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold uppercase hover:cursor-pointer hover:underline tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors pt-4 relative z-20 w-fit">
                View Our Departments
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}