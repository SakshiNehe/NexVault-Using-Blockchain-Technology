import React, { useState } from "react";
import { ethers } from "ethers";
import "./Instructions.css"; 
import MainPage from './user-client/MainPage.js'; // Client's MainPage
import Lawyer from './lawyer/MainPage.js'; 
import Judge from './judge/Judge.js';

const Instructions = ({ setModalOpen, onRoleSelected, contract, account, provider }) => {
  const [showMainPage, setShowMainPage] = useState(false);
  const [showLawyerPage, setShowLawyerPage] = useState(false); 
  const [showJudgePage, setShowJudgePage] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  // Define the required addresses for each role
  const clientAddress = "0x3FCE4c894F59e025CB9DcAE051a245d8Cac9F851";
  const lawyerAddress = "0x6411c50580Cd29F2Ee2447B55Ca9b91FBd671155";
  const judgeAddress = "0x2807c95AE1408a393f85De9F1615938790d2A821";

  const showFlashMessage = (message) => {
    setFlashMessage(message);
    setTimeout(() => {
      setFlashMessage("");
    }, 3000);
  };

  const handleRoleClick = async (selectedRole) => {
    try {
      if (window.ethereum) {
        // Get the current account from MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const currentAddress = await signer.getAddress();

        // Check if the current account matches the selected role
        let requiredAddress;
        switch (selectedRole) {
          case "client":
            requiredAddress = clientAddress;
            break;
          case "lawyer":
            requiredAddress = lawyerAddress;
            break;
          case "judge":
            requiredAddress = judgeAddress;
            break;
          default:
            return;
        }

        if (currentAddress.toLowerCase() !== requiredAddress.toLowerCase()) {
          showFlashMessage(`Please switch to the ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} account in MetaMask.`);
          return; // Don't proceed if account doesn't match
        }

        // If account matches, proceed with role selection
        onRoleSelected(selectedRole);
        
        // Set the appropriate page to show
        if (selectedRole === "client") {
          setShowMainPage(true);
        } else if (selectedRole === "lawyer") {
          setShowLawyerPage(true);
        } else if (selectedRole === "judge") {
          setShowJudgePage(true);
        }
      } else {
        showFlashMessage("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Error checking account:", error);
      showFlashMessage("Error connecting to MetaMask. Please try again.");
    }
  };

  return (
    <div className="instructions-container">
      {/* Flash message */}
      {flashMessage && (
        <div className="flash-message" style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          zIndex: 1001,
          fontSize: '14px'
        }}>
          {flashMessage}
        </div>
      )}

      {/* Conditionally render Instructions modal */}
      {!showMainPage && !showLawyerPage && !showJudgePage && (
        <div className="instructions-modal">
          <button className="close-button" onClick={() => setModalOpen(false)}>
            X
          </button>
          <div className="instructions-content">
            <h3>Set Up MetaMask and Blockchain Access</h3>
            <div className="instructions-content">
              <p>
                MetaMask is your gateway to Ethereum and decentralized applications. Follow the steps below to create an account and start using this platform for secure document storage and retrieval:
              </p>
              <h4>Step-by-Step Instructions</h4>
              <ol>
                <li>
                  <span><strong>Install MetaMask Extension:</strong> </span>
                  Visit the <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">official MetaMask website</a> and download the browser extension (available for Chrome, Firefox, or Brave).
                </li>
                <li>
                  <span><strong>Create a MetaMask Wallet:</strong></span>
                  After installing the extension, click on the MetaMask icon in your browser toolbar. Follow the prompts to create a new wallet. Choose a secure password that you will use to access your MetaMask wallet.
                </li>
                <li>
                  <span><strong>Secure Your Recovery Phrase:</strong></span>
                  MetaMask will generate a 12-word seed phrase. Write this phrase down and store it in a safe place (preferably offline). This phrase is the only way to recover your wallet if you forget your password or need to reinstall MetaMask.
                </li>
                <li>
                  <span><strong>Add Ethereum (ETH) to Your Wallet:</strong></span>
                  To interact with the blockchain, you will need some ETH to cover transaction fees (also known as "gas"). You can purchase ETH directly within MetaMask, or transfer it from another wallet or exchange. Ensure you have enough ETH to cover any upcoming transactions.
                </li>
                <li>
                  <span><strong>Connect MetaMask to Ethereum Network:</strong></span>
                  By default, MetaMask is connected to the Ethereum Mainnet. Ensure that MetaMask is unlocked and connected to this network. You can check this by clicking on the MetaMask extension and verifying the network at the top.
                </li>
                <li>
                  <span><strong>Start Using the Platform:</strong></span>
                  Once your MetaMask wallet is set up and connected, you're ready to use this platform. You can store and retrieve documents securely using blockchain technology.
                </li>
              </ol>
              <p>
                If you're new to MetaMask, refer to their <a href="https://metamask.io/faqs/" target="_blank" rel="noopener noreferrer">FAQs</a> for more detailed information.
              </p>
            </div>
            <div className="instruction-buttons">
              <button
                className="btn connect-client"
                onClick={() => handleRoleClick("client")}
              >
                Connect as Client
              </button>
              <button
                className="btn connect-lawyer"
                onClick={() => handleRoleClick("lawyer")}
              >
                Connect as Lawyer
              </button>
              <button
                className="btn connect-judge"
                onClick={() => handleRoleClick("judge")}
              >
                Connect as Judge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conditionally render Client's MainPage when showMainPage is true */}
      {showMainPage && (
        <MainPage
          setMainPageOpen={setShowMainPage} 
          contract={contract}
          account={account}
          provider={provider}
          onRoleSelected={onRoleSelected} 
        />
      )}

      {/* Conditionally render Lawyer's MainPage when showLawyerPage is true */}
      {showLawyerPage && (
        <Lawyer
          setMainPageOpen={setShowLawyerPage} 
          contract={contract}
          account={account}
          provider={provider}
          onRoleSelected={onRoleSelected} 
        />
      )}

      {/* Conditionally render Judge page when showJudgePage is true */}
      {showJudgePage && (
        <Judge
          setMainPageOpen={setShowJudgePage} 
          contract={contract}
          account={account}
          provider={provider}
          onRoleSelected={onRoleSelected} 
        />
      )}
    </div>
  );
};

export default Instructions;