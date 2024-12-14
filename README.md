# Land Registry Smart Contract

## Overview

The **LandRegistry** smart contract is designed for managing land ownership and transactions on the Ethereum blockchain. It enables the registration, transfer, and sale of lands, ensuring secure and transparent record-keeping. 

## Features

- **Land Registration:** Allows users to register lands with details like location, area, and price.
- **Ownership Transfer:** Enables landowners to transfer ownership to another address.
- **Land Sale Listing:** Landowners can list their lands for sale, setting a price in wei.
- **Land Purchase:** Facilitates purchasing of listed lands by transferring ownership and funds.
- **Fetch All Lands:** Provides a list of all registered lands for external systems to display.

---

## Prerequisites

- **Solidity Version:** `^0.8.9`
- **Blockchain Network:** Ethereum or Ethereum-compatible network
- **Tools:** 
  - A wallet (e.g., MetaMask)
  - An IDE like Remix or Hardhat for deployment

---

## Contract Structure

### 1. **Data Structures**
- **`struct Land`:** Holds information about each land, such as:
  - `id`: Unique identifier
  - `owner`: Current owner of the land
  - `location`: Physical location of the land
  - `area`: Area in square meters
  - `price`: Price in wei
  - `isForSale`: Whether the land is listed for sale

- **`mapping(uint256 => Land) lands`:** Maps each land ID to its details.

- **`uint256 totalLands`:** Counter to track the number of lands registered.

---

### 2. **Events**
- **`LandRegistered(uint256 id, address owner, string location, uint256 area, uint256 price)`:**
  - Emitted when a new land is registered.
- **`OwnershipTransferred(uint256 id, address oldOwner, address newOwner)`:**
  - Emitted when ownership of a land is transferred.
- **`LandListedForSale(uint256 id, uint256 price)`:**
  - Emitted when a land is listed for sale.

---

### 3. **Functions**
#### **`registerLand(string _location, uint256 _area, uint256 _price)`**
- Registers a new land with the given location, area, and price.
- **Requirements:**
  - `_area` must be greater than 0.
  - `_price` must be greater than 0.

#### **`transferOwnership(uint256 _id, address _newOwner)`**
- Transfers ownership of a land to a new owner.
- **Requirements:**
  - Caller must be the current owner.
  - `_newOwner` must not be a zero address.

#### **`listForSale(uint256 _id, uint256 _price)`**
- Lists a land for sale with a specified price.
- **Requirements:**
  - Caller must be the owner of the land.
  - `_price` must be greater than 0.

#### **`purchaseLand(uint256 _id)`**
- Allows a user to purchase a listed land.
- **Requirements:**
  - Land must be marked as `isForSale`.
  - Payment (`msg.value`) must be equal to or exceed the price.

#### **`getAllLands()`**
- Returns an array of all registered lands for display or analysis.

---

## Usage Instructions

### Deployment
1. Deploy the contract on an Ethereum-compatible network using an IDE like Remix or a framework like Hardhat.
2. Once deployed, the contract address will be available for interaction.

### Interaction
- Use the following methods to interact with the contract:
  1. **Register Land:**
     Call `registerLand` with the location, area, and price.
  2. **List Land for Sale:**
     Call `listForSale` with the land ID and price.
  3. **Purchase Land:**
     Call `purchaseLand` with the land ID, sending the appropriate ether value.
  4. **Transfer Ownership:**
     Call `transferOwnership` with the land ID and the new owner's address.
  5. **Fetch All Lands:**
     Call `getAllLands` to retrieve details of all lands.

---

## Security Considerations
- Ensure only the owner of a land can list it for sale or transfer ownership.
- Use secure Ethereum wallets to interact with the contract.
- Do not send ether directly to the contract address; always use the `purchaseLand` function.

---

## Example Scenarios

### Registering a Land
```solidity
registerLand("Downtown", 1000, 5000000000000000000); // 5 Ether
