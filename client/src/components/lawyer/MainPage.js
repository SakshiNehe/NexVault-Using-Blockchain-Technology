import React, { useState, useEffect, useCallback } from 'react';
import './MainPage.css';
import { FaUpload, FaUserPlus, FaUserMinus, FaUserFriends } from 'react-icons/fa';
import FileUpload from '../FileUpload';
import RevokeAccess from '../RevokeAccess';
import ImagePopup from '../ImagePopup';

function MainPage({ setMainPageOpen, contract, account, provider }) {
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isUserAccessOpen, setIsUserAccessOpen] = useState(false);
  const [isShareAccessOpen, setIsShareAccessOpen] = useState(false);
  const [isRevokeAccessOpen, setIsRevokeAccessOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [latestDocument, setLatestDocument] = useState(null);
  const [targetAddress, setTargetAddress] = useState('');
  const [clientDocs, setClientDocs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDocuments = useCallback(async () => {
    try {
      const dataArray = await contract.display(account);
      if (dataArray?.length > 0) {
        setDocuments(dataArray);
        setLatestDocument(dataArray[dataArray.length - 1]);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  }, [contract, account]);

  const getClientDocs = useCallback(async () => {
    if (!contract) {
      setError("Contract not initialized");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const docs = await contract.display(targetAddress || account);
      if (docs?.length > 0) {
        const images = docs.map((doc, i) => (
          <p key={i} onClick={() => setSelectedImage(doc)}>
            <img src={doc} alt="document" className="image-list" />
          </p>
        ));
        setClientDocs(images);
      } else {
        setError("No documents to display");
      }
    } catch (err) {
      setError(`Error fetching documents: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [contract, targetAddress, account]);

  const shareAccess = async () => {
    try {
      await contract.allow(targetAddress);
      setIsShareAccessOpen(false);
    } catch (err) {
      console.error("Error sharing access:", err);
    }
  };

  useEffect(() => {
    if (contract && account) {
      fetchDocuments();
    }
  }, [contract, account, fetchDocuments]);

  return (
    <div className="mainpage-modal-overlay">
      <div className="mainpage-modal-content">
        {/* Sidebar */}
        <div className="sidebar document-list">
          <h3>View Documents</h3>
          <ul>
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <li key={index} onClick={() => setSelectedDocument(doc)}>
                  {doc.fileName || `Document ${index + 1}`}
                </li>
              ))
            ) : (
              <li>No documents uploaded yet</li>
            )}
          </ul>
        </div>

        {/* Main Dashboard */}
        <div className="dashboard-content">
          <button className="close-btn" onClick={() => setMainPageOpen(false)}>X</button>
          <h3>Lawyer</h3>
          <div className="portal-title"><span>Account:</span> {account}</div>

          <div className="button-container">
            <div className="dashboard-button" onClick={() => setIsFileUploadOpen(true)}>
              <FaUpload size={40} />
              <h3>Upload Document</h3>
            </div>

            <div className="dashboard-button" onClick={() => setIsUserAccessOpen(true)}>
              <FaUserFriends size={40} />
              <h3>Access Documents</h3>
            </div>

            <div className="dashboard-button" onClick={() => setIsShareAccessOpen(true)}>
              <FaUserPlus size={40} />
              <h3>Share with Judge</h3>
            </div>

            <div className="dashboard-button" onClick={() => setIsRevokeAccessOpen(true)}>
              <FaUserMinus size={40} />
              <h3>Revoke Access</h3>
            </div>
          </div>

          {/* Modals */}
          {isFileUploadOpen && (
            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
              setIsOpen={setIsFileUploadOpen}
            />
          )}

          {isUserAccessOpen && (
            <div className="access-client-documents">
              <input
                className="address-input"
                placeholder="Enter Client's Address"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
              />
              <button className="confirm-btn" onClick={getClientDocs}>Fetch</button>
              <button className="cancel-btn" onClick={() => setIsUserAccessOpen(false)}>Cancel</button>

              {loading && <div className="loading-spinner">Loading...</div>}
              {error ? (
                <div className="error">{error}</div>
              ) : (
                <div className="image-list">{clientDocs}</div>
              )}
            </div>
          )}

          {isShareAccessOpen && (
            <div className="share-access-modal">
              <input
                className="address-input"
                placeholder="Enter Judge's Address"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
              />
              <button className="confirm-btn" onClick={shareAccess}>Share</button>
              <button className="cancel-btn" onClick={() => setIsShareAccessOpen(false)}>Cancel</button>
            </div>
          )}

          {isRevokeAccessOpen && latestDocument && (
            <RevokeAccess
              contract={contract}
              setRevokeAccessOpen={setIsRevokeAccessOpen}
              currentDocument={latestDocument}
              account={account}
            />
          )}

          {selectedImage && (
            <ImagePopup
              imageSrc={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}

          {selectedDocument && (
            <ImagePopup
              imageSrc={selectedDocument}
              onClose={() => setSelectedDocument(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
