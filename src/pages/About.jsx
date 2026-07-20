import React, { useState, useRef, useEffect } from 'react';
import { Target, Award, ShieldCheck, Landmark, GraduationCap, BriefcaseMedical, FileSpreadsheet, Users, Network, TrendingUp, Presentation, Eye } from 'lucide-react';

// Custom lightweight counter hook that waits for an activation flag
function useAnimatedCounter(targetValue, shouldStart, duration = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Exit early if the element has not scrolled into the user's viewport yet
        if (!shouldStart) return;

        let numericTarget = parseInt(targetValue.replace(/[^0-9]/g, ''), 10);
        let suffix = targetValue.replace(/[0-9]/g, '');

        if (targetValue.includes('k')) {
            numericTarget = numericTarget * 1000;
            suffix = 'k+';
        }

        let start = 0;
        const end = numericTarget;
        if (start === end) return;

        const totalMiliseconds = duration;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(totalMiliseconds / frameRate);
        let currentFrame = 0;

        const counter = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * (end - start) + start);

            if (currentFrame >= totalFrames) {
                clearInterval(counter);
                setCount(targetValue);
            } else {
                if (targetValue.includes('k')) {
                    setCount((currentCount / 1000).toFixed(0) + suffix);
                } else {
                    setCount(currentCount + suffix);
                }
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [targetValue, shouldStart, duration]);

    return count;
}

// Sub-component that handles its own intersection tracking and starts counting when reached
function CounterItem({ value, label }) {
    const [hasIntersected, setHasIntersected] = useState(false);
    const elementRef = useRef(null);
    const animatedValue = useAnimatedCounter(value, hasIntersected);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasIntersected(true);
                    // Once visible, disconnect tracking so animations do not repeat on scroll out
                    if (elementRef.current) observer.unobserve(elementRef.current);
                }
            },
            {
                root: null,
                // Starts animation slightly before element is fully centered (10% entry buffer)
                threshold: 0.1
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className="space-y-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100/80 relative z-20"
        >
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight bg-gradient-to-b from-slate-950 to-slate-700 bg-clip-text text-transparent">
                {animatedValue}
            </div>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                {label}
            </div>
        </div>
    );
}

// Rest of the About component stays structurally identical, ensuring compatibility 
function About() {
    const [activeTab, setActiveTab] = useState('profile');
    const [activeSlide, setActiveSlide] = useState('mission');
    const containerRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev === 'mission' ? 'vision' : 'mission'));
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const performanceStats = [
        { value: "14k+", label: "MEMBERS" },
        { value: "40", label: "YEARS OF EXCELLENCE" },
        { value: "60+", label: "NATIONAL & INTERNATIONAL TIE-UPS" }
    ];

    const pillarCards = [
        { title: "Women & Youth Empowerment", desc: "We actively target youth performance margins and provide mentoring blueprints to unlock incremental growth.", icon: Users },
        { title: "Policy Advisory & Support", desc: "Delivering strategic recommendations directly to governmental branches to insulate local enterprise operations.", icon: ShieldCheck },
        { title: "Global Trade Opportunities", desc: "Facilitating bilateral trade agreements and organizing trade delegations to expose regional enterprise globally.", icon: Network },
        { title: "Business Growth & Training", desc: "ICCI implements target training programs covering modern system scripting and operational management workflows.", icon: TrendingUp },
        { title: "Strong Business Network", desc: "Connect with verified corporate leaders and leverage dynamic B2B matching systems to scale modern frameworks.", icon: Presentation }
    ];

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800 relative overflow-hidden"
        >
            <div
                className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, rgba(16, 185, 129, 0.04), transparent 80%)`
                }}
            />

            {/* Premium Hero Banner */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-36 pb-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                    <div className="absolute -top-12 left-10 w-96 h-96 bg-emerald-500 rounded-full filter blur-[120px] animate-[pulse_6s_infinite_ease-in-out]"></div>
                </div>

                <div className="relative max-w-4xl mx-auto z-10 space-y-6">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold tracking-widest uppercase bg-emerald-500/10 px-5 py-2 rounded-full border border-emerald-500/20 backdrop-blur-sm">
                        Islamabad Chamber of Commerce & Industry
                    </span>
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
                        Connecting Local Enterprise <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                            With Global Opportunity
                        </span>
                    </h1>
                </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
                <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-slate-800 flex relative">
                    <div
                        className="absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-500 ease-out z-0 shadow-md"
                        style={{
                            left: activeTab === 'profile' ? '6px' : 'calc(50% + 2px)',
                            width: 'calc(50% - 8px)'
                        }}
                    />
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`cursor-pointer flex-1 py-3 text-center font-bold text-sm rounded-xl transition-colors duration-300 relative z-10 ${activeTab === 'profile' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Chamber Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('president')}
                        className={`cursor-pointer flex-1 py-3 text-center font-bold text-sm rounded-xl transition-colors duration-300 relative z-10 ${activeTab === 'president' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        President's Message
                    </button>
                </div>
            </div>

            {/* Sliding Viewport Window */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out will-change-transform"
                    style={{
                        transform: activeTab === 'profile' ? 'translateX(0%)' : 'translateX(-50%)',
                        width: '200%'
                    }}
                >
                    {/* WING 1: PROFILE TAB */}
                    <div className="w-1/2 pr-4 lg:pr-8 shrink-0 space-y-24 transition-opacity duration-300" style={{ opacity: activeTab === 'profile' ? 1 : 0 }}>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 relative overflow-hidden min-h-[440px] lg:min-h-[380px]">
                            <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-emerald-500 to-teal-500"></div>

                            <div className="lg:col-span-5 relative group">
                                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-md group-hover:opacity-30 transition duration-300"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                                    alt="Corporate Strategy Center"
                                    className="rounded-xl w-full object-cover h-[260px] lg:h-[280px] shadow-md relative z-10"
                                />
                            </div>

                            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6 relative min-h-[240px]">
                                <div className="relative overflow-hidden flex-1">
                                    <div className={`transition-all duration-500 absolute inset-0 flex flex-col justify-center space-y-4 ${activeSlide === 'mission' ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-8 absolute pointer-events-none'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                <Target className="w-5 h-5 stroke-[2]" />
                                            </div>
                                            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Doc Ref // ICCI-MS-V2</span>
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">Mission Statement</h2>
                                        <p className="text-slate-600 leading-relaxed text-[15px]">
                                            As a premier apex chamber in the northern region, ICCI serves as a catalyst for socio-economic development by providing quality services to its members, promoting trade, industry, and the service sector, and encouraging innovative entrepreneurship and environmental compliance.
                                        </p>
                                    </div>

                                    <div className={`transition-all duration-500 absolute inset-0 flex flex-col justify-center space-y-4 ${activeSlide === 'vision' ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-8 absolute pointer-events-none'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                                                <Eye className="w-5 h-5 stroke-[2]" />
                                            </div>
                                            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Doc Ref // ICCI-VS-V2</span>
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">Vision Statement</h2>
                                        <p className="text-slate-600 leading-relaxed text-[15px]">
                                            To make ICCI a leading and role model trade organization in the country taking growth oriented initiatives and adopting best international practices for the promotion of trade, industry and services sector.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                    <button
                                        onClick={() => setActiveSlide('mission')}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 ${activeSlide === 'mission'
                                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                                : 'bg-transparent border-slate-200 text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        Our Mission
                                    </button>
                                    <button
                                        onClick={() => setActiveSlide('vision')}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 ${activeSlide === 'vision'
                                                ? 'bg-teal-50 border-teal-200 text-teal-700'
                                                : 'bg-transparent border-slate-200 text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        Our Vision
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Historical Origins & Integration Deck */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Est. 1984</span>
                                <h2 className="text-3xl font-black tracking-tight text-slate-900">Driving Commercial Scalability</h2>
                                <p className="text-slate-600 leading-relaxed text-[15px]">
                                    Islamabad Chamber of Commerce and Industry (ICCI) was established in 1984 and incorporated under the Companies Act 1913 (now Companies Act 2017) as a Limited Liability Company. It operates as a distinct non-profit corporate entity acting as the exclusive voice for regional business operations.
                                </p>
                                <ul className="space-y-3.5 text-slate-600 text-[14px]">
                                    <li className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 font-bold text-xs">✓</span>
                                        <span>ICCI is affiliated with FPCCI to amplify provincial footprint tracking.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 font-bold text-xs">✓</span>
                                        <span>Built comprehensive digital infrastructure to insulate SME growth curves.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 font-bold text-xs">✓</span>
                                        <span>Key Sectors: Industry, Real Estate, Technology, Finance, Energy, Logistics.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-950 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                                <div className="space-y-6 relative z-10">
                                    <h3 className="text-xl font-bold tracking-tight">Islamabad Chamber of Commerce & Industry</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                            <Landmark className="w-6 h-6 text-emerald-400 mb-2" />
                                            <span className="text-xs font-semibold text-slate-300">Trade Hub</span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                            <GraduationCap className="w-6 h-6 text-emerald-400 mb-2" />
                                            <span className="text-xs font-semibold text-slate-300">Skill Hub</span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                            <BriefcaseMedical className="w-6 h-6 text-emerald-400 mb-2" />
                                            <span className="text-xs font-semibold text-slate-300">Corporate Care</span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                                            <FileSpreadsheet className="w-6 h-6 text-emerald-400 mb-2" />
                                            <span className="text-xs font-semibold text-slate-300">Research Bureau</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Strengthening Foundations Segment */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-900 rounded-3xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                            <div className="lg:col-span-7 space-y-6 relative z-10">
                                <h2 className="text-3xl font-black tracking-tight">Strengthening Economic Foundations</h2>
                                <p className="text-slate-400 leading-relaxed text-[15px]">
                                    Maximize capital deployment and optimize local supply chain architectures. We catalyze regional investments, establish secure frameworks, and ensure frictionless integration for international capital entities across the federal capital.
                                </p>
                                <ul className="space-y-3.5 text-slate-300 text-[14px]">
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span>Advocating continuous simplification of regulatory operations.</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span>Catalyzing strategic foreign direct investments into regional tech hubs.</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span>Proactively resolving regional multi-device transaction barriers.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="lg:col-span-5 relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
                                    alt="Financial Progress Globe"
                                    className="rounded-2xl w-full object-cover h-[280px] shadow-2xl relative z-10 filter brightness-90 border border-slate-800"
                                />
                            </div>
                        </div>

                        {/* Structural Pillars Grid */}
                        <div className="space-y-12">
                            <div className="text-center space-y-3 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-black tracking-tight text-slate-900">Empowering Business Growth</h2>
                                <p className="text-slate-500 text-[15px]">
                                    Providing a robust infrastructure designed to give members unparalleled advocacy, resources, and networking capabilities.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pillarCards.map((p, idx) => {
                                    const Icon = p.icon;
                                    return (
                                        <div key={idx} className="bg-white p-6 flex flex-col text-center mx-auto rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-500/30 transition-all duration-300 group relative z-20">
                                            <div className="w-10 h-10 mx-auto rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 flex items-center justify-center transition-colors duration-200 mb-5">
                                                <Icon className="w-5 h-5 stroke-[2]" />
                                            </div>
                                            <h3 className="text-[17px] font-bold text-slate-950 mb-2.5">{p.title}</h3>
                                            <p className="text-slate-500 text-[13.5px] leading-relaxed">{p.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* WING 2: PRESIDENT TAB */}
                    <div className="w-1/2 pl-4 lg:pl-8 shrink-0 space-y-12 transition-opacity duration-300 flex flex-col items-center" style={{ opacity: activeTab === 'president' ? 1 : 0 }}>

                        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

                            <div className="space-y-4">
                                <div className="relative w-44 h-44 mx-auto group">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 opacity-90 shadow-lg"></div>
                                    <div className="absolute inset-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200 flex items-center justify-center">
                                        <img
                                            src="https://i0.wp.com/icci.com.pk/wp-content/uploads/2026/05/Sardar-Tahir-Mehmood.png?w=320&ssl=1"
                                            alt="Sardar Tahir Mehmood"
                                            className="w-full h-full object-cover scale-105"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sardar Tahir Mehmood</h2>
                                    <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest">President, ICCI</p>
                                </div>
                            </div>

                            <div className="max-w-2xl mx-auto">
                                <p className="text-slate-700 leading-relaxed text-[16px] font-medium italic">
                                    "Sardar Tahir Mehmood, President ICCI shares his vision to create a thriving ecosystem that supports entrepreneurship and economic growth. Pledges to uphold an open-door policy, ensuring that every stakeholder's voice is heard and valued, and work tirelessly to meet the expectations of our community."
                                </p>
                            </div>
                        </div>

                        <div className="w-full max-w-4xl space-y-4 relative z-20">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Official AGM Address Broadcast</h3>
                                </div>
                                <span className="text-xs font-mono text-slate-500">LENGTH // 00:00:53</span>
                            </div>

                            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black relative group">
                                <iframe
                                    className="w-full h-full object-cover"
                                    src="https://www.youtube.com/embed/GBX40gbYepk"
                                    title="ICCI President Highlights Significance of AGM"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="bg-emerald-950 text-emerald-100 p-5 rounded-xl border border-emerald-800/40 space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Address Broadcast Metadata Transcript Highlights</h4>
                                <p className="text-[13px] leading-relaxed text-emerald-200/90">
                                    President Sardar Tahir Mehmood officially invites all honorable chamber members to the Annual General Body Meeting (AGM) scheduled for October 24th at 11:30 AM at the Islamabad Chamber House (G-8/1, Islamabad). The assembly will formally evaluate past operational performance metrics and confirm the approval allocations for the upcoming annual fiscal budget.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Unified Bottom Data Matrices */}
                <div className="border-slate-200 pt-16 space-y-16 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {performanceStats.map((stat, idx) => (
                            <CounterItem key={idx} value={stat.value} label={stat.label} />
                        ))}
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 relative z-20">
                        <h4 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">Strategic Integration Affiliates</h4>
                        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                            <span className="font-bold text-slate-700 tracking-tight text-sm duration-100 hover:text-emerald-600 hover:underline cursor-pointer ">FEDERATION OF CHAMBERS (FPCCI)</span>
                            <span className="font-bold text-slate-700 tracking-tight text-sm duration-100 hover:text-emerald-600 hover:underline cursor-pointer ">MINISTRY OF COMMERCE</span>
                            <span className="font-bold text-slate-700 tracking-tight text-sm duration-100 hover:text-emerald-600 hover:underline cursor-pointer ">SMEDA PAKISTAN</span>
                            <span className="font-bold text-slate-700 tracking-tight text-sm duration-100 hover:text-emerald-600 hover:underline cursor-pointer ">BOARD OF INVESTMENT</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;