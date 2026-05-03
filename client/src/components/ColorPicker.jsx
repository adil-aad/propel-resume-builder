import React, { useMemo, useState } from 'react'
import { Check, ChevronDown, Palette } from 'lucide-react'

const ColorPicker = ({ selectedColor, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const colors = useMemo(() => ([
        { name: 'Electric Blue', value: '#2563EB', tone: 'Sharp and modern', surface: 'from-blue-500 to-cyan-400' },
        { name: 'Citrus Ember', value: '#F97316', tone: 'Warm and confident', surface: 'from-orange-500 to-amber-400' },
        { name: 'Emerald Ink', value: '#0F766E', tone: 'Calm and polished', surface: 'from-emerald-600 to-teal-400' },
        { name: 'Royal Violet', value: '#7C3AED', tone: 'Creative and premium', surface: 'from-violet-600 to-fuchsia-400' },
        { name: 'Rose Studio', value: '#E11D48', tone: 'Bold and expressive', surface: 'from-rose-600 to-pink-400' },
        { name: 'Graphite Gold', value: '#B45309', tone: 'Refined and editorial', surface: 'from-amber-700 to-yellow-500' },
        { name: 'Ocean Depth', value: '#0F4C81', tone: 'Professional and steady', surface: 'from-sky-800 to-cyan-500' },
        { name: 'Forest Signal', value: '#166534', tone: 'Grounded and crisp', surface: 'from-green-700 to-emerald-500' },
    ]), [])

    const selected = colors.find((color) => color.value === selectedColor) || colors[0]

    const handleSelect = (value) => {
        onChange(value)
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
                        <Palette className='size-5' />
                    </div>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-400'>Accent Color</p>
                        <h3 className='text-sm font-semibold text-slate-900'>{selected.name}</h3>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <span className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600'>
                        <span className='h-3 w-3 rounded-full border border-white shadow-sm' style={{ backgroundColor: selected.value }} />
                        Live
                    </span>
                    <ChevronDown className={`size-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {isOpen && (
                <div className='border-t border-slate-200 px-5 py-5'>
                    <div className='grid gap-4 md:grid-cols-2'>
                        {colors.map((color) => (
                            <button
                                key={color.value}
                                type='button'
                                onClick={() => handleSelect(color.value)}
                                className={`rounded-[24px] border p-4 text-left transition hover:-translate-y-1 ${
                                    selectedColor === color.value
                                        ? 'border-slate-900 bg-slate-50 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.45)]'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                <div className='flex items-start justify-between gap-4'>
                                    <div>
                                        <h4 className='text-base font-semibold text-slate-900'>{color.name}</h4>
                                        <p className='mt-1 text-sm text-slate-600'>{color.tone}</p>
                                    </div>
                                    <span
                                        className={`inline-flex size-7 items-center justify-center rounded-full border ${
                                            selectedColor === color.value
                                                ? 'border-slate-900 bg-slate-900 text-white'
                                                : 'border-slate-300 text-transparent'
                                        }`}
                                    >
                                        <Check className='size-4' />
                                    </span>
                                </div>

                                <div className={`mt-4 rounded-[20px] bg-gradient-to-r ${color.surface} p-[1px]`}>
                                    <div className='rounded-[19px] bg-[#f8f5ef] p-3'>
                                        <div className='flex items-center justify-between gap-3'>
                                            <div className='flex items-center gap-3'>
                                                <span className='h-10 w-10 rounded-2xl shadow-sm' style={{ backgroundColor: color.value }} />
                                                <div>
                                                    <div className='h-3 w-20 rounded-full' style={{ backgroundColor: color.value }} />
                                                    <div className='mt-2 h-2 w-16 rounded-full bg-slate-200' />
                                                </div>
                                            </div>
                                            <span className='text-xs font-medium uppercase tracking-[0.2em] text-slate-500'>
                                                {color.value}
                                            </span>
                                        </div>

                                        <div className='mt-4 space-y-2'>
                                            <div className='h-2 w-20 rounded-full' style={{ backgroundColor: `${color.value}cc` }} />
                                            <div className='h-2 w-full rounded-full bg-slate-200' />
                                            <div className='h-2 w-5/6 rounded-full bg-slate-200' />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ColorPicker
