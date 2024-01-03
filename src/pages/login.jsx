import React from "react";
import { GoAlert } from "react-icons/go";
import ChangeTheme from "../components/changeTheme";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../services/userContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { setEmailUsuario, setIdUsuario } = useContext(UserContext);
  const [usuario, setUsuario] = useState("");
  const [contra, setContra] = useState("");

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: usuario,
        password: contra,
      };

      const response = await fetch(
        "https://scout-server.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }
      const responseData = await response.json();

      console.log(responseData);

      if (responseData.error) {
        return toast.error("Credenciales incorrectas");
      } else {
        localStorage.setItem("emailUsuario", responseData.data.user.email);
        localStorage.setItem("idUsuario", responseData.data.user.id);
        setEmailUsuario(responseData.data.user.email);
        setIdUsuario(responseData.data.user.id);
        navigate("/menu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="max-h-screen h-full flex items-center justify-center dark:bg-custon-black">
      <ChangeTheme />
      <form className="w-2/5 bg-custon-red rounded-2xl gap-4 flex flex-col items-center py-9 px-28 justify-between 2xln:px-20 xln:px-14 lgn:px-5 mdn:w-3/4 smn:w-11/12 smn:h-3/5">
        <h1 className="text-5xl font-bold text-white mdn:text-6xl">Login</h1>
        <div className="flex flex-col items-center justify-center w-full gap-2 font-semibold text-2xl">
          <label className="text-white w-full">
            Correo electronico:
            <input
              className="h-10 dark:bg-custon-black dark:text-white px-4 w-full text-xl"
              onChange={(e) => setUsuario(e.target.value)}
            />
          </label>

          <label className="text-white w-full">
            Contraseña:
            <input
              type="password"
              className="h-10 dark:bg-custon-black dark:text-white px-4 w-full text-xl"
              onChange={(e) => setContra(e.target.value)}
            />
          </label>
        </div>
        <button
          className="w-1/2 h-12 bg-white text-xl font-semibold text-black dark:bg-custon-black dark:text-white smn:w-3/4 smn:h-16"
          onClick={(e) => iniciarSesion(e)}
        >
          Iniciar sesion
        </button>
        <div className="flex items-center">
          <GoAlert fill="white" size={40} />
          <span className="text-2xl text-white font-semibold smn:text-lg ">
            Unicamente si sos parte del grupo
          </span>
        </div>
      </form>
      <ToastContainer />
    </main>
  );
}

export default Login;
