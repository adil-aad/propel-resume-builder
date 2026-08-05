import React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DraggableList from './DraggableList'

const toMonthValue = (date) =>
  date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` : ''

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
      <h2 className='text-lg font-medium text-ink'>Education</h2>
      <p className='mt-1 text-sm text-muted'>Degrees, diplomas, and certifications. Drag to reorder.</p>

      <div className='mt-6 space-y-4'>
        {educationItems.length === 0 && (
          <div className='rounded-lg border border-dashed border-line-strong px-6 py-12 text-center'>
            <p className='text-sm text-muted'>No education added yet.</p>
          </div>
        )}

        <DraggableList items={educationItems} onReorder={onChange}>
          {(education, index, { DragHandle }) => (
            <div className='rounded-lg border border-line bg-paper p-5'>
              <div className='mb-5 flex items-center justify-between gap-3'>
                <div className='flex min-w-0 items-center gap-2'>
                  {DragHandle}
                  <h3 className='truncate text-sm font-medium text-ink'>
                    {education.degree || `Qualification ${index + 1}`}
                  </h3>
                </div>

                <button
                  type='button'
                  onClick={() => removeEducation(index)}
                  aria-label='Remove qualification'
                  className='shrink-0 rounded-md p-1.5 text-faint transition hover:bg-surface hover:text-accent'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div className='space-y-2 sm:col-span-2'>
                  <label className='label'>Institution</label>
                  <input
                    type='text'
                    value={education.institution || ''}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    placeholder='University of Edinburgh'
                    className='field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='label'>Degree</label>
                  <input
                    type='text'
                    value={education.degree || ''}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder='BSc Computer Science'
                    className='field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='label'>Graduation date</label>
                  <DatePicker
                    selected={education.graduation_date ? new Date(education.graduation_date + '-01') : null}
                    onChange={(date) => updateEducation(index, 'graduation_date', toMonthValue(date))}
                    dateFormat='MM/yyyy'
                    showMonthYearPicker
                    placeholderText='MM/YYYY'
                    className='field'
                  />
                </div>

                <div className='space-y-2 sm:col-span-2'>
                  <label className='label'>GPA or grade</label>
                  <input
                    type='text'
                    value={education.gpa || ''}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    placeholder='3.8 / First class'
                    className='field'
                  />
                </div>
              </div>
            </div>
          )}
        </DraggableList>
      </div>

      <button type='button' onClick={addEducation} className='btn btn-secondary mt-4'>
        <Plus className='size-4' />
        Add education
      </button>
    </div>
  )
}

export default EducaitonForm
