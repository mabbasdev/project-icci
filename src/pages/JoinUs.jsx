import React, { useState, useRef } from 'react';
import { Landmark, ShieldCheck, FileText, CheckCircle2, UserCheck, CreditCard, ClipboardList, ArrowRight, HelpCircle, Calendar, ShieldAlert } from 'lucide-react';

function JoinUs() {
    const [activeTier, setActiveTier] = useState('corporate');
    const containerRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const registrationSteps = [
        { 
            title: "Obtain Application Forms", 
            desc: "Collect official membership registration packets directly from the ICCI Chamber House reception desk or access authorized portal distributions.", 
            icon: FileText 
        },
        { 
            title: "Propose & Second Recommendations", 
            desc: "The application for grant of membership must be formally proposed and seconded by two existing active members of the Chamber.", 
            icon: UserCheck 
        },
        { 
            title: "Compile Document Stack", 
            desc: "Attach your corporate or individual NTN certificate, sales tax registration papers, bank maintenance credentials, and identity verification records.", 
            icon: ClipboardList 
        },
        { 
            title: "Fee Settlement & Panel Review", 
            desc: "Deposit the prescribed registration and subscription fees. The scrutiny committee verifies compliance benchmarks prior to token issuance.", 
            icon: CreditCard 
        }
    ];

    const corporateReqs = [
        "Must be a partnership firm, association of persons, or a company holding a valid national tax number (NTN) and sales tax registration (if applicable) in the name of the business concern.",
        "Must be permanently domiciled in the Islamabad Capital Territory or have a substantial business interest such as an industrial concern or corporate entity.",
        "Must be actively assessed for the purposes of income tax and sales tax within the territorial jurisdiction of the Chamber.",
        "The application must be formally proposed and seconded by active, existing members of the Chamber.",
        "The prospective member or principal company directors must have no criminal conviction record."
    ];

    const associateReqs = [
        "Applies to a sole proprietorship concern or individual trader holding a valid national tax number (NTN) and sales tax registration if applicable under the business name.",
        "Must be permanently domiciled or maintaining an active commercial footprint within the Islamabad Capital Territory (ICT).",
        "Must fall within the defined income tax or sales tax brackets assessed within the territorial jurisdiction of the Chamber.",
        "The registration profile must be proposed and seconded by existing members of the Chamber.",
        "The individual applicant must have no criminal conviction record."
    ];

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800 relative overflow-hidden"
        >
            {/* Mouse Spotlight Overlay Effect */}
            <div
                className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, rgba(16, 185, 129, 0.04), transparent 80%)`
                }}
            />

            {/* Premium Hero Banner */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-36 pb-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                
                <div className="relative max-w-4xl mx-auto z-10 space-y-6">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold tracking-widest uppercase bg-emerald-500/10 px-5 py-2 rounded-full border border-emerald-500/20 backdrop-blur-sm">
                        ICCI Membership Criteria at a Glance
                    </span>
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
                        Grant of Membership <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                            & Regulatory Eligibility
                        </span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        Official criteria framework for sole proprietorships, partnerships, associations of persons, and corporate bodies seeking alignment with the Islamabad Chamber.
                    </p>
                </div>
            </div>

            {/* Main Interactive Workspace Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30 space-y-16 overflow-hidden">
                
                {/* Interactive Membership Type Selector */}
                <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-slate-800 flex relative">
                    <div 
                        className="absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-500 ease-out z-0 shadow-md"
                        style={{
                            left: activeTier === 'corporate' ? '6px' : 'calc(50% + 2px)',
                            width: 'calc(50% - 8px)'
                        }}
                    />
                    <button
                        onClick={() => setActiveTier('corporate')}
                        className={`cursor-pointer flex-1 py-3 text-center font-bold text-sm rounded-xl transition-colors duration-300 relative z-10 ${
                            activeTier === 'corporate' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        Corporate Category
                    </button>
                    <button
                        onClick={() => setActiveTier('associate')}
                        className={`cursor-pointer flex-1 py-3 text-center font-bold text-sm rounded-xl transition-colors duration-300 relative z-10 ${
                            activeTier === 'associate' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        Associate Category
                    </button>
                </div>

                {/* Sliding Viewport Window for Content Switch Effect */}
                <div 
                    className="flex transition-transform duration-500 ease-in-out will-change-transform pt-6"
                    style={{ 
                        transform: activeTier === 'corporate' ? 'translateX(0%)' : 'translateX(-50%)',
                        width: '200%'
                    }}
                >
                    {/* SLIDE 1: CORPORATE CATEGORY */}
                    <div 
                        className="w-1/2 pr-4 lg:pr-8 shrink-0 transition-opacity duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                        style={{ opacity: activeTier === 'corporate' ? 1 : 0 }}
                    >
                        <div className="lg:col-span-7">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100/80 relative overflow-hidden h-full">
                                <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6">Corporate Structure Clauses</h3>
                                <ul className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                                    {corporateReqs.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-3.5">
                                            <span className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-1 font-bold text-xs">✓</span>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert className="w-6 h-6 text-emerald-400" />
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Legal Safeguard Clause</h3>
                                </div>
                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                    In strict compliance with regulatory protocols under corporate guidelines, the prospective member must have no criminal conviction records to qualify for full corporate chamber credentials.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-3 relative z-10 text-sm text-emerald-300 font-semibold tracking-wide">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Proposed & Seconded by Active Members</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Valid NTN & Sales Tax Alignment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 2: ASSOCIATE CATEGORY */}
                    <div 
                        className="w-1/2 pl-4 lg:pl-8 shrink-0 transition-opacity duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                        style={{ opacity: activeTier === 'associate' ? 1 : 0 }}
                    >
                        <div className="lg:col-span-7">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100/80 relative overflow-hidden h-full">
                                <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-teal-500 to-emerald-500"></div>
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6">Associate Structure Clauses</h3>
                                <ul className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                                    {associateReqs.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-3.5">
                                            <span className="w-5 h-5 rounded-md bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 mt-1 font-bold text-xs">✓</span>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert className="w-6 h-6 text-teal-400" />
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Legal Safeguard Clause</h3>
                                </div>
                                <p className="text-slate-300 text Red-sm sm:text-base leading-relaxed">
                                    In strict compliance with regulatory protocols under corporate guidelines, the prospective member must have no criminal conviction records to qualify for full associate chamber credentials.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-3 relative z-10 text-sm text-teal-300 font-semibold tracking-wide">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                                    <span>Proposed & Seconded by Active Members</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                                    <span>Valid NTN & Territorial Alignment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Membership Renewal & Expiration Parameters Segment */}
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                    <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Membership Period & Annual Renewal</h2>
                        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                            The membership of the Chamber is granted for a period of one year that **expires on the 31st day of March every year**, irrespective of the date of grant of membership, on payment of the prescribed subscription.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm font-black text-xl">01</div>
                            <h4 className="font-bold text-slate-950 text-base">Subscription Deadline</h4>
                            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                                Payment of the prescribed annual membership subscription must be fully cleared by **March 31st** each year.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-white text-teal-600 flex items-center justify-center shadow-sm font-black text-xl">02</div>
                            <h4 className="font-bold text-slate-950 text-base">Tax Filing Verification</h4>
                            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                                Submission of valid proof of filing returns for both income tax and sales tax (if applicable) for the preceding fiscal year.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step Timeline Progression */}
                <div className="space-y-12">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">The Registration Procedure</h2>
                        <p className="text-slate-500 text-sm sm:text-base">
                            Follow the standard sequence of operations to process your membership application profile.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {registrationSteps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-500/30 transition-all duration-300 group relative z-20 flex flex-col justify-between min-h-[220px]">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 flex items-center justify-center transition-colors duration-200">
                                                <Icon className="w-5 h-5 stroke-[2]" />
                                            </div>
                                            <span className="text-[28px] font-black text-slate-100 group-hover:text-emerald-500/10 transition-colors duration-300 select-none">
                                                0{idx + 1}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-bold text-slate-950 tracking-tight">{step.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                    
                                    {idx < 3 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-30 text-slate-300 pointer-events-none">
                                            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call To Action Footer Card */}
                <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Need Support With Your Submission Portfolio?</h2>
                        <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                            If you require help mapping out documentation details, verifying proposing signatories, or navigating corporate boundary requirements, the Chamber secretariat office handles incoming processing queues daily.
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm font-mono text-slate-300">
                            <span>Tel: +92-51-2261175-5</span>
                            <span className="hidden sm:inline text-slate-700">|</span>
                            <span>Email: info@icci.com.pk</span>
                        </div>
                        <div className="pt-4">
                            <a 
                                href="mailto:info@icci.com.pk"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all duration-300"
                            >
                                Contact Secretariat Office
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            
            <div className="h-24"></div>
        </div>
    );
}

export default JoinUs;