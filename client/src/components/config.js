// ethers.js
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { parseUnits } from 'ethers';
import ABI from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json'

// const value = parseEther('1.0');
const provider = new JsonRpcProvider('http://localhost:8545');
export const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

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
    console.log(_seeker+" "+_title+" "+_description+ " " +_goal)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    const tx = await contract.connect(signer).createCampaign(ethers.getAddress(_seeker),_title, _description, _goal);
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
