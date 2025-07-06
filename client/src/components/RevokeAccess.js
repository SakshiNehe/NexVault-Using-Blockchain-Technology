import React, { useState, useEffect, useCallback } from 'react';
import './RevokeAccess.css';

function RevokeAccess({ contract, setRevokeAccessOpen, currentDocument, account }) {
  const [accessList, setAccessList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch users who currently have access to the document
  const fetchAccessList = useCallback(async () => {
    if (!contract) return;

    setLoading(true);
    try {
      const data = await contract.shareAccess();
      const usersWithAccess = (data || []).filter(item => item.access);
      setAccessList(usersWithAccess);
    } catch (error) {
      console.error("Error fetching access list:", error);
      setAccessList([]);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    if (contract && account) {
      fetchAccessList();
    }
  }, [contract, account, fetchAccessList]);

  const revokeAccess = async (userAddress) => {
    try {
      await contract.disallow(userAddress);
      await fetchAccessList();
      setSelectedUser('');
      setRevokeAccessOpen(false);
    } catch (error) {
      console.error("Error revoking access:", error);
    }
  };

  return (
    <div className="revoke-access-modal">
      <button className="close-btn" onClick={() => setRevokeAccessOpen(false)}>×</button>

      <div className="revoke-access-content">
        <h3>Revoke Access</h3>
        <p>Select a user to revoke document access:</p>

        {loading ? (
          <p>Loading access list...</p>
        ) : accessList.length > 0 ? (
          <ul className="user-list">
            {accessList.map((user, index) => (
              <li key={index}>
                <button
                  className={`user-btn ${selectedUser === user.user ? 'selected' : ''}`}
                  onClick={() => setSelectedUser(user.user)}
                >
                  {user.user}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users currently have access to this document.</p>
        )}

        {selectedUser && (
          <div className="confirmation-section">
            <p>Are you sure you want to revoke access for <strong>{selectedUser}</strong>?</p>
            <div className="button-group">
              <button className="confirm-btn" onClick={() => revokeAccess(selectedUser)}>Confirm</button>
              <button className="cancel-btn" onClick={() => setSelectedUser('')}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RevokeAccess;
