import React, { useState, useEffect } from 'react';
import './UserAccessList.css';

const UserAccessList = ({ setUserAccessOpen, contract, currentDocument }) => {
  const [accessList, setAccessList] = useState([]);

  const fetchAccessList = async () => {
    try {
      const result = await contract.shareAccess(); // Fetch the access list
      if (result && Array.isArray(result)) {
        const filteredAccessList = result.filter(accessItem => accessItem.access); // Filter only users with access = true
        setAccessList(filteredAccessList); // Set the filtered access list to state
      } else {
        console.warn("Invalid access list received", result);
        setAccessList([]); // Handle case where result is not as expected
      }
    } catch (error) {
      console.error("Error fetching access list:", error);
    }
  };

  useEffect(() => {
    if (contract && currentDocument) {
      fetchAccessList(); // Fetch access list when the contract and document are ready
    }
  }, [contract, currentDocument]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          People with Access to {currentDocument?.fileName || "Latest Document"}
        </div>
        <div className="body">
          {accessList && accessList.length > 0 ? (
            <ul>
              {accessList.map((accessItem, index) => (
                <li key={index}>
                  {accessItem.user || "Unnamed User"} {/* Fallback in case user is not defined */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No one has access to this document yet.</p>
          )}
        </div>
        <div className="footer special-close">
          <button
            onClick={() => setUserAccessOpen(false)}
            id="cancelBtn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccessList;
