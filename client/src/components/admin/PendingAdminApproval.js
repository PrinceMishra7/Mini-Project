import React,{useEffect, useState} from 'react'
import {getPendingAdminCampaign,approvecampaign,rejectcampaign} from "../config";

const PendingAdminApproval = () => {
    const [campaign,setcampaign] = useState(null);
    useEffect(() => {
        getPendingAdminCampaign().then(res=>setcampaign(res));
    }, [])

  return (
    <div>
        <div>Need Approval</div>
        {campaign?campaign.map((c)=><div>
            <div>Name: {c[0]}</div>
            <div>Description: {c[1]}</div>
            <div>Receipent: {c[2]}</div>
            <div>Goal: {Number(c[3])}</div>
            <div>
                <button onClick={()=>approvecampaign(Number(c[10]))}>Approve</button>
                <button onClick={()=>rejectcampaign(Number(c[10]))}>Reject</button>
            </div>
            </div>):null}
    </div>
  )
}

export default PendingAdminApproval