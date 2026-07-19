import React, { useState } from "react";
import { Menu, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DesktopUtilityBar from "./DesktopUtilityBar.jsx";
import DesktopNavMenu from "./DesktopNavMenu.jsx";
import MobileNavMenu from "./MobileNavMenu.jsx";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-emerald-200/80 bg-white/90 backdrop-blur-md">
            {/* 1. TOP UTILITY BAR (Hidden on mobile/tablet, shows from desktop up) */}
            <DesktopUtilityBar />

            {/* 2. MAIN NAVIGATION BAR */}
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-5">

                {/* Branding Logo Area */}
                <a href="#" className="flex items-center gap-3 group select-none shrink-0">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center transition-all duration-300 group-hover:scale-105">
                        <img
                            src="/icci-logo.svg"
                            alt="ICCI Logo"
                            className="h-full w-full object-contain rounded-xl"
                            aria-label="ICCI Home Page"
                            width={50}
                            height={50}
                        />
                    </div>
                    <div className="leading-tight">
                        <span className="block text-[11px] sm:text-[12px] lg:text-[13px] font-extrabold tracking-tight text-slate-900 uppercase transition-colors duration-200 group-hover:text-emerald-600">
                            Islamabad Chamber of
                        </span>
                        <span className="block text-[9px] sm:text-[10px] lg:text-[11px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                            Commerce & Industry
                        </span>
                    </div>
                </a>

                {/* Desktop Navigation Menu (Guaranteed hidden below 1024px) */}
                <div className="hidden lg:block">
                    <DesktopNavMenu />
                </div>

                {/* Right Call To Actions (Guaranteed hidden below 1024px) */}
                <div className="hidden lg:flex items-center gap-4 shrink-0">
                    <Button className="bg-emerald-600 hover:cursor-pointer text-white hover:bg-emerald-700 font-bold shadow-sm shadow-emerald-600/10 hover:shadow-md hover:shadow-emerald-600/20 px-5.5 py-5 rounded-md transition-all duration-200 group/btn text-[14px]">
                        Get Services
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Button>
                </div>

                {/* Mobile Menu Trigger Drawer (Shows on screens smaller than 1024px) */}
                <div className="lg:hidden flex items-center">
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger>
                            <div
                                role="button"
                                tabIndex={0}
                                className="flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:cursor-pointer rounded-xl h-10 w-10 border border-slate-100/50 transition-colors outline-none"
                                aria-label="Open Navigation Menu"
                            >
                                <Menu className="h-5.5 w-5.5" />
                            </div>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-sm p-0 bg-white border-l border-slate-100 flex flex-col h-full">
                            <MobileNavMenu closeMenu={() => setMobileOpen(false)} />
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </header>
    );
}