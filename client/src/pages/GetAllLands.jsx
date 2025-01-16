import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import LandCard from '../components/LandCard';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast


const GetAllLands = () => {
  const { getAllLands, listLandForSale, purchaseLand } = useStateContext();
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedLand, setSelectedLand] = useState(null);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const allLands = await getAllLands();
        setLands(allLands);
      } catch (error) {
        console.error('Error fetching lands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, [getAllLands]);

  const handleListForSale = async (landId) => {
    try {
      await listLandForSale(landId);
      setLands((prevLands) =>
        prevLands.map((land) =>
          land.id === landId ? { ...land, isForSale: true } : land
        )
      );
    } catch (error) {
      console.error('Error listing land for sale:', error);
    }
  };

  // Handle buying land
  const handleBuyProperty = async (landId, price) => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    try {
      // Check if the user is connected to MetaMask
      const userAddress = await signer.getAddress();
      if (!userAddress) {
        alert('Please connect your MetaMask wallet.');
        return;
      }
  
      setLoading(true);
  
      // Ensure the value is sufficient (correct value in ETH)
      const landPriceInEther = ethers.utils.parseEther(price.toString());
  
      // Trigger the purchase land transaction
      const transaction = await purchaseLand({
        args: [landId],
        value: landPriceInEther,
      });
  
      console.log('Land purchased successfully:', transaction);
      toast.success(`Land with ID: ${landId} has been purchased!`);
    } catch (error) {
      console.error('Error purchasing land:', error);
      toast.error('Failed to purchase land');
    } finally {
      setLoading(false);
    }
  };

  const showBuyerForm = (land) => {
    setSelectedLand(land);
    setIsFormVisible(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="animate-pulse">
          <div className="w-20 h-20 border-4 border-purple-600 border-opacity-50 rounded-full mb-6 animate-bounce"></div>
        </div>
        <p className="text-2xl text-gray-200 font-semibold tracking-wide animate-pulse">
          Discovering Lands...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border-4 border-purple-900/30">
          <div className="p-8 bg-gradient-to-r from-purple-900 to-indigo-800 relative overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-600/20 rounded-full blur-3xl"></div>
            <h2 className="text-4xl font-extrabold text-white text-center tracking-tight sm:text-5xl 
              relative z-10 
              bg-clip-text text-transparent 
              bg-gradient-to-r from-white via-purple-200 to-purple-300
              animate-gradient-x">
              All Registered Lands
            </h2>
          </div>

          {lands.length === 0 ? (
            <div className="flex items-center justify-center p-16">
              <p className="text-3xl text-gray-500 font-medium text-center">
                No lands available at the moment
              </p>
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {lands.map((land) => (
                  <LandCard
                    key={land.id}
                    land={land}
                    onBuyProperty={showBuyerForm}  // Trigger form on Buy
                    onListForSale={handleListForSale}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buyer details form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white text-black p-6 rounded-lg w-96">
          <h3 className="text-xl font-bold mb-4 text-black">Confirm Purchase</h3>
          <p className="text-lg text-gray-700 mb-4">
              You are about to purchase land #{selectedLand.id} for {selectedLand.price} ETH.
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleBuyProperty(selectedLand.id, selectedLand.price)}
                className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Purchase'}
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-gray-600 hover:text-gray-800 mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllLands;
