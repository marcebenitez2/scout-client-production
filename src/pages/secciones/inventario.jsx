import React from "react";
import Navbar from "../../components/navbar";
import { useState } from "react";
import { useEffect } from "react";
import { fetchBD } from "../../services/fetchBD";
import TablaInventario from "../../components/tablaInventario";
import ModalInventario from "../../components/modalInventario";
import ModalDeleteItem from "../../components/modalEliminarItem";

function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [seleccionada, setSeleccionada] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchBD(setInventario, "https://scout-server.onrender.com/inventory");
  }, []);

  return (
    <main>
      <div
        className={`w-screen min-h-screen flex flex-col pt-4 pb-6 px-16 gap-4 mdn:px-0 mdn:pt-0 overflow-x-hidden dark:bg-custon-black `}
      >
        <Navbar />
        <div
          className={`w-full h-full ${
            modalOpen || deleteModalOpen ? "blur" : ""
          } flex flex-col gap-4`}
        >
          <h1 className="text-3xl text-center dark:text-white">Inventario</h1>
          <button
            className="px-4 py-1 text-white absolute right-20"
            onClick={() => setDeleteModalOpen(true)}
          >
            Eliminar
          </button>
          <TablaInventario
            inventario={inventario}
            setModalOpen={setModalOpen}
            setSeleccionada={setSeleccionada}
          />
        </div>
      </div>
      <ModalDeleteItem
        isOpen={deleteModalOpen}
        toClose={setDeleteModalOpen}
        inventario={inventario}
      />
      <ModalInventario
        isOpen={modalOpen}
        toClose={setModalOpen}
        seleccionada={seleccionada}
        inventario={inventario}
      />
    </main>
  );
}

export default Inventario;
