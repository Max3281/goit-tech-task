const BASE_URL = "https://648d5e322de8d0ea11e7c6e5.mockapi.io";

export const getData = async () => {
  const data = await fetch(`${BASE_URL}/tweets`);

  if (!data.ok) throw new Error("Error");

  const dataParse = await data.json();
  return dataParse;
};

export const updateData = async (id, body) => {
  const data = await fetch(`${BASE_URL}/tweets/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (!data.ok) throw new Error("Error");

  const dataParse = await data.json();
  return dataParse;
};
