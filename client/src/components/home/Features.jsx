import React from 'react'
import { FileText, LayoutTemplate, ShieldCheck, UploadCloud } from 'lucide-react'
import Title from './Title'

const features = [
  {
    icon: FileText,
    title: 'Guided sections',
    description: 'Work through experience, education, projects, and skills one screen at a time.',
  },
  {
    icon: UploadCloud,
    title: 'PDF import',
    description: 'Upload a resume you already have and keep editing it here.',
  },
  {
    icon: LayoutTemplate,
    title: 'Four templates',
    description: 'Switch layout or accent color and see the change immediately.',
  },
  {
    icon: ShieldCheck,
    title: 'ATS export',
    description: 'Download a text-based PDF that applicant tracking systems can read.',
  },
]

const steps = [
  ['Start', 'Create a blank resume or import an existing PDF.'],
  ['Write', 'Fill in each section with the preview open beside you.'],
  ['Export', 'Download a styled or ATS-ready PDF, or share a link.'],
]

const Features = () => (
  <>
    <section id='features' className='border-t border-line px-6 py-20 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <Title
          align='left'
          title='Everything the resume needs, nothing it does not.'
        />

        <div className='mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title}>
                <Icon className='size-5 text-accent' strokeWidth={1.75} />
                <h3 className='mt-4 text-base font-medium text-ink'>{feature.title}</h3>
                <p className='mt-2 text-sm leading-6 text-muted'>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>

    <section id='how' className='border-t border-line px-6 py-20 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <Title align='left' title='How it works' />

        <ol className='mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3'>
          {steps.map(([label, text], index) => (
            <li key={label} className='bg-paper p-7'>
              <span className='text-sm text-faint tabular-nums'>0{index + 1}</span>
              <h3 className='mt-3 text-base font-medium text-ink'>{label}</h3>
              <p className='mt-2 text-sm leading-6 text-muted'>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </>
)

export default Features
