
import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-5xl border-routed absolute top-4 right-4"
      >
        {isOpen ? <IoClose /> : <HiMenuAlt1 />}
      </button> 

      {isOpen && (
      <div className="">
          <ul className="flex flex-col gap-6 bg-primary-light-gray text-center justify-center h-screen ">
            <li><a href="#" className="nav-item">Home</a></li>
            <li><a href="#" className="nav-item">Filter</a></li>
          </ul>
      </div>
      )}
    </div>
  );
};

export default NavBar;