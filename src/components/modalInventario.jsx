import React, { useState } from "react";
import { ramas } from "../services/ramas";
import { postBD } from "../services/postBD";
import { ToastContainer, toast } from "react-toastify";
import { updateBD } from "../services/updateBD";

function ModalInventario({ isOpen, toClose, seleccionada, inventario }) {
  if (!isOpen) {
    return null;
  }

  const [id, setId] = useState(seleccionada ? seleccionada.id : null);
  const [nombre, setNombre] = useState(seleccionada ? seleccionada.name : "");
  const [stock, setStock] = useState(seleccionada ? seleccionada.stock : 0);
  const [disponible, setDisponible] = useState(
    seleccionada ? seleccionada.available : 0
  );
  const [descripcion, setDescripcion] = useState(
    seleccionada ? seleccionada.description : ""
  );
  const [rama, setRama] = useState(
    seleccionada ? seleccionada.branch : "Todos"
  );

  const guardarCambios = (e) => {
    e.preventDefault();

    if (!nombre || !stock || !disponible || !descripcion || !rama) {
      toast.error("Rellena todos los campos");
      return;
    }

    const parsedStock = parseInt(stock, 10); // Convert stock to number
    const parsedDisponible = parseInt(disponible, 10); // Convert disponible to number

    if (parsedStock < parsedDisponible) {
      toast.error("El disponible no puede ser mayor al stock");
      console.log(parsedDisponible, parsedStock);
      return;
    }

    const item = {
      id: id,
      nombre: nombre,
      stock: parsedStock,
      disponible: parsedDisponible,
      descripcion: descripcion,
      rama: rama,
    };

    if (item.id) {
      updateBD(`https://scout-server.onrender.com/inventory/${item.id}`, item);
      toClose(false);
      window.location.reload();
    } else {
      postBD(item, "https://scout-server.onrender.com/inventory");
      toClose(false);
      window.location.reload();
    }
  };

  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed dark:text-white text-black">
          <form className="w-2/5  dark:bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center py-4 px-6 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms]">
            <h3 className="text-2xl">
              {seleccionada ? "Editar Item" : "Agregar nuevo"}
            </h3>
            <div className="flex flex-col gap-4 w-full">
              <div className="w-full flex flex-wrap justify-between">
                <label className="flex flex-col">
                  Nombre
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1 "
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
                <label className="flex flex-col">
                  Stock
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1 "
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </label>
                <label className="flex flex-col">
                  Disponible
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1 "
                    type="number"
                    value={disponible}
                    onChange={(e) => setDisponible(e.target.value)}
                  />
                </label>
              </div>
              <label className="flex flex-col">
                Descripcion
                <textarea
                  className="dark:bg-custon-black border rounded-md px-2 py-1 max-h-40"
                  onChange={(e) => setDescripcion(e.target.value)}
                  style={{ resize: "none" }}
                  value={descripcion}
                />
              </label>
              <label className="flex flex-col">
                Rama
                <select
                  className="dark:bg-custon-black border rounded-md"
                  value={rama}
                  onChange={(e) => setRama(e.target.value)}
                >
                  {ramas.map((x) => (
                    <option key={x.id}>{x.nombre}</option>
                  ))}
                </select>
              </label>
              <div className="flex w-full justify-center">
                <button
                  className="w-1/5 h-10 dark:text-white mdn:w-2/5"
                  onClick={() => toClose(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-custon-red  h-10 rounded-xl font-semibold mdn:w-2/5 text-white"
                  onClick={(e) => guardarCambios(e)}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </form>
        </section>
      ) : null}
      <ToastContainer />
    </main>
  );
}

export default ModalInventario;
