import React,{useEffect, useState} from 'react'
import {getUserDonatingCampaign,donatetocampaign} from "../config";

const DonateCampaignList = () => {
  const [amount, setAmount] = useState(0);
  const [campaign,setcampaign] = useState(null);
    useEffect(() => {
        getUserDonatingCampaign().then(res=>setcampaign(res));
    }, [])
  return (
    <div>
      <div>Donate</div>
        {campaign?campaign.map((c)=><div>
            <div>Name: {c[0]}</div>
            <div>Description: {c[1]}</div>
            <div>Receipent: {c[2]}</div>
            <div>Goal: {Number(c[3])}</div>
            <div>Amount Raised: {Number(c[4])}</div>
            <div>Contributors: </div>
            <div>
              <input type='number' name='amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
              <button onClick={()=>donatetocampaign(Number(c[10]),amount)}>Donate</button>
            </div>
            </div>):null}
    </div>
  )
}

export default DonateCampaignList