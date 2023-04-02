import React,{useEffect, useState} from 'react'
import {getUserVotingCampaign, makevote} from "../config";

const VoteCampaign = () => {
  const [campaign,setcampaign] = useState(null);
    useEffect(() => {
        getUserVotingCampaign().then(res=>setcampaign(res));
    }, [])

  return (
    <div>
        <div>Vote</div>
        {campaign?campaign.map((c)=><div>
            <div>Name: {c[0]}</div>
            <div>Description: {c[1]}</div>
            <div>Receipent: {c[2]}</div>
            <div>Goal: {Number(c[3])}</div>
            <div>
                <button onClick={()=>makevote(Number(c[10]),1)}>Approve</button>
                <button onClick={()=>makevote(Number(c[10]),0)}>Reject</button>
            </div>
            </div>):null}
    </div>
  )
}

export default VoteCampaign;