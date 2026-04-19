import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import GetStarted from '../components/home/GetStarted'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div>
        <Banner />
        <Hero />
        <Features/>
        <GetStarted />
        <Footer />
    </div>
  )
}

export default Home