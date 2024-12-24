import React, { useState } from "react";
import "./Instructions.css"; // Using the existing Instructions.css for styling
import MainPage from './user-client/MainPage.js'; // Client's MainPage
import Lawyer from './lawyer/MainPage.js'; // Lawyer's MainPage
import Judge from './judge/Judge.js';
const Instructions = ({ setModalOpen, onRoleSelected, contract, account, provider }) => {
  const [showMainPage, setShowMainPage] = useState(false); // Track visibility of Client's MainPage
  const [showLawyerPage, setShowLawyerPage] = useState(false); // Track visibility of Lawyer's MainPage
  const [showJudgePage, setShowJudgePage] = useState(false); // Track visibility of Lawyer's MainPage

  return (
    <div className="instructions-container"> {/* Container for entire component */}
      {/* Conditionally render Instructions modal */}
      {!showMainPage && !showLawyerPage && !showJudgePage && (
        <div className="instructions-modal"> {/* Modal overlay class */}
          <button className="close-button" onClick={() => setModalOpen(false)}>
            X
          </button>
          <div className="instructions-content"> {/* Modal content */}
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
                onClick={() => {
                  onRoleSelected("client"); // Pass the role as "client"
                  setShowMainPage(true); // Show Client's MainPage
                }}
              >
                Connect as Client
              </button>
              <button
                className="btn connect-lawyer"
                onClick={() => {
                  onRoleSelected("lawyer"); // Pass the role as "lawyer"
                  setShowLawyerPage(true); // Show Lawyer's MainPage
                }}
              >
                Connect as Lawyer
              </button>
              <button
                className="btn connect-judge"
                onClick={() => {
                  onRoleSelected("judge"); // Pass the role as "Judge"
                  setShowJudgePage(true); // Show Judge's MainPage
                }}
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
          setMainPageOpen={setShowMainPage} // Control Client's MainPage visibility
          contract={contract}
          account={account}
          provider={provider}
          onRoleSelected={onRoleSelected} // Pass role selection callback
        />
      )}

      {/* Conditionally render Lawyer's MainPage when showLawyerPage is true */}
      {showLawyerPage && (
        <Lawyer
          setMainPageOpen={setShowLawyerPage} // Control Lawyer's MainPage visibility
          contract={contract}
          account={account}
          provider={provider}
          onRoleSelected={onRoleSelected} // Pass role selection callback
        />
      )}
      {showJudgePage && (
        <Judge
          setMainPageOpen={setShowJudgePage} // Control judge's MainPage visibility
          contract={contract}
          account={account}
          provider={provider}
          onRoleSelected={onRoleSelected} // Pass role selection callback
        />
      )}
    </div>
  );
};

export default Instructions;
