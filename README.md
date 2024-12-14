# FundBloc Crowdfunding Platform

FundBloc is a blockchain-based crowdfunding platform designed to facilitate secure, transparent, and efficient funding for innovative projects through smart contracts.

## Smart Contract

The core functionality of the FundBloc platform is powered by a smart contract written in Solidity

### Functions

1. **createCampaign**
   ```solidity
   function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256)
   ```
   - Creates a new crowdfunding campaign.
   - Parameters:
     - `_owner`: The address of the campaign owner.
     - `_title`: The title of the campaign.
     - `_description`: A brief description of the campaign.
     - `_target`: The funding goal for the campaign.
     - `_deadline`: The campaign deadline (timestamp).
     - `_image`: URL to the campaign image.
   - Returns:
     - The campaign ID.

2. **donateToCampaign**
   ```solidity
   function donateToCampaign(uint256 _id) public payable
   ```
   - Allows users to donate to a specific campaign.
   - Parameters:
     - `_id`: The ID of the campaign to donate to.
   - The donation amount is the value sent with the transaction.

3. **getDonators**
   ```solidity
   function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory)
   ```
   - Retrieves the list of donators and their respective donations for a specific campaign.
   - Parameters:
     - `_id`: The ID of the campaign.
   - Returns:
     - Two arrays: one with the addresses of the donators and another with their corresponding donation amounts.

4. **getCampaigns**
   ```solidity
   function getCampaigns() public view returns (Campaign[] memory)
   ```
   - Retrieves all the campaigns created on the platform.
   - Returns:
     - An array of all campaign structures.

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/fundbloc.git
   ```

2. **Navigate to the project directory**
   ```sh
   cd fundbloc
   ```

3. **Compile the smart contract**
   Ensure you have [Solidity](https://docs.soliditylang.org/en/v0.8.9/installing-solidity.html) installed and compile the `CrowdFunding` contract using your preferred method (e.g., using Remix IDE or Hardhat).

4. **Deploy the smart contract**
   Deploy the contract to your preferred Ethereum network (e.g., using Remix IDE, Truffle, or Hardhat).

5. **Interact with the smart contract**
   Use the deployed contract address to interact with the contract functions using a web3 interface (e.g., web3.js, ethers.js) or directly via Remix IDE.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.