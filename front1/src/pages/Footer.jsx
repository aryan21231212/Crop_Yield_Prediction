// src/components/Footer.jsx

import React from 'react';
import { FaLeaf, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';

// Data for footer links, making the component clean and easy to update
const footerLinkData = [
  {
    title: 'COMPANY',
    links: ['Features', 'Pricing', 'About Us', 'Contact'],
  },
  {
    title: 'RESOURCE',
    links: ['Blog', 'Customer Stories', 'Information', 'Legal', 'Payments'],
  },
  {
    title: 'CAREER',
    links: ['Jobs', 'Hiring', 'News', 'Tips & Tricks'],
  },
  {
    title: 'HELP',
    links: ['FAQ', 'Help Center', 'Support'],
  },
];

const Footer = () => {
  return (
    <footer>
      {/* Top Section: Call to Action / Newsletter */}
      <div className="relative text-center text-white py-20 px-4">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/037/236/269/small_2x/ai-generated-farm-tractor-advertisment-background-with-copy-space-free-photo.jpg")' }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Join the Agricultural Revolution Today!
          </h2>
          <form className="relative max-w-lg mx-auto mt-8">
            <input
              type="email"
              placeholder="Email address"
              className="w-full py-4 pl-6 pr-36 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-zinc-800 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-zinc-700 transition-colors"
            >
              Subscribe
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section: Links and Info */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Side: Logo, Description, Socials */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="#" className="flex items-center gap-2 text-2xl font-bold text-zinc-900">
              <FaLeaf className="text-emerald-600" />
              Rultivo
            </a>
            <p className="mt-4 text-gray-600">
              We are custom home builder located in Dallas, TX servicing. Highland Park, <span className="font-bold">Cultive</span> & Preston Hollow!
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors"><FaFacebookF size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors"><FaLinkedinIn size={20} /></a>
            </div>
          </div>
          
          {/* Right Side: Link Columns */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinkData.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;