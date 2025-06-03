import React from 'react';

function Footer() {
  return (
    <footer className="bg-wordpress-darkgrey text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} WordPress Plugin Generator</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-wordpress-blue transition-colors">Terms</a>
            <a href="#" className="hover:text-wordpress-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-wordpress-blue transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
