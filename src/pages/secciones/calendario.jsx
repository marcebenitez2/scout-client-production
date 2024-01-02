import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import { useState } from "react";
import InfoEvento from "../../components/infoEvento";
import ListaEvento from "../../components/listaEvento";
import Calendar from "react-calendar";
import "../../calendario.css";
import ModalCalendario from "../../components/modalCalendario";
import { format } from "date-fns"; // Importa date-fns
import { fetchBD } from "../../services/fetchBD";

function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fecha, setFecha] = useState(new Date());
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);


  // Funcion para cuando se clickee una fecha
  function onClickDay(value) {
    const fechaSeleccionada = format(value, "yyyy-MM-dd");
    setFecha(fechaSeleccionada);
    setEventoSeleccionado(null);
    setModalOpen(true);
  }

  useEffect(() => {
    fetchBD(setEventos, "https://scout-server-production-dev-dspd.3.us-1.fl0.io/calendary");
  }, []);


  return (
    <main className="w-screen h-screen flex flex-col pt-4 pb-6 px-16 gap-4 mdn:px-0 mdn:pt-0 overflow-x-hidden dark:bg-custon-black dark:text-white">
      <Navbar />
      <div
        className={`w-full h-full ${
          modalOpen ? "blur" : ""
        } flex flex-col gap-4`}
      >
        <h1 className="text-3xl text-center dark:text-white">Calendario</h1>
        <div className="flex w-full h-full">
          <div className="flex flex-col h-full w-full justify-between">
            <div className="w-full h-fit flex items-center justify-center">
              <Calendar onClickDay={onClickDay} />
            </div>
            <InfoEvento
              eventoSeleccionado={eventoSeleccionado}
              isOpen={setModalOpen}
            />
          </div>
          <ListaEvento
            eventos={eventos}
            setEventoSeleccionado={setEventoSeleccionado}
            eventoSeleccionado={eventoSeleccionado}
          />
        </div>
      </div>
      <ModalCalendario
        isOpen={modalOpen}
        toClose={setModalOpen}
        fechaSeleccionada={fecha}
        eventoSeleccionado={eventoSeleccionado}
        eventos={eventos}
      />
    </main>
  );
}

export default Calendario;
