const getSneakers = async (limit = 10, priced = true) => {
  const response = await fetch(`/api`);
  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();

    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};
