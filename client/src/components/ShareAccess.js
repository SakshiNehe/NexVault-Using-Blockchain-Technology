import React, { useState } from 'react';
import './UserAccessList.css';

const ShareAccess = ({ setShareAccessOpen, contract, currentDocument }) => {
  const [address, setAddress] = useState('');

  const handleShare = async () => {
    try {
      await contract.allow(address); // Use the contract's allow function to share access
      setShareAccessOpen(false);
    } catch (error) {
      console.error("Error sharing access:", error);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share Access for Document: {currentDocument?.fileName || "Latest Document"}</div>
        <div className="body">
          <input
            type="text"
            className="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="footer">
          <button
            onClick={() => setShareAccessOpen(false)}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default ShareAccess;
