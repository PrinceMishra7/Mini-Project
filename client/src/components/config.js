// ethers.js
import { ethers,providers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { parseUnits } from 'ethers';
import ABI from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json'

// const value = parseEther('1.0');
// const provider = new JsonRpcProvider('http://localhost:8545');
// const provider = ethers.getDefaultProvider('http://localhost:8545');
let provider = new ethers.BrowserProvider(window.ethereum)
export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export async function connectWallet(){
  return (await provider.getSigner()).address;
}

export async function createcampaign(_seeker, _title, _description, _goal, _downloadURL,_imageUrl,_duration,_category) {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).createCampaign(ethers.getAddress(_seeker), _title, _description, _goal, _downloadURL,_imageUrl,_duration,_category);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function approvecampaign(_id) {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).approveCampaign(_id);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function rejectcampaign(_id) {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).rejectCampaign(_id);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function getCampaign() {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.getCampaigns();
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function getPendingAdminCampaign() {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.getPendingAdminCampaigns();
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function getUserVotingCampaign() {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.getUserVotingCampaigns();
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function getUserDonatingCampaign() {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.getUserDonatingCampaigns();
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function makevote(_id, _val) {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).makeVote(_id,_val);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function endvoting(_id) {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).endVoting(_id);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
} 

export async function donatetocampaign(_id, val) {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const amount = ethers.parseEther(val);
    // const amount = val;
    const tx = await contract.connect(signer).donateToCampaign(_id, { value: amount });
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function getDetailCampaigns(_id){
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.getDetailCampaign(_id.id);
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function mycampaigns(){
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.myCampaigns();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function votedDonationCampaign(){
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.votedDonationCampaigns();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
}

// review


export async function addReview(_id,_message) {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).addReview(_id,_message);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function getReview(_id) {
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.getReview(_id);
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function campaignCount(){
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.campaignsCount();
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function pendingCount(){
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.approvalCount();
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function donatingcount(){
  try {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.donatingCount();
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}
