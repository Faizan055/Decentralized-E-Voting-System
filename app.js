// Initialize Web3
const web3 = new Web3(window.ethereum);

// Contract address and ABI
const contractAddress = "0xAdbe2EE0cD46F120590726693F51F938b5046780";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "allowedAddress",
				"type": "address"
			}
		],
		"name": "AllowlistAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uniqueId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"name": "CandidateAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uniqueId",
				"type": "uint256"
			}
		],
		"name": "VoteCast",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "VotingClosed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "VotingStarted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_uniqueId",
				"type": "uint256"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "addToAllowlist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowlist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "uniqueId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "closeVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentVoteStatus",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "candidateNames",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "voteCounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "string",
				"name": "winningCandidateName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalCandidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_uniqueId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingOpen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Add your contract ABI here

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Connect Wallet Button
document.getElementById("connectWallet").onclick = async () => {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        displayWalletInfo();
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
};

// Display wallet information
// Update displayWalletInfo function to show wallet status and connected wallet address
async function displayWalletInfo() {
    const accounts = await web3.eth.getAccounts();
    const walletInfo = `Connected Wallet: ${accounts[0]}`;
    document.getElementById("walletInfo").innerText = walletInfo;

    // Show/hide admin and voter sections based on owner status
    const owner = await contract.methods.owner().call();
    if (owner.toLowerCase() === accounts[0].toLowerCase()) {
        document.getElementById("adminSection").style.display = "block";
        document.getElementById("voterSection").style.display = "none";
    } else {
        document.getElementById("adminSection").style.display = "none";
        document.getElementById("voterSection").style.display = "block";

        // Populate candidate select dropdown
        await populateCandidateDropdown();
    }

    // Update wallet status and connected wallet address
    document.getElementById("walletStatus").innerText = "Wallet Connected";
    document.getElementById("connectedWallet").innerText = `Connected Wallet: ${accounts[0]}`;
}


// Add Candidate Function
async function addCandidate() {
    const name = document.getElementById("candidateName").value;
    const age = document.getElementById("candidateAge").value;
    const id = document.getElementById("candidateId").value;

    await contract.methods.addCandidate(name, age, id).send({ from: await getAccount() });
}

// Add to Allowlist Function
async function addToAllowlist() {
    const address = document.getElementById("allowlistAddress").value;
    await contract.methods.addToAllowlist(address).send({ from: await getAccount() });
}

// Start Vote Function
async function startVote() {
    await contract.methods.startVote().send({ from: await getAccount() });
}

// Close Vote Function
async function closeVote() {
    await contract.methods.closeVote().send({ from: await getAccount() });
}
// ... (previous code)

// Get Admin Info Function
async function getAdminInfo() {
    const owner = await contract.methods.owner().call();
    const totalCandidates = await contract.methods.totalCandidates().call();
    const votingOpen = await contract.methods.votingOpen().call();

    alert(`Owner: ${owner}\nTotal Candidates: ${totalCandidates}\nVoting Open: ${votingOpen}`);
}

// Get Allowlist Function
async function getAllowlist() {
    const allowlist = await contract.methods.allowlist(await getAccount()).call();
    alert(`Is Allowlisted: ${allowlist}`);
}

// Get Candidates Function
async function getCandidates() {
    const totalCandidates = await contract.methods.totalCandidates().call();
    const candidates = [];

    for (let i = 1; i <= totalCandidates; i++) {
        const candidate = await contract.methods.candidates(i).call();
        candidates.push(`Candidate ${i}: ${candidate.name} (ID: ${candidate.uniqueId})`);
    }

    alert(candidates.join("\n"));
}




// Get Winner Function
async function getWinner() {
    try {
        const winner = await contract.methods.getWinner().call();

        alert(`Winner: ${winner}`);
    } catch (error) {
        console.error("Error getting winner:", error);
        alert("Error getting winner. Check the console for details.");
    }
}




// Get Current Vote Status Function
async function getCurrentVoteStatus() {
    try {
        const result = await contract.methods.getCurrentVoteStatus().call();

        const candidateNames = result[0];
        const voteCounts = result[1];

        const voteStatus = [];
        for (let i = 0; i < candidateNames.length; i++) {
            voteStatus.push(`${candidateNames[i]}: ${voteCounts[i]} votes`);
        }

        alert(`Current Vote Status:\n${voteStatus.join("\n")}`);
    } catch (error) {
        console.error("Error getting current vote status:", error);
        alert("Error getting current vote status. Check the console for details.");
    }
}






// Get Has Voted Function
async function getHasVoted() {
    const hasVoted = await contract.methods.hasVoted(await getAccount()).call();
    alert(`Has Voted: ${hasVoted}`);
}

// ... (remaining previous code)


// Vote Function
async function vote() {
    const candidateId = document.getElementById("candidateSelect").value;

    try {
        const result = await contract.methods.vote(candidateId).send({ from: await getAccount() });
        const transactionStatus = `Transaction Hash: ${result.transactionHash}\nStatus: ${result.status ? "Success" : "Failed"}`;
        alert(transactionStatus);
    } catch (error) {
        console.error("Error during the vote transaction:", error);
        alert("Error during the vote transaction. Check the console for details.");
    }
}


// Populate Candidate Select Dropdown
async function populateCandidateDropdown() {
    const totalCandidates = await contract.methods.totalCandidates().call();

    const select = document.getElementById("candidateSelect");
    select.innerHTML = "";

    for (let i = 1; i <= totalCandidates; i++) {
        const candidate = await contract.methods.candidates(i).call();
        const option = document.createElement("option");
        option.value = candidate.uniqueId;
        option.text = candidate.name;
        select.add(option);
    }
}

// Helper function to get the connected account
async function getAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}
