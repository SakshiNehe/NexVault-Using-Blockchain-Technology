import React, { useState } from "react";
import img from "../assets/blockchainImg.png";
import "./Branding.css";
import Instructions from "./Instructions"; // Import the Modal component

export default function Branding({ contract, account, provider, onRoleSelected }) {
  const [modalOpen, setModalOpen] = useState(false); // State to handle modal

  return (
    <div className="container">
      <div className="row ml-2 brand-text align-items-center">
        <div className="col-md-6 d-flex-column">
          <div className="brand-lines">
            <h1>
              Lock In <span className="bold-words">Trust</span>,
              <br />
              Unlock <br />
              <span className="bold-words">Security</span>
            </h1>
          </div>
          <div className="brand-subLines mt-4">
            <h3>Your gateway to Protected Legal Assets</h3>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="btn create-account"
              onClick={() => setModalOpen(true)} // Open modal on button click
            >
              Get Started
            </button>

            {/* Use <a> tag to open in a new tab */}
            <a
              href="/LearnMore"
              target="_blank"
              rel="noopener noreferrer" // For security, prevents the new page from accessing your page's window object
            >
              <button type="button" className="btn learn-more mx-5">
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* Brand image */}
        <img
          src={img}
          className="col-md-5 img-fluid brand-logo"
          alt="brand-logo"
        />
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
