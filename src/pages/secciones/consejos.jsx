import React from "react";
import Navbar from "../../components/navbar";
import { useState } from "react";
import { useEffect } from "react";
import { fetchBD } from "../../services/fetchBD";
import ModalConsejo from "../../components/modalConsejo";
import { HiUserGroup } from "react-icons/hi";
import ModalEliminarConsejos from "../../components/modalEliminarConsejos";

function Consejos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [consejos, setConsejos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [ordenados, setOrdenados] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const cambiarSeleccionado = (x) => {
    setSeleccionado(x);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchBD(setConsejos, "https://scout-server-production-dev-dspd.3.us-1.fl0.io/advices");
  }, []);

  useEffect(() => {
    console.log(consejos);
    const consejosOrdenados = consejos.sort((a, b) => {
      return new Date(b.fecha) - new Date(a.fecha);
    });
    setOrdenados(consejosOrdenados);
  }, [consejos]);

  return (
    <main className="w-screen h-screen flex flex-col pt-4 pb-6 px-16 gap-4 mdn:px-0 mdn:pt-0 overflow-x-hidden dark:bg-custon-black dark:text-white">
      <Navbar />
      <div
        className={`w-full h-full ${
          modalOpen || deleteModalOpen ? "blur" : ""
        } flex flex-col gap-4`}
      >
        <h1 className="text-3xl text-center dark:text-white">Consejos</h1>
        <div className="absolute right-20 flex gap-4">
          <button onClick={() => setDeleteModalOpen(true)}>Eliminar</button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-custon-red px-4 py-1"
          >
            Agregar
          </button>
        </div>

        <div className="w-full flex flex-col gap-4 px-20">
          {ordenados.map((x) => (
            <div
              className="flex w-full  bg-custon-red rounded-xl px-8 py-2 gap-10 cursor-pointer"
              key={x.id}
              onClick={() => cambiarSeleccionado(x)}
            >
              <div className="h-full flex items-center">
                <HiUserGroup size={50} />
              </div>
              <div className="w-full flex justify-around">
                <div className="flex flex-col w-full">
                  <span className="font-semibold">Titulo</span>
                  <span>{x.title}</span>
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-semibold">Fecha</span>
                  <span>{x.date}</span>
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-semibold">Hora</span>
                  <span>{x.starttime}</span>
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-semibold">Lugar</span>
                  <span>{x.location}</span>
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-semibold">Rama</span>
                  <span>{x.branch}</span>
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-semibold">Archivo acta</span>
                  {x.urlfile ? (
                    <a href={x.urlfile} target="_blank" rel="noreferrer">
                      <span>Descargar</span>
                    </a>
                  ) : (
                    <span>No hay archivo</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalConsejo
        isOpen={modalOpen}
        toClose={setModalOpen}
        seleccionado={seleccionado}
        setSeleccionado={setSeleccionado}
      />
      <ModalEliminarConsejos
        isOpen={deleteModalOpen}
        toClose={setDeleteModalOpen}
        consejos={consejos}
      />
    </main>
  );
}

export default Consejos;
