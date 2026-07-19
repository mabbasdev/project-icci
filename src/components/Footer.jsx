import React, { useState, useRef, useEffect } from "react";

export default function Footer() {
    const footerRef = useRef(null);
    const canvasRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationFrameId;
        let points = [];
        const numPoints = 45;
        const maxDistance = 160; 
        const mouseRadius = 180; 

        const mouse = { x: null, y: null };

        const resizeCanvas = () => {
            if (!footerRef.current) return;
            const rect = footerRef.current.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        const initPoints = () => {
            resizeCanvas();
            points = [];
            for (let i = 0; i < numPoints; i++) {
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 1.2, 
                    vy: (Math.random() - 0.5) * 1.2,
                });
            }
        };

        const handleMouseMoveGlobal = (e) => {
            if (!footerRef.current) return;
            const rect = footerRef.current.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeaveGlobal = () => {
            mouse.x = null;
            mouse.y = null;
        };

        initPoints();
        window.addEventListener("resize", resizeCanvas);

        const footerElem = footerRef.current;
        if (footerElem) {
            footerElem.addEventListener("mousemove", handleMouseMoveGlobal);
            footerElem.addEventListener("mouseleave", handleMouseLeaveGlobal);
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            points.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouseRadius) {
                        const force = (mouseRadius - dist) / mouseRadius;
                        const pushX = (dx / dist) * force * 4.5;
                        const pushY = (dy / dist) * force * 4.5;
                        p.x += pushX;
                        p.y += pushY;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); 
                ctx.fillStyle = "rgba(52, 211, 153, 0.5)"; 
                ctx.fill();
            });

            ctx.lineWidth = 1.0;
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const p1 = points[i];
                    const p2 = points[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.35;
                        ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
            if (footerElem) {
                footerElem.removeEventListener("mousemove", handleMouseMoveGlobal);
                footerElem.removeEventListener("mouseleave", handleMouseLeaveGlobal);
            }
        };
    }, []);

    const handleMouseMove = (e) => {
        if (!footerRef.current) return;
        const rect = footerRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const socialLinks = [
        { name: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
        { name: "Facebook", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
        { name: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
        { name: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
    ];

    return (
        <footer
            ref={footerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full bg-[#071915] text-[#d1e2de] relative overflow-hidden font-sans border-t border-[#123029] transition-all duration-300"
        >
            <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-emerald-500/[0.02] rounded-full blur-[150px] pointer-events-none z-0" />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0 block opacity-95"
            />

            <div
                className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                style={{
                    background: isHovered
                        ? `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, rgba(251, 191, 36, 0.04), transparent 80%)`
                        : "none"
                }}
            />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-10 relative z-20">
                {/* Upper Deck */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#14362f]/60 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 cursor-pointer rounded-2xl bg-gradient-to-br from-emerald-600 to-[#0a231e] border border-emerald-500/30 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.3)] shrink-0">
                                <img
                                    src="/icci-logo.svg"
                                    alt="ICCI Logo"
                                    className="h-full w-full object-contain rounded-xl"
                                />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                                    Islamabad Chamber of <br />
                                    <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                                        Commerce & Industry
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <p className="text-[#a3bfb9] leading-relaxed text-[15px] max-w-2xl">
                            As a cornerstone of regional enterprise development, ICCI facilitates robust global business networks, delivers strategic industry representation, and empowers local market operations.
                        </p>
                    </div>

                    <div className="lg:col-span-5 w-full bg-[#0b2420]/30 backdrop-blur-sm border border-[#143c34] rounded-2xl p-6 lg:ml-auto max-w-md relative z-30">
                        <div className="space-y-4">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                                    DIGITAL INTEGRATION HUB
                                </span>
                                <h3 className="text-white font-bold text-[17px]">Access Chamber Resources On-The-Go</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <a href="https://play.google.com/store/apps/details?id=com.orbitconsulting.icci" className="bg-[#061714] hover:bg-emerald-500 hover:text-[#061714] border border-[#18453c] px-4 py-3 rounded-xl flex flex-col justify-center transition-all duration-200 shadow-sm group">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 group-hover:text-white transition-all duration-200">GET IT ON</span>
                                    <span className="text-[14px] font-extrabold text-white tracking-wide mt-0.5">Google Play</span>
                                </a>
                                <a href="https://apps.apple.com/app/icci-members-app/id6745682247" className="bg-[#061714] hover:bg-emerald-500 hover:text-[#061714] border border-[#18453c] px-4 py-3 rounded-xl flex flex-col justify-center transition-all duration-200 shadow-sm group">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 group-hover:text-white transition-all duration-200">DOWNLOAD ON THE</span>
                                    <span className="text-[14px] font-extrabold text-white tracking-wide mt-0.5">App Store</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Central Link Deck */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16 text-[15px]">
                    {/* Column 1 */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-emerald-500 pl-3 flex items-center h-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3.5 text-[#a3bfb9]">
                            {["Home", "Profile", "Services", "Career", "Office Bearers", "How to Join ICCI", "Contact Us"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-200">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-emerald-500 pl-3 flex items-center h-5">
                            Services
                        </h4>
                        <ul className="space-y-3.5 text-[#a3bfb9]">
                            {["Benefits of Joining ICCI", "Visa Recommendation Letter", "Certificate of Origin", "Member Discounts", "ICCI Facilitation Desks", "Executive Committee Decisions", "Business Dispute Resolution"].map((service) => (
                                <li key={service}>
                                    <a href="#" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-200">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-emerald-500 pl-3 flex items-center h-5">
                            Resources
                        </h4>
                        <ul className="space-y-3.5 text-[#a3bfb9]">
                            {["Trade Exhibitions Calendar", "Research Publications", "Chamber News E-Paper", "SME Development Guides", "Taxation Support Desk", "Corporate Gallery", "Downloadable Forms"].map((resource) => (
                                <li key={resource}>
                                    <a href="#" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-200">
                                        {resource}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-emerald-500 pl-3 flex items-center h-5">
                            Get In Touch
                        </h4>
                        <div className="space-y-3.5 text-[#a3bfb9]">
                            <div className="flex flex-col bg-[#0b2420]/30 hover:border-emerald-600 transition-all duration-100 border border-[#143c34]/40 p-3.5 rounded-xl min-h-[82px] justify-center">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-0.5">Headquarters</span>
                                <span className="text-white text-[13.5px] leading-tight">Chamber House, Aiwan-e-Sanat-o-Tijarat Road, G-8/1, Islamabad</span>
                            </div>
                            <div className="flex flex-col bg-[#0b2420]/30 hover:border-emerald-600 transition-all duration-100 border border-[#143c34]/40 p-3.5 rounded-xl min-h-[82px] justify-center">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-0.5">Inquiries Desk</span>
                                <span className="text-white text-[14px] font-medium tracking-wide">Tel: +92-51-2261175</span>
                                <span className="text-white text-[14px] font-medium tracking-wide">Fax: +92-51-2252950</span>
                            </div>
                            <div className="flex flex-col bg-[#0b2420]/30 hover:border-emerald-600 transition-all duration-100 border border-[#143c34]/40 p-3.5 rounded-xl min-h-[64px] justify-center">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-0.5">Digital Mail</span>
                                <a href="mailto:info@icci.com.pk" className="text-white transition-all hover:text-emerald-400 hover:underline font-medium text-[14px] break-all">
                                    info@icci.com.pk
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Deck */}
                <div className="mt-4 pt-8 border-t border-[#14362f]/60 flex flex-col md:flex-row justify-between items-center gap-6 relative z-30">
                    <div className="flex items-center gap-2.5 order-last md:order-first">
                        {socialLinks.map((social, idx) => (
                            <a
                                key={idx}
                                href="#"
                                aria-label={`Follow ICCI on ${social.name}`}
                                className="w-9 h-9 rounded-lg bg-[#0b2420] text-[#a3bfb9] hover:text-[#071915] border border-[#143c34] flex items-center justify-center hover:bg-emerald-400 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d={social.path} />
                                </svg>
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-[#a3bfb9]/60 w-full md:w-auto md:justify-end">
                        <div className="flex gap-5 font-medium text-[13px]">
                            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
                        </div>

                        <p className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-[#14362f] pt-4 sm:pt-0 sm:pl-6 text-[13px]">
                            © 2026 <span className="text-white font-semibold">ICCI</span>. Crafted by <a href="#" className="hover:text-white font-semibold text-emerald-400 transition-colors">Muhammad Abbas</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}