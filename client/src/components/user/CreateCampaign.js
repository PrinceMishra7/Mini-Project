import React, { useState } from 'react'
import {createcampaign} from "../config" 

const CreateCampaign = () => {
    const [details,setDetails] = useState({seeker:"",title:"",description:"",goal:0});
    let name,value;

    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setDetails({...details,[name] : value});
    }

    const submitInfo = () =>{
        createcampaign(details.seeker,details.title,details.description,details.goal);
    }

  return (
    <div>
        <input type="text" name="title" value={details.title} onChange={handleInputs}/>Title
        <input type="text" name="description" value={details.description} onChange={handleInputs}/>Description
        <input type="text" name="seeker" value={details.seeker} onChange={handleInputs}/>Receipent
        <input type="number" name="goal" value={details.goal} onChange={handleInputs}/>Goal
        <button onClick={submitInfo}>Submit</button>
    </div>
  )
}

export default CreateCampaign