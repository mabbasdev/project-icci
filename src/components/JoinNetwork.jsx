import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe2 } from "lucide-react";

export default function GlobalNetworkCTA() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const hudNameRef = useRef(null);
    const hudTextRef = useRef(null);
    const hudContainerRef = useRef(null);
    const hudPlaceholderRef = useRef(null);
    
    const [isDragging, setIsDragging] = useState(false);
    const [rotationX, setRotationX] = useState(0); 

    const dragStartX = useRef(0);
    const currentRotationX = useRef(0);
    
    // Physics & Interpolation States
    const mousePos = useRef({ x: 0, y: 0, canvasX: 0, canvasY: 0, isHovered: false, targetHover: 0, currentHover: 0 });
    const tilt = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
    
    const baseSpeed = 0.0015; 
    const mapDots = useRef([]);
    const radius = 160;

    // Generate Uniform Globe Dots
    if (mapDots.current.length === 0) {
        const numPoints = 650; 
        for (let i = 0; i < numPoints; i++) {
            const y = 1 - (i / (numPoints - 1)) * 2; 
            const radiusAtY = Math.sqrt(1 - y * y); 
            const goldenRatio = (1 + Math.sqrt(5)) / 2;
            const theta = 2 * Math.PI * i / goldenRatio; 

            mapDots.current.push({
                x: Math.cos(theta) * radiusAtY * radius,
                y: y * radius,
                z: Math.sin(theta) * radiusAtY * radius
            });
        }
    }

    // Array of 3 different space objects with varying orbit paths, speeds, designs, and telemetry data
    const satellites = useRef([
        {
            id: "spacex",
            name: "SpaceX | Crew Dragon",
            msg: "SpaceX: Approaching ISS docking interface. Velocity nominal.",
            type: "ship",
            angle: 0,
            speed: 0.014,
            orbitRadius: radius + 25,
            orbitHeightFactor: 0.2, 
            orbitDepthFactor: 0.9,
            tiltOffset: 0.2,
            isHovered: false
        },
        {
            id: "nasa",
            name: "NASA | ISS Module",
            msg: "NASA: Establishing orbital telemetry uplink with local ground station.",
            type: "station",
            angle: 2.1, 
            speed: 0.008,
            orbitRadius: radius + 55,
            orbitHeightFactor: 0.5, 
            orbitDepthFactor: 0.75,
            tiltOffset: -0.4,
            isHovered: false
        },
        {
            id: "starlink",
            name: "Starlink | Cluster Node",
            msg: "Starlink: Active array laser routing initiated. Downlink stable.",
            type: "sat",
            angle: 4.3,
            speed: 0.018,
            orbitRadius: radius + 38,
            orbitHeightFactor: -0.35, 
            orbitDepthFactor: 0.8,
            tiltOffset: 0.6,
            isHovered: false
        }
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        canvas.width = 460;
        canvas.height = 460;

        // Renderer for the distinct spacecraft vector profiles
        const drawSatelliteObject = (sat, x, y, scale, alpha) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(sat.angle + Math.PI / 4);
            
            const size = 6 * scale;
            
            if (sat.type === "ship") {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(0, -size);
                ctx.lineTo(size * 0.6, size);
                ctx.lineTo(-size * 0.6, size);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.strokeStyle = `rgba(167, 243, 208, ${alpha * 0.7})`;
                ctx.beginPath();
                ctx.moveTo(0, size);
                ctx.lineTo(0, size * 1.5);
                ctx.stroke();
            } 
            else if (sat.type === "station") {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
                ctx.lineWidth = 1;
                
                ctx.fillRect(-size / 3, -size, (size * 2) / 3, size * 2);
                ctx.strokeRect(-size / 3, -size, (size * 2) / 3, size * 2);
                
                ctx.beginPath();
                ctx.moveTo(-size * 1.8, 0);
                ctx.lineTo(size * 1.8, 0);
                ctx.stroke();

                ctx.fillStyle = `rgba(52, 211, 153, ${alpha * 0.35})`;
                ctx.fillRect(-size * 1.8, -size * 0.6, size * 0.6, size * 1.2);
                ctx.fillRect(-size * 1.1, -size * 0.6, size * 0.6, size * 1.2);
                ctx.fillRect(size * 0.5, -size * 0.6, size * 0.6, size * 1.2);
                ctx.fillRect(size * 1.2, -size * 0.6, size * 0.6, size * 1.2);
            } 
            else {
                ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-size * 1.2, -size / 4);
                ctx.lineTo(size * 1.2, -size / 4);
                ctx.stroke();
                
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fillRect(-size * 0.3, -size * 0.6, size * 0.6, size * 0.6);
            }

            ctx.restore();
        };

        const updateHUDText = (sat) => {
            if (sat) {
                if (hudNameRef.current) hudNameRef.current.textContent = sat.name;
                if (hudTextRef.current) hudTextRef.current.textContent = sat.msg;
                if (hudContainerRef.current) hudContainerRef.current.style.display = "block";
                if (hudPlaceholderRef.current) hudPlaceholderRef.current.style.display = "none";
            } else {
                if (hudContainerRef.current) hudContainerRef.current.style.display = "none";
                if (hudPlaceholderRef.current) hudPlaceholderRef.current.style.display = "block";
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            const m = mousePos.current;
            m.targetHover = m.isHovered ? 1 : 0;
            m.currentHover += (m.targetHover - m.currentHover) * 0.1;

            const t = tilt.current;
            t.currentX += (t.targetX - t.currentX) * 0.08;
            t.currentY += (t.targetY - t.currentY) * 0.08;

            const glowRadius = radius * (1.2 + m.currentHover * 0.3);
            const glowX = cx + (t.currentX * radius * 0.4 * m.currentHover);
            const glowY = cy - (t.currentY * radius * 0.4 * m.currentHover);
            
            const bgGlow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
            bgGlow.addColorStop(0, `rgba(52, 211, 153, ${0.12 + m.currentHover * 0.08})`);
            bgGlow.addColorStop(0.5, `rgba(52, 211, 153, ${0.04 + m.currentHover * 0.03})`);
            bgGlow.addColorStop(1, "rgba(52, 211, 153, 0)");
            
            ctx.fillStyle = bgGlow;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const speedMultiplier = 1 + m.currentHover * 2;
            if (!isDragging) {
                currentRotationX.current += baseSpeed * speedMultiplier;
            } else {
                currentRotationX.current = rotationX;
            }

            const cosX = Math.cos(currentRotationX.current);
            const sinX = Math.sin(currentRotationX.current);

            const projectedPoints = mapDots.current.map(p => {
                let x1 = p.x * cosX - p.z * sinX;
                let y1 = p.y;
                let z1 = p.x * sinX + p.z * cosX;

                if (m.currentHover > 0) {
                    const cosTiltY = Math.cos(t.currentY * m.currentHover);
                    const sinTiltY = Math.sin(t.currentY * m.currentHover);
                    const cosTiltX = Math.cos(t.currentX * m.currentHover);
                    const sinTiltX = Math.sin(t.currentX * m.currentHover);

                    const y2 = y1 * cosTiltY - z1 * sinTiltY;
                    const z2 = y1 * sinTiltY + z1 * cosTiltY;
                    const x3 = x1 * cosTiltX - z2 * sinTiltX;
                    const z3 = x1 * sinTiltX + z2 * cosTiltX;

                    x1 = x3; y1 = y2; z1 = z3;
                }

                const fov = 400;
                const scale = fov / (fov + z1);
                return {
                    x: x1 * scale + cx,
                    y: y1 * scale + cy,
                    z: z1,
                    scale,
                    alpha: Math.max(0.06, 1 - (z1 + radius) / (radius * 2))
                };
            });

            let hoverSatThisFrame = null;

            const projectedSats = satellites.current.map(sat => {
                sat.angle = (sat.angle + sat.speed * (isDragging ? 0.2 : speedMultiplier)) % (2 * Math.PI);
                
                let sx = Math.cos(sat.angle) * sat.orbitRadius;
                let sy = Math.sin(sat.angle) * sat.orbitRadius * sat.orbitHeightFactor;
                let sz = Math.sin(sat.angle) * sat.orbitRadius * sat.orbitDepthFactor;

                if (m.currentHover > 0) {
                    const cosTiltY = Math.cos((t.currentY + sat.tiltOffset) * m.currentHover);
                    const sinTiltY = Math.sin((t.currentY + sat.tiltOffset) * m.currentHover);
                    const cosTiltX = Math.cos(t.currentX * m.currentHover);
                    const sinTiltX = Math.sin(t.currentX * m.currentHover);

                    const sy2 = sy * cosTiltY - sz * sinTiltY;
                    const sz2 = sy * sinTiltY + sz * cosTiltY;
                    const sx3 = sx * cosTiltX - sz2 * sinTiltX;
                    const sz3 = sx * sinTiltX + sz2 * cosTiltX;

                    sx = sx3; sy = sy2; sz = sz3;
                }

                const sFov = 400;
                const sScale = sFov / (sFov + sz);
                const projX = sx * sScale + cx;
                const projY = sy * sScale + cy;
                
                const hitDistance = Math.hypot(m.canvasX - projX, m.canvasY - projY);
                const isHoveredNow = hitDistance < 18; 
                sat.isHovered = isHoveredNow;

                if (isHoveredNow) {
                    hoverSatThisFrame = sat;
                }

                return {
                    sat,
                    projX,
                    projY,
                    sz,
                    sScale,
                    alpha: Math.max(0.2, 1 - (sz + sat.orbitRadius) / (sat.orbitRadius * 2))
                };
            });

            // Perform instant high-frequency DOM injection without triggering React component update trees
            updateHUDText(hoverSatThisFrame);

            projectedSats.forEach(({ sat, projX, projY, sz, sScale, alpha }) => {
                ctx.lineWidth = sat.isHovered ? 1.2 : 0.6;
                ctx.setLineDash([3, 6]);
                ctx.strokeStyle = sat.isHovered 
                    ? `rgba(110, 231, 183, 0.4)`
                    : `rgba(52, 211, 153, ${0.04 + m.currentHover * 0.08})`;
                
                ctx.beginPath();
                ctx.ellipse(cx, cy, sat.orbitRadius, sat.orbitRadius * Math.abs(sat.orbitHeightFactor), t.currentY * 0.3 * m.currentHover, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.setLineDash([]);

                if (sz >= 0) { 
                    drawSatelliteObject(sat, projX, projY, sScale, alpha * 0.4);
                }
            });

            projectedPoints.forEach(p => {
                if (p.z >= 0) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.12})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 0.8, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });

            if (m.currentHover > 0.05) {
                ctx.lineWidth = 0.5;
                const maxDist = 38;
                for (let i = 0; i < projectedPoints.length; i++) {
                    const p1 = projectedPoints[i];
                    if (p1.z >= 0 || p1.z > -40) continue;

                    for (let j = i + 1; j < projectedPoints.length; j++) {
                        const p2 = projectedPoints[j];
                        if (p2.z >= 0) continue;

                        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                        if (dist < maxDist) {
                            ctx.strokeStyle = `rgba(52, 211, 153, ${(1 - dist / maxDist) * 0.15 * m.currentHover})`;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            projectedPoints.forEach(p => {
                if (p.z < 0) {
                    const sizeMultiplier = 1 + m.currentHover * 0.6;
                    const dotRadius = Math.max(1, p.scale * 1.3 * sizeMultiplier);

                    if (m.currentHover > 0.1 && p.z < -80) {
                        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, dotRadius * 3);
                        gradient.addColorStop(0, `rgba(167, 243, 208, ${p.alpha * 0.9 * m.currentHover})`);
                        gradient.addColorStop(0.3, `rgba(52, 211, 153, ${p.alpha * 0.4 * m.currentHover})`);
                        gradient.addColorStop(1, "rgba(52, 211, 153, 0)");
                        ctx.fillStyle = gradient;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, dotRadius * 3, 0, 2 * Math.PI);
                        ctx.fill();
                    }

                    ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha * (0.45 + m.currentHover * 0.45)})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, dotRadius, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });

            projectedSats.forEach(({ sat, projX, projY, sz, sScale, alpha }) => {
                if (sz < 0) {
                    if (sat.isHovered) {
                        ctx.strokeStyle = "rgba(110, 231, 183, 0.85)";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.arc(projX, projY, 14 * sScale, 0, 2 * Math.PI);
                        ctx.stroke();

                        const thrusterGlow = ctx.createRadialGradient(projX, projY, 0, projX, projY, 20 * sScale);
                        thrusterGlow.addColorStop(0, `rgba(110, 231, 183, 0.5)`);
                        thrusterGlow.addColorStop(1, "rgba(52, 211, 153, 0)");
                        ctx.fillStyle = thrusterGlow;
                        ctx.beginPath();
                        ctx.arc(projX, projY, 20 * sScale, 0, 2 * Math.PI);
                        ctx.fill();
                    }

                    drawSatelliteObject(sat, projX, projY, sScale, alpha);
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isDragging, rotationX]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragStartX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            
            mousePos.current.canvasX = x;
            mousePos.current.canvasY = y;
            
            const distFromCenter = Math.hypot(x - midX, y - midY);
            mousePos.current.isHovered = distFromCenter < radius + 90;

            if (mousePos.current.isHovered) {
                tilt.current.targetX = ((x - midX) / midX) * 0.35; 
                tilt.current.targetY = -((y - midY) / midY) * 0.35;
            }
        }

        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX.current;
        setRotationX(currentRotationX.current + deltaX * 0.005);
        dragStartX.current = e.clientX;
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        mousePos.current.isHovered = false;
        mousePos.current.canvasX = -999;
        mousePos.current.canvasY = -999;
        tilt.current.targetX = 0;
        tilt.current.targetY = 0;
    };

    return (
        <section className="w-full bg-[#f4f7f5] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative">
                
                <div className="w-full bg-gradient-to-br from-[#164e41] to-[#0c3129] rounded-[2.5rem] p-8 md:p-16 shadow-[0_30px_70px_rgba(12,49,41,0.18)] border border-emerald-800/20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-6">
                    
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

                    {/* Left text content panel */}
                    <div className="w-full lg:w-3/5 text-white space-y-8 relative z-20 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/30 px-3 py-1.5 rounded-full backdrop-blur-xs">
                            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[10px] font-extrabold tracking-widest text-emerald-300 uppercase">
                                Global Gateway
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-[46px] font-bold tracking-tight leading-[1.1] text-white">
                                Join ICCI’s Global <br />
                                <span className="bg-gradient-to-r from-emerald-200 via-emerald-100 to-white bg-clip-text text-transparent italic font-serif font-normal">
                                    Business Network
                                </span>
                            </h2>
                            <p className="text-emerald-100/70 text-sm md:text-[15px] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                We expand your corporate footprint, unlock access to modern international markets, and accelerate scale. Connect with global trade leaders today.
                            </p>
                        </div>

                        {/* Decoupled Native DOM HUD Display Box */}
                        <div className="h-14 flex items-center justify-center lg:justify-start">
                            <div ref={hudContainerRef} style={{ display: "none" }} className="text-left bg-emerald-950/60 border border-emerald-400/30 px-4 py-2 rounded-xl backdrop-blur-md max-w-md shadow-lg">
                                <p ref={hudNameRef} className="text-[10px] font-bold uppercase tracking-wider text-emerald-400"></p>
                                <p ref={hudTextRef} className="text-xs text-emerald-100 font-mono mt-0.5 line-clamp-1"></p>
                            </div>
                            <p ref={hudPlaceholderRef} className="text-xs text-emerald-300/50 font-mono italic">
                                * Hover individual orbiting space crafts to capture telemetry links
                            </p>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                            <a 
                                href="tel:+92512261175" 
                                className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-[#8b6e4b] to-[#a28560] hover:from-[#7c6141] hover:to-[#917653] text-white px-7 py-4 rounded-lg transition-all duration-300 shadow-md group border border-[#a28560]/20 text-sm font-semibold tracking-wide"
                            >
                                Call Now: +92-51-2261175
                            </a>
                            <a 
                                href="#" 
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300 hover:text-white transition-colors py-3 group"
                            >
                                Learn About Alliances
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-emerald-400" />
                            </a>
                        </div>
                    </div>

                    {/* Right interactive canvas view panel */}
                    <div className="w-full lg:w-2/5 flex justify-center relative z-10 lg:h-[350px]">
                        <div 
                            ref={containerRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={() => setIsDragging(false)}
                            onMouseLeave={handleMouseLeave}
                            className="w-[420px] h-[420px] lg:absolute lg:-top-12 lg:-right-8 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                        >
                            <canvas 
                                ref={canvasRef} 
                                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(52,211,153,0.18)]"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}