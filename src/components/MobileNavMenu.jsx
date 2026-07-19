import React, { useState } from "react";
import { Landmark, ChevronDown, Mail, Phone, HelpCircle, Info, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "./navData";

export default function MobileNavMenu({ closeMenu }) {
return (
<div className="flex flex-col h-full bg-white">
    {/* Mobile Header */}
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-[18px] shrink-0">
        <div className="flex items-center gap-3 select-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-emerald-400">
                <Landmark className="h-5 w-5" />
            </div>
            <div className="leading-tight">
                <span className="block text-[11px] font-extrabold tracking-tight text-slate-900 uppercase">Islamabad
                    Chamber of</span>
                <span className="block text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">Commerce &
                    Industry</span>
            </div>
        </div>
    </div>

    {/* Scrollable Links */}
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <nav className="space-y-1">
            <p className="px-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Main Menu</p>
            {NAV_LINKS.map((group) => (
            <MobileNavGroup key={group.label} group={group} closeMenu={closeMenu} />
            ))}
        </nav>

        <hr className="border-slate-100 mx-2" />

        {/* Chamber Services Quick Grid */}
        <div className="space-y-3">
            <p className="px-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Chamber Services</p>
            <div className="grid grid-cols-2 gap-2 px-2">
                {[
                { label: "FAQs", icon: HelpCircle },
                { label: "Contact", icon: Info },
                { label: "Careers", icon: Briefcase },
                { label: "Feedback", icon: MessageSquare }
                ].map((srv) => (
                <a key={srv.label} href="https://icci.com.pk/" onClick={closeMenu}
                    className="flex items-center gap-2 rounded-xl border border-slate-100 p-2.5 text-[12.5px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-all">
                    <srv.icon className="h-4 w-4 text-slate-400 shrink-0" /> {srv.label}
                </a>
                ))}
            </div>

            {/* Contact Info Card */}
            <div className="bg-slate-50 rounded-xl p-3.5 mx-2 space-y-2.5 border border-slate-100/80">
                <a href="mailto:info@icci.com.pk"
                    className="flex items-center gap-3 text-[12.5px] font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200/60">
                        <Mail className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    info@icci.com.pk
                </a>
                <a href="tel:+92512261175"
                    className="flex items-center gap-3 text-[12.5px] font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200/60">
                        <Phone className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    +92-51-2261175
                </a>
            </div>
        </div>
    </div>

    {/* Sticky Mobile CTA Action */}
    <div className="p-4 border-t border-slate-100 bg-slate-50/50 backdrop-blur-sm shrink-0">
        <Button
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 font-bold rounded-xl py-5 text-[14px] transition-all shadow-sm">
            Get Services
        </Button>
    </div>
</div>
);
}

function MobileNavGroup({ group, closeMenu }) {
const [isOpen, setIsOpen] = useState(false);

return (
<div className="w-full">
    <button onClick={()=> setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-[13.5px] font-bold
        transition-all duration-200 ${isOpen ? "bg-slate-50 text-emerald-600" : "text-slate-800 hover:bg-slate-50/60"}`}
        >
        {group.label}
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen
            ? "rotate-180 text-emerald-600" : "" }`} />
    </button>
    <div className={`grid transition-all duration-200 ease-in-out overflow-hidden ${isOpen
        ? "grid-rows-[1fr] opacity-100 mt-0.5 mb-1.5" : "grid-rows-[0fr] opacity-0" }`}>
        <ul className="overflow-hidden pl-3 space-y-0.5 border-l-2 border-slate-100 ml-4">
            {group.items.map((item) => (
            <li key={item.title}>
                <a href={item.href} onClick={closeMenu}
                    className="block rounded-lg px-3 py-1.5 text-[13px] text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-700 font-semibold transition-all">
                    {item.title}
                </a>
            </li>
            ))}
        </ul>
    </div>
</div>
);
}