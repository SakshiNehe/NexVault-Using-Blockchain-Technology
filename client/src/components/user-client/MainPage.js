import React, { useState, useEffect, useCallback } from 'react';
import './MainPage.css';
import { FaUpload, FaUserPlus, FaUserMinus, FaUserFriends } from 'react-icons/fa';
import FileUpload from '../FileUpload';
import UserAccessList from '../UserAccessList';
import ShareAccess from '../ShareAccess'; 
import RevokeAccess from '../RevokeAccess'; // Import RevokeAccess
import ImagePopup from '../ImagePopup';

function MainPage({ setMainPageOpen, contract, account, provider }) {
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
    const [isUserAccessOpen, setIsUserAccessOpen] = useState(false);
    const [isShareAccessOpen, setIsShareAccessOpen] = useState(false); 
    const [isRevokeAccessOpen, setIsRevokeAccessOpen] = useState(false); // New state for revoke access modal
    const [documents, setDocuments] = useState([]); 
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [latestDocument, setLatestDocument] = useState(null);

    const fetchDocuments = useCallback(async () => {
        try {
            const dataArray = await contract.display(account);
            if (dataArray && dataArray.length > 0) {
                setDocuments(dataArray);
                setLatestDocument(dataArray[dataArray.length - 1]);
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    }, [contract, account]);

    useEffect(() => {
        if (contract && account) {
            fetchDocuments();
        }
    }, [contract, account, fetchDocuments]);

    return (
        <div className="mainpage-modal-overlay">
            <div className="mainpage-modal-content">
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

                <div className="dashboard-content">
                    <button className="close-btn" onClick={() => setMainPageOpen(false)}>X</button>
                    <h3>Client</h3>
                    <div className="portal-title"><span>Account: </span>{account}</div>
                    
                    <div className="button-container">
                        <div className="dashboard-button" onClick={() => setIsFileUploadOpen(true)}>
                            <FaUpload size={40} />
                            <h3>Upload Document</h3>
                        </div>

                        <div className="dashboard-button" onClick={() => setIsUserAccessOpen(true)}>
                            <FaUserFriends size={40} />
                            <h3>People with Access</h3>
                        </div>

                        <div className="dashboard-button" onClick={() => setIsShareAccessOpen(true)}>
                            <FaUserPlus size={40} />
                            <h3>Grant Access</h3>
                        </div>

                        <div className="dashboard-button" onClick={() => setIsRevokeAccessOpen(true)}>
                            <FaUserMinus size={40} />
                            <h3>Revoke Access</h3>
                        </div>
                    </div>

                    {isFileUploadOpen && (
                        <FileUpload
                            account={account}
                            provider={provider}
                            contract={contract}
                            setIsOpen={setIsFileUploadOpen}
                        />
                    )}

                    {isUserAccessOpen && latestDocument && (
                        <UserAccessList
                            contract={contract}
                            setUserAccessOpen={setIsUserAccessOpen}
                            currentDocument={latestDocument}
                        />
                    )}

                    {isShareAccessOpen && latestDocument && (
                        <ShareAccess
                            contract={contract}
                            setShareAccessOpen={setIsShareAccessOpen}
                            currentDocument={latestDocument}
                        />
                    )}

                    {isRevokeAccessOpen && latestDocument && (
                        <RevokeAccess
                            contract={contract}
                            setRevokeAccessOpen={setIsRevokeAccessOpen}
                            currentDocument={latestDocument}
                            account={account}
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