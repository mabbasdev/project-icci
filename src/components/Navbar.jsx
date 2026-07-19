import React, { useState } from "react";
import {
    Menu,
    Mail,
    Phone,
    Landmark,
    ArrowRight,
    ChevronDown,
    HelpCircle,
    Briefcase,
    MessageSquare,
    Info
} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
    {
        label: "About & Leadership",
        items: [
            { title: "Profile & Message", href: "https://icci.com.pk/profile/", desc: "President message, chamber history, and core objectives." },
            { title: "Executive Committee", href: "https://icci.com.pk/executive-members/", desc: "Meet current office bearers and former presidents." },
            { title: "Secretariat & Team", href: "https://icci.com.pk/our-team/", desc: "Chamber staff directory, internal operations, and departments." },
            { title: "Minutes of Meetings", href: "https://icci.com.pk/minutes-of-meeting/", desc: "Official archives and downloadable session minutes from 2022–2026." },
            { title: "Export Display Center", href: "https://icci.com.pk/export-display-center/", desc: "Showcasing local corporate capabilities to foreign delegations." },
            { title: "Governance Documents", href: "https://icci.com.pk/memorandum-articles-of-association/", desc: "Memorandum & Articles of Association and Financial Statements." },
        ],
    },
    {
        label: "Membership",
        items: [
            { title: "How to Join ICCI", href: "https://icci.com.pk/how-to-join-icci/", desc: "Step-by-step registration guidelines and onboarding process." },
            { title: "Membership Classes", href: "https://icci.com.pk/membership-classes/", desc: "Ordinary, Associate, and Affiliate corporate categories." },
            { title: "Fee Structure", href: "https://icci.com.pk/fee-structure/", desc: "Up-to-date schedule of dues, entry costs, and renewal brackets." },
            { title: "Membership Forms", href: "https://icci.com.pk/membership-card-forms/", desc: "Downloadable registration files, card requests, and address updates." },
            { title: "Member Directory", href: "https://icci.app/ords/r/chamber/directory/directory", desc: "Search over 14,000+ registered business entities instantly." },
            { title: "Benefits & Discounts", href: "https://icci.com.pk/services/benefits-of-joining-icci/", desc: "Corporate perks, hotel vouchers, and airline partnership discounts." },
        ],
    },
    {
        label: "Services & Trade",
        items: [
            { title: "Certificate of Origin", href: "https://icci.com.pk/services/certificate-of-origin/", desc: "Attestation, customs processing, and export documentation." },
            { title: "Visa Recommendations", href: "https://icci.com.pk/services/visa-recommendation/", desc: "Official processing letters to facilitate international business travel." },
            { title: "Facilitation Desks", href: "https://icci.com.pk/services/icci-facilitation-desks/", desc: "One-window regulatory desks for corporate coordination." },
            { title: "Trade Leads & Inquiries", href: "https://icci.com.pk/import-inquiries/", desc: "Global import and export updates, trade fairs, and CPEC paths." },
            { title: "Business Registration", href: "https://icci.com.pk/business-registration/", desc: "Setup rules for corporate registry, policies, and zone access." },
        ],
    },
    {
        label: "Media & Resources",
        items: [
            { title: "News & Notifications", href: "https://icci.com.pk/news-notifications/", desc: "Recent public disclosures, circulars, and official press statements." },
            { title: "Activities & Events", href: "https://icci.com.pk/activities-and-events/", desc: "Review upcoming expos, trade delegations, and recent photo galleries." },
            { title: "Chamber Magazines", href: "https://icci.com.pk/wp-content/uploads/2026/03/Magazine-Sep-Dec-2025.pdf", desc: "Download quarterly journals, industrial prints, and annual reports." },
            { title: "Activity Plan", href: "https://icci.com.pk/activity-plan/", desc: "Scheduled strategic roadmaps for corporate events throughout the year." },
        ],
    },
    {
        label: "Elections",
        items: [
            { title: "Elections 2026-2028", href: "https://icci.com.pk/wp-content/uploads/2026/07/Schedule-2026-28.pdf", desc: "Official schedules, commission notices, and eligibility criteria." },
            { title: "Corporate Member List", href: "https://icci.com.pk/wp-content/uploads/2026/07/CM.pdf", desc: "Downloadable voter index registry for CM class units." },
            { title: "Associate Member List", href: "https://icci.com.pk/wp-content/uploads/2026/07/AM.pdf", desc: "Downloadable voter index registry for AM class units." },
        ],
    },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
            {/* 1. TOP UTILITY BAR (DESKTOP) */}
            <div className="hidden border-b border-slate-100 bg-slate-950 text-slate-300 md:block">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3 text-xs font-medium tracking-wide">
                    <div className="flex items-center gap-6">
                        <a href="mailto:info@icci.com.pk" className="flex items-center gap-2 transition-colors hover:underline hover:text-emerald-400 duration-200">
                            <Mail className="h-3.5 w-3.5 text-emerald-500" /> Send Mail: info@icci.com.pk
                        </a>
                        <a href="tel:+92512261175" className="flex items-center gap-2 transition-colors hover:underline hover:text-emerald-400 duration-200">
                            <Phone className="h-3.5 w-3.5 text-emerald-500" /> Call Now: +92-51-2261175
                        </a>
                    </div>
                    <div className="flex items-center gap-5">
                        <a href="https://icci.com.pk/" className="transition-colors hover:text-emerald-400 hover:underline duration-200">FAQs</a>
                        <a href="https://icci.com.pk/" className="transition-colors hover:text-emerald-400 hover:underline duration-200">Contact</a>
                        <a href="https://icci.com.pk/" className="transition-colors hover:text-emerald-400 hover:underline duration-200">Careers</a>
                        <a href="https://icci.com.pk/" className="transition-colors hover:text-emerald-400 hover:underline duration-200">Feedback</a>
                    </div>
                </div>
            </div>

            {/* 2. MAIN NAVIGATION BAR */}
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
                {/* Branding Logo Area */}
                <a href="#" className="flex items-center gap-3.5 group select-none">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-emerald-400 transition-all duration-300 shadow-sm group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-md">
                        <Landmark className="h-5.5 w-5.5" />
                    </div>
                    <div className="leading-tight">
                        <span className="block text-[13px] font-extrabold tracking-tight text-slate-900 uppercase transition-colors duration-200 group-hover:text-emerald-600">Islamabad Chamber of</span>
                        <span className="block text-[11px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">Commerce & Industry</span>
                    </div>
                </a>

                {/* Desktop Navigation Menu */}
                <NavigationMenu className="hidden lg:block">
                    <NavigationMenuList className="gap-1">
                        {NAV_LINKS.map((group) => (
                            <NavigationMenuItem key={group.label}>
                                <NavigationMenuTrigger className="px-4 py-2 text-[14px] hover:cursor-pointer font-semibold text-slate-700 hover:text-emerald-600 data-[state=open]:text-emerald-600 bg-transparent data-[state=open]:bg-slate-100 rounded-lg transition-all duration-200">
                                    {group.label}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[620px] gap-2.5 p-5 grid-cols-2 bg-white rounded-2xl shadow-xl border border-slate-100/80 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                                        {group.items.map((item) => (
                                            <li key={item.title}>
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        href={item.href}
                                                        className="block rounded-xl p-3.5 transition-all duration-200 hover:cursor-pointer hover:bg-slate-100 group/item border border-transparent hover:border-emerald-300"
                                                    >
                                                        <p className="text-[14px] font-bold text-slate-900 group-hover/item:text-emerald-600 transition-colors duration-200">
                                                            {item.title}
                                                        </p>
                                                        <p className="mt-1 text-[12px] leading-relaxed text-slate-500 font-medium">
                                                            {item.desc}
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right Call To Actions */}
                <div className="hidden items-center gap-4 lg:flex">
                    <Button className="bg-emerald-600 hover:cursor-pointer text-white hover:bg-emerald-700 font-bold shadow-sm shadow-emerald-600/10 hover:shadow-md hover:shadow-emerald-600/20 px-5.5 py-5 rounded-md transition-all duration-200 group/btn text-[14px]">
                        Get Services
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Button>
                </div>

                {/* Mobile Menu Trigger Drawer */}
                <div className="lg:hidden">
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger>
                            <Button variant="ghost" size="icon" className="text-slate-700 hover:bg-slate-50 rounded-xl h-10 w-10 border border-transparent hover:border-slate-100">
                                <Menu className="h-5.5 w-5.5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-sm p-0 bg-white border-l border-slate-100 flex flex-col h-full">
                            {/* Mobile Header with Official Brand Logo Block */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 shrink-0">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-emerald-400">
                                        <Landmark className="h-5 w-5" />
                                    </div>
                                    <div className="leading-tight">
                                        <span className="block text-[11px] font-extrabold tracking-tight text-slate-900 uppercase">Islamabad Chamber of</span>
                                        <span className="block text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">Commerce & Industry</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Scrollable Links Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-5 content-start">
                                {/* Navigation Links Section */}
                                <nav className="space-y-1">
                                    <p className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">Main Menu</p>
                                    {NAV_LINKS.map((group) => (
                                        <MobileNavGroup key={group.label} group={group} closeMenu={() => setMobileOpen(false)} />
                                    ))}
                                </nav>

                                <hr className="border-slate-100 mx-2" />

                                {/* Managed Utility Menu Links for Mobile */}
                                <div className="space-y-3">
                                    <p className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">Chamber Services</p>
                                    <div className="grid grid-cols-2 gap-2 px-2">
                                        <a href="https://icci.com.pk/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl border border-slate-100 p-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-all">
                                            <HelpCircle className="h-4 w-4 text-slate-400 shrink-0" /> FAQs
                                        </a>
                                        <a href="https://icci.com.pk/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl border border-slate-100 p-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-all">
                                            <Info className="h-4 w-4 text-slate-400 shrink-0" /> Contact
                                        </a>
                                        <a href="https://icci.com.pk/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl border border-slate-100 p-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-all">
                                            <Briefcase className="h-4 w-4 text-slate-400 shrink-0" /> Careers
                                        </a>
                                        <a href="https://icci.com.pk/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl border border-slate-100 p-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-all">
                                            <MessageSquare className="h-4 w-4 text-slate-400 shrink-0" /> Feedback
                                        </a>
                                    </div>

                                    {/* Direct Contact Media Nodes */}
                                    <div className="bg-slate-50 rounded-2xl p-4 mx-2 space-y-2.5 border border-slate-100">
                                        <a href="mailto:info@icci.com.pk" className="flex items-center gap-3 text-[13px] font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                                            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-xs"><Mail className="h-4 w-4 text-emerald-500" /></div>
                                            info@icci.com.pk
                                        </a>
                                        <a href="tel:+92512261175" className="flex items-center gap-3 text-[13px] font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                                            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-xs"><Phone className="h-4 w-4 text-emerald-500" /></div>
                                            +92-51-2261175
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Action Footer */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50 backdrop-blur-sm shrink-0">
                                <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700 font-bold rounded-xl py-5 text-[14px] transition-all shadow-sm shadow-emerald-600/10">
                                    Get Services
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

function MobileNavGroup({ group, closeMenu }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[14px] font-bold transition-all duration-200 ${isOpen ? "bg-slate-50 text-emerald-600" : "text-slate-800 hover:bg-slate-50/60"}`}
            >
                {group.label}
                <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-emerald-600" : ""}`}
                />
            </button>
            <div className={`grid transition-all duration-200 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] opacity-100 mt-1 mb-2" : "grid-rows-[0fr] opacity-0"}`}>
                <ul className="overflow-hidden pl-3 space-y-1 border-l-2 border-slate-100 ml-4">
                    {group.items.map((item) => (
                        <li key={item.title}>
                            <a
                                href={item.href}
                                onClick={closeMenu}
                                className="block rounded-lg px-3 py-2 text-[13px] text-slate-600 hover:bg-emerald-50/60 hover:text-emerald-700 font-semibold transition-all duration-150"
                            >
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}