import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle, FaList, FaPlus, FaWallet, FaBars, FaTimes } from 'react-icons/fa';
import { useStateContext } from '../context';
import { CustomButton } from '.';
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  // Map navlinks to React Icons
  const iconMap = {
    'dashboard': FaHome,
    'campaign': FaList,
    'getalllands': FaPlus,
    'profile': FaUserCircle,
    'wallet': FaWallet
  };

  const NavIcon = ({ link, isActive, handleClick }) => {
    const Icon = iconMap[link.name] || FaHome;
    return (
      <div 
        className={`p-2 rounded-lg transition-all duration-300 
          ${isActive === link.name ? 'bg-purple-700 text-white' : 'hover:bg-purple-800/30'}
          ${link.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => !link.disabled && handleClick()}
      >
        <Icon className="w-6 h-6" />
        <span className="sr-only">{link.name}</span>
      </div>
    );
  };

  return (
    <nav className="bg-[#1a1a2e] text-gray-100 py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-purple-700 p-2 rounded-full">
            <FaHome className="w-7 h-7 text-white" />
          </div>
          <span className="text-xl m-4 font-bold text-purple-300">Plot Chain</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-4 bg-[#16213e] p-3 rounded-xl">
            {navlinks.map((link) => (
              <NavIcon
                key={link.name}
                link={link}
                isActive={isActive}
                handleClick={() => {
                  setIsActive(link.name);
                  navigate(link.link);
                }}
              />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <CustomButton
              btnType="button"
              title={address ? 'Register Land' : 'Connect Wallet'}
              styles={`
                ${address 
                  ? 'bg-purple-700 hover:bg-purple-600' 
                  : 'bg-purple-600 hover:bg-purple-500'
                } 
                text-white px-4 py-2 rounded-lg transition-colors duration-300
              `}
              handleClick={() => {
                if (address) navigate('register');
                else connect();
              }}
            />
            <Link to="/profile" className="bg-purple-800/50 p-2 rounded-full hover:bg-purple-800/70 transition-colors">
              <FaUserCircle className="w-8 h-8 text-purple-300" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setToggleDrawer(!toggleDrawer)}
            className="text-purple-300 hover:text-purple-200"
          >
            {toggleDrawer ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {toggleDrawer && (
          <div className="fixed inset-0 bg-[#1a1a2e] z-50 md:hidden">
            <div className="container mx-auto py-8 px-4">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-purple-300">Menu</span>
                <button 
                  onClick={() => setToggleDrawer(false)}
                  className="text-purple-300 hover:text-purple-200"
                >
                  <FaTimes className="w-8 h-8" />
                </button>
              </div>

              <div className="space-y-4">
                {navlinks.map((link) => (
                  <div 
                    key={link.name}
                    className={`
                      flex items-center space-x-4 p-3 rounded-lg 
                      ${isActive === link.name ? 'bg-purple-700' : 'hover:bg-purple-800/30'}
                      ${link.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    onClick={() => {
                      if (!link.disabled) {
                        setIsActive(link.name);
                        navigate(link.link);
                        setToggleDrawer(false);
                      }
                    }}
                  >
                    {React.createElement(iconMap[link.name] || FaHome, { 
                      className: `w-6 h-6 ${isActive === link.name ? 'text-white' : 'text-purple-300'}` 
                    })}
                    <span 
                      className={`
                        text-lg font-medium 
                        ${isActive === link.name ? 'text-white' : 'text-purple-300'}
                      `}
                    >
                      {link.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CustomButton
                  btnType="button"
                  title={address ? 'Register Land' : 'Connect Wallet'}
                  styles={`
                    w-full 
                    ${address 
                      ? 'bg-purple-700 hover:bg-purple-600' 
                      : 'bg-purple-600 hover:bg-purple-500'
                    } 
                    text-white px-4 py-3 rounded-lg transition-colors duration-300
                  `}
                  handleClick={() => {
                    if (address) navigate('register');
                    else connect();
                    setToggleDrawer(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;