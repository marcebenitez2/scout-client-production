import React from "react";
import InfoNav from "../components/infoNav";
import background from "/fotoFondo.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-full max-h-screen overflow-y-hidden">
      <InfoNav />
      <section
        className="w-full h-full bg-cover bg-center bg-no-repeat overflow-y-hidden"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center overflow-y-hidden">
          <h1 className="text-white text-5xl tracking-tighter smn:text-2xl">
            Grupo Scout
          </h1>
          <h2 className="text-white text-7xl tracking-tighter	font-bold text-center smn:text-5xl">
            San Miguel de Arcangel
          </h2>
          <Link to={"/formulario"}>
            <button className="bg-red-600 text-white font-semibold rounded-lg px-8 py-3 mt-6 text-xl hover:bg-red-800 transition-all duration-100">
              Consultanos!
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
