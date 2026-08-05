import React, { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

const templates = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimal-image', name: 'Minimal Image' },
    { id: 'minimal', name: 'Minimal' },
]

const Thumbnail = ({ id, accent }) => {
    if (id === 'modern') {
        return (
            <div className='overflow-hidden'>
                <div className='px-2.5 py-3' style={{ backgroundColor: accent }}>
                    <div className='h-2 w-14 rounded-full bg-white/90' />
                    <div className='mt-2 grid grid-cols-2 gap-1.5'>
                        <div className='h-1 rounded-full bg-white/50' />
                        <div className='h-1 rounded-full bg-white/40' />
                    </div>
                </div>
                <div className='space-y-1.5 p-2.5'>
                    <div className='h-1.5 w-10 rounded-full bg-line-strong' />
                    <div className='h-1 w-full rounded-full bg-line' />
                    <div className='h-1 w-4/5 rounded-full bg-line' />
                </div>
            </div>
        )
    }

    if (id === 'minimal-image') {
        return (
            <div className='grid h-full grid-cols-[0.7fr_1.3fr]'>
                <div className='border-r border-line p-2.5'>
                    <div className='mx-auto size-7 rounded-full bg-line-strong' />
                    <div className='mt-2.5 space-y-1'>
                        <div className='h-1 w-full rounded-full bg-line' />
                        <div className='h-1 w-4/5 rounded-full bg-line' />
                    </div>
                </div>
                <div className='p-2.5'>
                    <div className='h-2 w-16 rounded-full bg-line-strong' />
                    <div className='mt-1.5 h-1 w-10 rounded-full' style={{ backgroundColor: accent }} />
                    <div className='mt-3 space-y-1'>
                        <div className='h-1 w-full rounded-full bg-line' />
                        <div className='h-1 w-11/12 rounded-full bg-line' />
                        <div className='h-1 w-3/4 rounded-full bg-line' />
                    </div>
                </div>
            </div>
        )
    }

    if (id === 'minimal') {
        return (
            <div className='p-2.5'>
                <div className='h-2 w-16 rounded-full bg-line-strong' />
                <div className='mt-2 flex gap-1.5'>
                    <div className='h-1 w-8 rounded-full bg-line' />
                    <div className='h-1 w-6 rounded-full bg-line' />
                </div>
                <div className='mt-3 space-y-2.5'>
                    {[0, 1].map(row => (
                        <div key={row}>
                            <div className='h-1 w-9 rounded-full' style={{ backgroundColor: accent }} />
                            <div className='mt-1.5 h-1 w-full rounded-full bg-line' />
                            <div className='mt-1 h-1 w-4/5 rounded-full bg-line' />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='p-2.5'>
            <div className='border-b-2 pb-2' style={{ borderColor: accent }}>
                <div className='h-2 w-16 rounded-full' style={{ backgroundColor: accent }} />
                <div className='mt-2 flex gap-1.5'>
                    <div className='h-1 w-8 rounded-full bg-line' />
                    <div className='h-1 w-8 rounded-full bg-line' />
                </div>
            </div>
            <div className='mt-2.5 space-y-1.5'>
                <div className='h-1.5 w-12 rounded-full bg-line-strong' />
                <div className='space-y-1 border-l-2 pl-2' style={{ borderColor: accent }}>
                    <div className='h-1 w-full rounded-full bg-line' />
                    <div className='h-1 w-5/6 rounded-full bg-line' />
                </div>
            </div>
        </div>
    )
}

const TemplateSelector = ({ selectedTemplate, accentColor = '#16150f', onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const selected = templates.find(template => template.id === selectedTemplate) || templates[0]

    const handleSelect = (templateId) => {
        onChange(templateId)
        setIsOpen(false)
    }

    return (
        <div className='relative'>
            <button
                type='button'
                onClick={() => setIsOpen(prev => !prev)}
                className='flex items-center gap-2 text-sm text-ink transition hover:text-muted'
            >
                <span className='text-muted'>Template</span>
                <span className='font-medium'>{selected.name}</span>
                <ChevronDown className={`size-4 text-faint transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className='fixed inset-0 z-30' onClick={() => setIsOpen(false)} />

                    <div className='absolute left-0 top-full z-40 mt-3 w-80 rounded-xl border border-line bg-surface p-2 shadow-[0_24px_60px_-32px_rgb(22_21_15_/_0.45)]'>
                        <div className='grid grid-cols-2 gap-2'>
                            {templates.map((template) => {
                                const isSelected = selectedTemplate === template.id
                                return (
                                    <button
                                        key={template.id}
                                        type='button'
                                        onClick={() => handleSelect(template.id)}
                                        className={`rounded-lg border p-2 text-left transition ${
                                            isSelected ? 'border-ink bg-paper' : 'border-transparent hover:bg-paper'
                                        }`}
                                    >
                                        <div className='h-24 overflow-hidden rounded border border-line bg-surface'>
                                            <Thumbnail id={template.id} accent={accentColor} />
                                        </div>

                                        <div className='mt-2 flex items-center justify-between gap-2'>
                                            <span className='text-xs font-medium text-ink'>{template.name}</span>
                                            {isSelected && <Check className='size-3.5 text-ink' />}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TemplateSelector
