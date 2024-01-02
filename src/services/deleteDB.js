export const deleteDB = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
