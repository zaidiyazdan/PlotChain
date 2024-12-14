import React, { useState } from 'react';
import { useStateContext } from '../context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListForSale = () => {
  const { listLandForSale, connect, address } = useStateContext();
  const [form, setForm] = useState({
    landId: '',
    price: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);  // Add a loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleListLand = async (e) => {
    e.preventDefault();
    if (!form.landId || !form.price || form.price <= 0) {
      setStatus('Please provide valid inputs for Land ID and Price.');
      return;
    }

    try {
      setLoading(true);  // Start loading
      setStatus('Listing land for sale...');
      
      // List land for sale (API call)
      await listLandForSale(form.landId, form.price);

      setStatus('Land successfully listed for sale!');
      toast.success(`Land listed for sale with ID: ${form.landId} at price: ${form.price} ETH`);
      
      setForm({
        landId: '',
        price: '',
      });
    } catch (error) {
      setStatus('Failed to list land for sale.');
    //   print(error)
      toast.error(`Failed to list land: ${ "only owner can list it"}`);
    } finally {
      setLoading(false);  // End loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
            <h2 className="text-3xl font-bold text-white text-center">
              List Land for Sale
            </h2>
          </div>

          <div className="p-8">
            {!address ? (
              <button
                onClick={connect}
                className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg 
                hover:bg-purple-700 transition duration-300 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Connect Wallet
              </button>
            ) : (
              <form onSubmit={handleListLand} className="space-y-6">
                <div>
                  <label 
                    htmlFor="landId" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Land ID
                  </label>
                  <input
                    type="number"
                    id="landId"
                    name="landId"
                    value={form.landId}
                    onChange={handleChange}
                    placeholder="Enter land ID"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 
                    dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="price" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Price (ETH)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Enter land price"
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 
                    dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}  // Disable button when loading
                  className={`w-full py-3 px-4 font-semibold rounded-lg 
                    ${loading ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'} 
                    text-white transition duration-300 ease-in-out 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                >
                  {loading ? 'Listing...' : 'List Land for Sale'}
                </button>
              </form>
            )}
          </div>
        </div>

        {address && (
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Connected Wallet: {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </div>
        )}
      </div>

      {/* Toaster container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default ListForSale;