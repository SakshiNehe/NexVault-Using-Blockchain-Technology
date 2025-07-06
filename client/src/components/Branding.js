import React, { useState } from "react";
import img from "../assets/blockchainImg.png";
import "./Branding.css";
import Instructions from "./Instructions"; // Import the Modal component
import Button from './ui/Button'
export default function Branding({ contract, account, provider, onRoleSelected }) {
  const [modalOpen, setModalOpen] = useState(false); // State to handle modal

  return (
    <div className="branding-container">
      <div className="branding-content">
        <div className="branding-text">
          <div className="brand-lines">
            <h1>
              Lock In <span className="bold-words">Trust</span>,<br />
              Unlock <br />
              <span className="bold-words">Security</span>
            </h1>
          </div>
          <div className="brand-sublines">
            <h3>Your gateway to Protected Legal Assets</h3>
          </div>
          <div className="branding-buttons">
            <Button
              variant="primary"
              size="large"
              onClick={() => setModalOpen(true)} // Open modal on button click
            >
              Get Started
            </Button>

            {/* Use <a> tag to open in a new tab */}
            <a
              href="/LearnMore"
              target="_blank"
              rel="noopener noreferrer" // For security, prevents the new page from accessing your page's window object
            >
              <Button variant="secondary" size="large">
                Learn More
              </Button>
            </a>
          </div>
        </div>
        <div className="branding-image">
          <img src={img} alt="brand-logo" />
        </div>
      </div>

      {/* Render the modal only when modalOpen is true */}
      {modalOpen && (
        <Instructions
          setModalOpen={setModalOpen}
          contract={contract}
          account={account}
          provider={provider}
          onRoleSelected={onRoleSelected} // Pass role selection callback
        />
      )}
    </div>
  );
}