import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { postBD } from "../services/postBD";

function ModalDeleteItem({ isOpen, toClose, inventario }) {
  if (!isOpen) {
    return null;
  }

  const [AEliminar, setAEliminar] = useState([]);

  function guardarCambios(e) {
    e.preventDefault();

    if (AEliminar.length === 0) {
      toast.error("Selecciona al menos un item");
    }
    postBD(AEliminar, "http://localhost/deleteItem.php");
    setAEliminar([]);
    toClose(false);
    window.location.reload();
  }

  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed dark:text-white text-black">
          <form className=" dark:bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center py-4 px-16 gap-4 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms]">
            <h3 className="text-3xl">Eliminar item</h3>
            {inventario ? (
              <div className="flex flex-col w-full">
                {inventario.map((item) => {
                  return (
                    <label className="flex gap-10 text-xl" key={item.id}>
                      <input
                        type="checkbox"
                        value={item.id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAEliminar([
                              ...AEliminar,
                              Number(e.target.value),
                            ]);
                          } else {
                            setAEliminar(
                              AEliminar.filter(
                                (id) => id !== Number(e.target.value)
                              )
                            );
                          }
                        }}
                      />
                      {item.name}
                    </label>
                  );
                })}
              </div>
            ) : null}
            <div className="flex w-full justify-center gap-4">
              <button
                className=" h-10 dark:text-white mdn:w-2/5"
                onClick={() => toClose(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-custon-red h-10 rounded-xl font-semibold mdn:w-2/5 text-white"
                onClick={guardarCambios}
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </section>
      ) : null}
      <ToastContainer />
    </main>
  );
}

export default ModalDeleteItem;
