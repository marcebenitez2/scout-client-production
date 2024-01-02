import React from "react";
import { fetchBD } from "../services/fetchBD";
import { postBD } from "../services/postBD";
import { useState } from "react";
import { useEffect } from "react";
import { ramas } from "../services/ramas";
import { postPlanificacionesFireBase } from "../services/fetchFirebase";
import { ToastContainer, toast } from "react-toastify";

function ModalAgregarArchivo({ isOpen, toClose }) {
  if (!isOpen) {
    return null;
  }

  const [titulo, setTitulo] = useState("");
  const [evento, setEvento] = useState(null);
  const [rama, setRama] = useState("Todos");
  const [archivo, setArchivo] = useState(null);

  const guardarCambios = (e) => {
    e.preventDefault();

    if (!titulo || !rama || !archivo) {
      toast.error("Rellena todos los campos");
      return;
    }

    postPlanificacionesFireBase(archivo)
      .then((url) => {
        const item = {
          titulo: titulo,
          evento: evento,
          rama: rama,
          archivo: url,
        };

        postBD(item, "https://scout-server-production-dev-dspd.3.us-1.fl0.io/plans");
        toClose(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al enviar a Firebase Storage:", error);
      });
  };

  const [eventos, setEventos] = useState(null);
  useEffect(() => {
    fetchBD(setEventos, "https://scout-server-production-dev-dspd.3.us-1.fl0.io/calendary");
  }, []);

  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed dark:text-white text-black">
          <form className="w-2/5 dark:bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center py-4 px-6 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms]">
            <h3 className="text-2xl">Agregar archivo</h3>
            <div className="w-full h-full flex flex-col gap-4">
              <label className="flex flex-col">
                Titulo
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="dark:bg-custon-black border rounded-md px-2 py-1 "
                />
              </label>
              {eventos ? (
                <label className="flex flex-col">
                  Evento
                  <select
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                    value={evento}
                    onChange={(e) => setEvento(e.target.value)}
                  >
                    <option>Ninguno</option>
                    {eventos.map((evento) => (
                      <option key={evento.id} value={evento.id}>
                        {evento.title}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              <label className="flex flex-col">
                Rama
                <select
                  className="dark:bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={rama}
                  onChange={(e) => setRama(e.target.value)}
                >
                  {ramas.map((rama) => (
                    <option key={rama.id}>{rama.nombre}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col">
                Archivo
                <input
                  type="file"
                  onChange={(e) => {
                    setArchivo(e.target.files[0]);
                  }}
                />
              </label>

              <div className="w-full flex justify-center">
                <button
                  onClick={() => toClose(false)}
                  className="px-6 py-2 dark:text-white mdn:w-2/5"
                >
                  Cancelar
                </button>
                <button
                  className="bg-custon-red  px-1 py-2 rounded-xl font-semibold mdn:w-2/5 text-white"
                  onClick={(e) => guardarCambios(e)}
                >
                  Guardar cambios
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

export default ModalAgregarArchivo;
