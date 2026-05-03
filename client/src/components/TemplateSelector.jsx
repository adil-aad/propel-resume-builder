import React, { useMemo, useState } from 'react'
import { Check, ChevronDown, LayoutTemplate } from 'lucide-react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = useMemo(() => ([
        {
            id: 'classic',
            name: 'Classic',
            description: 'Structured headings with a formal two-tone hierarchy.',
            accent: '#f97316',
        },
        {
            id: 'modern',
            name: 'Modern',
            description: 'Bold header with cleaner cards and contemporary spacing.',
            accent: '#2563eb',
        },
        {
            id: 'minimal-image',
            name: 'Minimal Image',
            description: 'Image-forward layout with a split editorial composition.',
            accent: '#0f766e',
        },
        {
            id: 'minimal',
            name: 'Minimal',
            description: 'Quiet typography and airy rhythm for a stripped-back feel.',
            accent: '#7c3aed',
        },
    ]), [])

    const selected = templates.find((template) => template.id === selectedTemplate) || templates[0]

    const handleSelect = (templateId) => {
        onChange(templateId)
        setIsOpen(false)
    }

    return (
        <div className='rounded-[28px] border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm'>
            <button
                type='button'
                onClick={() => setIsOpen((prev) => !prev)}
                className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left'
            >
                <div className='flex items-center gap-4'>
                    <div className='inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white'>
                        <LayoutTemplate className='size-5' />
                    </div>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-400'>Template Selector</p>
                        <h3 className='text-sm font-semibold text-slate-900'>{selected.name}</h3>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <span
                        className='hidden rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] sm:inline-flex'
                        style={{ backgroundColor: `${selected.accent}18`, color: selected.accent }}
                    >
                        Active
                    </span>
                    <ChevronDown className={`size-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {isOpen && (
                <div className='border-t border-slate-200 px-5 py-5'>
                    <div className='grid gap-4 md:grid-cols-2'>
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                type='button'
                                onClick={() => handleSelect(template.id)}
                                className={`group rounded-[24px] border p-4 text-left transition hover:-translate-y-1 ${
                                    selectedTemplate === template.id
                                        ? 'border-slate-900 bg-slate-50 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.45)]'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                <div className='flex items-start justify-between gap-4'>
                                    <div>
                                        <h4 className='text-base font-semibold text-slate-900'>{template.name}</h4>
                                        <p className='mt-2 text-sm leading-6 text-slate-600'>{template.description}</p>
                                    </div>
                                    <span
                                        className={`inline-flex size-7 items-center justify-center rounded-full border ${
                                            selectedTemplate === template.id
                                                ? 'border-slate-900 bg-slate-900 text-white'
                                                : 'border-slate-300 text-transparent'
                                        }`}
                                    >
                                        <Check className='size-4' />
                                    </span>
                                </div>

                                <div className='mt-4 overflow-hidden rounded-[20px] border border-slate-200 bg-[#f8f5ef]'>
                                    {template.id === 'classic' && (
                                        <div className='p-3'>
                                            <div className='border-b-[3px] pb-3' style={{ borderColor: template.accent }}>
                                                <div className='h-4 w-28 rounded-full' style={{ backgroundColor: template.accent }} />
                                                <div className='mt-3 flex gap-2'>
                                                    <div className='h-2 w-16 rounded-full bg-slate-200' />
                                                    <div className='h-2 w-16 rounded-full bg-slate-200' />
                                                    <div className='h-2 w-12 rounded-full bg-slate-200' />
                                                </div>
                                            </div>
                                            <div className='mt-3 space-y-2'>
                                                <div className='h-2 w-24 rounded-full bg-slate-300' />
                                                <div className='border-l-[3px] space-y-2 pl-3' style={{ borderColor: template.accent }}>
                                                    <div className='h-3 w-2/3 rounded-full bg-slate-300' />
                                                    <div className='h-2 w-full rounded-full bg-slate-200' />
                                                    <div className='h-2 w-5/6 rounded-full bg-slate-200' />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {template.id === 'modern' && (
                                        <div className='overflow-hidden'>
                                            <div className='px-3 py-4 text-white' style={{ backgroundColor: template.accent }}>
                                                <div className='h-4 w-24 rounded-full bg-white/90' />
                                                <div className='mt-3 grid grid-cols-2 gap-2'>
                                                    <div className='h-2 rounded-full bg-white/50' />
                                                    <div className='h-2 rounded-full bg-white/40' />
                                                    <div className='h-2 rounded-full bg-white/40' />
                                                    <div className='h-2 rounded-full bg-white/50' />
                                                </div>
                                            </div>
                                            <div className='space-y-3 p-3'>
                                                <div className='h-3 w-20 rounded-full bg-slate-300' />
                                                <div className='rounded-2xl border border-slate-200 p-3'>
                                                    <div className='flex items-center justify-between gap-2'>
                                                        <div className='h-3 w-24 rounded-full bg-slate-300' />
                                                        <div className='h-5 w-14 rounded-full bg-slate-100' />
                                                    </div>
                                                    <div className='mt-3 h-2 w-full rounded-full bg-slate-200' />
                                                    <div className='mt-2 h-2 w-4/5 rounded-full bg-slate-200' />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {template.id === 'minimal-image' && (
                                        <div className='grid grid-cols-[0.72fr_1.28fr]'>
                                            <div className='border-r border-slate-200 p-3'>
                                                <div className='mx-auto h-12 w-12 rounded-full bg-slate-300' />
                                                <div className='mt-4 space-y-2'>
                                                    <div className='h-2 w-14 rounded-full bg-slate-300' />
                                                    <div className='h-2 w-full rounded-full bg-slate-200' />
                                                    <div className='h-2 w-5/6 rounded-full bg-slate-200' />
                                                </div>
                                            </div>
                                            <div className='p-3'>
                                                <div className='h-4 w-28 rounded-full bg-slate-400' />
                                                <div className='mt-2 h-2 w-20 rounded-full' style={{ backgroundColor: template.accent }} />
                                                <div className='mt-5 space-y-2'>
                                                    <div className='h-2 w-16 rounded-full' style={{ backgroundColor: `${template.accent}aa` }} />
                                                    <div className='h-2 w-full rounded-full bg-slate-200' />
                                                    <div className='h-2 w-11/12 rounded-full bg-slate-200' />
                                                    <div className='mt-3 h-2 w-20 rounded-full' style={{ backgroundColor: `${template.accent}aa` }} />
                                                    <div className='h-2 w-full rounded-full bg-slate-200' />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {template.id === 'minimal' && (
                                        <div className='p-3'>
                                            <div className='h-4 w-28 rounded-full bg-slate-400' />
                                            <div className='mt-3 flex gap-3'>
                                                <div className='h-2 w-16 rounded-full bg-slate-200' />
                                                <div className='h-2 w-12 rounded-full bg-slate-200' />
                                                <div className='h-2 w-14 rounded-full bg-slate-200' />
                                            </div>
                                            <div className='mt-4 space-y-3'>
                                                <div>
                                                    <div className='h-2 w-16 rounded-full' style={{ backgroundColor: template.accent }} />
                                                    <div className='mt-2 h-2 w-full rounded-full bg-slate-200' />
                                                    <div className='mt-2 h-2 w-4/5 rounded-full bg-slate-200' />
                                                </div>
                                                <div>
                                                    <div className='h-2 w-20 rounded-full' style={{ backgroundColor: template.accent }} />
                                                    <div className='mt-2 h-2 w-full rounded-full bg-slate-200' />
                                                    <div className='mt-2 h-2 w-5/6 rounded-full bg-slate-200' />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TemplateSelector
