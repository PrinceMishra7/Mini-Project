import React,{useEffect, useState} from 'react'
import {getPendingAdminCampaign,approvecampaign,rejectcampaign} from "../config";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import VerifiedBadge from "../../images/pngwing.com.png"
import { useNavigate } from 'react-router-dom';
const PendingAdminApproval = () => {
    const navigate=useNavigate();
    const [campaign,setcampaign] = useState(null);
    useEffect(() => {
        getPendingAdminCampaign().then(res=>setcampaign(res));
    }, [])

  return (
    <div>
      <Navbar/>
      <div className="flex">
        <Sidebar active='3' />
        
        <div class="container w-4/5  px-5 my-5 ">
          {campaign ? campaign.map((c) =>
            <div class=" outline outline-offset-2 outline-green-500 relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2 mb-4">

              <div class="z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                <div class="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom"><img src={c[13][1]} className='w-full h-full' /></div>
              </div>

              <div class="z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
                <div class="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
                  <div className='flex grid grid-cols-2'>
                    <h3 class="hidden md:block font-bold text-2xl text-gray-700">{c[0]}</h3>
                    {c[5] ? <img className='py-1 ' src={VerifiedBadge} width={20} height={20} /> : null}
                  </div>
                  <h4 class="hidden md:block text-md text-gray-400">By {c[15]}</h4>
                  <p class="text-gray-600 text-justify">{c[1]}</p>
                  <div className='flex justify-between'>
                    <h3 class="hidden md:block font-bold text-lg text-gray-700">Receipent: </h3>
                    <h3 class="hidden md:block font-bold text-lg text-gray-700">{c[2]}</h3>
                  </div>
                  <div className='flex justify-between'>
                    <h3 class="hidden md:block font-bold text-lg text-gray-700">Goal: </h3>
                    <h3 class="hidden md:block font-bold text-lg text-gray-700">{Number(c[3])}</h3>
                  </div>
                  <div class="flex justify-between mt-6">
                <button class="px-6 py-2 leading-5 text-white font-bold transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-900 focus:outline-none focus:bg-green-600"
                  onClick={()=>approvecampaign(Number(c[8]))}
                >Approve</button>
                <button class="px-6 py-2 leading-5 text-white font-bold transition-colors duration-200 transform bg-red-900 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600"
                  onClick={()=>rejectcampaign(Number(c[8]))}
                >Reject</button>
                <button class="px-6 py-2 leading-5 text-white font-bold transition-colors duration-200 transform bg-green-900 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-600"
                  onClick={()=>navigate('/admin/approval/'+Number(c[8]))}
                >View More</button>
              </div>
                </div>
              </div>
            </div>
          
          ) : "No Pending Campaigns"}

        </div>



      </div>


        {/* {campaign?campaign.map((c)=><div>
            <div>Name: {c[0]}</div>
            <div>Description: {c[1]}</div>
            <div>Receipent: {c[2]}</div>
            <div>Goal: {Number(c[3])}</div>
            <div>
                <button onClick={()=>approvecampaign(Number(c[10]))}>Approve</button>
                <button onClick={()=>rejectcampaign(Number(c[10]))}>Reject</button>
            </div>
            </div>):null} */}
    </div>
  )
}

export default PendingAdminApproval