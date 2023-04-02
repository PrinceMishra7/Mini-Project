import React,{useEffect, useState} from 'react'
import {getCampaign} from "../config";

const CampaignList = () => {
    const [campaign,setcampaign] = useState(null);
    useEffect(() => {
        getCampaign().then(res=>setcampaign(res));
    }, [])
    
  return (
    <div>
        <div>Campaign</div>
        {campaign?campaign.map((c)=><div>
            <div>Name: {c[0]}</div>
            <div>Description: {c[1]}</div>
            <div>Receipent: {c[2]}</div>
            <div>Goal: {Number(c[3])}</div>
            </div>):null}
    </div>
  )
}

export default CampaignList