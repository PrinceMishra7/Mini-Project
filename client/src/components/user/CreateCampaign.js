import React, { useState } from 'react'
import { createcampaign } from "../config"
import { handleUploadClick } from '../firebaseconfig';

const CreateCampaign = () => {
  const [details, setDetails] = useState({ seeker: "", title: "", description: "", goal: 0 });
  let name, value;

  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setDetails({ ...details, [name]: value });
  }
  async function uploadFile(){
    const downloadUrls = await handleUploadClick(file);
    setDownloadUrl(downloadUrls);
    return downloadUrls;
  }
  async function passData(){
    await createcampaign(details.seeker, details.title, details.description, details.goal,downloadUrl);
  }
  const submitInfo = async () => {
      try {
        const downloadUrl = await uploadFile();
        await passData(downloadUrl);
      } catch (error) {
        console.error(error);
        alert('Error submitting campaign');
      }
  }

  return (
    <div>
      <input type="text" name="title" value={details.title} onChange={handleInputs} placeholder='Title' />
      <input type="text" name="description" value={details.description} onChange={handleInputs} placeholder='Description' />
      <input type="text" name="seeker" value={details.seeker} onChange={handleInputs} placeholder='Reciepent' />
      <input type="number" name="goal" value={details.goal} onChange={handleInputs} placeholder='Goal' />
      <input type="file" onChange={handleFileChange} />
      <button onClick={submitInfo}>Submit</button>
    </div>
  )
}

export default CreateCampaign