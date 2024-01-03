import React from "react";
import { ramas } from "../services/ramas";
import { useState } from "react";
import { postPlanificacionesFireBase } from "../services/fetchFirebase";
import { postBD } from "../services/postBD";
import { updateBD } from "../services/updateBD";
import { FaRegFileArchive } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function ModalConsejo({ isOpen, toClose, seleccionado, setSeleccionado }) {
  if (!isOpen) {
    return null;
  }

  const [fecha, setFecha] = useState(seleccionado ? seleccionado.date : "");
  const [horaInicio, setHoraInicio] = useState(
    seleccionado ? seleccionado.starttime : ""
  );
  const [titulo, setTitulo] = useState(seleccionado ? seleccionado.title : "");
  const [lugar, setLugar] = useState(seleccionado ? seleccionado.location : "");
  const [rama, setRama] = useState(
    seleccionado ? seleccionado.branch : "Todos"
  );
  const [archivo, setArchivo] = useState(
    seleccionado ? seleccionado.urlfile : null
  );

  const guardarCambios = (e) => {
    e.preventDefault();

    if (!fecha || !horaInicio || !titulo || !lugar || !rama) {
      toast.error("Rellena todos los campos");
      return;
    }

    let item;

    if (seleccionado) {
      // Aca seria para actualizar un dato pero con archivo
      if (archivo !== null && archivo !== undefined) {
        postPlanificacionesFireBase(archivo).then((url) => {
          item = {
            id: seleccionado.id,
            fecha: fecha,
            horaInicio: horaInicio,
            titulo: titulo,
            lugar: lugar,
            rama: rama,
            archivo: url,
          };
          updateBD(`https://scout-server.onrender.com/advices/${seleccionado.id}`, item);
          toClose(false);
          setSeleccionado(null);
          window.location.reload();
        });
      } else {
        // Aca seria para actualizar un dato pero sin archivo
        item = {
          id: seleccionado.id,
          fecha: fecha,
          horaInicio: horaInicio,
          titulo: titulo,
          lugar: lugar,
          rama: rama,
        };
        updateBD(`https://scout-server.onrender.com/advices/${seleccionado.id}`, item);
        toClose(false);
        setSeleccionado(null);

        window.location.reload();
      }
    } else {
      // Aca seria para agregar un dato con archivo
      if (archivo !== null && archivo !== undefined) {
        postPlanificacionesFireBase(archivo).then((url) => {
          item = {
            fecha: fecha,
            horaInicio: horaInicio,
            titulo: titulo,
            lugar: lugar,
            rama: rama,
            archivo: url,
          };
          postBD(item, "http://localhost/addadvice.php");
          toClose(false);
          setSeleccionado(null);

          window.location.reload();
        });
      } else {
        // Aca seria para agregar un dato pero sin archivo
        item = {
          fecha: fecha,
          horaInicio: horaInicio,
          titulo: titulo,
          lugar: lugar,
          rama: rama,
        };
        postBD(item, "https://scout-server.onrender.com/advices");
        toClose(false);
        setSeleccionado(null);
        window.location.reload();
      }
    }
  };

  const cerrarModal = () => {
    toClose(false);
    setSeleccionado(null);
  };

  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed dark:text-white text-black">
          <form className="w-2/5  dark:bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center gap-4 py-4 px-6 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms] justify-between">
            <h3 className="text-3xl">Agregar proximo consejo</h3>
            <div className="flex flex-col w-full gap-4 ">
              <div className="flex w-full justify-between gap-6">
                <label className="flex flex-col w-full">
                  Fecha
                  <input
                    onChange={(e) => setFecha(e.target.value)}
                    defaultValue={fecha}
                    type="date"
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                  />
                </label>
                <label className="flex flex-col w-full">
                  Hora inicio
                  <input
                    onChange={(e) => setHoraInicio(e.target.value)}
                    defaultValue={horaInicio}
                    type="time"
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                  />
                </label>
              </div>
              <label className="flex flex-col">
                Titulo
                <input
                  onChange={(e) => setTitulo(e.target.value)}
                  defaultValue={titulo}
                  type="text"
                  className="dark:bg-custon-black border rounded-md px-2 py-1"
                />
              </label>
              <label className="flex flex-col">
                Lugar
                <input
                  onChange={(e) => setLugar(e.target.value)}
                  defaultValue={lugar}
                  type="text"
                  className="dark:bg-custon-black border rounded-md px-2 py-1"
                />
              </label>
              <div className="flex justify-between w-full gap-6">
                <label className="w-full flex flex-col">
                  Rama{" "}
                  <select
                    className="bg-custon-black border rounded-md"
                    onChange={(e) => setRama(e.target.value)}
                    defaultValue={rama}
                  >
                    {ramas.map((x) => (
                      <option key={x.id}>{x.nombre}</option>
                    ))}
                  </select>
                </label>
                {seleccionado ? (
                  seleccionado.url ? (
                    <div className="w-full flex gap-8">
                      <span>Acta de consejo</span>
                      <a href={seleccionado.url}>
                        <FaRegFileArchive size={50} />
                      </a>
                    </div>
                  ) : (
                    <label className="w-full flex flex-col">
                      Archivo{" "}
                      <input
                        type="file"
                        onChange={(e) => setArchivo(e.target.files[0])}
                      />
                    </label>
                  )
                ) : (
                  <label className="w-full flex flex-col">
                    Archivo{" "}
                    <input
                      type="file"
                      onChange={(e) => setArchivo(e.target.files[0])}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={() => cerrarModal()}
                className="w-1/5 h-10 dark:text-white mdn:w-2/5"
              >
                Cancelar
              </button>
              <button
                className="bg-custon-red  h-10 rounded-xl font-semibold mdn:w-2/5 text-white"
                onClick={(e) => guardarCambios(e)}
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

export default ModalConsejo;
