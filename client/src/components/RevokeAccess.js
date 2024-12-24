import React, { useState, useEffect } from 'react';
import './RevokeAccess.css';

function RevokeAccess({ contract, setRevokeAccessOpen, currentDocument, account }) {
    const [accessList, setAccessList] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    // Fetch users with access to the current document
    const fetchAccessList = async () => {
        try {
            const data = await contract.shareAccess(); // Fetch the access list for the current user
            const usersWithAccess = data?.filter(item => item.access) || []; // Only show users who have access
            setAccessList(usersWithAccess);
        } catch (error) {
            console.error("Error fetching access list:", error);
            setAccessList([]); // Set accessList to empty if there's an error
        }
    };

    useEffect(() => {
        if (contract && account) {
            fetchAccessList(); // Fetch access list on component mount
        }
    }, [contract, account]);

    // Function to revoke access from the selected user
    const revokeAccess = async (userAddress) => {
        try {
            await contract.disallow(userAddress); // Call the disallow function from the contract
            fetchAccessList(); // Refresh the access list after revocation
            setRevokeAccessOpen(false); // Close the modal after revoking access
        } catch (error) {
            console.error("Error revoking access:", error);
        }
    };

    return (
        <div className="revoke-access-modal">
            {/* Close button */}
            <button className="close-btn" onClick={() => setRevokeAccessOpen(false)}>X</button>

            <div className="revoke-access-content">
                <h3>Revoke Access</h3>
                <p>Select existing users to revoke access to the document:</p>
                <ul>
                    {accessList.length > 0 ? (
                        accessList.map((user, index) => (
                            <li key={index} onClick={() => setSelectedUser(user.user)}>
                                {user.user}
                            </li>
                        ))
                    ) : (
                        <li>No users have access to this document</li>
                    )}
                </ul>
                {selectedUser && accessList.length > 0 && (
                    <div>
                        <p>Are you sure you want to revoke access for {selectedUser}?</p>
                        <button className="confirm-btn" onClick={() => revokeAccess(selectedUser)}>Confirm</button>
                        <button className="cancel-btn" onClick={() => setRevokeAccessOpen(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RevokeAccess;
