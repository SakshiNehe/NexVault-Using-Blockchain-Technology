import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Branding from './components/Branding';
import ServiceCards from "./components/ServiceCards";
import ContactUs from "./components/ContactUs";
import LearnMore from './components/LearnMore';
import AboutUs from './components/About-us';
import Footer from './components/Footer';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [role, setRole] = useState("");
  const [flashMessage, setFlashMessage] = useState("");

  const addresses = {
    client: "0x3FCE4c894F59e025CB9DcAE051a245d8Cac9F851",
    lawyer: "0x6411c50580Cd29F2Ee2447B55Ca9b91FBd671155",
    judge:  "0x2807c95AE1408a393f85De9F1615938790d2A821"
  };

  const loadProvider = async (selectedRole) => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = await signer.getAddress();

      const expectedAddress = addresses[selectedRole]?.toLowerCase();
      if (expectedAddress && address.toLowerCase() !== expectedAddress) {
        showFlashMessage(`Please switch to the ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} account in MetaMask.`);
        return;
      }

      const contractAddress = "0xBD50bc71d8126f8EfF2d15dD06aEea1bE2395551";
      const contract = new ethers.Contract(contractAddress, Upload.abi, signer);

      setAccount(address);
      setContract(contract);
      setProvider(provider);
      setRole(selectedRole);

      console.log(`🔐 Connected as ${selectedRole}:`, address);
    } catch (err) {
      console.error("❌ Error connecting wallet:", err);
    }
  };

  const showFlashMessage = (message) => {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(""), 3000);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
  }, []);

  return (
    <div className="app">
      {flashMessage && (
        <div className="flash-message">
          <p>{role}</p>
          <strong>{flashMessage}</strong>
        </div>
      )}

      <BrowserRouter basename="/NexVault-Using-Blockchain-Technology">
        <Navbar />
        <Routes>
          <Route path="/LearnMore" element={<LearnMore />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route
            path="/"
            element={
              <main className="main-content">
                <Branding
                  contract={contract}
                  account={account}
                  provider={provider}
                  onRoleSelected={loadProvider}
                />
                <div id="services">
                  <ServiceCards />
                </div>
                <div id="contact">
                  <ContactUs />
                </div>
                <Footer />
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
