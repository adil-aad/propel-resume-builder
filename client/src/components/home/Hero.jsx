import React from 'react'
import { ArrowRight, Menu, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
    const [menuOpen, setMenuOpen] = React.useState(false)

    return (
        <>
            <section className="relative overflow-x-hidden bg-[#f3efe7] text-slate-900">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[-8%] top-16 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl" />
                    <div className="absolute right-[-8%] top-24 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
                    <div className="absolute bottom-10 left-1/3 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
                </div>

                <nav className="relative z-50 border-b border-slate-900/10 bg-white/55 backdrop-blur-md">
                    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-12 lg:px-20">
                        <a href="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
                            <div className="h-8 w-8 rounded-lg bg-slate-950 rotate-12"></div>
                            <span className="text-slate-950">ResumeForge</span>
                        </a>

                        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
                            <a href="#features" className="transition hover:text-slate-950">Features</a>
                            <a href="#workflow" className="transition hover:text-slate-950">Workflow</a>
                            <a href="#cta" className="transition hover:text-slate-950">Get Started</a>
                        </div>

                        <div className="hidden gap-3 md:flex">
                            <Link to='/app?state=logins' className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:bg-white">
                                Login
                            </Link>
                            <Link to='/app?state=register' className="rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                                Get Started
                            </Link>
                        </div>

                        <button onClick={() => setMenuOpen(true)} className="rounded-xl border border-slate-300 bg-white/80 p-2 md:hidden">
                            <Menu className="size-5" />
                        </button>
                    </div>
                </nav>

                <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-slate-950/95 px-6 text-xl font-medium text-white backdrop-blur-xl transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <a href="#features" className="hover:text-orange-300">Features</a>
                    <a href="#workflow" className="hover:text-orange-300">Workflow</a>
                    <a href="#cta" className="hover:text-orange-300">Get Started</a>
                    <Link to='/app?state=register' className="rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-950">
                        Create Account
                    </Link>
                    <button onClick={() => setMenuOpen(false)} className="absolute right-6 top-6 rounded-full border border-white/20 p-2">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20 lg:py-24">
                    <div className="mx-auto flex max-w-4xl flex-col items-start justify-center">
                        <div className="animate-fade-in-up inline-flex w-fit items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm">
                            <Sparkles className="size-4 text-orange-500" />
                            Modern resume building for focused job seekers
                        </div>

                        <h1 className="animate-fade-in-up animation-delay-100 mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
                            Build resumes that feel
                            <span className="block text-slate-500">as polished as the work behind them.</span>
                        </h1>

                        <p className="animate-fade-in-up animation-delay-200 mt-6 max-w-xl text-lg leading-8 text-slate-600">
                            Create a clean, ATS-friendly resume, import an existing draft, and keep every version organized inside one calm, high-clarity workspace.
                        </p>

                        <div className="animate-fade-in-up animation-delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link to='/app' className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-3.5 text-lg font-semibold text-white transition hover:bg-slate-800">
                                Start Building Free
                                <ArrowRight className="size-5" />
                            </Link>
                            <a href="#features" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-8 py-3.5 text-lg font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-white">
                                Explore Features
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
                * {
                    font-family: 'Space Grotesk', sans-serif;
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
            `}</style>
        </>
    )
}

export default Hero
