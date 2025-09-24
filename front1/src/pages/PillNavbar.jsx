// src/components/PillNavbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // <-- React Router
import { FiHome, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { name: "Home", path: "/", icon: FiHome },
  { name: "Yields", path: "/yields", icon: null },
  { name: "Schedule", path: "/sche", icon: null },
  { name: "Crop Disease", path: "/disease", icon: null },
  { name: "About us", path: "/about", icon: null },
];

const PillNavbar = () => {
  const location = useLocation(); // gives current route
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-between px-4 py-3">
      {/* Logo / Title */}
  

      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-black rounded-full p-1.5 items-center gap-x-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out
                ${isActive ? "bg-white text-zinc-900" : "text-zinc-300 hover:bg-zinc-700"}
              `}
            >
              <span className="flex items-center gap-x-2">
                {isActive && item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white p-2 focus:outline-none"
      >
        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-zinc-800 rounded-lg shadow-lg w-48 flex flex-col md:hidden z-50">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`
                  px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300
                  ${isActive ? "bg-white text-zinc-900" : "text-zinc-300 hover:bg-zinc-700"}
                `}
              >
                <span className="flex items-center gap-x-2">
                  {isActive && item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PillNavbar;
