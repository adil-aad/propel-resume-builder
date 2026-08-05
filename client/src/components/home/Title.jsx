import React from 'react'

const Title = ({ title, description, align = 'center' }) => {
  const isLeft = align === 'left'

  return (
    <div className={isLeft ? 'max-w-2xl' : 'mx-auto max-w-2xl text-center'}>
      <h2 className='text-3xl font-medium text-ink md:text-4xl'>{title}</h2>
      {description && <p className='mt-4 text-lg leading-8 text-muted'>{description}</p>}
    </div>
  )
}

export default Title
