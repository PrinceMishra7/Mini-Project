import React from 'react'
import { useNavigate } from 'react-router-dom'
import Features from './Pages/features'
import HeroSection from './Pages/Herosection'

const Landing = () => {
    let navigate = useNavigate();
    return (
      <div>
        <HeroSection/>
    <Features/>
      </div>
    
   
  )
}

export default Landing