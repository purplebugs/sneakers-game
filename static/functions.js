const getSneakers = async (limit = tracker.limit, page = tracker.page) => {
  const response = await fetch(`/api/${limit}/${page}`);
  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();

    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};

const loadSneakers = (sneakers) => {
  // keep track of latest sneakers
  tracker.sneakers = sneakers;
  tracker.numberAvailableSneakers = tracker.sneakers.length;

  console.log("[APP LOG] sneakers", sneakers);
};

const renderSneaker = (sneakers) => {
  // grab first unused sneaker
  // TODO use tracker to track first unused
  const sneaker = sneakers[tracker.currentSneakerIndex];
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
  const noMoreAvailableSneakers =
    tracker.currentSneakerIndex === tracker.numberAvailableSneakers - 1;

  const gameMaxReached = tracker.currentSneakerIndex === tracker.gameMax - 1;

  if (noMoreAvailableSneakers || gameMaxReached) {
    // TODO remove button and print Game Over instead, with option to restart game
    document.getElementById("getNextSneaker").innerText = "Game Over";

    // throw new Error(
    //   "No more available sneakers // TODO app should send new request"
    // );
  } else {
    tracker.currentSneakerIndex = tracker.currentSneakerIndex + 1;

    renderSneaker(tracker.sneakers);
    renderKeepingTrack(tracker);
  }
};

const renderKeepingTrack = (tracker) => {
  const filterEl = document.getElementById("tracker");

  filterEl.innerText = "";

  // render

  filterEl.innerText = JSON.stringify(
    `tracker.page: ${tracker.page} - tracker.limit: ${tracker.limit} - tracker.currentSneakerIndex: ${tracker.currentSneakerIndex} - tracker.numberAvailableSneakers: ${tracker.numberAvailableSneakers} - tracker.gameMin: ${tracker.gameMin} - tracker.gameMax: ${tracker.gameMax}`
  );
};
