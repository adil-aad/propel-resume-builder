import React, { useState } from 'react'
import { Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api.js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DraggableList from './DraggableList'

const toMonthValue = (date) =>
  date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` : ''

const ExperienceForm = ({ data, onChange }) => {
  const experiences = Array.isArray(data) ? data : []

  const { token } = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)

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

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]

    const prompt = `enhance this job Description ${experience.description} for the position ${experience.position}
    at ${experience.company}`

    try {
      const { data } = await api.post('/api/ai/enhance-job', { userContent: prompt }, { headers: { Authorization: token } })
      updateExperience(index, 'description', data.enhancedContent)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div>
      <h2 className='text-lg font-medium text-ink'>Experience</h2>
      <p className='mt-1 text-sm text-muted'>Most recent role first. Drag to reorder.</p>

      <div className='mt-6 space-y-4'>
        {experiences.length === 0 && (
          <div className='rounded-lg border border-dashed border-line-strong px-6 py-12 text-center'>
            <p className='text-sm text-muted'>No roles added yet.</p>
          </div>
        )}

        <DraggableList items={experiences} onReorder={onChange}>
          {(experience, index, { DragHandle }) => (
            <div className='rounded-lg border border-line bg-paper p-5'>
              <div className='mb-5 flex items-center justify-between gap-3'>
                <div className='flex min-w-0 items-center gap-2'>
                  {DragHandle}
                  <h3 className='truncate text-sm font-medium text-ink'>
                    {experience.position || `Role ${index + 1}`}
                  </h3>
                </div>

                <button
                  type='button'
                  onClick={() => removeExperience(index)}
                  aria-label='Remove role'
                  className='shrink-0 rounded-md p-1.5 text-faint transition hover:bg-surface hover:text-accent'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='label'>Job title</label>
                  <input
                    type='text'
                    value={experience.position || ''}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    placeholder='Senior Frontend Engineer'
                    className='field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='label'>Company</label>
                  <input
                    type='text'
                    value={experience.company || ''}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    placeholder='Northwind'
                    className='field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='label'>Start date</label>
                  <DatePicker
                    selected={experience.start_date ? new Date(experience.start_date + '-01') : null}
                    onChange={(date) => updateExperience(index, 'start_date', toMonthValue(date))}
                    dateFormat='MM/yyyy'
                    showMonthYearPicker
                    placeholderText='MM/YYYY'
                    className='field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='label'>End date</label>
                  <DatePicker
                    selected={experience.end_date && !experience.is_current ? new Date(experience.end_date + '-01') : null}
                    onChange={(date) => updateExperience(index, 'end_date', toMonthValue(date))}
                    dateFormat='MM/yyyy'
                    showMonthYearPicker
                    placeholderText={experience.is_current ? 'Present' : 'MM/YYYY'}
                    disabled={experience.is_current}
                    className='field'
                  />
                </div>
              </div>

              <label className='mt-4 inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft'>
                <input
                  type='checkbox'
                  checked={!!experience.is_current}
                  onChange={(e) => {
                    patchExperience(index, {
                      is_current: e.target.checked,
                      end_date: e.target.checked ? '' : experience.end_date || '',
                    })
                  }}
                  className='size-4 rounded border-line-strong accent-[var(--color-ink)]'
                />
                I currently work here
              </label>

              <div className='mt-5'>
                <div className='flex items-center justify-between gap-3'>
                  <label className='label'>Description</label>

                  <button
                    type='button'
                    onClick={() => generateDescription(index)}
                    disabled={generatingIndex === index || !experience.position || !experience.company}
                    title={!experience.position || !experience.company ? 'Add a job title and company first' : undefined}
                    className='btn btn-ghost btn-sm -mr-2'
                  >
                    {generatingIndex === index
                      ? <Loader2 className='size-4 animate-spin' />
                      : <Sparkles className='size-4' strokeWidth={1.75} />}
                    {generatingIndex === index ? 'Enhancing' : 'Enhance with AI'}
                  </button>
                </div>

                <textarea
                  rows={5}
                  value={experience.description || ''}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder='What you owned, the tools you used, and the results you can point to.'
                  className='field mt-2'
                />
              </div>
            </div>
          )}
        </DraggableList>
      </div>

      <button type='button' onClick={addExperience} className='btn btn-secondary mt-4'>
        <Plus className='size-4' />
        Add role
      </button>
    </div>
  )
}

export default ExperienceForm
