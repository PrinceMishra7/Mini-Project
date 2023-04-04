import React from 'react'
import { useNavigate } from 'react-router-dom'
import Features from './Pages/features'
import HeroSection from './Pages/Herosection'
import Navbar from './navbar'
import Footer from './footer'
const Landing = () => {
    let navigate = useNavigate();
    return (
      <div>
        <Navbar/>
        <HeroSection/>
    <Features/>
    <Footer/>
      </div>
  )
}

export default Landing