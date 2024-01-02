import React from "react";
import { useState } from "react";
import { ramas } from "../services/ramas";
import { ToastContainer, toast } from "react-toastify";
import { postBD } from "../services/postBD";

function ModalUsuarios({
  isOpen,
  toClose,
  seleccionado,
  listaUsuarios,
  setSeleccionado,
}) {
  if (!isOpen) {
    return null;
  }
  const [nombre, setNombre] = useState(seleccionado ? seleccionado.name : "");
  const [usuario, setUsuario] = useState(
    seleccionado ? seleccionado.username : ""
  );
  const [nuevoUsuario, setNuevoUsuario] = useState(
    seleccionado ? seleccionado.username : ""
  );
  const [contrasenia, setContrasenia] = useState(
    seleccionado ? seleccionado.password : ""
  );
  const [email, setEmail] = useState(seleccionado ? seleccionado.email : "");
  const [rol, setRol] = useState(seleccionado ? seleccionado.rol : "Usuario");
  const [rama, setRama] = useState(
    seleccionado ? seleccionado.branch : "Todos"
  );

  const guardarCambios = (e) => {
    setUsuario(nuevoUsuario);
    e.preventDefault();

    if (!nombre || !usuario || !contrasenia || !email) {
      console.log(nombre, usuario, contrasenia, email);
      toast.error("Rellena todos los campos");
      return;
    }

    // Si es para actualizar
    if (seleccionado) {
      const data = {
        nombre,
        nuevoUsuario,
        usuario,
        contrasenia,
        email,
        rol,
        rama,
      };
      console.log(data);
      postBD(data, "http://localhost/editUser.php");
      toClose(false);
      window.location.reload();
      return;
    } else {
      // Si es para crear uno nuevo (Hay que verificar que ya no este creado)
      if (listaUsuarios.find((x) => x.username === usuario)) {
        toast.error("El usuario ya existe");
        return;
      } else {
        const data = {
          nombre,
          usuario,
          contrasenia,
          email,
          rol,
          rama,
        };
        console.log(data);
        postBD(data, "http://localhost/addUser.php");
        toClose(false);
        window.location.reload();
        return;
      }
    }

    // postBD(data, "http://localhost/addUser.php");
  };

  const cerrarModal = () => {
    setSeleccionado(null);
    toClose(false);
  };

  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed dark:text-white text-black">
          <form className="w-2/5  dark:bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center py-4 px-6 gap-4 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms]">
            <h3 className="text-3xl">Agregar usuario</h3>
            <div className="w-full flex flex-col gap-2">
              <label className="flex flex-col">
                Nombre
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="dark:bg-custon-black border rounded-md px-2 py-1 "
                />
              </label>
              <label className="flex flex-col">
                Usuario
                <input
                  type="text"
                  value={nuevoUsuario}
                  onChange={(e) => setNuevoUsuario(e.target.value)}
                  className="dark:bg-custon-black border rounded-md px-2 py-1 "
                />
              </label>
              <label className="flex flex-col">
                Contraseña
                <input
                  type="text"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  className="dark:bg-custon-black border rounded-md px-2 py-1 "
                />
              </label>
              <label className="flex flex-col">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-custon-black border rounded-md px-2 py-1 "
                />
              </label>
              <div className="flex w-full justify-around">
                <label className="flex flex-col">
                  Rama
                  <select
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                    onChange={(e) => setRama(e.target.value)}
                    defaultValue={rama}
                  >
                    {ramas.map((x) => (
                      <option key={x.id}>{x.nombre}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col">
                  Rol
                  <select
                    className="dark:bg-custon-black border rounded-md px-2 py-1"
                    onChange={(e) => setRol(e.target.value)}
                    defaultValue={rol}
                  >
                    <option value={"admin"}>Administrador</option>
                    <option value={"user"}>Usuario</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={cerrarModal}
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

export default ModalUsuarios;
