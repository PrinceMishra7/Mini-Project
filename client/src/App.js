import react from 'react';
import { ethers } from "ethers";
import {useState,useEffect} from 'react';
import Crowdfunding from "./artifacts/contracts/Crowdfunding.sol/Crowdfunding.json";
function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        console.log("Provider", provider)
        const signer = provider.getSigner();
        console.log("Signer", signer)
        const address = await signer.getAddress();
        address && setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,
          Crowdfunding.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
        contract && console.log("Contract", contract)
        provider && console.log("Provider", provider)
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);


  return (
    <div className="App">
      <h1>Account : {account? account:"Not Connected"}</h1>
      <h1>Crowdfunding Application</h1>
    </div>
  );
}

export default App;
