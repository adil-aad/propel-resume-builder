import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({ data, template, accentColor, classes = '' }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} accentColor={accentColor} />
      case 'minimal':
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case 'minimal-image':
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div
      id='resume-preview'
      className={`overflow-hidden rounded-lg border border-line bg-white shadow-[0_24px_60px_-40px_rgb(22_21_15_/_0.4)] print:border-none print:shadow-none ${classes}`}
    >
      {renderTemplate()}
    </div>
  )
}

export default ResumePreview
