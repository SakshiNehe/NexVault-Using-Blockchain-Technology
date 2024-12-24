import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { FaUpload, FaUserPlus, FaUserMinus, FaUserFriends } from 'react-icons/fa';
import FileUpload from '../FileUpload';
import UserAccessList from '../UserAccessList';
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
    const [judgeAddress, setJudgeAddress] = useState('');
    const [clientDocs, setClientDocs] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchDocuments = async () => {
        try {
            const dataArray = await contract.display(account);
            if (dataArray && dataArray.length > 0) {
                setDocuments(dataArray);
                setLatestDocument(dataArray[dataArray.length - 1]);
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    const getClientDocs = async () => {
        if (!contract) {
            setError("Contract is not initialized");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const Otheraddress = judgeAddress || account; 
            const dataArray = await contract.display(Otheraddress); 

            if (dataArray && dataArray.length > 0) {
                const images = dataArray.map((item, i) => (
                    <a key={i} onClick={() => setSelectedImage(item)}>
                        <img
                            src={item}
                            alt="document"
                            className="image-list"
                            onError={(e) => alert("No Image")}
                        />
                    </a>
                ));
                setClientDocs(images);
            } else {
                setError("No documents to display");
            }
        } catch (e) {
            setError(`Error fetching data: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (contract && account) {
            fetchDocuments();
        }
    }, [contract, account]);

    const sharing = async () => {
        try {
            await contract.allow(judgeAddress);
            setIsShareAccessOpen(false);
        } catch (error) {
            console.error("Error sharing access:", error);
        }
    };

    return (
        <>
            
            <div className="mainpage-modal-overlay" >
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

                {/* Main Dashboard */}
                    <div className="dashboard-content">
                    <button className="close-btn" onClick={() => setMainPageOpen(false)}>X</button>
                        <h3>Lawyer</h3>
                        
                    <div className="portal-title"><span>
                        Account: </span>{account}</div>
                    
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

                    {/* Conditional Modals */}
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
                            {/* <button className="close-btn" onClick={() => setIsUserAccessOpen(false)}>X</button> */}
                            <input 
                                className="address-input"
                                placeholder="Enter Client's Address" 
                                value={judgeAddress} 
                                onChange={(e) => setJudgeAddress(e.target.value)}
                            />
                            <button className="confirm-btn" onClick={getClientDocs}>
                                Fetch
                            </button>
                            <button className="cancel-btn" onClick={() => setIsUserAccessOpen(false)}>Cancel</button>
                            {loading && <div className="loading-spinner">Loading...</div>}
                                {error ? (
                                    <div className="error">
                                        You do not access to any documents!
                                    </div>
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
                                value={judgeAddress} 
                                onChange={(e) => setJudgeAddress(e.target.value)}
                            />
                            <button className="confirm-btn" onClick={sharing}>Share</button>
                            <button className="cancel-btn" onClick={() => setIsShareAccessOpen(false)}>Cancel</button>
                        </div>
                    )}


                    {isRevokeAccessOpen && (
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
        </>
        
    );
}

export default MainPage;
