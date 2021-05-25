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

const renderSneakers_A_and_B_forPriceComparison = (sneakers) => {
  const sneakerA = sneakers[tracker.currentSneakerA_Index];
  console.log("sneakerA", sneakerA);
  const sneakerB = sneakers[tracker.currentSneakerB_Index];
  console.log("sneakerB", sneakerB);

  const sneakerA_El = document.getElementById("sneakerA");
  const sneakerB_El = document.getElementById("sneakerB");

  // clear any existing rendering
  sneakerA_El.innerText = "";
  sneakerB_El.innerText = "";

  const sneakerA_String = `sneakerA.name: ${sneakerA.name} - sneakerA.retailPrice: ${sneakerA.retailPrice} - sneakerA.image.small: ${sneakerA.image.small}`;
  const sneakerB_String = `sneakerB.name: ${sneakerB.name} - sneakerB.retailPrice: ${sneakerB.retailPrice} - sneakerB.image.small: ${sneakerB.image.small}`;

  // render
  sneakerA_El.innerText = JSON.stringify(sneakerA_String);
  sneakerB_El.innerText = JSON.stringify(sneakerB_String);
};

const getNextSneaker = () => {
  const noMoreAvailableSneakers =
    tracker.currentSneakerB_Index === tracker.numberAvailableSneakers - 1;

  const gameMaxReached = tracker.currentGame === tracker.gameMax;

  if (noMoreAvailableSneakers || gameMaxReached) {
    // TODO remove button and print Game Over instead, with option to restart game
    document.getElementById("getNextSneaker").innerText =
      "Game Over - Reload page to start again";

    // throw new Error(
    //   "No more available sneakers // TODO app should send new request"
    // );
  } else {
    // update tracking, get next sneaker and render
    tracker.currentGame = tracker.currentGame + 1;
    tracker.currentSneakerA_Index = tracker.currentSneakerA_Index + 1;
    tracker.currentSneakerB_Index = tracker.currentSneakerB_Index + 1;

    renderSneakers_A_and_B_forPriceComparison(tracker.sneakers);
    renderKeepingTrack(tracker);
  }
};

const renderKeepingTrack = (tracker) => {
  const filterEl = document.getElementById("tracker");

  filterEl.innerText = "";

  // render

  filterEl.innerText = JSON.stringify(
    `tracker.page: ${tracker.page} - tracker.limit: ${tracker.limit} - tracker.currentSneakerA_Index: ${tracker.currentSneakerA_Index} - tracker.currentSneakerB_Index: ${tracker.currentSneakerB_Index} - tracker.numberAvailableSneakers: ${tracker.numberAvailableSneakers} - tracker.currentGame: ${tracker.currentGame} - tracker.gameMax: ${tracker.gameMax}`
  );
};
