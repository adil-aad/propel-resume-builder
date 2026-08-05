import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const sheet = {
  name: 'Ada Lovelace',
  role: 'Senior Product Engineer',
  contact: 'ada@example.com · London · linkedin.com/in/ada',
  experience: [
    {
      position: 'Senior Product Engineer',
      company: 'Northwind',
      dates: '2022 — Present',
      line: 'Led the checkout rebuild, cutting drop-off by 18%.',
    },
    {
      position: 'Frontend Engineer',
      company: 'Silverline',
      dates: '2019 — 2022',
      line: 'Shipped the design system used across six products.',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
}

const ResumeSheet = () => (
  <div className='relative'>
    <div className='absolute -right-3 top-3 hidden h-full w-full rounded-lg border border-line bg-surface/50 sm:block' />

    <article className='relative rounded-lg border border-line bg-surface p-7 shadow-[0_28px_70px_-36px_rgb(22_21_15_/_0.4)]'>
      <header>
        <h3 className='text-lg font-semibold text-ink'>{sheet.name}</h3>
        <p className='mt-0.5 text-xs font-medium text-accent'>{sheet.role}</p>
        <p className='mt-2 text-[11px] text-faint'>{sheet.contact}</p>
      </header>

      <section className='mt-6 border-t border-line pt-4'>
        <h4 className='text-[10px] font-semibold uppercase tracking-[0.14em] text-muted'>Experience</h4>

        <div className='mt-3 space-y-4'>
          {sheet.experience.map(item => (
            <div key={item.company}>
              <div className='flex items-baseline justify-between gap-3'>
                <p className='text-[13px] font-medium text-ink'>{item.position}</p>
                <p className='shrink-0 text-[10px] text-faint'>{item.dates}</p>
              </div>
              <p className='text-[11px] text-muted'>{item.company}</p>
              <p className='mt-1 text-[11px] leading-5 text-ink-soft'>{item.line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='mt-5 border-t border-line pt-4'>
        <h4 className='text-[10px] font-semibold uppercase tracking-[0.14em] text-muted'>Skills</h4>
        <div className='mt-3 flex flex-wrap gap-1.5'>
          {sheet.skills.map(skill => (
            <span key={skill} className='rounded border border-line bg-paper px-2 py-1 text-[10px] text-ink-soft'>
              {skill}
            </span>
          ))}
        </div>
      </section>
    </article>
  </div>
)

const Hero = () => (
  <section className='mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28'>
    <div className='grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]'>
      <div>
        <h1 className='max-w-xl text-5xl leading-[1.08] font-medium text-ink md:text-6xl'>
          Write your resume once. Tailor it in minutes.
        </h1>

        <p className='mt-6 max-w-md text-lg leading-8 text-muted'>
          Draft, preview, and export ATS-ready resumes in one uncluttered workspace.
        </p>

        <div className='mt-10 flex flex-wrap gap-3'>
          <Link to='/app?state=register' className='btn btn-primary'>
            Start building
            <ArrowRight className='size-4' />
          </Link>
          <a href='#how' className='btn btn-secondary'>See how it works</a>
        </div>
      </div>

      <div className='lg:pl-6'>
        <ResumeSheet />
      </div>
    </div>
  </section>
)

export default Hero
