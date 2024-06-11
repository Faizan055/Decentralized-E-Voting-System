# Decentralized-E-Voting-System

**Step 1:**
Set Up Remix IDE 
Open your web browser and navigate to Remix IDE.
Create a new workspace or use the default workspace.

**Step 2:**
Upload Solidity Contract
In the Remix IDE, go to the File Explorers tab.
Click on the New File button.
Name the file Vote.sol.
Copy and paste the contents of Vote.sol from your local machine into this new file.

**Step 3:**
Compile the Solidity Contract
Switch to the Solidity Compiler tab in Remix IDE.
Select the appropriate compiler version that matches your Solidity contract version.
Click the Compile Vote.sol button.

**Step 4:** 
Deploy the Contract
Switch to the Deploy & Run Transactions tab.
Ensure the ENVIRONMENT is set to Injected Web3 if you are using a browser wallet like MetaMask, or choose JavaScript VM (London) for testing.
Ensure your wallet is connected if using Injected Web3.
Select Vote from the CONTRACT dropdown.
Click the Deploy button.
Confirm the transaction in your wallet if prompted.

**Step 5:**
Obtain Contract Address and ABI
After deploying, copy the deployed contract address from the Remix console.
Copy the ABI from the compiled contract details in the Solidity Compiler tab.

**Step 6:**
Set Up Frontend Files
In the Remix IDE, go to the File Explorers tab.
Upload your index.html and app.js files by clicking the Upload File button.

Ensure the file structure is as follows:
**bash
Copy code
/index.html
/app.js**

**Step 7:**
Update Contract Address and ABI in app.js
Open the app.js file.
Replace the contractAddress with your deployed contract address.
Ensure the contractABI is correctly defined as per the contract ABI obtained from Remix.

**Step 8:**
Launch and Interact
Open the index.html file directly from your local file system or deploy it to a web server.
Interact with the application using the buttons and functions provided in the frontend to connect your wallet, start voting, add candidates, etc.


_Notes:
Ensure your wallet is connected and you are on the correct network.
Check the console for any errors and debug accordingly.
You may need to adjust the contract methods in app.js to match your actual contract's methods and events.
This README provides a step-by-step guide to deploy and interact with your Voting System smart contract using Remix IDE. Make sure to adjust paths and settings according to your environment and needs._
