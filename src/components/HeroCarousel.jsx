import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const CAROUSEL_SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        tag: "Upcoming Event",
        title: "Islamabad International Trade Expo 2026",
        desc: "Connect with global industrial delegations, explore new bilateral trade routes, and showcase your brand to over 50,000+ targeted corporate visitors.",
        date: "Oct 12-15, 2026",
        location: "Jinnah Convention Centre, Islamabad",
        primaryBtn: "Register as Exhibitor",
        primaryHref: "https://icci.com.pk/",
        contentAlignment: "left"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        tag: "Chamber Update",
        title: "Empowering Local Startups & Digital Export",
        desc: "Join the ICCI IT and Tech Committee initialization programs designed to accelerate domestic software house exports and build global strategic partnerships.",
        date: "August 04, 2026",
        location: "ICCI Auditorium, Blue Area",
        primaryBtn: "View IT Initiatives",
        primaryHref: "https://icci.com.pk/",
        contentAlignment: "center"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        tag: "Bilateral Relations",
        title: "Pak-EU Industrial Collaboration Summit",
        desc: "Reviewing regulatory frameworks, Tariff quotas, GSP+ extensions, and mutual trade expansion agreements between EU corporate groups and ICCI executives.",
        date: "September 19, 2026",
        location: "Serena Hotel, Islamabad",
        primaryBtn: "Read Briefing Paper",
        primaryHref: "https://icci.com.pk/",
        contentAlignment: "right"
    },
    {
        id: 4,
        image: "https://plus.unsplash.com/premium_photo-1661679584923-e6f62b0a9834?auto=format&fit=crop&w=1200&q=80",
        tag: "Membership Benefit",
        title: "Annual Corporate Networking Gala",
        desc: "An exclusive evening bringing together top industrialists, foreign diplomats, and chamber members to foster new local commercial partnerships.",
        date: "November 05, 2026",
        location: "Marriott Hotel, Islamabad",
        primaryBtn: "Request Invitation",
        primaryHref: "https://icci.com.pk/",
        contentAlignment: "hide"
    }
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? CAROUSEL_SLIDES.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = useCallback(() => {
        const isLastSlide = currentIndex === CAROUSEL_SLIDES.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(slideTimer);
    }, [nextSlide]);

    const getAlignmentStyles = (alignment) => {
        switch (alignment) {
            case "center":
                return {
                    inner: "lg:col-span-8 lg:col-start-3 flex flex-col items-center text-center",
                    meta: "justify-center",
                    buttonGroup: "justify-center"
                };
            case "right":
                return {
                    inner: "lg:col-span-7 lg:col-start-6 flex flex-col items-end text-right",
                    meta: "justify-end",
                    buttonGroup: "justify-end"
                };
            case "hide":
                return {
                    inner: "",
                    meta: "",
                    buttonGroup: ""
                };
            case "left":
            default:
                return {
                    inner: "lg:col-span-8 flex flex-col items-start text-left",
                    meta: "justify-start",
                    buttonGroup: "justify-start"
                };
        }
    };

    const getOverlayGradient = (alignment) => {
        switch (alignment) {
            case "center":
                return "bg-slate-950/80 backdrop-blur-[1px]";
            case "right":
                return "bg-gradient-to-l from-slate-950/95 via-slate-950/80 to-transparent";
            case "hide":
                return "bg-slate-950/20";
            case "left":
            default:
                return "bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent";
        }
    };

    return (
        <section className="relative w-full h-[520px] md:h-[600px] bg-slate-950 overflow-hidden group/carousel">
            <div className="relative w-full h-full">
                {CAROUSEL_SLIDES.map((slide, index) => {
                    const align = slide.contentAlignment || "left";
                    const isHidden = align === "hide";
                    const styles = getAlignmentStyles(align);

                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${index === currentIndex
                                ? "opacity-100 scale-100 z-10"
                                : "opacity-0 scale-105 z-0 pointer-events-none"
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover object-center"
                            />

                            <div className={`absolute inset-0 transition-all duration-500 ${getOverlayGradient(align)}`} />

                            {!isHidden && (
                                <div className="absolute inset-0 flex items-center">
                                    <div className="mx-auto w-full max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-12">
                                        <div className={`space-y-5 text-white w-full ${styles.inner}`}>

                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                {slide.tag}
                                            </span>

                                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] w-full">
                                                {slide.title}
                                            </h1>

                                            <p className="text-slate-300 text-[14px] md:text-[16px] font-medium leading-relaxed max-w-2xl">
                                                {slide.desc}
                                            </p>

                                            <div className={`flex flex-wrap items-center gap-y-2 gap-x-6 text-[13px] text-slate-400 font-semibold pt-1 w-full ${styles.meta}`}>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-emerald-500 shrink-0" />
                                                    <span>{slide.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
                                                    <span>{slide.location}</span>
                                                </div>
                                            </div>

                                            <div className={`pt-4 flex items-center gap-4 w-full ${styles.buttonGroup}`}>
                                                <a href={slide.primaryHref}>
                                                    <Button className="bg-emerald-600 hover:cursor-pointer text-white hover:bg-emerald-700 font-bold px-6 py-5.5 rounded-lg transition-all duration-200 group/btn text-[14px] shadow-lg shadow-emerald-600/10">
                                                        {slide.primaryBtn}
                                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                                                    </Button>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden items-center justify-center h-12 w-12 rounded-xl bg-slate-900/40 text-white hover:bg-emerald-600 border border-slate-700/30 backdrop-blur-md opacity-0 transition-all duration-300 group-hover/carousel:opacity-100 hover:scale-105 hover:shadow-lg md:flex"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden items-center justify-center h-12 w-12 rounded-xl bg-slate-900/40 text-white hover:bg-emerald-600 border border-slate-700/30 backdrop-blur-md opacity-0 transition-all duration-300 group-hover/carousel:opacity-100 hover:scale-105 hover:shadow-lg md:flex"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            {/* Pagination dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-slate-950/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-800/40">
                {CAROUSEL_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 transition-all duration-300 rounded-full ${index === currentIndex ? "w-6 bg-emerald-500" : "w-2 bg-slate-600 hover:bg-slate-400"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}