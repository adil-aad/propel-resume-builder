import React, { useMemo } from 'react'

const palette = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Indigo', value: '#2563EB' },
    { name: 'Ocean', value: '#0F4C81' },
    { name: 'Teal', value: '#0F766E' },
    { name: 'Forest', value: '#166534' },
    { name: 'Amber', value: '#B45309' },
    { name: 'Ember', value: '#C2410C' },
    { name: 'Rose', value: '#E11D48' },
    { name: 'Violet', value: '#7C3AED' },
]

const ColorPicker = ({ selectedColor, onChange }) => {
    const colors = useMemo(() => {
        const isKnown = palette.some(color => color.value.toLowerCase() === selectedColor?.toLowerCase())
        return isKnown || !selectedColor
            ? palette
            : [{ name: 'Current', value: selectedColor }, ...palette]
    }, [selectedColor])

    return (
        <div className='flex items-center gap-1.5'>
            {colors.map((color) => {
                const isSelected = color.value.toLowerCase() === selectedColor?.toLowerCase()
                return (
                    <button
                        key={color.value}
                        type='button'
                        title={color.name}
                        aria-label={`Accent color: ${color.name}`}
                        aria-pressed={isSelected}
                        onClick={() => onChange(color.value)}
                        style={{ backgroundColor: color.value }}
                        className={`size-5 rounded-full transition ${
                            isSelected
                                ? 'ring-2 ring-ink ring-offset-2 ring-offset-surface'
                                : 'opacity-70 hover:opacity-100'
                        }`}
                    />
                )
            })}
        </div>
    )
}

export default ColorPicker
