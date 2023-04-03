// ethers.js
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { parseUnits } from 'ethers';
import ABI from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json'

// const value = parseEther('1.0');
const provider = new JsonRpcProvider('http://localhost:8545');
export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3PS'

// Function to connect to a wallet
export async function connectWallet() {
  try {
    // Request access to the user's MetaMask wallet
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get the user's account and create a new ethers.js signer with it
    const [account] = await provider.listAccounts();
    const signer = provider.getSigner(account);

    // Return the signer object
    return { signer, account };
  } catch (error) {
    console.log('Error connecting to wallet:', error);
    return null;
  }
}

export async function createcampaign(_seeker,_title, _description, _goal) {
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).createCampaign(ethers.getAddress(_seeker),_title, _description, _goal);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function approvecampaign(_id) {
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).approveCampaign(_id);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function rejectcampaign(_id) {
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).rejectCampaign(_id);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function getCampaign() {
  try {
    const signer = provider.getSigner();
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
    const signer = provider.getSigner();
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
    const signer = provider.getSigner();
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
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const result = await contract.getUserDonatingCampaigns();
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function makevote(_id,_val) {
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).makeVote(_id,_val);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function endvoting(_id) {
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).endVoting(_id);
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

export async function donatetocampaign(_id,val) {
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const amount = ethers.parseEther(val);
    // const amount = val;
    const tx = await contract.connect(signer).donateToCampaign(_id,{value:amount});
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}