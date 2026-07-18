import React from "react";

export default function GridSkeleton() {
    return (
        <section className="w-full bg-white py-20 px-4 md:px-8">
            <div className="mx-auto max-w-7xl space-y-16 animate-pulse">
                {/* Header Placeholder */}
                <div className="space-y-4 flex flex-col items-center">
                    <div className="h-8 bg-slate-200 rounded-md w-2/3 md:w-1/3" />
                    <div className="h-1 w-16 bg-slate-200 rounded-full" />
                </div>

                {/* Grid Layout Placeholders */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <div key={idx} className="flex flex-col bg-[#f4f9f7]/60 rounded-[24px] overflow-hidden border border-emerald-100/20">
                            <div className="h-[210px] w-full bg-slate-200" />
                            <div className="p-6 md:p-8 flex flex-col flex-1 space-y-4">
                                <div className="flex gap-3.5 items-start">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />
                                    <div className="flex-1 space-y-2 pt-1">
                                        <div className="h-4 bg-slate-200 rounded-md w-5/6" />
                                        <div className="h-4 bg-slate-200 rounded-md w-1/2" />
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 flex-1">
                                    <div className="h-3 bg-slate-200 rounded-md w-full" />
                                    <div className="h-3 bg-slate-200 rounded-md w-full" />
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="h-[1px] bg-slate-200 flex-1" />
                                    <div className="h-4 bg-slate-200 rounded-md w-20" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}