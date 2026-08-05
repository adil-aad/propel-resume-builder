import React from 'react'
import LandingNav from '../components/home/LandingNav'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import GetStarted from '../components/home/GetStarted'
import Footer from '../components/home/Footer'

const Home = () => (
  <div className='min-h-screen bg-paper text-ink'>
    <LandingNav />
    <Hero />
    <Features />
    <GetStarted />
    <Footer />
  </div>
)

export default Home
