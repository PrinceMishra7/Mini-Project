import React, { useEffect, useState } from 'react'
import {connectWallet,addReview} from '../config'
const Review = () => {
    const [review,setReview]=useState("")
    const [account,setAccount]=useState(null)
    const sendReview=async()=>{
        console.log("message ",review)
            try {
                await addReview(1,review);
            } catch (error) {
                console.log(error.message);
            }
    }
    useEffect(()=>{
        connectWallet().then((res)=>setAccount(res))
    },[])
  return (
    <div>
        <h1>Account : {account}</h1>
       <h1>Write Review...</h1>
       <textarea name="review" id="review" cols="30" rows="10" onChange={(e)=>{
            setReview(e.target.value)
       }}></textarea>
       <button onClick={sendReview}>Submit</button>
    </div>
  )
}

export default Review