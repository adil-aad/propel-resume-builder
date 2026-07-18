import React from 'react'
import { GraduationCap, Plus, Trash2, CalendarDays } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EducaitonForm = ({ data, onChange }) => {
  const educationItems = Array.isArray(data) ? data : []

  const updateEducation = (index, field, value) => {
    const next = educationItems.map((education, educationIndex) =>
      educationIndex === index ? { ...education, [field]: value } : education
    )
    onChange(next)
  }

  const addEducation = () => {
    onChange([
      ...educationItems,
      {
        institution: '',
        degree: '',
        graduation_date: '',
        gpa: '',
      },
    ])
  }

  const removeEducation = (index) => {
    onChange(educationItems.filter((_, educationIndex) => educationIndex !== index))
  }

  return (
    <div>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>Education</h3>
          <p className='text-sm text-gray-600'>
            Add your academic background, certifications, or training in a clean, recruiter-friendly format.
          </p>
        </div>
        <div className='hidden rounded-2xl bg-slate-100 p-3 text-slate-600 sm:block'>
          <GraduationCap className='size-5' />
        </div>
      </div>

      <div className='mt-6 space-y-4'>
        {educationItems.length === 0 && (
          <div className='rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center'>
            <p className='text-sm font-medium text-slate-700'>No education added yet</p>
            <p className='mt-2 text-sm text-slate-500'>
              Add your most relevant degree, diploma, or training program to complete the academic section.
            </p>
          </div>
        )}

        {educationItems.map((education, index) => (
          <div key={index} className='rounded-3xl border border-slate-200 bg-slate-50/70 p-5'>
            <div className='mb-5 flex items-center justify-between gap-3'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-slate-400'>
                  Education {index + 1}
                </p>
                <h4 className='mt-1 text-base font-semibold text-slate-900'>
                  {education.degree || 'Untitled Qualification'}
                </h4>
              </div>

              <button
                type='button'
                onClick={() => removeEducation(index)}
                className='inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50'
              >
                <Trash2 className='size-4' />
                Remove
              </button>
            </div>

            <div className='grid gap-5 sm:grid-cols-2'>
              <div className='space-y-2 sm:col-span-2'>
                <label className='text-sm font-medium text-gray-600'>Institution</label>
                <input
                  type='text'
                  value={education.institution || ''}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder='University of Digital Arts'
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>Degree</label>
                <input
                  type='text'
                  value={education.degree || ''}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder='B.Sc. Computer Science'
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>Graduation Date</label>
                <div className='relative'>
                  <DatePicker
                    selected={education.graduation_date ? new Date(education.graduation_date + '-01') : null}
                    onChange={(date) => updateEducation(index, 'graduation_date', date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` : '')}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    placeholderText="Select graduation date"
                    className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                  />
                  <div
                    className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                    onClick={(e) => e.currentTarget.previousSibling?.querySelector('input')?.click()}
                  >
                    <CalendarDays className='size-4 text-slate-400' />
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>GPA</label>
                <input
                  type='text'
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  placeholder='3.8 or 8.7'
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={addEducation}
        className='mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
      >
        <Plus className='size-4' />
        Add Education
      </button>

    </div>
  )
}

export default EducaitonForm
