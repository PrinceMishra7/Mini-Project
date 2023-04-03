import React from 'react'
import { useNavigate } from 'react-router-dom'
import landingImage from './landing.jpg'
const Landing = () => {
    let navigate = useNavigate();
    return (

      <>

<header class="text-gray-600 body-font mt-6">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
  <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl font-bold text-green-500">CryptoFunder</span>
    </a>
  </div>
</header>

       <section class="text-gray-600 body-font mt-10">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-9xl mb-4 font-bold  text-green-500" style={{fontSize:'50px'}}>CryptoFunder
        <br class="hidden lg:inline-block"/> 
      </h1>
      <h1 class="title-font sm:text-2xl text-2xl mb-4  text-gray-600">
      Empowering the Future of Crowdfunding with Blockchain Technology.
      </h1>
      <p class="mb-8 leading-relaxed pr-4">Join our blockchain-based crowdfunding platform and be a part of the decentralized future of fundraising.Experience the power of blockchain technology and take your fundraising to the next level with our decentralized crowdfunding platform.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg" onClick={()=>navigate('/admin/dashboard')} >ADMIN</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg" onClick={()=>navigate('/user/dashboard')} >USER</button>
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 pr-4">
      <img class="object-cover object-center rounded" alt="hero" src={landingImage}/>
    </div>
  </div>
</section>
      </>
   
  )
}

export default Landing