import React from 'react'
import { User } from 'lucide-react'

const fields = [
    { key: 'full_name', label: 'Full name', type: 'text', required: true, placeholder: 'Ada Lovelace', span: true },
    { key: 'profession', label: 'Profession', type: 'text', placeholder: 'Senior Product Engineer', span: true },
    { key: 'email', label: 'Email address', type: 'email', required: true, placeholder: 'ada@example.com' },
    { key: 'phone', label: 'Phone number', type: 'tel', placeholder: '+44 7700 900123' },
    { key: 'location', label: 'Location', type: 'text', placeholder: 'London, UK' },
    { key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/ada' },
    { key: 'website', label: 'Website', type: 'url', placeholder: 'ada.dev', span: true },
]

const PersonalInfo = ({ data, onChange, removeBackground, setRemoveBackground }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const imageSrc = data.image
        ? (typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image))
        : null

    return (
        <div>
            <h2 className='text-lg font-medium text-ink'>Personal details</h2>

            <div className='mt-6 flex items-center gap-4'>
                <label className='cursor-pointer'>
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt='Profile'
                            className='size-16 rounded-full object-cover ring-1 ring-line-strong transition hover:opacity-80'
                        />
                    ) : (
                        <div className='flex size-16 items-center justify-center rounded-full border border-dashed border-line-strong text-faint transition hover:border-ink hover:text-ink'>
                            <User className='size-5' strokeWidth={1.75} />
                        </div>
                    )}

                    <input
                        type='file'
                        accept='image/jpeg, image/png'
                        className='hidden'
                        onChange={(event) => handleChange('image', event.target.files[0])}
                    />
                </label>

                <div>
                    <p className='text-sm font-medium text-ink'>Photo</p>
                    <p className='mt-0.5 text-xs text-faint'>
                        Optional. Used by the Minimal Image template.
                    </p>

                    {typeof data.image === 'object' && data.image && (
                        <label className='relative mt-3 inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft'>
                            <input
                                type='checkbox'
                                className='peer sr-only'
                                onChange={() => setRemoveBackground(prev => !prev)}
                                checked={removeBackground}
                            />
                            <span className='h-5 w-9 shrink-0 rounded-full bg-line-strong transition-colors peer-checked:bg-ink' />
                            <span className='pointer-events-none absolute left-1 top-1/2 size-3 -translate-y-1/2 rounded-full bg-white transition-transform peer-checked:translate-x-4' />
                            Remove background
                        </label>
                    )}
                </div>
            </div>

            <div className='mt-8 grid gap-5 sm:grid-cols-2'>
                {fields.map((field) => (
                    <div key={field.key} className={`space-y-2 ${field.span ? 'sm:col-span-2' : ''}`}>
                        <label htmlFor={field.key} className='label'>
                            {field.label}
                            {field.required && <span className='ml-0.5 text-accent'>*</span>}
                        </label>

                        <input
                            id={field.key}
                            type={field.type}
                            value={data[field.key] || ''}
                            placeholder={field.placeholder}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className='field'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PersonalInfo
