import React, { useState } from 'react';
import { Lightbulb, Star, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';

function Feedback() {
    const [feedbackType, setFeedbackType] = useState('suggestion');
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', { type: feedbackType, ...formData });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const types = [
        { id: 'suggestion', label: 'Suggestion', icon: Lightbulb },
        { id: 'feedback', label: 'General Feedback', icon: Star },
        { id: 'comment', label: 'Comment', icon: MessageSquare },
        { id: 'question', label: 'Question', icon: HelpCircle },
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-sans antialiased">
            {/* Hero Header Section */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-36 pb-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-20 pointer-events-none">
                    <div className="absolute -top-12 left-10 w-96 h-96 bg-emerald-500 rounded-full filter blur-[100px]"></div>
                </div>

                <div className="relative max-w-3xl mx-auto z-10 space-y-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-sm">
                        Continuous Improvement
                    </span>
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white">
                        Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Insights</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed opacity-90">
                        Help us shape a better digital chamber environment. Your suggestions, complaints, and comments directly guide our structural enhancements.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto pb-24 px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400"></div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Step 1: Category Selection Buttons */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                                Select Submission Category
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {types.map((type) => {
                                    const IconComponent = type.icon;
                                    return (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setFeedbackType(type.id)}
                                            className={`p-4 rounded-xl border font-bold text-sm flex flex-col items-center justify-center gap-3 transition-all duration-200 min-h-[100px] ${feedbackType === type.id
                                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm ring-2 ring-emerald-500/10'
                                                    : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                                }`}
                                        >
                                            <IconComponent
                                                className={`w-6 h-6 stroke-[2] ${feedbackType === type.id ? 'text-emerald-600' : 'text-slate-400'
                                                    }`}
                                            />
                                            <span>{type.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Information Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative group">
                                <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-emerald-600">
                                    Your Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition duration-200 text-slate-800 text-[15px] shadow-inner"
                                    placeholder="e.g., Abbas Ahmed"
                                />
                            </div>

                            <div className="relative group">
                                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-emerald-600">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition duration-200 text-slate-800 text-[15px] shadow-inner"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label htmlFor="company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-emerald-600">
                                Company Name / Membership ID (Optional)
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition duration-200 text-slate-800 text-[15px] shadow-inner"
                                placeholder="e.g., Al-Makkah Traders / ICCI-2026"
                            />
                        </div>

                        <div className="relative group">
                            <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-emerald-600">
                                Your Content Details
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition duration-200 text-slate-800 text-[15px] shadow-inner resize-none leading-relaxed"
                                placeholder={`Provide your comprehensive ${feedbackType || 'feedback'} descriptions explicitly here...`}
                            ></textarea>
                        </div>

                        {/* Submission Button */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 transform active:scale-98 min-h-[48px]"
                            >
                                <span>Submit Evaluation</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 stroke-[2.5]" />
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Feedback;