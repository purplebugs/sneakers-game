const baseURL = "https://the-sneaker-database.p.rapidapi.com";

const headers = {
  "x-rapidapi-key": "TODO",
  "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
};

const getSneakers = async (limit = 10, priced = true) => {
  const response = await fetch(`${baseURL}/sneakers?limit=${limit}`, {
    method: "GET",
    headers: headers,
  });
  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();

    // if (priced === true) {
    //   // only return sneakers with a price

    //   responseJSON.filter((sneaker) => {
    //     return sneaker.retailPrice > 0;
    //   });
    // }

    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};
