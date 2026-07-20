import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased">
      {/* Premium Split-Background Hero Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-36 pb-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Modern Geometric Overlay Grid & Glows */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-20 pointer-events-none">
          <div className="absolute -top-12 left-10 w-96 h-96 bg-emerald-500 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-400 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Connect With ICCI
          </span>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-sm">
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Conversation</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed opacity-90">
            Have questions about memberships, corporate support, visa recommendations, or upcoming international expos? Our administrative desks are ready to assist you.
          </p>
        </div>
      </div>

      {/* Overlapping Content Container */}
      <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Modern Actionable Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Map Card with Integrated Hover Overlay */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-48 w-full relative">
                <iframe
                  title="ICCI Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.311347071988!2d73.0415!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf9700000001%3A0x6730a84d41e7f228!2sIslamabad%20Chamber%20of%20Commerce%20and%20Industry!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-start space-x-3.5">
                  <div className="p-3 bg-slate-50 text-emerald-600 rounded-xl border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Chamber HQ</h4>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                      Aiwan-e-Sanat-o-Tijarat Road, Mauve Area, G-8/1, Islamabad, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Communication Channels Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-emerald-600 rounded-full"></span>
                Direct Communication
              </h3>
              
              <div className="space-y-5">
                <a href="tel:+92512253145" className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/link">
                  <div className="p-2.5 bg-slate-50 text-slate-600 rounded-lg group-hover/link:bg-emerald-50 group-hover/link:text-emerald-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Call Central Operations</span>
                    <span className="text-slate-800 font-bold text-[15px] group-hover/link:text-emerald-600 transition-colors">+92-51-2253145</span>
                  </div>
                </a>

                <a href="mailto:info@icci.com.pk" className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/link">
                  <div className="p-2.5 bg-slate-50 text-slate-600 rounded-lg group-hover/link:bg-emerald-50 group-hover/link:text-emerald-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Inquiries</span>
                    <span className="text-slate-800 font-bold text-[15px] group-hover/link:text-emerald-600 transition-colors">info@icci.com.pk</span>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Right Side: High-End Polished Interactive Form Card */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-2xl shadow-md border-0 border-slate-100 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Send an Official Message</h2>
              <p className="text-slate-500 mt-1 text-[14px]">Your request will be systematically directed to the corresponding department desk.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-emerald-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition duration-200 text-slate-800 text-[15px] shadow-inner"
                    placeholder="e.g., Muhammad Irfan"
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
                <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-emerald-600">
                  Subject Matter
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition duration-200 text-slate-800 text-[15px] shadow-inner"
                  placeholder="e.g., Visa Recommendation Letter Requirements"
                />
              </div>

              <div className="relative group">
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-emerald-600">
                  Detailed Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition duration-200 text-slate-800 text-[15px] shadow-inner resize-none leading-relaxed"
                  placeholder="Please state corporate NTN, membership numbers, or query specifications explicitly..."
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto cursor-pointer px-8 py-4 group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 transform active:scale-98 min-w-[48px] min-h-[48px]"
                >
                  <span>Submit Secure Message</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;