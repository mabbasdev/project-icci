import React from "react";
import { Mail, Phone } from "lucide-react";

export default function DesktopUtilityBar() {
    return (
        <div className="hidden border-b border-slate-100 bg-slate-950 text-slate-300 md:block">
            <div
                className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 py-2.5 text-xs font-medium tracking-wide">
                <div className="flex items-center gap-6">
                    <a href="mailto:info@icci.com.pk"
                        className="flex items-center gap-2 transition-colors hover:underline hover:text-emerald-400 duration-200">
                        <Mail className="h-3.5 w-3.5 text-emerald-500" /> Send Mail: info@icci.com.pk
                    </a>
                    <a href="tel:+92512261175"
                        className="flex items-center gap-2 transition-colors hover:underline hover:text-emerald-400 duration-200">
                        <Phone className="h-3.5 w-3.5 text-emerald-500" /> Call Now: +92-51-2261175
                    </a>
                </div>
                <div className="flex items-center gap-5">
                    {["FAQs", "Contact", "Careers", "Feedback"].map((item) => (
                        <a key={item} href="https://icci.com.pk/"
                            className="transition-colors hover:text-emerald-400 hover:underline duration-200">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}