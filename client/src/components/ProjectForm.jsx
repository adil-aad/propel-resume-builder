import React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import DraggableList from './DraggableList'

const ProjectForm = ({ data, onChange }) => {
  const projects = Array.isArray(data) ? data : []

  const updateProject = (index, field, value) => {
    const next = projects.map((project, projectIndex) =>
      projectIndex === index ? { ...project, [field]: value } : project
    )
    onChange(next)
  }

  const addProject = () => {
    onChange([
      ...projects,
      {
        name: '',
        type: '',
        description: '',
      },
    ])
  }

  const removeProject = (index) => {
    onChange(projects.filter((_, projectIndex) => projectIndex !== index))
  }

  return (
    <div>
      <h2 className='text-lg font-medium text-ink'>Projects</h2>
      <p className='mt-1 text-sm text-muted'>Work worth showing that a job title does not cover.</p>

      <div className='mt-6 space-y-4'>
        {projects.length === 0 && (
          <div className='rounded-lg border border-dashed border-line-strong px-6 py-12 text-center'>
            <p className='text-sm text-muted'>No projects added yet.</p>
          </div>
        )}

        <DraggableList items={projects} onReorder={onChange}>
          {(project, index, { DragHandle }) => (
            <div className='rounded-lg border border-line bg-paper p-5'>
              <div className='mb-5 flex items-center justify-between gap-3'>
                <div className='flex min-w-0 items-center gap-2'>
                  {DragHandle}
                  <h3 className='truncate text-sm font-medium text-ink'>
                    {project.name || `Project ${index + 1}`}
                  </h3>
                </div>

                <button
                  type='button'
                  onClick={() => removeProject(index)}
                  aria-label='Remove project'
                  className='shrink-0 rounded-md p-1.5 text-faint transition hover:bg-surface hover:text-accent'
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='label'>Name</label>
                  <input
                    type='text'
                    value={project.name || ''}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                    placeholder='TaskTrackr'
                    className='field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='label'>Type</label>
                  <input
                    type='text'
                    value={project.type || ''}
                    onChange={(e) => updateProject(index, 'type', e.target.value)}
                    placeholder='Web app'
                    className='field'
                  />
                </div>
              </div>

              <div className='mt-5 space-y-2'>
                <label className='label'>Description</label>
                <textarea
                  rows={5}
                  value={project.description || ''}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  placeholder='What it does, who it is for, what you built it with, and how it turned out.'
                  className='field'
                />
              </div>
            </div>
          )}
        </DraggableList>
      </div>

      <button type='button' onClick={addProject} className='btn btn-secondary mt-4'>
        <Plus className='size-4' />
        Add project
      </button>
    </div>
  )
}

export default ProjectForm
