import React from "react";
import { ramas } from "../services/ramas";
import { useState } from "react";
import { useEffect } from "react";

function Tabla({ beneficiarios, setModalOpen, setSeleccionada }) {
  const [beneficiariosCopia, setBeneficiariosCopia] = useState([]);

  // Funcion para filtrar por rama
  const filtradoPorRama = (rama) => {
    if (rama === "Todos") {
      return setBeneficiariosCopia(beneficiarios);
    }
    const beneficiariosFiltrados = beneficiarios.filter(
      (beneficiario) => beneficiario.branch === rama
    );
    setBeneficiariosCopia(beneficiariosFiltrados);
  };

  // Función para filtrar por nombre o DNI
  const filtradoPorNombre = (valor) => {
    const beneficiariosFiltrados = beneficiarios.filter(
      (beneficiario) =>
        beneficiario.name.toLowerCase().includes(valor.toLowerCase()) ||
        beneficiario.dni.includes(valor)
    );
    setBeneficiariosCopia(beneficiariosFiltrados);
  };

  // Funcion para seleccionar beneficiario y editarlo
  // Desde aca se puede abrir el modal
  const seleccionarBeneficiario = (beneficiario) => {
    setSeleccionada(beneficiario);
    setModalOpen(true);
  };

  // Funcion para agregar un beneficiario nuevo
  const agregarBeneficiario = () => {
    setSeleccionada(null);
    setModalOpen(true);
  };

  // Funcion para cambiar los valores de 0 y 1 por Si y No
  useEffect(() => {
    setBeneficiariosCopia(beneficiarios);
  }, [beneficiarios]);

  return (
    <section className="w-full h-full dark:text-white flex flex-col gap-4 px-2 lgn:min-h-screen mdn:w-screen">
      <div className="w-full flex justify-between smn:hidden">
        {ramas.map((rama) => (
          <span
            className="bg-custon-red w-24 h-9 flex items-center justify-center rounded-lg cursor-pointer text-white"
            key={rama.id}
            onClick={() => filtradoPorRama(rama.nombre)}
          >
            {rama.nombre}
          </span>
        ))}
      </div>
      <select
        className="hidden smn:block w-full bg-transparent border rounded-xl p-2"
        onChange={(e) => filtradoPorRama(e.target.value)}
      >
        {ramas.map((rama) => (
          <option
            className="bg-custon-red w-24 h-9 flex items-center justify-center rounded-lg cursor-pointer text-white"
            key={rama.id}
            value={rama.nombre}
          >
            {rama.nombre}
          </option>
        ))}
      </select>
      <input
        className="dark:bg-custon-black border px-4 py-2 rounded-xl bg-white border-black dark:border-white"
        onChange={(e) => filtradoPorNombre(e.target.value)}
      />
      <button
        className="hidden lgn:block h-12 bg-custon-red font-semibold"
        onClick={() => agregarBeneficiario()}
      >
        Agregar nuevo
      </button>
      <div className="table-wrapper overflow-auto max-h-custom">
        <table className="w-full h-full">
          <thead className="w-full h-full">
            <tr className="w-full h-full text-custon-red font-semibold">
              <th className="w-1/12 h-full">Nombre</th>
              <th className="w-1/12 h-full">Documento</th>
              <th className="w-1/12 h-full">nacimiento</th>
              <th className="w-1/12 h-full">Direccion</th>
              <th className="w-1/12 h-full">Telefono</th>
              <th className="w-1/12 h-full">Correo</th>
              <th className="w-1/12 h-full">Rama</th>
              <th className="w-1/12 h-full">Ficha personal</th>
              <th className="w-1/12 h-full">Ficha Medica</th>
              <th className="w-1/12 h-full">Cuota</th>
              <th className="w-1/12 h-full">Activo</th>
              <th className="w-1/12 h-full"></th>
            </tr>
          </thead>
          <tbody className="w-full h-full">
            {beneficiariosCopia.map((beneficiario) => (
              <tr className="w-full h-full text-center" key={beneficiario.id}>
                <td className="w-1/12 h-full">{beneficiario.name}</td>
                <td className="w-1/12 h-full">{beneficiario.dni}</td>
                <td className="w-1/12 h-full">{beneficiario.birth}</td>
                <td className="w-1/12 h-full">{beneficiario.direction}</td>
                <td className="w-1/12 h-full">{beneficiario.tel}</td>
                <td className="w-1/12 h-full">{beneficiario.mail}</td>
                <td className="w-1/12 h-full">{beneficiario.branch}</td>
                <td
                  className={`w-1/12 h-full ${
                    beneficiario.personal_file === true
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {beneficiario.personal_file === true
                    ? "Entregado"
                    : "No entregado"}
                </td>
                <td
                  className={`w-1/12 h-full ${
                    beneficiario.medical_file === true
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {beneficiario.medical_file === true
                    ? "Entregado"
                    : "No entregado"}
                </td>
                <td className="w-1/12 h-full">{beneficiario.cuota}</td>
                <td
                  className={`w-1/12 h-full ${
                    beneficiario.active === true
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {beneficiario.active === true ? "Activo" : "Inactivo"}
                </td>
                <td onClick={() => seleccionarBeneficiario(beneficiario)}>
                  Editar
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="bg-custon-red px-2 h-10 rounded-xl m-auto text-white lgn:hidden"
        onClick={() => agregarBeneficiario()}
      >
        Agregar nuevo
      </button>
    </section>
  );
}

export default Tabla;
