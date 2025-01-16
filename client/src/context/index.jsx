import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // Replace with your deployed LandRegistry contract address
 
  const { contract } = useContract('0x59D859bc6afE51AC296adeCf52aAfE168fefAa70');
  const { mutateAsync: registerLand } = useContractWrite(contract, 'registerLand');
  const { mutateAsync: listLandForSale } = useContractWrite(contract, 'listForSale'); // Add listForSale function here
  const { mutateAsync: purchaseLand } = useContractWrite(contract, 'purchaseLand');
  const address = useAddress();
  const connect = useMetamask();

  const purchaseLandHandler = async (landId, price) => {
    console.log('Price being sent:', price);  // Add this to verify the price in ETH
    try {
      const data = await purchaseLand({
        args: [landId],
        value: ethers.utils.parseEther(price.toString()) // sending the price as ETH value
      });
      
      console.log('Land purchased successfully', data);
      toast.success(`Land with ID: ${landId} has been purchased!`);
    } catch (error) {
      console.error('Error purchasing land', error);
      toast.error('Failed to purchase land');
    }
  };
  

  
  const publishLand = async (form) => {
    const data = await registerLand({
      args: [
        form.location, 
        form.area,   
        ethers.utils.parseEther(form.price.toString()) 
      ],
    });

    console.log('Land registration successful', data);
  };

  const listLandForSaleHandler = async (landId, price) => {
    const data = await listLandForSale({
      args: [landId, ethers.utils.parseEther(price.toString())], // Convert price to ethers
    });

    console.log('Land listed for sale', data);
  };

  const getAllLands = async () => {
    const lands = await contract.call('getAllLands');

    const parsedLands = lands.map((land, i) => ({
      id: land.id.toNumber(),
      owner: land.owner,
      location: land.location,
      area: land.area.toNumber(),
      price: ethers.utils.formatEther(land.price.toString()),
      isForSale: land.isForSale,
    }));

    return parsedLands;
  };

  const transferOwnership = async (landId, newOwner) => {
    const data = await contract.call('transferOwnership', [landId, newOwner]);
    console.log('Ownership transferred', data);
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        publishLand,
        getAllLands,
        purchaseLand,
        listLandForSale: listLandForSaleHandler, // Provide the listLandForSaleHandler function
        transferOwnership,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
