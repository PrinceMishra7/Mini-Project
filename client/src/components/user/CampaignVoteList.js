import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailCampaigns} from '../config';
import VerifiedBadge from "../../images/pngwing.com.png"

const CampaignVoteList = () => {
    const [amount, setAmount] = useState(0);
    const [data, setData] = useState(null);
    let id = useParams();
    useEffect(() => {
        getDetailCampaigns(id).then(res => setData(res));
    }, [])
    let per;
    if (data) {
        per = Number(data[4]) / Number(data[3]) * 100;
        per = per.toFixed(2);
    }
    return (
        <div>
            {data  && Number(data[7]) == 1 ?
                <section class="text-gray-600 body-font overflow-hidden">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="lg:w-4/5 mx-auto flex flex-wrap">
                            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                <div className='columns-2'>
                                    <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{data[0]}</h1>
                                    {data[5]?<img className='py-2' src={VerifiedBadge} width={20} height={20} />:null}
                                </div>
                                <h1 class="text-gray-900 text-md title-font font-medium mb-1">Started by: {data[15]}</h1>
                                <div class="flex mb-4">
                                    <a class="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Details</a>
                                </div>
                                <p class="leading-relaxed mb-4">{data[1]}</p>
                                <div class="flex border-t border-gray-200 py-2">
                                    <span class="text-gray-500">Votes: </span>
                                    <span class="ml-auto text-gray-900">{(Number(data[14]) / data[12].length) * 100}%</span>
                                </div>
                                <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                                    <span class="text-gray-500">Contributors</span>
                                    <span class="ml-auto text-gray-900">{data[9].length}</span>
                                </div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-base font-medium text-black">{Number(data[4])} ETH/ {Number(data[3])} ETH</span>
                                    <span class="text-sm font-medium text-black">{per}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div class="bg-blue-600 h-2.5 rounded-full" style={{ "width": per + '%' }}></div>
                                </div>
                                <div className='py-2'>
                                    <div class="relative">
                                        <input type="number" id="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                                        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 " onClick={()=>donatetocampaign(id.id,amount)}>Donate</button>
                                    </div>

                                </div>
                            </div>
                            <iframe class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={data[13]} type="application/pdf" />
                        </div>
                    </div>
                </section> : null}</div>
    )
}

export default CampaignVoteList