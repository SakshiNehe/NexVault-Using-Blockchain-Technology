import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider, setIsOpen }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        // Prepare file data for Pinata upload
        const formData = new FormData();
        formData.append("file", file);

        // Upload file to Pinata
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `adbf928b4f3c02322bc0`, // Use your actual Pinata API Key
            pinata_secret_api_key: `8585954119c0db371c9e7e9f1df36a428a8f4b834a93109b2d9584991701d816`, // Use your actual Pinata Secret Key
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log("IPFS Hash:", ImgHash);

        // Connect contract with signer
        const signer = provider.getSigner(); // Get the signer from the provider
        const contractWithSigner = contract.connect(signer); // Connect the signer to the contract

        // Call the add function in the contract to store the file hash on the blockchain
        const transaction = await contractWithSigner.add(account, ImgHash, { gasLimit: 1000000 });
        
        // Wait for the transaction to be confirmed
        await transaction.wait();

        // Alert the user
        alert("Successfully uploaded file hash to blockchain");

        // Reset the file input
        setFileName("No file selected");
        setFile(null);
      } catch (error) {
        console.error("Error uploading file or saving hash to blockchain:", error);
        alert("Unable to upload file to Pinata or save hash to the blockchain.");
      }
    }
  };

  // Handle file selection
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log("Selected file:", data);
    setFile(data);
    setFileName(data.name);
    e.preventDefault();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={() => setIsOpen(false)}>X</button>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="choose">
            Choose File
          </label>
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          <span className="textArea">File: {fileName}</span>
          <button type="submit" className="upload" disabled={!file}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
