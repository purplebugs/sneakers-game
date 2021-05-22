const getSneakers = async (limit = 100, page = 0) => {
  const response = await fetch(`/api/${limit}/${page}`);
  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();

    // store in session storage for later use to avoid calling API again
    sessionStorage.setItem("sneakersStorage", JSON.stringify(responseJSON));

    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};

const filterSneakersByImageAndPrice = (sneakers) => {
  //console.log("[APP LOG] sneakers", sneakers);

  // only use sneakers with image and price

  const sneakersWithImageAndPrice = sneakers.results.filter((sneaker) => {
    const sneakerWithPrice = sneaker.retailPrice > 0;
    //console.log("[APP LOG] sneakerWithPrice", sneakerWithPrice);

    const sneakerWithImage = sneaker.image.small !== "";
    //console.log("[APP LOG] sneakerWithImage", sneakerWithImage);

    return sneakerWithPrice && sneakerWithImage;
  });

  return sneakersWithImageAndPrice;
};

const renderSneakers = (sneakers) => {
  const sneakersWithImageAndPrice = filterSneakersByImageAndPrice(sneakers);

  const sneakersEl = document.getElementById("sneakers");

  // clear any existing rendering
  sneakersEl.innerText = "";

  console.log("[APP LOG] sneakersWithImageAndPrice", sneakersWithImageAndPrice);
  sneakersEl.innerText = JSON.stringify(sneakersWithImageAndPrice);
};
