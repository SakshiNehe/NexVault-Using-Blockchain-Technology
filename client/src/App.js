import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import "./App.css";
import Navbar from './components/Navbar';
import Branding from './components/Branding';
import ServiceCards from "./components/ServiceCards";
import LearnMore from './components/LearnMore';
import AboutUs from './components/About-us';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xAA36A7' }], // Sepolia chain ID
      });
    } catch (error) {
      console.error("Network switch error:", error);
      alert("Please switch to the Sepolia testnet in MetaMask.");
    }
  };

  const loadProvider = async (selectedRole) => {
    if (typeof window.ethereum === 'undefined') {
      alert("MetaMask is not installed. Please install it to use this app.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = await signer.getAddress();

    if (selectedRole === "client" && address.toLowerCase() !== clientAddress.toLowerCase()) {
      showFlashMessage("You are not using the designated Client account.");
    } else if (selectedRole === "lawyer" && address.toLowerCase() !== lawyerAddress.toLowerCase()) {
      showFlashMessage("You are not using the designated Lawyer account.");
    } else if (selectedRole === "judge" && address.toLowerCase() !== judgeAddress.toLowerCase()) {
      showFlashMessage("You are not using the designated Judge account.");
    }

    setAccount(address);
    const contractAddress = "0xBD50bc71d8126f8EfF2d15dD06aEea1bE2395551";
    const contract = new ethers.Contract(contractAddress, Upload.abi, signer);

    setContract(contract);
    setProvider(provider);

    console.log("Connected account:", address);
    console.log("Selected role:", selectedRole);
    console.log("Contract loaded:", contract ? "Yes" : "No");
  };

  const showFlashMessage = (message) => {
    setFlashMessage(message);
    setTimeout(() => {
      setFlashMessage("");
    }, 2000);
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    switchNetwork(); // Ensure the correct network is selected
    loadProvider(selectedRole);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
  }, []);

  return (
    <>
      {flashMessage && (
        <div className="flash-message">
          {flashMessage}
        </div>
      )}

      <Router>
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
        {!flashMessage && (
          <Branding
            contract={contract}
            account={account}
            provider={provider}
            onRoleSelected={handleRoleSelection}
          />
        )}
        {flashMessage && (
          <Branding />
        )}
        <ServiceCards />
        <ContactUs />
      </Router>
    </>
  );
}

export default App;
