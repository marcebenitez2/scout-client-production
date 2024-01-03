import React from "react";
import { updateBD } from "../services/updateBD";

function ModalNotificaciones({ isOpen, toClose, seleccionada, texto }) {
  const enviarCambios = () => {
    updateBD(`https://scout-server.onrender.com/notifications/${seleccionada.id}`);
    window.location.reload();
  };

  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed">
          <div className="w-1/3 h-1/3 bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center justify-between py-4 px-6 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms]">
            <h4 className="text-white text-2xl font-semibold">
              Desea confirmar?
            </h4>
            <p className="text-white text-xl">
              {texto}: <span className="italic">{seleccionada.message}</span>
            </p>
            <div className="flex w-full justify-center">
              <button
                onClick={() => toClose(false)}
                className="w-1/5 h-10 text-white mdn:w-2/5"
              >
                Cancelar
              </button>
              <button
                onClick={enviarCambios}
                className="bg-custon-red w-1/5 h-10 rounded-xl font-semibold mdn:w-2/5"
              >
                Confirmar
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default ModalNotificaciones;
