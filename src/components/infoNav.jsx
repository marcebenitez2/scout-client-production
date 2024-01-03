import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";

function InfoNav() {
  return (
    <nav className="w-full h-12 flex justify-between items-center px-10 fixed top-0 bg-red-600 text-white font-semibold lgn:h-16 smn:px-3 z-50">
      <div>
        <Link to={"/"}>
          <ImHome size={45} />
        </Link>
      </div>
      <div className="flex gap-11 smn:gap-3"></div>
      <Link to={"/login"}>
        <FaUser size={45} />
      </Link>
    </nav>
  );
}

export default InfoNav;
