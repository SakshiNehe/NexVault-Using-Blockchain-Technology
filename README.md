# ⚖️ NexVault – Decentralized Secure Document Management

NexVault is a decentralized application (dApp) that facilitates secure and transparent document exchange between **Clients**, **Lawyers**, and **Judges**. It ensures privacy, integrity, and controlled access of sensitive legal documents using Ethereum smart contracts and IPFS.

---

## 🚀 Features

- 🔐 Decentralized file storage using IPFS
- 🧠 Smart contracts on Ethereum Sepolia testnet
- 🪙 MetaMask wallet authentication
- 📁 Role-based access: Client, Lawyer, Judge
- 📤 Secure upload & controlled document sharing
- 💻 Frontend built with React.js and ethers.js

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Blockchain**: Ethereum Sepolia Testnet
- **Smart Contract Language**: Solidity
- **Wallet Integration**: MetaMask
- **Decentralized Storage**: IPFS via Pinata
- **Web3 Library**: ethers.js
- **Backend (Optional)**: Node.js / Express.js for metadata

---

## 📦 Installation

```bash
git clone https://github.com/your-username/nexvault.git
cd nexvault
npm install
```

---

## 📄 Smart Contract

Path: `contracts/Upload.sol`

Main functions:
- `addUser(address _user, string memory role)`
- `uploadFile(string memory _ipfsHash, string memory fileName)`
- `grantAccess(address _address)`
- `viewFile(address _user) returns (string[] memory)`

To deploy:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

---

## ▶️ Running the App

```bash
npm start
```

App runs at: `http://localhost:3000`

Make sure MetaMask is connected to the **Sepolia Testnet**.

---

## 👤 User Roles

| Role   | Permissions                                |
|--------|--------------------------------------------|
| Client | Upload documents, grant access             |
| Lawyer | View documents shared by the client        |
| Judge  | View case documents, no uploads            |

---

## 🔐 Security

- Authentication via MetaMask (Web3 wallet)
- Document integrity ensured by IPFS hash
- Access control enforced by smart contract roles
- No centralized data storage


---

## 🌐 Demo

Coming soon...

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---


## 👩‍💻 Developed By

**Sobiya Shaikh**

Feel free to reach out for collaboration or queries!