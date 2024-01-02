export async function postBD(data, url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json(); // Espera la respuesta JSON
    console.log(data)
    // console.log(responseData);
    return responseData; // Devuelve la respuesta JSON
  } catch (error) {
    console.log(error);
  }
}
