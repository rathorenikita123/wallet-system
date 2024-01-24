# Node.js P2P Wallet System

A simple Peer-to-Peer (P2P) wallet system built with Node.js using NestJS, TypeScript, and MongoDB.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Create User](#create-user)
  - [Create Wallet](#create-wallet)
  - [Fund Wallet](#fund-wallet)
  - [Transfer Funds](#transfer-funds)
- [API Endpoints](#api-endpoints)


## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rathorenikita123/wallet-system.git

2. Install dependencies
   
  cd your-repo
  npm install 

### Configuration

1. Create a .env file in the root directory:
   
  DB_URI='your-mongodb-uri'

2. Update other configuration files if needed (e.g., database connection details, API ports).

### Usage

  Create User
  Endpoint: POST /users

  Create a new user with the following details:

    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "address": "123 Main St",
      "dob": "1990-01-01",
      "phone_number": "123-456-7890"
    }

  Create Wallet
  Endpoint: POST /wallets/users/:userId

  Create a wallet for an existing user:

    {
      "balance": 1000,
      "reference": "initial_fund"
    }

  Fund Wallet
  Endpoint: POST /wallets/fund/:userId

  Fund an existing user's wallet:

    {
      "amount": 500
    }
  
  Transfer Funds
  Endpoint: POST /wallets/transfer/:senderWalletId/:receiverWalletId

  Transfer funds from one wallet to another:

    {
      "amount": 200
    }

### API Endpoints

 - POST /users: Create a new user.
 - POST /wallets/users/:userId: Create a wallet for an existing user.
 - POST /wallets/fund/:userId: Fund an existing user's wallet.
 - POST /wallets/transfer/:senderWalletId/:receiverWalletId: Transfer funds between wallets.
 - GET /users/:id: Get details of a user by its ID.
 - GET /wallets/:id: Get details of a user by its ID.


