import React, { useState } from "react";
import { ramas } from "../services/ramas";
import { ToastContainer, toast } from "react-toastify";
import { postBD } from "../services/postBD";
import { updateBD } from "../services/updateBD";
import { deleteDB } from "../services/deleteDB";

function ModalCalendario({
  isOpen,
  toClose,
  fechaSeleccionada,
  eventoSeleccionado,
  eventos,
}) {
  if (!isOpen) {
    return null;
  }

  const [id, setId] = useState(
    eventoSeleccionado ? eventoSeleccionado.id : null
  );
  const [nombre, setNombre] = useState(
    eventoSeleccionado ? eventoSeleccionado.title : null
  );
  const [lugar, setLugar] = useState(
    eventoSeleccionado ? eventoSeleccionado.location : null
  );
  const [fecha, setFecha] = useState(
    eventoSeleccionado ? eventoSeleccionado.date : fechaSeleccionada
  );
  const [fechaFin, setFechaFin] = useState(
    eventoSeleccionado ? eventoSeleccionado.enddate : fechaSeleccionada
  );
  const [inicio, setInicio] = useState(
    eventoSeleccionado ? eventoSeleccionado.starttime : null
  );
  const [fin, setFin] = useState(
    eventoSeleccionado ? eventoSeleccionado.endtime : null
  );
  const [rama, setRama] = useState(
    eventoSeleccionado ? eventoSeleccionado.branch : "Todos"
  );
  const [tipo, setTipo] = useState(
    eventoSeleccionado ? eventoSeleccionado.type : "Evento"
  );
  const [descripcion, setDescripcion] = useState(
    eventoSeleccionado ? eventoSeleccionado.description : ""
  );

  const guardarCambios = async (e) => {
    e.preventDefault();
    const evento = {
      id: id,
      nombre: nombre,
      fecha: fecha,
      fechaFin: fechaFin,
      inicio: inicio,
      fin: fin,
      lugar: lugar,
      descripcion: descripcion,
      tipo: tipo,
      rama: rama,
    };
    console.log(evento);

    if (!nombre || !lugar || !fecha || !inicio || !fin || !rama || !tipo) {
      toast.error("Rellena todos los campos");
      return;
    }

    if (fecha > fechaFin) {
      toast.error("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    if (evento.id) {
      await updateBD(
        `https://scout-server.onrender.com/calendary/${evento.id}`,
        evento
      );
      toClose(false);
      window.location.reload();
    } else {
      await postBD(evento, "https://scout-server.onrender.com/calendary");
      toClose(false);
      window.location.reload();
    }
  };

  const eliminarEvento = async (e) => {
    e.preventDefault();
    const id = eventoSeleccionado.id;
    await deleteDB(`https://scout-server.onrender.com/calendary/${id}`);
    toClose(false);
    window.location.reload();
  };

  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed dark:text-white text-black">
          <form className="w-2/5  dark:bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center py-4 px-6 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms]">
            {eventoSeleccionado ? (
              <h3 className="text-2xl">Editar evento</h3>
            ) : (
              <h3 className="text-2xl">Agregar evento</h3>
            )}

            <div className="flex flex-col gap-4 w-full">
              <div className="flex w-full justify-between gap-2">
                <label className="flex flex-col w-full">
                  Nombre evento
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                    type="text"
                    defaultValue={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
                <label className="flex flex-col w-full">
                  Lugar evento
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1 "
                    type="text"
                    defaultValue={lugar}
                    onChange={(e) => setLugar(e.target.value)}
                  />
                </label>
              </div>
              <div className="w-full flex justify-between flex-wrap">
                <label className="flex flex-col">
                  Fecha
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                    value={fecha}
                    type="date"
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </label>
                <label className="flex flex-col">
                  Fecha fin
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                    value={fechaFin}
                    type="date"
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                </label>

                <label className="flex flex-col">
                  Hora inicio
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                    defaultValue={inicio}
                    type="time"
                    onChange={(e) => setInicio(e.target.value)}
                  />
                </label>
                <label className="flex flex-col">
                  Hora fin
                  <input
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                    defaultValue={fin}
                    type="time"
                    onChange={(e) => setFin(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex w-full gap-2">
                <label className="flex flex-col w-full">
                  Rama
                  <select
                    className="dark:bg-custon-black border rounded-md"
                    defaultValue={rama}
                    onChange={(e) => setRama(e.target.value)}
                  >
                    {ramas.map((x) => (
                      <option key={x.id}>{x.nombre}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col w-full">
                  Tipo de evento
                  <select
                    className="dark:bg-custon-black border rounded-md"
                    defaultValue={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value={"evento"}>Evento</option>
                    <option value={"salida"}>Salida</option>
                    <option value={"campamento"}>Campamento</option>
                  </select>
                </label>
              </div>
              <label className="flex flex-col">
                Descripcion
                <textarea
                  className="dark:bg-custon-black border rounded-md h-32 "
                  style={{ resize: "none" }}
                  defaultValue={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </label>
              <div className="flex w-full justify-center gap-2">
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
              {eventoSeleccionado ? (
                <button
                  className="w-1/3 py-2 m-auto"
                  onClick={(e) => eliminarEvento(e)}
                >
                  Eliminar
                </button>
              ) : null}
            </div>
          </form>
        </section>
      ) : null}
      <ToastContainer />
    </main>
  );
}

export default ModalCalendario;
