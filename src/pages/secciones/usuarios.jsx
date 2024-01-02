import React from "react";
import Navbar from "../../components/navbar";
import { useState } from "react";
import { useEffect } from "react";
import { fetchBD } from "../../services/fetchBD";
import ModalUsuarios from "../../components/modalUsuarios";

function Usuarios() {
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);

  function fijarSeleccionado(usuario) {
    setSeleccionado(usuario);
    setModalOpen(true);
  }

  useEffect(() => {
    fetchBD(setUsuarios, "http://localhost/users.php");
  }, []);

  return (
    <main className='className="w-screen h-screen flex flex-col pt-4 pb-6 px-16 gap-4 mdn:px-0 mdn:pt-0 overflow-x-hidden dark:bg-custon-black dark:text-white'>
      <Navbar />
      <div
        className={`w-full h-full ${
          modalOpen ? "blur" : ""
        } flex flex-col gap-4`}
      >
        <h1 className="text-3xl text-center dark:text-white">Usuarios</h1>
        <button
          className="absolute bg-custon-red px-4 py-1 right-20"
          onClick={() => setModalOpen(true)}
        >
          Agregar
        </button>
        <div className="w-full flex justify-center">
          <table className="text-center w-5/6">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Correo</th>
                <th>Rama</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios?.map((usuario) => {
                return (
                  <tr key={usuario.username}>
                    <td>{usuario.name}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.password}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.branch}</td>
                    <td
                      className={`${
                        usuario.rol === "admin" ? "text-red-600" : null
                      }`}
                    >
                      {usuario.rol}
                    </td>
                    <td
                      onClick={() => fijarSeleccionado(usuario)}
                      className="cursor-pointer"
                    >
                      Editar
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalUsuarios
        isOpen={modalOpen}
        toClose={setModalOpen}
        seleccionado={seleccionado}
        listaUsuarios={usuarios}
        setSeleccionado={setSeleccionado}
      />
    </main>
  );
}

export default Usuarios;
