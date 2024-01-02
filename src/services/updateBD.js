export const updateBD = async (url,datos) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
      },    
      body: JSON.stringify(datos),
    });

    // Ver la respuesta en la consola
    console.log("Respuesta del servidor:", response);

  } catch (error) {
    console.log("Error en la solicitud:", error);
  }
};
