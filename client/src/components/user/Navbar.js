import React,{useState,useEffect} from 'react'
import { connectWallet } from '../config';
const Navbar = () => {
  const [account,setAccount] =useState(null);
  useEffect(() => {
    connectWallet().then((res)=>setAccount(res))
  }, [])
  return (
    <div>
<header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl text-green-500 font-bold">CryptoFunder</span>
    </a>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-right">
      <h3 class="mr-5 hover:text-gray-900 text-green-500 text-1xl font-bold">User</h3>
      <h4 class="mr-5 hover:text-gray-900  text-gray-500">{account}</h4>
    </nav>
  </div>
</header>

    </div>
  )
}

export default Navbar