import React from 'react';
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-full p-4 sm:p-6 sm:px-4 bg-gray-900 bg-opacity-70">
      <div className="mx-auto max-w-[1080px]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-md sm:text-center text-gray-300">
            © {new Date().getFullYear()}{" "}
            <a href="" className="hover:underline text-gray-100">
                
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <AiFillGithub size={25} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;