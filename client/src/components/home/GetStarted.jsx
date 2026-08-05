import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const GetStarted = () => (
  <section id='cta' className='px-6 pb-20 lg:px-8'>
    <div className='mx-auto flex max-w-6xl flex-col items-start gap-8 rounded-xl bg-ink px-8 py-14 sm:px-12 lg:flex-row lg:items-center lg:justify-between'>
      <h2 className='max-w-lg text-3xl leading-tight font-medium text-paper md:text-4xl'>
        Your next resume is about ten minutes away.
      </h2>

      <Link
        to='/app?state=register'
        className='btn shrink-0 bg-paper px-5 py-3 text-ink hover:bg-white'
      >
        Start building
        <ArrowRight className='size-4' />
      </Link>
    </div>
  </section>
)

export default GetStarted
