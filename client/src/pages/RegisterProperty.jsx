import React, { useState } from 'react';
import { useStateContext } from '../context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterLandComponent = () => {
  const { publishLand, connect, address } = useStateContext();
  const [form, setForm] = useState({
    location: '',
    area: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);  // Add loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleRegisterLand = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    try {
      const formattedForm = {
        ...form,
        area: parseFloat(form.area),
        price: parseFloat(form.price),
      };

      // Attempt to publish land
      await publishLand(formattedForm);

      // Show success toast
      toast.success(`Land Registered Successfully: 
      Location: ${form.location}, Area: ${form.area} sq meters`);
      
      // Clear form after successful submission
      setForm({
        location: '',
        area: '',
        price: '',
      });
    } catch (error) {
      // Show error toast
      toast.error(`Registration Failed: 
      ${error.message || "Unable to register land. Please try again."}`);
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
              Register Land
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
              <form onSubmit={handleRegisterLand} className="space-y-6">
                <div>
                  <label 
                    htmlFor="location" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter land location"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 
                    dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="area" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Area (sq meters)
                  </label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="Enter land area"
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
                    step="0.000000001"
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
                  {loading ? 'Registering...' : 'Register Land'}
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

export default RegisterLandComponent;
