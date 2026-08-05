import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

const suggestedSkills = [
    'JavaScript',
    'React',
    'Node.js',
    'TypeScript',
    'Python',
    'SQL',
    'Tailwind CSS',
    'Figma',
]

const SkillsForm = ({ data, onChange }) => {
    const [newSkill, setNewSkill] = useState('')
    const skills = Array.isArray(data) ? data : []

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

    const remainingSuggestions = suggestedSkills.filter(
        (skill) => !skills.some((existing) => existing.toLowerCase() === skill.toLowerCase())
    )

    return (
        <div>
            <h2 className='text-lg font-medium text-ink'>Skills</h2>
            <p className='mt-1 text-sm text-muted'>The tools and abilities your experience actually backs up.</p>

            <form onSubmit={handleSubmit} className='mt-6 flex gap-2'>
                <input
                    type='text'
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder='Add a skill'
                    className='field'
                />
                <button type='submit' className='btn btn-secondary shrink-0'>
                    <Plus className='size-4' />
                    Add
                </button>
            </form>

            {skills.length > 0 && (
                <div className='mt-5 flex flex-wrap gap-2'>
                    {skills.map((skill, index) => (
                        <span
                            key={`${skill}-${index}`}
                            className='inline-flex items-center gap-1.5 rounded-full border border-line bg-paper py-1.5 pl-3 pr-1.5 text-sm text-ink'
                        >
                            {skill}
                            <button
                                type='button'
                                onClick={() => removeSkill(index)}
                                aria-label={`Remove ${skill}`}
                                className='rounded-full p-0.5 text-faint transition hover:bg-surface hover:text-accent'
                            >
                                <X className='size-3.5' />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {remainingSuggestions.length > 0 && (
                <div className='mt-8'>
                    <p className='label'>Suggestions</p>
                    <div className='mt-3 flex flex-wrap gap-2'>
                        {remainingSuggestions.map((skill) => (
                            <button
                                key={skill}
                                type='button'
                                onClick={() => addSkill(skill)}
                                className='rounded-full border border-dashed border-line-strong px-3 py-1.5 text-sm text-muted transition hover:border-ink hover:text-ink'
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SkillsForm
