import React from 'react'

/**
 * Propel Resume mark: a geometric "P" cut out of an ink squircle.
 * Colors are passed as fills so the mark works on light and dark surfaces.
 */
export const LogoMark = ({
  className = 'size-8',
  boxFill = 'var(--color-ink)',
  glyphFill = 'var(--color-paper)',
}) => (
  <svg viewBox='0 0 32 32' className={className} role='img' aria-label='Propel Resume'>
    <rect width='32' height='32' rx='8' fill={boxFill} />
    <path
      fill={glyphFill}
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10.5 7 H15 A6 6 0 0 1 15 19 V25 H10.5 Z M15 10.5 A2.5 2.5 0 0 1 15 15.5 Z'
    />
  </svg>
)

const Logo = ({ className = '', markClassName = 'size-8', tone = 'ink', showText = true }) => {
  const isLight = tone === 'light'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        className={markClassName}
        boxFill={isLight ? 'var(--color-paper)' : 'var(--color-ink)'}
        glyphFill={isLight ? 'var(--color-ink)' : 'var(--color-paper)'}
      />
      {showText && (
        <span className='text-[17px] leading-none tracking-[-0.02em]'>
          <span className={`font-semibold ${isLight ? 'text-paper' : 'text-ink'}`}>Propel</span>
          <span className={isLight ? 'text-paper/60' : 'text-muted'}> Resume</span>
        </span>
      )}
    </span>
  )
}

export default Logo
