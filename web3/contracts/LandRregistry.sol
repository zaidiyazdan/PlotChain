// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract LandRegistry {
    // Structure to store land details
    struct Land {
        uint256 id;
        address owner;
        string location;
        string address;
        uint256 area; // Area in square meters
        uint256 price; // Price in wei
        bool isForSale;
    }

    // Mapping to store all lands by their IDs
    mapping(uint256 => Land) public lands;
    
    // Counter to keep track of the number of registered lands
    uint256 public totalLands;

    // Event to emit when a new land is registered
    event LandRegistered(uint256 id, address owner, string location, uint256 area, uint256 price);

    // Event to emit when a land ownership is transferred
    event OwnershipTransferred(uint256 id, address oldOwner, address newOwner);

    // Event to emit when a land is marked for sale
    event LandListedForSale(uint256 id, uint256 price);

    // Function to register a new land
    function registerLand(string memory _location, uint256 _area, uint256 _price) public {
        require(_area > 0, "Area must be greater than 0.");
        require(_price > 0, "Price must be greater than 0.");

        Land memory newLand = Land({
            id: totalLands,
            owner: msg.sender,
            location: _location,
            area: _area,
            price: _price,
            isForSale: false
        });

        lands[totalLands] = newLand;
        emit LandRegistered(totalLands, msg.sender, _location, _area, _price);
        totalLands++;
    }

    // Function to transfer ownership of a land
    function transferOwnership(uint256 _id, address _newOwner) public {
        require(_id < totalLands, "Invalid land ID.");
        Land storage land = lands[_id];
        require(msg.sender == land.owner, "Only the owner can transfer ownership.");
        require(_newOwner != address(0), "Invalid new owner address.");

        address oldOwner = land.owner;
        land.owner = _newOwner;
        land.isForSale = false; // Remove from sale after transfer

        emit OwnershipTransferred(_id, oldOwner, _newOwner);
    }

    // Function to list a land for sale
    function listForSale(uint256 _id, uint256 _price) public {
        require(_id < totalLands, "Invalid land ID.");
        Land storage land = lands[_id];
        require(msg.sender == land.owner, "Only the owner can list the land for sale.");
        require(_price > 0, "Price must be greater than 0.");

        land.isForSale = true;
        land.price = _price;

        emit LandListedForSale(_id, _price);
    }

    // Function to purchase a land listed for sale
    function purchaseLand(uint256 _id) public payable {
        require(_id < totalLands, "Invalid land ID.");
        Land storage land = lands[_id];
        require(land.isForSale, "This land is not for sale.");
        require(msg.value >= land.price, "Insufficient payment.");

        address oldOwner = land.owner;
        land.owner = msg.sender;
        land.isForSale = false;

        // Transfer the payment to the old owner
        payable(oldOwner).transfer(msg.value);

        emit OwnershipTransferred(_id, oldOwner, msg.sender);
    }

    // Function to fetch all lands (for external systems to display details)
    function getAllLands() public view returns (Land[] memory) {
        Land[] memory allLands = new Land[](totalLands);

        for (uint256 i = 0; i < totalLands; i++) {
            allLands[i] = lands[i];
        }

        return allLands;
    }
}