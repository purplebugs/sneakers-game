const getSneakers = async (limit = 10, page = 0) => {
  const response = await fetch(`/api/${limit}/${page}`);
  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();
    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};

const renderSneakers = (sneakers) => {
  const sneakersEl = document.getElementById("sneakers");

  // clear any existing rendering
  sneakersEl.innerText = "";

  // render sneakers
  console.log("[APP LOG] sneakers", sneakers);
  sneakersEl.innerText = JSON.stringify(sneakers);
};
