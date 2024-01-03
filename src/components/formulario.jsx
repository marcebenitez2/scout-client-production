import React from "react";
import { useState } from "react";
import { postBD } from "../services/postBD";
import { ToastContainer, toast } from "react-toastify";

function Formulario() {
  const [nombreFormulario, setnombreFormulario] = useState("");
  const [telefonoFormulario, settelefonoFormulario] = useState("");
  const [correoFormulario, setcorreoFormulario] = useState("");
  const [mensajeFormulario, setmensajeFormulario] = useState("");

  const enviar = (e) => {
    e.preventDefault();

    if (
      !nombreFormulario ||
      !telefonoFormulario ||
      !correoFormulario ||
      !mensajeFormulario
    ) {
      toast.error("Rellena todos los campos");
      return;
    }

    if (telefonoFormulario.length !== 10) {
      toast.error("El telefono debe tener 10 digitos");
      return;
    }

    if (!correoFormulario.includes("@")) {
      toast.error("El correo electronico no es valido");
      return;
    }

    const data = {
      nombre: nombreFormulario,
      telefono: telefonoFormulario,
      correo: correoFormulario,
      mensaje: mensajeFormulario,
    };

    postBD(
      data,
      "https://scout-server-production-dev-dspd.3.us-1.fl0.io/notifications"
    );
    console.log(data);
    // window.location.reload();
  };

  return (
    <form className="flex flex-col w-1/2 text-white gap-6 lgn:w-full lgn: px-2">
      <div>
        <div className="flex flex-col">
          <label className="text-2xl font-semibold">Nombre y Apellido</label>
          <input
            required
            type="text"
            className="h-8 px-4 rounded-md text-black"
            onChange={(e) => setnombreFormulario(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-2xl font-semibold">Telefono</label>
          <input
            required
            type="number"
            className="h-8 px-4 rounded-md text-black"
            onChange={(e) => settelefonoFormulario(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-2xl font-semibold">Correo electronico</label>
          <input
            required
            type="email"
            className="h-8 px-4 rounded-md text-black"
            onChange={(e) => setcorreoFormulario(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-2xl font-semibold">Mensaje</label>
          <textarea
            className="px-4 rounded-md text-black"
            onChange={(e) => setmensajeFormulario(e.target.value)}
          />
        </div>
      </div>
      <button
        className="m-auto w-1/3 h-10 bg-white text-black rounded-md"
        onClick={(e) => enviar(e)}
      >
        Enviar
      </button>
      <ToastContainer />
    </form>
  );
}

export default Formulario;
