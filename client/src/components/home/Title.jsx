import React from 'react'

const Title = ({ title, description }) => {
    return (
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
                    {title}
                </span>
            </h2>
            <p className="max-w-2xl mx-auto text-cyan-100/90 text-lg leading-relaxed">
                {description}
            </p>
        </div>
    )
}

export default Title