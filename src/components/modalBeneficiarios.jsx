import React from "react";
import { ramas } from "../services/ramas";
import { useState, useEffect } from "react";
import { postBD } from "../services/postBD";
import { updateBD } from "../services/updateBD";
import { ToastContainer, toast } from "react-toastify";

function ModalBeneficiarios({ isOpen, toClose, seleccionada, beneficiarios }) {
  if (!isOpen) {
    return null;
  }
  const [id, setId] = useState(seleccionada ? seleccionada.id : null);
  const [nombre, setNombre] = useState(seleccionada ? seleccionada.name : "");
  const [dni, setDni] = useState(seleccionada ? seleccionada.dni : "");
  const [nacimiento, setNacimiento] = useState(
    seleccionada ? seleccionada.birth : ""
  );
  const [direccion, setDireccion] = useState(
    seleccionada ? seleccionada.direction : ""
  );
  const [telefono, setTelefono] = useState(
    seleccionada ? seleccionada.tel : ""
  );
  const [mail, setMail] = useState(seleccionada ? seleccionada.mail : "");
  const [rama, setRama] = useState(
    seleccionada ? seleccionada.branch : "Manada"
  );
  const [personal, setPersonal] = useState(
    seleccionada ? seleccionada.personal_file : false
  );
  const [medical, setMedical] = useState(
    seleccionada ? seleccionada.medical_file : false
  );
  const [cuota, setCuota] = useState(seleccionada ? seleccionada.cuota : "");
  const [activo, setActivo] = useState(
    seleccionada ? seleccionada.active : false
  );

  const guardarCambios = (e) => {
    e.preventDefault();
    console.log(
      id,
      dni,
      nombre,
      nacimiento,
      direccion,
      telefono,
      mail,
      rama,
      personal,
      medical,
      cuota,
      activo
    );
    if (
      !nombre ||
      !nacimiento ||
      !direccion ||
      !telefono ||
      !mail ||
      !rama ||
      !cuota
    ) {
      toast.error("Rellena todos los campos");
      return;
    }

    if (dni.length !== 8) {
      toast.error("El dni debe tener 8 digitos");
      return;
    }

    if (telefono.length !== 10) {
      toast.error("El telefono debe tener 10 digitos");
      return;
    }

    if (!mail.includes("@") || !mail.includes(".")) {
      toast.error("El mail no es valido");
      return;
    }

    if (
      dni !== seleccionada?.dni &&
      beneficiarios.some((beneficiario) => beneficiario.dni === dni)
    ) {
      toast.error("Ya existe un beneficiario con ese DNI");
      return;
    }

    const beneficiario = {
      id,
      nombre,
      dni,
      nacimiento,
      direccion,
      telefono,
      mail,
      rama,
      personal,
      medical,
      cuota,
      activo,
    };


    if (beneficiario.id) {
      updateBD(
        `http://localhost:5000/beneficiaries/${beneficiario.id}`,
        beneficiario
      );
      toClose(false);
      window.location.reload();
    } else {
      postBD(beneficiario, "http://localhost:5000/beneficiaries");
      toClose(false);
      window.location.reload();
    }
  };



  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed dark:text-white text-black">
          <form className="w-1/2  dark:bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center justify-between py-4 px-6 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms] gap-4">
            <h3 className="text-2xl">
              {seleccionada ? "Editar Beneficiario" : "Agregar nuevo"}
            </h3>
            <div className="w-full flex justify-between flex-wrap">
              <article className="flex flex-col items-center">
                <label>Nombre</label>
                <input
                  required
                  className="dark:bg-custon-black border rounded-md px-2 py-1 "
                  defaultValue={seleccionada ? seleccionada.name : ""}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Dni</label>
                <input
                  required
                  typeof="number"
                  className="dark:bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.dni : ""}
                  onChange={(e) => setDni(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Nacimiento</label>
                <input
                  required
                  type="date"
                  className="dark:bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.birth : ""}
                  onChange={(e) => setNacimiento(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Direccion</label>
                <input
                  required
                  className="dark:bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.direction : ""}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Telefono</label>
                <input
                  required
                  type="number"
                  className="dark:bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.tel : ""}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </article>
            </div>

            {/*  */}

            <div className="w-full flex justify-between flex-wrap">
              <article className="flex flex-col items-center">
                <label>Mail</label>
                <input
                  required
                  type="email"
                  className="dark:bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.mail : ""}
                  onChange={(e) => setMail(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Rama</label>
                <select
                  className="dark:bg-custon-black border"
                  defaultValue={seleccionada ? seleccionada.branch : ""}
                  onChange={(e) => setRama(e.target.value)}
                >
                  {ramas.map((rama) => (
                    <option key={rama.id}>{rama.nombre}</option>
                  ))}
                </select>
              </article>
              <article className="flex flex-col items-center">
                <label>Ficha personal</label>
                <input
                  required
                  type="checkbox"
                  className="w-6 h-6"
                  checked={personal === true ? true : false}
                  onChange={(e) => setPersonal(e.target.checked ? true : false)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Ficha medica</label>
                <input
                  required
                  type="checkbox"
                  className="w-6 h-6"
                  checked={medical === true ? true : false}
                  onChange={(e) => setMedical(e.target.checked ? true : false)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Cuota</label>
                <input
                  required
                  type="date"
                  className="dark:bg-custon-black border"
                  defaultValue={seleccionada ? seleccionada.cuota : ""}
                  onChange={(e) => setCuota(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Activo</label>
                <input
                  required
                  type="checkbox"
                  className="w-6 h-6"
                  checked={activo === true ? true : false}
                  onChange={(e) => setActivo(e.target.checked ? true : false)}
                />
              </article>
            </div>
            <div className="flex w-full justify-center gap-4">
              <button
                onClick={() => toClose(false)}
                className=" px-4 h-10 dark:text-white mdn:w-2/5"
              >
                Cancelar
              </button>
              <button
                onClick={(e) => guardarCambios(e)}
                className="bg-custon-red px-1 h-10 rounded-xl font-semibold mdn:w-2/5 text-white"
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

export default ModalBeneficiarios;
