const getSneakers = async (limit = 10) => {
  const response = await fetch(`/api/${limit}`);
  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();
    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};
