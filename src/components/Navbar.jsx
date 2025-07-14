import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import React from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand/logo */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="/" 
              className="text-white text-2xl font-bold tracking-tight hover:text-gray-200 transition duration-300"
            >
              ContactMate
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a 
              href="/about" 
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              About
            </a>
            <a 
              href="/contact" 
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700 bg-opacity-90">
          <a
            href="/about"
            className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="/contact"
            className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}