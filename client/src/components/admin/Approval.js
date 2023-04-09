import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailCampaigns, approvecampaign,rejectcampaign } from '../config';
import VerifiedBadge from "../../images/pngwing.com.png"
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const Approval = () => {
    const [amount, setAmount] = useState(0);
    const [data, setData] = useState(null);
    const [review, setReview] = useState("")
    const [reviewList, setReviewList] = useState([])
    let id = useParams();
    useEffect(() => {
        getDetailCampaigns(id).then(res => {
            setData(res);
            console.log(res);
        });

    }, [])

    return (
        <div>

            <div>
                <Navbar />
                <div className='flex'>
                    <Sidebar active='3' />
                    {/* main content */}
                    <section class="max-w-4xl p-6 mx-auto bg-green-500  rounded-md shadow-md  my-auto" >
                        <h1 class="text-xl font-bold text-white capitalize ">Campaign</h1>

                        <div>
                            {data &&
                                <section class="text-gray-600 body-font overflow-hidden">
                                    <div class="container  py-5 mx-auto">
                                        <div class="lg:w-full mx-auto flex flex-wrap">
                                            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                                <div className='flex grid grid-cols-2 '>
                                                    <h1 class="text-white text-3xl w-full">{data[0]}</h1>
                                                    {data[5] ? <img className='py-2 ' src={VerifiedBadge} width={20} height={20} /> : null}
                                                </div>
                                                <h1 class="text-white text-md title-font font-medium mb-1">Started by: {data[15]}</h1>
                                                <div class="flex mb-4">
                                                    <a class="flex-grow text-black border-b-2 border-black py-2 text-lg px-1">Details</a>
                                                </div>
                                                <p class="text-white leading-relaxed mb-4">{data[1]}</p>
                                                <div class="flex border-t border-gray-200 py-2">
                                                    <span class="text-white">Receipent: </span>
                                                    <span class="ml-auto text-white">{(data[2])}</span>
                                                </div>
                                                <div class="flex border-t border-gray-200 py-2">
                                                    <span class="text-white">Goal: </span>
                                                    <span class="ml-auto text-white">{Number(data[3])}</span>
                                                </div>
                                                <div class="flex justify-between mt-6">
                <button class="px-6 py-2 leading-5 text-white font-bold transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-900 focus:outline-none focus:bg-green-600"
                  onClick={()=>approvecampaign(Number(data[8]))}
                >Approve</button>
                <button class="px-6 py-2 leading-5 text-white font-bold transition-colors duration-200 transform bg-red-900 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600"
                  onClick={()=>rejectcampaign(Number(data[8]))}
                >Reject</button>
              </div>
                                            </div>
                                            <iframe class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={data[13]} type="application/pdf" />
                                        </div>
                                    </div>
                                </section>}

                        </div>


     
                    </section>
                </div>



            </div>
        </div>

    )
}

export default Approval;