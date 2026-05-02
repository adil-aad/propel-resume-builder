import React from "react"
import { FileText, LayoutTemplate, Sparkles, UploadCloud, WandSparkles, Zap } from 'lucide-react'
import Title from "./Title"

const Features = () => {
    const features = [
        {
            icon: FileText,
            title: 'Focused resume writing',
            description: 'Capture summaries, experience, education, and skills in a builder that keeps every section easy to scan and refine.',
            accent: 'bg-[#fff4ea] text-[#f97316]',
        },
        {
            icon: UploadCloud,
            title: 'Import existing PDFs',
            description: 'Pull a current resume into your workflow so you can continue from what you already have instead of starting over.',
            accent: 'bg-[#e8faf4] text-[#0f766e]',
        },
        {
            icon: LayoutTemplate,
            title: 'Template-driven previews',
            description: 'Switch between polished layouts and watch the resume update live while you edit your content.',
            accent: 'bg-[#eef6ff] text-[#2563eb]',
        },
        {
            icon: WandSparkles,
            title: 'Cleaner presentation',
            description: 'Pair strong typography, balanced spacing, and modern accents with ATS-friendly structure that still feels personal.',
            accent: 'bg-[#f7efff] text-[#7c3aed]',
        },
    ]

    return (
        <section id="features" className="bg-[#f3efe7] px-6 py-20 md:px-12 lg:px-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm">
                    <Zap width={14} className="text-orange-500"/>
                    Built for a smoother resume workflow
                </div>

                <Title
                    title='Everything stays clear from draft to final preview'
                    description='ResumeForge combines guided editing, quick imports, and live template previews so you can focus on better content instead of fighting the interface.'
                    align='left'
                />

                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[32px] border border-slate-900/10 bg-slate-950 p-6 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.7)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.26em] text-white/45">Workflow</p>
                                <h3 className="mt-2 text-3xl font-semibold">A builder that feels organized from the first click.</h3>
                            </div>
                            <div className="hidden h-16 w-16 rounded-2xl bg-white/10 lg:block" />
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {features.map((feature, index) => {
                                const Icon = feature.icon
                                return (
                                    <div key={index} className="rounded-[26px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10">
                                        <div className={`inline-flex size-12 items-center justify-center rounded-2xl ${feature.accent}`}>
                                            <Icon className="size-5" />
                                        </div>
                                        <h4 className="mt-4 text-lg font-semibold text-white">{feature.title}</h4>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div id="workflow" className="rounded-[32px] border border-slate-900/10 bg-white/75 p-6 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                                <Sparkles className="size-5" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">How it flows</p>
                                <h3 className="text-2xl font-semibold text-slate-900">A calm path from idea to application-ready resume.</h3>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            {[
                                ['01', 'Start a fresh draft or upload a PDF you already trust.'],
                                ['02', 'Edit your personal details and resume sections with live feedback.'],
                                ['03', 'Review the preview, refine the layout, and keep versions organized in the dashboard.'],
                            ].map(([step, text]) => (
                                <div key={step} className="flex gap-4 rounded-[24px] border border-slate-200 bg-[#faf7f2] p-5">
                                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{step}</div>
                                    <p className="text-sm leading-6 text-slate-700">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
