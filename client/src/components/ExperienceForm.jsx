import React from 'react'
import { BriefcaseBusiness, Plus, Trash2 } from 'lucide-react'

const ExperienceForm = ({ data, onChange }) => {
  const experiences = Array.isArray(data) ? data : []

  const updateExperience = (index, field, value) => {
    const next = experiences.map((experience, experienceIndex) =>
      experienceIndex === index ? { ...experience, [field]: value } : experience
    )
    onChange(next)
  }

  const patchExperience = (index, updates) => {
    const next = experiences.map((experience, experienceIndex) =>
      experienceIndex === index ? { ...experience, ...updates } : experience
    )
    onChange(next)
  }

  const addExperience = () => {
    onChange([
      ...experiences,
      {
        company: '',
        position: '',
        start_date: '',
        end_date: '',
        description: '',
        is_current: false,
      },
    ])
  }

  const removeExperience = (index) => {
    onChange(experiences.filter((_, experienceIndex) => experienceIndex !== index))
  }

  return (
    <div>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>Experience</h3>
          <p className='text-sm text-gray-600'>
            Add your work history in reverse chronological order and focus on impact, scope, and results.
          </p>
        </div>
        <div className='hidden rounded-2xl bg-slate-100 p-3 text-slate-600 sm:block'>
          <BriefcaseBusiness className='size-5' />
        </div>
      </div>

      <div className='mt-6 space-y-4'>
        {experiences.length === 0 && (
          <div className='rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center'>
            <p className='text-sm font-medium text-slate-700'>No experience added yet</p>
            <p className='mt-2 text-sm text-slate-500'>
              Add your first role to start building the timeline shown in the live preview.
            </p>
          </div>
        )}

        {experiences.map((experience, index) => (
          <div key={index} className='rounded-3xl border border-slate-200 bg-slate-50/70 p-5'>
            <div className='mb-5 flex items-center justify-between gap-3'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-slate-400'>
                  Role {index + 1}
                </p>
                <h4 className='mt-1 text-base font-semibold text-slate-900'>
                  {experience.position || 'Untitled Position'}
                </h4>
              </div>

              <button
                type='button'
                onClick={() => removeExperience(index)}
                className='inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50'
              >
                <Trash2 className='size-4' />
                Remove
              </button>
            </div>

            <div className='grid gap-5 sm:grid-cols-2'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>Job Title</label>
                <input
                  type='text'
                  value={experience.position || ''}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  placeholder='Senior Frontend Engineer'
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>Company</label>
                <input
                  type='text'
                  value={experience.company || ''}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  placeholder='Example Technologies'
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>Start Date</label>
                <input
                  type='month'
                  value={experience.start_date || ''}
                  onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>End Date</label>
                <input
                  type='month'
                  value={experience.is_current ? '' : experience.end_date || ''}
                  onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                  disabled={experience.is_current}
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400'
                />
              </div>
            </div>

            <label className='mt-4 inline-flex items-center gap-3 text-sm font-medium text-slate-700'>
              <input
                type='checkbox'
                checked={!!experience.is_current}
                onChange={(e) => {
                  patchExperience(index, {
                    is_current: e.target.checked,
                    end_date: e.target.checked ? '' : experience.end_date || '',
                  })
                }}
                className='h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400'
              />
              I currently work here
            </label>

            <div className='mt-5 space-y-2'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <label className='text-sm font-medium text-gray-600'>Description</label>
                <button
                  type='button'
                  className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
                >
                  <BriefcaseBusiness className='size-4 text-orange-500' />
                  Enhance with AI
                </button>
              </div>
              <textarea
                rows={5}
                value={experience.description || ''}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                placeholder='Describe the work you did, the tools you used, and the measurable impact you made.'
                className='w-full resize-none rounded-3xl border border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={addExperience}
        className='mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
      >
        <Plus className='size-4' />
        Add Experience
      </button>

      <button
        type='button'
        className='mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
      >
        Save Changes
      </button>
    </div>
  )
}

export default ExperienceForm
