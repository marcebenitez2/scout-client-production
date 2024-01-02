import React from "react";
import Navbar from "../../components/navbar";
import { useEffect } from "react";
import { fetchBD } from "../../services/fetchBD";
import { useState } from "react";
import Tabla from "../../components/tabla";
import ModalBeneficiarios from "../../components/modalBeneficiarios";

function Beneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    fetchBD(setBeneficiarios, "https://scout-server-production-dev-dspd.3.us-1.fl0.io/beneficiaries");
  }, []);

  console.log(beneficiarios);

  return (
    <main>
      <div
        className={`w-screen min-h-screen flex flex-col pt-4 pb-6 px-16 gap-4 mdn:px-0 mdn:pt-0 overflow-x-hidden dark:bg-custon-black `}
      >
        <Navbar />
        <div
          className={`w-full h-full ${
            modalOpen ? "blur" : ""
          } flex flex-col gap-4`}
        >
          <h1 className="text-3xl text-center dark:text-white">
            Beneficiarios
          </h1>
          <Tabla
            beneficiarios={beneficiarios}
            setModalOpen={setModalOpen}
            setSeleccionada={setSeleccionada}
          />
        </div>
      </div>
      <ModalBeneficiarios
        isOpen={modalOpen}
        toClose={setModalOpen}
        seleccionada={seleccionada}
        beneficiarios={beneficiarios}
      />
    </main>
  );
}

export default Beneficiarios;
