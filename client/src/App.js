import React, { useState, useEffect } from "react";
import { ethers } from "ethers"; 
import Upload from "./artifacts/contracts/Upload.sol/Upload.json"; 
import "./App.css";
import Navbar from './components/Navbar';
import Branding from './components/Branding';
import ServiceCards from "./components/ServiceCards";
import LearnMore from './components/LearnMore'; 
import AboutUs from './components/About-us';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "./components/ContactUs";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [role, setRole] = useState(""); 
  const [flashMessage, setFlashMessage] = useState(""); 

  const clientAddress = "0x3FCE4c894F59e025CB9DcAE051a245d8Cac9F851"; 
  const lawyerAddress = "0x6411c50580Cd29F2Ee2447B55Ca9b91FBd671155"; 
  const judgeAddress = "0x2807c95AE1408a393f85De9F1615938790d2A821";
  const loadProvider = async (selectedRole) => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = await signer.getAddress();

      if (selectedRole === "client" && address.toLowerCase() !== clientAddress.toLowerCase()) {
        showFlashMessage("Please switch to the Client account in MetaMask.");
        return;
      } else if (selectedRole === "lawyer" && address.toLowerCase() !== lawyerAddress.toLowerCase()) {
        showFlashMessage("Please switch to the Lawyer account in MetaMask.");
        return;
      } else if (selectedRole === "judge" && address.toLowerCase() !== judgeAddress.toLowerCase()) {
        showFlashMessage("Please switch to the Judge account in MetaMask.");
        return;
      }


      setAccount(address);
      const contractAddress = "0xBD50bc71d8126f8EfF2d15dD06aEea1bE2395551"; 
      const contract = new ethers.Contract(contractAddress, Upload.abi, signer);

      setContract(contract);
      setProvider(provider);

      console.log(`Connected as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}:`, address);
    } else {
      console.error("MetaMask is not installed");
      console.log(role);
    }
  };

  const showFlashMessage = (message) => {
    setFlashMessage(message);
    setTimeout(() => {
      setFlashMessage("");
    }, 2000); 
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    loadProvider(selectedRole); 
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", () => window.location.reload());
    window.ethereum.on("accountsChanged", () => window.location.reload());
  }, []);

  return (
    <>
      {flashMessage && (
        <div className="flash-message">
          {flashMessage}
        </div>
      )}

      <BrowserRouter>
         
         <Routes>
        <Route path="/LearnMore" element={<LearnMore />} />
        <Route path="/About-us" element={<AboutUs />} />
          <Route
            path="/"
            element={
              <></>
            }
          /> 
          
        </Routes>
        <Navbar />
        {/* Always render Branding on the home page */}
        {!flashMessage && (
          <Branding 
            contract={contract} 
            account={account} 
            provider={provider} 
            onRoleSelected={handleRoleSelection} 
          />
        )}
        
        {/* If flashMessage is active, show the home page (you can customize this section for your homepage content) */}
        {flashMessage && (
          <Branding />
        )}
        
        
        <ServiceCards/>
        <ContactUs /> 
        
      </BrowserRouter>
      {/* <BrowserRouter>
        <Routes>
        <Route path="/LearnMore" element={<LearnMore />} />
        <Route path="/About-us" element={<AboutUs />} />
          <Route
            path="/"
            element={
              <></>
            }
          />
          
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;  
