import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
                {/* Navbar */}
                <nav className="relative z-50 flex items-center justify-between w-full py-5 px-6 md:px-12 lg:px-20 backdrop-blur-sm bg-white/5 border-b border-white/10">
                    <a href="https://prebuiltui.com" className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg rotate-45"></div>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ResumeForge</span>
                    </a>

                    <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
                        <a href="#" className="hover:text-white transition-colors duration-200">Home</a>
                        <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
                        <a href="#testimonials" className="hover:text-white transition-colors duration-200">Testimonials</a>
                        <a href="#cta" className="hover:text-white transition-colors duration-200">Contact</a>
                    </div>

                    <div className="flex gap-3">
                        <Link to='/app?state=logins' className="hidden md:block px-5 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-all duration-200 text-sm font-medium">
                            Login
                        </Link>
                        <Link to='/app?state=register' className="hidden md:block px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 text-sm font-medium">
                            Get Started
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-lg bg-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-xl font-medium md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <a href="/" className="text-white hover:text-cyan-400">Home</a>
                    <a href="#features" className="text-white hover:text-cyan-400">Features</a>
                    <a href="#testimonials" className="text-white hover:text-cyan-400">Testimonials</a>
                    <a href="#contact" className="text-white hover:text-cyan-400">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        ✕
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-20 py-16 md:py-24 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500 rounded-full blur-[100px] opacity-20 animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-3xl"></div>

                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-200">AI-Powered Resume Builder</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl animate-fade-in-up animation-delay-100">
                        Create Resumes That
                        <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mt-2">
                            Stand Out Instantly
                        </span>
                    </h1>

                    <p className="max-w-xl text-gray-300 text-lg md:text-xl mt-6 animate-fade-in-up animation-delay-200">
                        Leverage cutting-edge AI to craft professional, ATS-friendly resumes in minutes. No design skills needed.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 animate-fade-in-up animation-delay-300">
                        <Link to='/app' className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105">
                            <span className="relative z-10">Start Building Free</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <button className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                            </svg>
                            Watch Demo
                        </button>
                    </div>

                    {/* Mockup / Preview Card */}
                    <div className="mt-20 md:mt-28 w-full max-w-5xl mx-auto animate-fade-in-up animation-delay-400">
                        <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-2 shadow-2xl">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                            <div className="relative bg-slate-800/50 rounded-xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-4 text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">preview.resumeforge.app</div>
                                </div>
                                <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8">
                                    <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
                                        <div className="space-y-3">
                                            <div className="h-8 w-3/4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg"></div>
                                            <div className="h-2 w-full bg-slate-700 rounded"></div>
                                            <div className="h-2 w-11/12 bg-slate-700 rounded"></div>
                                            <div className="h-2 w-4/5 bg-slate-700 rounded"></div>
                                            <div className="h-2 w-full bg-slate-700 rounded"></div>
                                            <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-8 w-2/3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg"></div>
                                            <div className="h-2 w-full bg-slate-700 rounded"></div>
                                            <div className="h-2 w-10/12 bg-slate-700 rounded"></div>
                                            <div className="h-2 w-full bg-slate-700 rounded"></div>
                                            <div className="h-2 w-4/5 bg-slate-700 rounded"></div>
                                            <div className="h-2 w-11/12 bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                        <span className="text-xs text-gray-400">Scroll to explore</span>
                        <div className="w-5 h-9 rounded-full border-2 border-gray-400 flex justify-center">
                            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inline styles for animations */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
                * {
                    font-family: 'Inter', sans-serif;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                .animation-delay-100 {
                    animation-delay: 0.1s;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-300 {
                    animation-delay: 0.3s;
                }
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </>
    );
}

export default Hero;