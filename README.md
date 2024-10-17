# Ethereum Smart Contracts Todo List Application
---
## Summary
This is a demo blockchain todo list application powered by Ethereum smart contracts with Solidity programming language. Using Ganache as a personal blockchain network to mimic the behavior of a public blockchain.

---
## Repo dependencies

### Node modules
```
# Download and install Node.js: 
https://nodejs.org/en/download/prebuilt-installer

# Install dependencies:
$> npm install
```
---
### Server side setup
#### 1. Install Ganache 
```
# Download installer: 
https://archive.trufflesuite.com/ganache/

# After installation, quickstart/create a new workspace

# (Optional) Perform any configuration
```

#### 2. Solidity Smart contract migration
```
# Ensure Ganache network is running

# Compile all contracts
$> truffle compile

# Deploy contracts
$> truffle migrate
```

#### 3. Start the lite-server
```
# Ensure all node dependencies all installed properly

# Start the lite-server
$> npm start
```
---
### Client side setup
#### 1. Install Metamask
```
# Use Chrome browser for Metamask extension support
# Download and install Metamask to your Chrome browser: 
https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn

# Connect your Metamask to the Ganache network in the setting page

# Accquire the account private key from your Ganache network and link it to Metamask
```

#### 2. Browser
```
Visit the hosted server (e.g. http://localhost:3000/)
```
---
### VSC
If your IDE shows a warning about a different Solidity compiler version, add the following line to your `settings.json` or consider upgrading the dependencies' version in your project:

```json
"solidity.compileUsingRemoteVersion": "v0.5.2+commit.1df8f40c"
```

---
### Credit
```
# Full app tutorial
https://dappuniversity.com/articles/blockchain-app-tutorial

# Truffle suite documentation
https://archive.trufflesuite.com/docs/

# Metamask developer documentation
https://docs.metamask.io/
```
