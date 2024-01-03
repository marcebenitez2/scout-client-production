import React, { useState } from "react";
import ChangeTheme from "./changeTheme";
import { Link } from "react-router-dom";
import { BiSolidLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdInventory2 } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const navigate = useNavigate();
  const [menuBurger, setMenuBurger] = useState(false);

  const abrirMenu = () => {
    setMenuBurger(!menuBurger);
  };

  const rolUsuario = localStorage.getItem("rolUsuario");

  const logout = () => {
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("idUsuario");
    sessionStorage.removeItem("emailUsuario");
    sessionStorage.removeItem("idUsuario");
    navigate("/");
  };

  return (
    <header className="w-full h-14 flex justify-between items-center bg-custon-red rounded-full px-4 text-white font-semibold mdn:gap-4 mdn:rounded-none mdn:px-3">
      <GiHamburgerMenu
        className="text-4xl mdn:block hidden"
        onClick={abrirMenu}
      />
      <img src="/florDeLiz.png" className="w-10 mdn:hidden" />
      <div className="flex w-full basis-6/12 justify-between mdn:hidden xln:basis-2/3">
        <Link to={"/menu"}>
          <span className="lgn:hidden">Home</span>
          <AiFillHome className="lgn:block hidden text-4xl" />
        </Link>
        <Link to={"/menu/beneficiarios"}>
          <span className="lgn:hidden">Beneficiarios</span>
          <BsFillPersonLinesFill className="lgn:block hidden text-4xl" />
        </Link>
        <Link to={"/menu/inventario"}>
          <span className="lgn:hidden">Inventario</span>
          <MdInventory2 className="lgn:block hidden text-4xl" />
        </Link>
        <Link to={"/menu/calendario"}>
          <span className="lgn:hidden">Calendario</span>
          <BsFillCalendarDateFill className="lgn:block hidden text-4xl" />
        </Link>
        <Link to={"/menu/planificaciones"}>
          <span className="lgn:hidden">Planificaciones</span>
          <IoNewspaperSharp className="lgn:block hidden text-4xl" />
        </Link>
        <Link to={"/menu/consejos"}>
          <span className="lgn:hidden">Consejos</span>
          <FaPeopleGroup className="lgn:block hidden text-4xl" />
        </Link>
      </div>
      <div className="flex items-center gap-2 mdn:gap-0">
        {rolUsuario === "admin" ? (
          <Link to={"/menu/usuarios"}>
            {" "}
            <FaUsers className="text-3xl"></FaUsers>
          </Link>
        ) : null}
        <BiSolidLogOut onClick={logout} className="cursor-pointer text-4xl" />
        <ChangeTheme isNavbar={true} />
      </div>
      {menuBurger ? (
        <div className="px-2 flex flex-col gap-6 py-2 absolute left-3 top-14 w-3/4 bg-custon-brow text-3xl rounded-lg animate-fade-down animate-duration-100">
          <Link to={"/menu"}>
            <span>Home</span>
          </Link>
          <Link to={"/menu/beneficiarios"}>
            <span>Beneficiarios</span>
          </Link>
          <Link to={"/menu/inventario"}>
            <span>Inventario</span>
          </Link>
          <Link to={"/menu/calendario"}>
            <span>Calendario</span>
          </Link>
          <Link to={"/menu/planificaciones"}>
            <span>Planificaciones</span>
          </Link>
          <Link to={"/menu/consejos"}>
            <span>Consejos</span>
          </Link>

          {rolUsuario === "admin" ? (
            <Link to={"/menu/usuarios"}>
              <span>Usuarios</span>
            </Link>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
