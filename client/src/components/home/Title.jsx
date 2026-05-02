import React from 'react'

const Title = ({ title, description, align = 'center' }) => {
    const isLeft = align === 'left'

    return (
        <div className={`${isLeft ? 'text-left' : 'text-center'} mb-12`}>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
                ResumeForge
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                {title}
            </h2>
            <p className={`mt-4 text-lg leading-8 text-slate-600 ${isLeft ? 'max-w-2xl' : 'mx-auto max-w-2xl'}`}>
                {description}
            </p>
        </div>
    )
}

export default Title
