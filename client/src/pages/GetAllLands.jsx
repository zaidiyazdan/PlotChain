import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';
import LandCard from '../components/LandCard';

const GetAllLands = () => {
  const { getAllLands, listLandForSale } = useStateContext();
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

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
      await listLandForSale(landId); // Assuming this function is available in your context
      setLands((prevLands) =>
        prevLands.map((land) =>
          land.id === landId ? { ...land, isForSale: true } : land
        )
      );
    } catch (error) {
      console.error('Error listing land for sale:', error);
    }
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
                    onListForSale={handleListForSale}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAllLands;
