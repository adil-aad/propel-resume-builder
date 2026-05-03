import React, { useMemo, useState } from 'react'
import { Plus, Sparkles, Trash2 } from 'lucide-react'

const SkillsForm = ({ data, onChange }) => {
    const [newSkill, setNewSkill] = useState('')
    const skills = Array.isArray(data) ? data : []

    const suggestedSkills = useMemo(() => ([
        'JavaScript',
        'React',
        'Node.js',
        'TypeScript',
        'Python',
        'SQL',
        'Tailwind CSS',
        'Figma',
    ]), [])

    const addSkill = (skillValue = newSkill) => {
        const trimmedSkill = skillValue.trim()
        if (!trimmedSkill) return
        if (skills.some((skill) => skill.toLowerCase() === trimmedSkill.toLowerCase())) {
            setNewSkill('')
            return
        }

        onChange([...skills, trimmedSkill])
        setNewSkill('')
    }

    const removeSkill = (index) => {
        onChange(skills.filter((_, skillIndex) => skillIndex !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addSkill()
    }

    return (
        <div>
            <div className='flex items-start justify-between gap-4'>
                <div>
                    <h3 className='text-lg font-semibold text-gray-900'>Skills</h3>
                    <p className='text-sm text-gray-600'>
                        Add the technical, creative, or domain skills that best support your experience and projects.
                    </p>
                </div>
                <div className='hidden rounded-2xl bg-slate-100 p-3 text-slate-600 sm:block'>
                    <Sparkles className='size-5' />
                </div>
            </div>

            <form onSubmit={handleSubmit} className='mt-6 rounded-3xl border border-slate-200 bg-slate-50/70 p-5'>
                <div className='flex flex-col gap-3 sm:flex-row'>
                    <input
                        type='text'
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder='Add a skill like React, Figma, or PostgreSQL'
                        className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200'
                    />
                    <button
                        type='submit'
                        className='inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
                    >
                        <Plus className='size-4' />
                        Add Skill
                    </button>
                </div>

                <div className='mt-4'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-slate-400'>
                        Suggestions
                    </p>
                    <div className='mt-3 flex flex-wrap gap-2'>
                        {suggestedSkills.map((skill) => (
                            <button
                                key={skill}
                                type='button'
                                onClick={() => addSkill(skill)}
                                className='rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
            </form>

            <div className='mt-6'>
                {skills.length === 0 ? (
                    <div className='rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center'>
                        <p className='text-sm font-medium text-slate-700'>No skills added yet</p>
                        <p className='mt-2 text-sm text-slate-500'>
                            Add a few strong skills to make your resume easier to scan quickly.
                        </p>
                    </div>
                ) : (
                    <div className='rounded-3xl border border-slate-200 bg-slate-50/70 p-5'>
                        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-slate-400'>
                            Your Skills
                        </p>
                        <div className='mt-4 flex flex-wrap gap-3'>
                            {skills.map((skill, index) => (
                                <div
                                    key={`${skill}-${index}`}
                                    className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm'
                                >
                                    <span>{skill}</span>
                                    <button
                                        type='button'
                                        onClick={() => removeSkill(index)}
                                        className='text-slate-400 transition hover:text-red-500'
                                    >
                                        <Trash2 className='size-4' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <button
                type='button'
                className='mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
            >
                Save Changes
            </button>
        </div>
    )
}

export default SkillsForm
