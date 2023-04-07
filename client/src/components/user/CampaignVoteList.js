import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailCampaigns,addReview,getReview } from '../config';
import VerifiedBadge from "../../images/pngwing.com.png"
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const CampaignVoteList = () => {
    const [data, setData] = useState(null);
    const [review,setReview]=useState("")
    const [reviewList,setReviewList]=useState([])
    let id = useParams();
    
    const fetchReviews=async()=>{
        try {
            const res=await getReview(id.id);
            console.log(res);
            setReviewList(res);
            
        } catch (error) {
            console.log(error.message)
        }
    }
    const sendReview=async()=>{
        console.log("message ",review)
            try {
                await addReview(id.id,review);
                fetchReviews()
            } catch (error) {
                console.log(error.message);
            }
    }
    useEffect(() => {
        getDetailCampaigns(id).then(res => {
            setData(res);
            console.log(res);
            fetchReviews();
        });
       
    }, [])
    let per;
    if (data) {
        per = (Number(data[4]) / Number(data[3]) * 100);
        per = per.toFixed(2);
    }
    return (
        <div>

            <div>
                <Navbar />
                <div className='flex'>
                    <Sidebar active='3' />
                    {/* main content */}
                    <section class="w-3/5 p-6 pt-2 pb-0 mt-0 mx-auto bg-green-500  rounded-md shadow-md  my-10" style={{height:"450px"}} >
                        <h1 class="text-xl font-bold text-white capitalize ">Campaign</h1>

                        <div>
                            {data &&
                                <section class="text-gray-600 body-font overflow-hidden">
                                    <div class="container   py-5 mx-auto">
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
                                                    <span class="text-white">Votes: </span>
                                                    <span class="ml-auto text-white">{(Number(data[14]) / data[12].length) * 100}%</span>
                                                </div>
                                                <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                                                    <span class="text-white">Contributors</span>
                                                    <span class="ml-auto text-white">{data[9].length}</span>
                                                </div>
                                                <div class="flex justify-between mb-1">
                                                    <span class="text-base font-medium text-black">{Number(data[4])} ETH/ {Number(data[3])} ETH</span>
                                                    <span class="text-sm font-medium text-black">{per}%</span>
                                                </div>
                                                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                    <div class="bg-blue-600 h-2.5 rounded-full" style={{ "width": per + '%' }}></div>
                                                </div>
                                               
                                            </div>
                                            <iframe class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={data[13]} type="application/pdf" />
                                        </div>
                                    </div>
                                </section> }

                        

                        </div>
                       
    <h1 className='font-bold'>Write Message...</h1>
    <label for="chat" class="sr-only">Your message</label>
    <div class="flex items-center px-3 py-2 rounded-lg bg-green-500">
       
       
        <textarea id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900  rounded-lg border border-green-500 focus:ring-green-500 focus:border-green-500" placeholder="Your message..." onChange={(e)=>{
            setReview(e.target.value)
       }} ></textarea>
            <button class="inline-flex justify-center p-2 text-white rounded-full cursor-pointer hover:bg-green-700" onClick={sendReview}>
            <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            <span class="sr-only">Send message</span>
        </button>
    </div>

       <div className='mt-10'>
        <h1 className='font-bold'>Reviews</h1>
        <div class='grid grid-cols-2 gap-4' >
        {
           reviewList && reviewList.map((rev)=>{
            return(
                <article class="rounded-xl relative border border-gray-700 bg-green-500 p-4" key={rev[2]}>

  <div class="flex items-center justify-between gap-4">
    <div>
      <div class="flow-root">
        <ul class="-m-1 flex justify-between flex-wrap">
          <li class="p-1 leading-none">
            <h4 class="text-s font-bold text-black">Account</h4>
            <h4 class="text-s mt-1 font-medium text-white">{rev[1]}</h4>
          </li>
        </ul>
      </div>
    </div>
  </div>
                <hr className='mt-1'/>
  <ul class="mt-4 space-y-2">
    <li>
        <p class="mt-1 text-s font-medium text-white">
         {rev[0]}
        </p>
    </li>
  </ul>
<h3 className=' absolute top-3 right-3 text-xs text-grey'>{Number(rev[2])}</h3>
</article>

            )
           }) 
        }
        </div>
       
       </div>


                    </section>
                    

                    {/* <div class="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
    <div class="flex flex-wrap">
      <div class="w-full md:w-2/3 mb-6 md:mb-0">
        <p class="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">I haretra neque non mi aliquam, finibus hart bibendum molestie. Vestibulum suscipit sagittis dignissim mauris.</p>
      </div>
      <div class="w-full md:w-1/3 text-right">
        <p class="mb-8 text-sm text-gray-300">Added 2 months ago</p>
      </div>
    </div>
                        </div> */}

                




                </div>
            </div>
        </div>

    )
}

export default CampaignVoteList