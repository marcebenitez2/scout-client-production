export function checkLogin() {
  const emailUsuario = localStorage.getItem("emailUsuario");
  const idUsuario = localStorage.getItem("idUsuario");

  if (!!emailUsuario && !!idUsuario) {
    return true; // Datos de la sesión encontrados en localStorage
  }

  const emailUsuarioSession = sessionStorage.getItem("emailUsuario");
  const idUsuarioSession = sessionStorage.getItem("idUsuario");

  // Verifica si los valores existen en sessionStorage para determinar si la sesión está iniciada
  return !!emailUsuarioSession && !!idUsuarioSession;
}
