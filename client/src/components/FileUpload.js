import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider, setIsOpen }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const resFile = await axios({
        method: "post",
        url: "https://uploads.pinata.cloud/v3/files",
        data: formData,
        headers: {
          pinata_api_key: "f2307323a8c5e77e5a53",
          pinata_secret_api_key: "fbc08326e485eedae093564d668300c3291e260ebc2add02488954522e884bf4",
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      console.log("✅ Uploaded to Pinata:", ImgHash);

      // ✅ Use contract directly since it's already connected with signer
      const tx = await contract.add(account, ImgHash, {
        gasLimit: 1000000,
      });

      await tx.wait();
      alert("✅ Successfully uploaded file hash to blockchain!");
      setFile(null);
      setFileName("No file selected");
    } catch (error) {
      console.error("❌ Upload or Blockchain Error:", error);

      if (error.response) {
        alert(`Pinata Error: ${error.response.data.error || "Check console."}`);
      } else if (error.request) {
        alert("No response from Pinata. Possible CORS or network issue.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setFileName(data.name);
    }
    e.preventDefault();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={() => setIsOpen(false)}>X</button>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="choose">Choose File</label>
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
