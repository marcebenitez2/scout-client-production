import React from "react";
import { FaRegFileWord } from "react-icons/fa";

function InfoEvento({ eventoSeleccionado, isOpen }) {
  console.log(eventoSeleccionado);
  return (
    <main className=" w-full ">
      {eventoSeleccionado ? (
        <div className="w-full h-full border border-neutral-600 rounded-xl animate-fade-right animate-once px-12">
          {" "}
          <h3 className="text-center text-2xl">{eventoSeleccionado.title}</h3>
          <div className="flex w-full">
            <div className="flex flex-col gap-2 w-full">
              <p>Fecha: {eventoSeleccionado.date}</p>
              <p>Fecha fin: {eventoSeleccionado.enddate}</p>
              <p>Hora inicio: {eventoSeleccionado.starttime}</p>
              <p>Hora fin: {eventoSeleccionado.endtime}</p>
            </div>
            <div className="flex flex-col w-full">
              <p>Lugar: {eventoSeleccionado.location}</p>
              <p>Rama: {eventoSeleccionado.branch}</p>
              <p>Tipo: {eventoSeleccionado.type}</p>
              <p>Descripcion: {eventoSeleccionado.description}</p>
            </div>
            <button
              className="h-12 w-64 bg-custon-red"
              onClick={() => isOpen(true)}
            >
              Editar
            </button>
          </div>
          <div className="flex w-full gap-5 mt-4">
            {eventoSeleccionado.plans.map((planificacion) => (
              <a
                href={planificacion.url}
                className="flex gap-2 text-red-600"
                key={planificacion.url}
              >
                <FaRegFileWord fill="white" />
                {planificacion.title}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default InfoEvento;
