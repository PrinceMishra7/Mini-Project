import React, { useEffect, useState } from 'react'
import {connectWallet,addReview,getReview} from '../config'
const Review = () => {
    const [review,setReview]=useState("")
    const [reviewList,setReviewList]=useState([])
    const [account,setAccount]=useState(null)
    const sendReview=async()=>{
        console.log("message ",review)
            try {
                await addReview(1,review);
            } catch (error) {
                console.log(error.message);
            }
    }
    const fetchReviews=async()=>{
        try {
            const res=await getReview(1);
            console.log(res);
            setReviewList(res);
            
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        connectWallet().then((res)=>setAccount(res))
        fetchReviews();
    },[])
  return (
    <div>
        <h1>Account : {account}</h1>
       <h1>Write Review...</h1>
       <textarea name="review" id="review" className='border-2' cols="30" rows="5" onChange={(e)=>{
            setReview(e.target.value)
       }}></textarea>
       <button onClick={sendReview}>Submit</button>

       <div className='mt-10'>
        <h1>Reviews</h1>
        {
           reviewList && reviewList.map((rev)=>{
            return(
                <div key={rev[2]}>
                    <h1>{"message : "+rev[0]}</h1>
                    <h1>{"Account : " +  rev[1]}</h1>
                </div>
            )
           }) 
        }
       </div>
    </div>
  )
}

export default Review