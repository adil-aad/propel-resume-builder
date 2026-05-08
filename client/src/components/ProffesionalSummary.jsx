import React from 'react'
import { FileText, Sparkles } from 'lucide-react'

const ProffesionalSummary = ({ data, onChange }) => {
  const summary = data || ''
  const characterCount = summary.trim().length

  return (
    <div>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-600'>
            Write a short introduction that explains who you are, what you do, and the value you bring.
          </p>
        </div>
        <div className='hidden rounded-2xl bg-slate-100 p-3 text-slate-600 sm:block'>
          <FileText className='size-5' />
        </div>
      </div>

      <div className='mt-6 rounded-3xl border border-slate-200 bg-slate-50/80 p-4'>
        <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-500'>
          <Sparkles className='size-3.5 text-orange-500' />
          Summary Tips
        </div>

        <div className='grid gap-3 text-sm text-slate-600 sm:grid-cols-3'>
          <div className='rounded-2xl bg-white p-4'>
            Keep it concise
            <p className='mt-1 text-xs leading-5 text-slate-500'>Aim for 2 to 4 strong sentences instead of a long paragraph.</p>
          </div>
          <div className='rounded-2xl bg-white p-4'>
            Mention your focus
            <p className='mt-1 text-xs leading-5 text-slate-500'>Include your profession, specialization, or years of experience.</p>
          </div>
          <div className='rounded-2xl bg-white p-4'>
            Show impact
            <p className='mt-1 text-xs leading-5 text-slate-500'>Add the kind of results, strengths, or value you bring to a team.</p>
          </div>
        </div>
      </div>

      <div className='mt-6 space-y-3'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <label className='flex items-center justify-between gap-3 text-sm font-medium text-gray-600'>
            <span>Summary</span>
            <span className='text-xs font-medium text-slate-400'>{characterCount} characters</span>
          </label>

          <button
            type='button'
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
          >
            <Sparkles className='size-4 text-orange-500' />
            AI Enhance
          </button>
        </div>

        <label className='sr-only'>
          <span>Summary</span>
        </label>

        <textarea
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          placeholder='Example: Full Stack Developer with 5+ years of experience building scalable web applications with React, Node.js, and TypeScript. Known for translating product ideas into polished user experiences and reliable backend systems.'
          className='w-full resize-none rounded-3xl border border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
        />
      </div>

    </div>
  )
}

export default ProffesionalSummary
