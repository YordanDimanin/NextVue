
import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="text-4xl sm:text-5xl border-routed absolute top-4 right-4 transition transform hover:scale-105 hover:shadow-lg duration-300 z-20"
      >
        {isOpen ? <IoClose /> : <HiMenuAlt1 />}
      </button> 

      {isOpen && (
      <div className="absolute inset-0 z-10 bg-primary-light-gray">
          <ul className="flex flex-col gap-6 text-center justify-center h-full">

            <Link to="/"><li className="nav-item">Home</li></Link>

            <Link to="/filter"><li className="nav-item">Filter</li></Link>

          </ul>
      </div>
      )}
    </>
  );
};

export default NavBar;