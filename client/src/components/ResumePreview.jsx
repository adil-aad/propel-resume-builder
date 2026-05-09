import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({data, template, accentColor, classes = '', showHeader = true}) => {
    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor}/>
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor}/>
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>  
        
            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>;
        }
    }
  return (
    <div className={'rounded-[28px] border border-slate-200 bg-white/80 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)] backdrop-blur ' + classes}>
        {showHeader && (
            <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-400'>Live Preview</p>
                    <h3 className='text-sm font-semibold text-slate-800'>Template: {template || 'classic'}</h3>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-xs text-slate-500'>Accent</span>
                    <span className='h-4 w-4 rounded-full border border-white shadow-sm' style={{ backgroundColor: accentColor }} />
                </div>
            </div>
        )}

        <div className={`bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.16),_transparent_55%)] ${showHeader ? 'p-3 sm:p-5' : ''}`}>
            <div id='resume-preview' className='overflow-hidden rounded-2xl border border-slate-200 bg-white print:border-none print:shadow-none'>
                {renderTemplate()}
            </div>
        </div>
    </div>
  )
}

export default ResumePreview
