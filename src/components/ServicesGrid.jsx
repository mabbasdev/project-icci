import React, { useState, useRef } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";

const SERVICES_DATA = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
        title: "Benefits of Joining ICCI Member's Community",
        desc: "Get exclusive access to business resources, networking opportunities, and support services to enhance your company's growth.",
        href: "https://icci.com.pk/how-to-join-icci/"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?auto=format&fit=crop&w=600&q=80",
        title: "Visa Recommendation Letter",
        desc: "ICCI provides visa recommendation letters to help members secure travel permissions for business expansion, meetings, and global trade.",
        href: "https://icci.com.pk/services/visa-recommendation/"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
        title: "Certificate of Origin Fee",
        desc: "We authenticate and certify essential business documents, ensuring compliance with international trade laws for smooth processing.",
        href: "https://icci.com.pk/services/certificate-of-origin/"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
        title: "Member Directory Search",
        desc: "Instantly search through our extensive database of registered business entities, manufacturers, and corporate profiles in Islamabad.",
        href: "https://icci.app/ords/r/chamber/directory/directory"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
        title: "Facilitation & Support Desks",
        desc: "Access dedicated regulatory liaison desks for direct support with FBR, CDA, Customs, and local municipal matters.",
        href: "https://icci.com.pk/services/icci-facilitation-desks/"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        title: "Chamber News & Publications",
        desc: "Stay updated with recent public notifications, quarterly executive journals, industrial prints, and official press announcements.",
        href: "https://icci.com.pk/news-notifications/"
    }
];

export default function ServicesGrid() {
    return (
        <section className="w-full bg-white py-16 md:py-20 px-4 sm:px-6 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Centered Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-[11px] font-extrabold tracking-widest text-[#114b3e] uppercase bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100 inline-block">
                        What We Provide
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#114b3e] tracking-tight leading-tight max-w-3xl mx-auto mt-2">
                        Driving business growth with strategic insights
                    </h2>
                    <div className="h-0.5 w-16 bg-[#114b3e] mx-auto mt-4 opacity-20" />
                </div>

                {/* Grid Container with intermediate sm breakpoint support */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {SERVICES_DATA.map((service) => (
                        <InteractiveCard key={service.id} service={service} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function InteractiveCard({ service }) {
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
            className="group relative flex flex-col bg-[#f4f9f7] rounded-[24px] overflow-hidden border border-emerald-100/30 shadow-xs hover:shadow-md transition-all duration-300 w-full"
        >
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(17, 75, 62, 0.1), transparent 80%)`
                }}
            />

            {/* Scale aspect ratio smoothly dynamically on tablet frames */}
            <div className="h-[180px] sm:h-[200px] md:h-[210px] w-full overflow-hidden relative z-0">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
            </div>

            <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1 relative z-20">
                <div className="flex gap-3 items-center sm:items-center mb-4">
                    <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-full bg-[#114b3e] flex items-center justify-center text-white">
                        <ShieldCheck className="h-4.5 w-4.5 md:h-5 md:w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#114b3e] leading-snug pt-0.5">
                        {service.title}
                    </h3>
                </div>

                <p className="text-[#5c7a6e] text-[13px] md:text-[14px] leading-relaxed mb-6 md:mb-8 flex-1">
                    {service.desc}
                </p>

                <div className="mt-auto flex items-center gap-4 pt-2">
                    <div className="h-[1px] bg-[#a9c4b8] flex-1"></div>
                    <a
                        href={service.href}
                        className="inline-flex items-center gap-2 shrink-0 text-[13px] md:text-[14px] font-semibold text-[#114b3e] hover:text-emerald-700 transition-colors group/link"
                    >
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </a>
                </div>
            </div>
        </div>
    );
}