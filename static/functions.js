const getSneakers = async (limit = 50, page = 0) => {
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

  // keep track of latest sneakers
  tracker.sneakers = sneakersWithImageAndPrice;
  tracker.numberAvailableSneakers = tracker.sneakers.length;

  return sneakersWithImageAndPrice;
};

const loadSneakers = (sneakers) => {
  // we only want sneakers with both an image and a price
  const sneakersWithImageAndPrice = filterSneakersByImageAndPrice(sneakers);

  const sneakersEl = document.getElementById("sneakers");

  // clear any existing rendering
  sneakersEl.innerText = "";

  console.log("[APP LOG] sneakersWithImageAndPrice", sneakersWithImageAndPrice);

  // render
  sneakersEl.innerText = JSON.stringify(sneakersWithImageAndPrice);
};

const renderSneaker = (sneakers) => {
  // grab first unused sneaker
  // TODO use tracker to track first unused
  const sneaker = sneakers[tracker.currentSneakerId];
  console.log("sneaker", sneaker);

  const sneakerEl = document.getElementById("sneaker");

  // clear any existing rendering
  sneakerEl.innerText = "";

  // render
  sneakerEl.innerText = JSON.stringify(
    `sneaker.name: ${sneaker.name} - sneaker.retailPrice: ${sneaker.retailPrice} - sneaker.image.small: ${sneaker.image.small}`
  );
};

const getNextSneaker = () => {
  console.log();

  if (tracker.currentSneakerId < tracker.numberAvailableSneakers - 1) {
    tracker.currentSneakerId = tracker.currentSneakerId + 1;

    renderSneaker(tracker.sneakers);
    renderKeepingTrack(tracker);
  } else {
    throw new Error(
      "No more available sneakers // TODO app should send new request"
    );
  }
};

const renderKeepingTrack = (tracker) => {
  const filterEl = document.getElementById("tracker");

  filterEl.innerText = "";

  // render

  filterEl.innerText = JSON.stringify(
    `tracker.page: ${tracker.page} - tracker.limit: ${tracker.limit} - tracker.currentSneakerId: ${tracker.currentSneakerId} - tracker.numberAvailableSneakers: ${tracker.numberAvailableSneakers}`
  );
};
