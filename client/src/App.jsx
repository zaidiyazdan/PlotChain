import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import RegisterProperty from './pages/RegisterProperty';
import GetAllLands from './pages/GetAllLands';
import Footer from './components/Footer';
import ListForSale from './pages/ListForSale';

const App = () => {
  return (
    <div className="relative bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterProperty/>} />
          <Route path="/getalllands" element={<GetAllLands/>} />
          <Route path="/listforsale" element={<ListForSale/>} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
        <Footer/>
      </div>
    </div>
  );
}

export default App;