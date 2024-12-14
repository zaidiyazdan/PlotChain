import React from 'react';

const LandCard = ({ land, onBuyProperty }) => {
  return (
    <div 
      className="bg-gray-800 border-2 border-gray-700 rounded-[2rem] shadow-lg 
                 transition duration-300 ease-in-out 
                 hover:shadow-2xl hover:border-purple-600 
                 transform hover:-translate-y-3 hover:scale-105"
    >
      <div className="p-6">
        <div className="space-y-5">
          <div className="flex justify-between items-center border-b border-gray-700 pb-4">
            <span className="text-sm text-gray-400 font-medium">Land ID</span>
            <span className="text-xl font-bold text-purple-400">#{land.id}</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">Owner</span>
              <span className="text-gray-100 font-semibold truncate max-w-[180px]">
                {land.owner}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">Location</span>
              <span className="text-gray-100 font-semibold">{land.location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">Area</span>
              <span className="text-gray-100 font-semibold">
                {land.area} sq. meters
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">Price</span>
              <span className="text-green-400 font-bold text-lg">
                {land.price} ETH
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-700">
              <span className="text-gray-400 font-medium">Availability</span>
              <span 
                className={`font-bold text-base ${
                  land.isForSale 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}
              >
                {land.isForSale ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>

          {/* Buy Property Button */}
          <button
            onClick={() => onBuyProperty(land.id)}
            className="w-full mt-4 py-2 px-4 text-center text-white font-medium bg-purple-600 
                       hover:bg-purple-700 rounded-lg transition duration-200"
            disabled={!land.isForSale}
          >
            {land.isForSale ? 'Buy Property' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandCard;
