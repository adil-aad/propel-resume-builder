import React from "react"

const Footer = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
                * {
                    font-family: 'Space Grotesk', sans-serif;
                }
            `}</style>

            <footer className="border-t border-slate-900/10 bg-[#ece6dc] px-6 py-16 text-[13px] text-slate-500 md:px-12 lg:px-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:justify-between">
                    <div className="flex flex-col gap-5">
                        <a href="/" className="flex items-center gap-3">
                            <div className="h-8 w-8 rotate-12 rounded-lg bg-slate-950"></div>
                            <span className="text-xl font-bold text-slate-950">ResumeForge</span>
                        </a>
                        <p className="max-w-sm text-sm leading-6 text-slate-600">
                            A cleaner way to write, preview, and manage professional resumes without losing track of your drafts.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-3">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Product</p>
                            <ul className="mt-3 space-y-2">
                                <li><a href="/" className="transition hover:text-slate-950">Home</a></li>
                                <li><a href="#features" className="transition hover:text-slate-950">Features</a></li>
                                <li><a href="#cta" className="transition hover:text-slate-950">Get Started</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Resources</p>
                            <ul className="mt-3 space-y-2">
                                <li><a href="/" className="transition hover:text-slate-950">Support</a></li>
                                <li><a href="/" className="transition hover:text-slate-950">Community</a></li>
                                <li><a href="/" className="transition hover:text-slate-950">About</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Legal</p>
                            <ul className="mt-3 space-y-2">
                                <li><a href="/" className="transition hover:text-slate-950">Privacy</a></li>
                                <li><a href="/" className="transition hover:text-slate-950">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-900/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>Built for job seekers who want clarity, speed, and a stronger first impression.</p>
                    <p>Copyright 2026 ResumeForge</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
