import React, { useState, useEffect } from "react";
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
        desc: "Instantly search through our extensive database of registered business entities, manufacturers, and corporate profiles.",
        href: "https://icci.app/ords/r/chamber/directory/directory"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
        title: "Facilitation & Support Desks",
        desc: "Access dedicated regulatory liaison desks for direct support with FBR, CDA, Customs, and local municipal matters.",
        href: "https://icci.com.pk/services/icci-facilitation-desks/"
    }
];

export default function ServicesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    // Responsive items per view logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerView(1);
            else if (window.innerWidth < 1024) setItemsPerView(2);
            else setItemsPerView(3);
        };
        
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, SERVICES_DATA.length - itemsPerView);

    const handleDotClick = (index) => {
        // Ensure we don't scroll past the last visible set of items
        const safeIndex = Math.min(index, maxIndex);
        setCurrentIndex(safeIndex);
    };

    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                
                {/* Centered Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-[40px] font-bold text-[#2a5b45] leading-tight max-w-2xl mx-auto">
                        Driving business growth with strategic insights
                    </h2>
                </div>

                {/* Carousel Track Container */}
                <div className="relative w-full">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out gap-6"
                        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                    >
                        {SERVICES_DATA.map((service) => (
                            <div 
                                key={service.id} 
                                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 pt-4"
                            >
                                {/* Background Image */}
                                <div className="h-[220px] w-full rounded-[24px] overflow-hidden">
                                    <img 
                                        src={service.image} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Overlapping Content Box */}
                                <div className="relative -mt-16 mx-4 bg-[#f4f9f7] rounded-[24px] p-8 shadow-sm border border-emerald-50/50">
                                    
                                    {/* Layout matching the image exactly: Icon and Title side by side/stacked */}
                                    <div className="flex gap-4 items-start mb-4">
                                        <div className="h-12 w-12 shrink-0 rounded-full bg-[#114b3e] flex items-center justify-center text-white">
                                            <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-[17px] font-semibold text-[#114b3e] leading-snug pt-1">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[#5c7a6e] text-[14px] leading-relaxed line-clamp-4 h-[84px]">
                                        {service.desc}
                                    </p>

                                    {/* Footer line and Read More */}
                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="h-[1px] bg-[#a9c4b8] flex-1"></div>
                                        <a 
                                            href={service.href} 
                                            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#114b3e] hover:text-emerald-700 transition-colors"
                                        >
                                            Read more
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-3 mt-12">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                currentIndex === index 
                                    ? "bg-transparent border-[1.5px] border-[#114b3e] scale-125" 
                                    : "bg-[#114b3e]"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}