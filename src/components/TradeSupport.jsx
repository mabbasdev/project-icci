import React, { useState, useRef } from "react";
import { ArrowUpRight, Phone, CheckCircle2 } from "lucide-react";

export default function TradeSupport() {
    return (
        <section className="w-full py-28 px-4 md:px-8 relative overflow-hidden">
            {/* Minimalist Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#114b3e_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="mx-auto max-w-6xl relative z-10">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20">
                    <div className="lg:col-span-7 space-y-4">
                        <span className="text-[11px] font-extrabold tracking-widest text-[#114b3e] uppercase bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100 inline-block">
                            Global Trade Enablement
                        </span>
                        <h2 className="text-4xl md:text-[50px] font-bold text-[#114b3e] tracking-tight leading-[1.1]">
                            We support businesses & simplify trade processes
                        </h2>
                    </div>
                    <div className="lg:col-span-5">
                        <p className="text-slate-600 text-[15px] leading-relaxed font-medium">
                            ICCI facilitates market excellence by delivering modern technical frameworks, institutional backing, and international pathways to help Pakistani enterprises scale globally.
                        </p>
                    </div>
                </div>

                {/* Feature Grid & Image Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Premium Interactive List Cards */}
                    <div className="lg:col-span-5 space-y-4">
                        {[
                            {
                                title: "Strategic Ecosystems",
                                desc: "Connecting local founders directly with policymakers, global industry pioneers, and investment channels."
                            },
                            {
                                title: "Streamlined Documentation",
                                desc: "Accelerating international trade verification, secure business attestations, and corporate visa processing."
                            },
                            {
                                title: "Institutional Resources",
                                desc: "Providing multi-sector intelligence, dedicated help desks, and expert-led trade compliance advisories."
                            }
                        ].map((item, idx) => (
                            <InteractiveFeatureCard key={idx} title={item.title} desc={item.desc} />
                        ))}
                    </div>

                    {/* Right: Modern Overlapping Image Display */}
                    <div className="lg:col-span-7 relative">
                        <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100 group">
                            <img
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
                                alt="Global Trade Operations Interface"
                                className="w-full h-[400px] object-cover filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Interaction Panel */}
                        <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white max-w-sm hidden sm:block">
                            <p className="text-[13px] font-semibold text-[#114b3e] leading-relaxed">
                                "Driving corporate infrastructure and establishing structural pathways for sustainable cross-border trade."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Footer Row */}
                <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <button className="group bg-[#8b6e4b] hover:cursor-pointer hover:bg-[#114b3e] text-white font-semibold text-[15px] tracking-wide px-8 py-4 rounded-xl transition-all duration-300 shadow-sm flex items-center gap-2">
                            Discover Our Mission
                            <ArrowUpRight className="w-5 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>

                    {/* Minimalist Contact Link */}
                    <a href="tel:+92512261175" className="flex items-center gap-4 group bg-slate-50 hover:bg-emerald-50/50 px-6 py-3 rounded-xl border border-slate-100 transition-colors duration-300">
                        <div className="h-9 w-9 rounded-lg bg-[#114b3e] flex items-center justify-center text-white shrink-0">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Direct Helpline</div>
                            <div className="text-[#114b3e] font-bold text-[14px]">
                                +92-51-2261175
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}

// Child sub-component supporting dynamic mouse spotlight coordinates tracking
function InteractiveFeatureCard({ title, desc }) {
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
            className="group relative p-6 bg-white border border-slate-100 rounded-2xl hover:border-emerald-800/20 hover:shadow-[0_10px_30px_rgba(17,75,62,0.04)] transition-all duration-300 overflow-hidden"
        >
            {/* Dynamic Spotlight Glow Element */}
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(17, 75, 62, 0.05), transparent 80%)`
                }}
            />

            <div className="flex gap-4 relative z-20">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="space-y-1">
                    <h4 className="font-bold text-[#114b3e] text-[16px] tracking-tight">
                        {title}
                    </h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
}