/**
 * @fileoverview Layout Component - Global Footer
 * @module components/layout/Footer
 * @description Provides the archival and legal closure of the interface. 
 * Follows strict uppercase metadata styling (font-label) to reinforce 
 * the 'Editorial' brand identity.
 */

import React from 'react';

/**
 * Footer Component.
 * 
 * @component
 */
const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-100 py-12 px-12 flex flex-col md:flex-row justify-between items-center text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-400">
      <p>© 2024 The Academic Editorial. All rights reserved.</p>
      <div className="flex gap-8 mt-4 md:mt-0">
        {['Privacy Policy', 'Terms of Service', 'Contact'].map((l) => (
          <a
            key={l}
            href="#"
            className="hover:text-primary transition-colors duration-200"
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
