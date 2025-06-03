import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'wp-tab wp-tab-active' : 'wp-tab wp-tab-inactive';
  };

  return (
    <header className="bg-wordpress-darkblue text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ffffff" className="mr-2">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19.5c-5.247 0-9.5-4.253-9.5-9.5S6.753 2.5 12 2.5s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z"/>
              <path d="M3.009 12c0 4.976 2.902 9.268 7.095 11.308-4.944-2.028-8.095-6.831-8.095-12.308s3.15-10.28 8.095-12.308C5.911 2.732 3.009 7.024 3.009 12z"/>
              <path d="M12 3.009c-4.976 0-9.268 2.902-11.308 7.095C2.72 5.16 7.523 2.009 13 2.009s10.28 3.15 12.308 8.095c-2.04-4.193-6.332-7.095-11.308-7.095z"/>
              <path d="M12 20.991c4.976 0 9.268-2.902 11.308-7.095-2.028 4.944-6.831 8.095-12.308 8.095s-10.28-3.15-12.308-8.095c2.04 4.193 6.332 7.095 11.308 7.095z"/>
              <path d="M20.991 12c0-4.976-2.902-9.268-7.095-11.308 4.944 2.028 8.095 6.831 8.095 12.308s-3.15 10.28-8.095 12.308c4.193-2.04 7.095-6.332 7.095-11.308z"/>
            </svg>
            <h1 className="text-xl font-bold">WordPress Plugin Generator</h1>
          </div>
          <nav>
            <div className="flex border-b border-gray-700">
              <Link to="/" className={isActive('/')}>
                Home
              </Link>
              <Link to="/generator" className={isActive('/generator')}>
                Generator
              </Link>
              <Link to="/preview" className={isActive('/preview')}>
                Preview
              </Link>
              <Link to="/docs" className={isActive('/docs')}>
                Documentation
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
