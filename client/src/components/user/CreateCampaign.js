import React, { useEffect, useState } from 'react'
import { createcampaign, connectWallet } from "../config"
import { handleUploadClick,handleUploadsClick } from '../firebaseconfig';
import Sidebar from './Sidebar';
import "../admin/sidebar.css"
import Navbar from './Navbar';
const CreateCampaign = () => {
  const [details, setDetails] = useState({ seeker: "", title: "", description: "", goal: 0 });
  let name, value;

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setDetails({ ...details, [name]: value });
  }
  // async function passData(downloadUrl,imageUrl){
  //   console.log("Creating Campaign")
  //   await createcampaign(details.seeker, details.title, details.description, details.goal,downloadUrl,imageUrl);
  //   console.log("Finished Campaign")
  // }
  // async function uploadFile(imageUrl){
  //   console.log("Uploading File")
  //   const downloadUrls = await handleUploadClick(file);
  //   await passData(downloadUrls,imageUrl);
  //   console.log("finished uploading file: "+downloadUrls)
  // }
  // async function uploadImage(){
  //   console.log("Uploading Image")
  //   const downloadUrls = await handleUploadClick(image);
  //   await uploadFile(downloadUrls);
  //   console.log("finished uploading image: "+downloadUrls)
  // }
  
  
  // const submitInfo = async () => {
  //     try {
  //       await uploadImage();
  //     } catch (error) {
  //       console.error(error);
  //       alert('Error submitting campaign');
  //     }
  // }
  async function passData(){
    try {
      console.log("file"+file);
      console.log("image"+image);
      let imageUrl = await uploadImage();
      let downloadUrl = await uploadFile();
      console.log("Creating Campaign")
      await createcampaign(details.seeker, details.title, details.description, details.goal,downloadUrl,imageUrl);
      console.log("Finished Campaign")
    } catch (error) {
      throw error;
    }
  }
  
  async function uploadFile(){
    try {
      console.log("Uploading File")
      const downloadUrls = await handleUploadClick(file);
      console.log("finished uploading file: "+downloadUrls)
      return downloadUrls;
    } catch (error) {
      throw error;
    }
  }
  
  async function uploadImage(){
    try {
      console.log(image)
      console.log("Uploading Image")
      const downloadUrls = await handleUploadsClick(image);
      console.log("finished uploading image: "+downloadUrls)
      return downloadUrls;
    } catch (error) {
      throw error;
    }
  }
  
  const submitInfo = async () => {
    try {
      await passData();
    } catch (error) {
      console.error(error);
      alert('Error submitting campaign');
    }
  }
  useEffect(() => {
    connectWallet().then((res)=>setDetails({...details,["seeker"]:res}))
  }, [])
  

  return (
    <div>
      {/* <Navbar /> */}
      <div className='flex  '>
      <Sidebar active='2'/>
      {/* main content */}
      <section class="max-w-4xl p-6 mx-auto bg-green-500  rounded-md shadow-md mt-5 mb-5 my-auto container px-5 my-5 " >
    <h1 class="text-xl font-bold text-white capitalize ">Create Campaign</h1>
    
        <div class="grid grid-cols-2 gap-6 mt-4 p-2">
            <div>
                <label class="text-white " for="username">Title</label>
                <input id="title" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
               onChange={handleInputs} name="title" value={details.title} />
            </div>
            

            <div >
                <label class="text-white " for="goal">Goal</label>
                <input id="goal" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500  focus:outline-none focus:ring"   onChange={handleInputs} name="goal" value={details.goal}/>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-6 mt-4 p-2">
            <div >
                <label class="text-white " for="reciepent">Reciepent</label>
                <input id="reciepent" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md    focus:border-blue-500  focus:outline-none focus:ring" onChange={handleInputs} name="seeker" value={details.seeker}/>
            </div>
          
            <div>
                <label class="text-white " for="description">Description</label>
                <textarea id="description" type="textarea" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500  focus:outline-none focus:ring"  onChange={handleInputs} name="description" value={details.description}></textarea>
            </div>
        </div>
        <div>
                <label class="block text-sm font-medium text-white">
                Document
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative py-1 px-1 cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <input type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <p class="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p class="text-xs text-white">
                    Only PDF's accepted upto 10MB
                  </p>
                </div>
              </div>
              <label class="block text-sm font-medium text-white">
                Image
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative py-1 px-1 cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <input type="file" accept='image/*' onChange={(e)=>{setImage(e.target.files[0])}}/>
                    </label>
                    <p class="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p class="text-xs text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
        <div class="flex justify-end mt-6">
            <button class="px-6 py-2 leading-5 text-white font-bold transition-colors duration-200 transform bg-green-900 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600"  
            onClick={submitInfo}
            >Create</button>
        </div>
    
</section>
      </div>
      
     

      {/* <input type="text" name="title" value={details.title} onChange={handleInputs} placeholder='Title' />
      <input type="text" name="description" value={details.description} onChange={handleInputs} placeholder='Description' />
      <input type="text" name="seeker" value={details.seeker} onChange={handleInputs} placeholder='Reciepent' />
      <input type="number" name="goal" value={details.goal} onChange={handleInputs} placeholder='Goal' />
      <input type="file" onChange={handleFileChange} />
      <button onClick={submitInfo}>Submit</button> */}
    </div>
  )
}

export default CreateCampaign