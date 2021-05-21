const baseURL = "https://the-sneaker-database.p.rapidapi.com";

const getSneakers = async (limit = 10) => {
  const response = await fetch(`${baseURL}/sneakers?limit=${limit}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0a0dadca31mshcfc527676a5280cp104f55jsn2fd1c17cdffb",
      "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
    },
  });
  if (response.status === 200 || response.status === 304) {
    return response.json();
  } else {
    throw new Error("Unable to fetch data");
  }
};
