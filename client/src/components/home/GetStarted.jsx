import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const GetStarted = () => {
    return (
        <section id='cta' className='w-full bg-[#f3efe7] px-6 pb-20 md:px-12 lg:px-20'>
            <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-slate-900/10 bg-slate-950 px-6 py-10 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.75)] sm:px-8 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
                            Get Started
                        </p>
                        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                            Create a sharper resume in minutes and keep every version in one place.
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                            Whether you are rebuilding from scratch or modernizing an older file, ResumeForge gives you a cleaner system to move faster.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                        <Link to="/app" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f97316] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#ea580c]">
                            Start Free
                            <ArrowRight className="size-4" />
                        </Link>
                        <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10">
                            View Features
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GetStarted
