import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Menu from "./pages/menu";
import { useState } from "react";
import UserContext from "./services/userContext";
import Beneficiarios from "./pages/secciones/beneficiarios";
import { checkLogin } from "./services/checkLogin";
import Inventario from "./pages/secciones/inventario";
import Calendario from "./pages/secciones/calendario";
import Planificaciones from "./pages/secciones/planificaciones";
import Consejos from "./pages/secciones/consejos";
import Usuarios from "./pages/secciones/usuarios";
import Home from "./pages/home";
import Consulta from "./pages/consulta";

function App() {
  const [emailUsuario, setEmailUsuario] = useState(
    localStorage.getItem("emailUsuario") || null
  );
  const [idUsuario, setIdUsuario] = useState(null);
  const auth = checkLogin();

  return (
    <UserContext.Provider
      value={{
        emailUsuario,
        setEmailUsuario,
        idUsuario,
        setIdUsuario,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/formulario" element={<Consulta />} />
          <Route path="/login" element={auth ? <Menu /> : <Login />} />
          <Route path="/menu" element={auth ? <Menu /> : <Login />} />
          <Route
            path="/menu/beneficiarios"
            element={auth ? <Beneficiarios /> : <Login />}
          />
          <Route
            path="/menu/inventario"
            element={auth ? <Inventario /> : <Login />}
          />
          <Route
            path="/menu/calendario"
            element={auth ? <Calendario /> : <Login />}
          />
          <Route
            path="/menu/planificaciones"
            element={auth ? <Planificaciones /> : <Login />}
          />
          <Route
            path="/menu/consejos"
            element={auth ? <Consejos /> : <Login />}
          />
          <Route
            path="/menu/usuarios"
            element={auth ? <Usuarios /> : <Login />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
