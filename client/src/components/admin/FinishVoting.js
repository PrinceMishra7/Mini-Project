import React,{useEffect, useState} from 'react'
import {getUserVotingCampaign, endvoting} from "../config";

const FinishVoting = () => {
    const [campaign,setcampaign] = useState(null);
    useEffect(() => {
        getUserVotingCampaign().then(res=>setcampaign(res));
    }, [])

    return (
        <div>
            <div>Finish Elections</div>
            {campaign?campaign.map((c)=><div>
                <div>Name: {c[0]}</div>
                <div>Description: {c[1]}</div>
                <div>Receipent: {c[2]}</div>
                <div>Goal: {Number(c[3])}</div>
                <div>
                    <button onClick={()=>endvoting(Number(c[10]))}>Stop</button>
                </div>
                </div>):null}
        </div>
      )
}

export default FinishVoting

