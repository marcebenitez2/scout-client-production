import React, { useEffect } from "react";
import { useState } from "react";

function TablaInventario({ inventario, setModalOpen, setSeleccionada }) {
  const [inventarioCopia, setInventarioCopia] = useState([]);

  const filtradoPorNombre = (valor) => {
    const inventarioFiltrado = inventario.filter((item) =>
      item.name.toLowerCase().includes(valor.toLowerCase())
    );
    setInventarioCopia(inventarioFiltrado);
  };

  const seleccionarItem = (item) => {
    setSeleccionada(item);
    setModalOpen(true);
  };

  const agregarItem = () => {
    setSeleccionada(null);
    setModalOpen(true)
  }

  useEffect(() => {
    setInventarioCopia(inventario);
  }, [inventario]);

  return (
    <section className="dark:text-white w-full flex flex-col gap-4">
      <input
        className="w-full bg-transparent border rounded-xl px-4 py-2 "
        onChange={(e) => filtradoPorNombre(e.target.value)}
      />
      <table className="w-full text-left">
        <thead>
          <tr className="font-semibold">
            <th>Item</th>
            <th>Stock</th>
            <th>Disponible</th>
            <th>Descripcion/observacion</th>
            <th>Rama</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventarioCopia.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.available}</td>
              <td
                className={
                  item.description.includes("sanas")
                    ? "text-green-500"
                    : "text-red-600 font-semibold"
                }
              >
                {item.description}
              </td>
              <td>{item.branch}</td>
              <td
                onClick={() => seleccionarItem(item)}
                className="cursor-pointer"
              >
                editar
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-custon-red w-1/6 h-10 rounded-xl m-auto text-white" onClick={()=>agregarItem()}>
        Agregar nuevo
      </button>
    </section>
  );
}

export default TablaInventario;
