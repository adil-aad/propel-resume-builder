import React from 'react'
import { FolderKanban, Plus, Trash2 } from 'lucide-react'

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
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>Projects</h3>
          <p className='text-sm text-gray-600'>
            Highlight the projects that best prove your skills, ownership, and practical impact.
          </p>
        </div>
        <div className='hidden rounded-2xl bg-slate-100 p-3 text-slate-600 sm:block'>
          <FolderKanban className='size-5' />
        </div>
      </div>

      <div className='mt-6 space-y-4'>
        {projects.length === 0 && (
          <div className='rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center'>
            <p className='text-sm font-medium text-slate-700'>No projects added yet</p>
            <p className='mt-2 text-sm text-slate-500'>
              Add a project to showcase work beyond your job titles and strengthen your portfolio story.
            </p>
          </div>
        )}

        {projects.map((project, index) => (
          <div key={index} className='rounded-3xl border border-slate-200 bg-slate-50/70 p-5'>
            <div className='mb-5 flex items-center justify-between gap-3'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-slate-400'>
                  Project {index + 1}
                </p>
                <h4 className='mt-1 text-base font-semibold text-slate-900'>
                  {project.name || 'Untitled Project'}
                </h4>
              </div>

              <button
                type='button'
                onClick={() => removeProject(index)}
                className='inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50'
              >
                <Trash2 className='size-4' />
                Remove
              </button>
            </div>

            <div className='grid gap-5 sm:grid-cols-2'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>Project Name</label>
                <input
                  type='text'
                  value={project.name || ''}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  placeholder='TaskTrackr'
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-600'>Project Type</label>
                <input
                  type='text'
                  value={project.type || ''}
                  onChange={(e) => updateProject(index, 'type', e.target.value)}
                  placeholder='Web Application (Productivity Tool)'
                  className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                />
              </div>
            </div>

            <div className='mt-5 space-y-2'>
              <label className='text-sm font-medium text-gray-600'>Description</label>
              <textarea
                rows={5}
                value={project.description || ''}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                placeholder='Describe what the project does, the problem it solves, the tools used, and the result or outcome.'
                className='w-full resize-none rounded-3xl border border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={addProject}
        className='mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
      >
        <Plus className='size-4' />
        Add Project
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

export default ProjectForm
