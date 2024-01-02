import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import PlanificacionesGrilla from "../../components/planificacionesGrilla";
import { fetchBD } from "../../services/fetchBD";
import ModalAgregarArchivo from "../../components/modalAgregarArchivo";
import ModalEliminarArchivo from "../../components/modalEliminarArchivo";

function Planificaciones() {
  const [modalOpen, setModalOpen] = useState(false);
  const [archivos, setArchivos] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchBD(setArchivos, "http://localhost:5000/plans");
  }, []);



  return (
    <main className='className="w-screen h-screen flex flex-col pt-4 pb-6 px-16 gap-4 mdn:px-0 mdn:pt-0 overflow-x-hidden dark:bg-custon-black dark:text-white'>
      <Navbar />
      <div
        className={`w-full h-full ${
          modalOpen || deleteModalOpen ? "blur" : ""
        } flex flex-col gap-4`}
      >
        <h1 className="text-2xl text-center dark:text-white">
          Planificaciones
        </h1>
        <div className="flex absolute right-20 ">
          <button
            className="px-4 py-1"
            onClick={() => setDeleteModalOpen(true)}
          >
            Eliminar
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-custon-red px-4 py-1 "
          >
            Agregar
          </button>
        </div>
        {archivos ? <PlanificacionesGrilla archivos={archivos} /> : null}
      </div>
      <ModalAgregarArchivo isOpen={modalOpen} toClose={setModalOpen} />
      <ModalEliminarArchivo
        isOpen={deleteModalOpen}
        toClose={setDeleteModalOpen}
        archivos={archivos}
      />
    </main>
  );
}

export default Planificaciones;
