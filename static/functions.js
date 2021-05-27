const getSneakers = async (limit = tracker.limit, page = tracker.page) => {
  const response = await fetch(`/api/${limit}/${page}`);
  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();

    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};

const getRandomSneakers = async (howMany = 1) => {
  const response = await fetch(`/api/randomShoes/${howMany}`);
  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();

    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};

// TODO instead of loadSneaker(sneakers) load two random sneakers using /api/newShoe/2

const loadSneakers = (sneakers) => {
  // keep track of latest sneakers
  tracker.sneakers = sneakers;
  tracker.numberAvailableSneakers = tracker.sneakers.length;

  console.log("[APP LOG] sneakers", sneakers);
};

const renderSneakers_A_and_B_forPriceComparison = (sneakers) => {
  // get sneaker objects
  const sneakerA = sneakers[tracker.currentSneakerA_Index];
  const sneakerB = sneakers[tracker.currentSneakerB_Index];
  console.log("sneakerA", sneakerA);
  console.log("sneakerB", sneakerB);

  // keep track of current rendered sneaker ids
  tracker.currentSneakerA_Id = sneakers[tracker.currentSneakerA_Index].id;
  tracker.currentSneakerB_Id = sneakers[tracker.currentSneakerB_Index].id;

  const sneakerA_El = document.getElementById("sneakerA");
  const sneakerB_El = document.getElementById("sneakerB");

  // clear any existing rendering
  sneakerA_El.innerText = "";
  sneakerB_El.innerText = "";

  // render
  const sneakerA_String = `sneakerA.name: ${sneakerA.name} - sneakerA.retailPrice: ${sneakerA.retailPrice} - sneakerA.image.small: ${sneakerA.image.small}`;
  const sneakerB_String = `sneakerB.name: ${sneakerB.name} - sneakerB.retailPrice: ${sneakerB.retailPrice} - sneakerB.image.small: ${sneakerB.image.small}`;

  sneakerA_El.innerText = JSON.stringify(sneakerA_String);
  sneakerB_El.innerText = JSON.stringify(sneakerB_String);
};

const moreExpensive = (selected) => {
  const selectedA = selected === "A";
  const selectedB = selected === "B";

  const sneakerA_retailPrice =
    tracker.sneakers[tracker.currentSneakerA_Index].retailPrice;

  const sneakerB_retailPrice =
    tracker.sneakers[tracker.currentSneakerB_Index].retailPrice;

  const sneakerA_is_moreExpensive = sneakerA_retailPrice > sneakerB_retailPrice;
  const sneakerB_is_moreExpensive = sneakerA_retailPrice < sneakerB_retailPrice;

  const result = `sneakerA_retailPrice:${sneakerA_retailPrice} - sneakerB_retailPrice:${sneakerB_retailPrice}`;

  // TODO add result if they are equal
  // TODO compare on server side using POST /api/compare
  if (
    (selectedA && sneakerA_is_moreExpensive) ||
    (selectedB && sneakerB_is_moreExpensive)
  ) {
    console.log(`Correct! ${result}`);
  } else {
    console.log(`Incorrect! ${result}`);
  }
};

const getAnotherSneaker = () => {
  const gameMaxReached = tracker.currentGame === tracker.gameMax;

  if (gameMaxReached) {
    // TODO remove button and print Game Over instead, with option to restart game
    document.getElementById("getAnotherSneaker").innerText =
      "Game Over - Reload page to start again";
  } else {
    // update tracking, get next sneaker and render
    tracker.currentGame = tracker.currentGame + 1;

    getRandomSneakers(2).then((sneakers) => {
      console.log("sneakers", sneakers);
      renderSneakers_A_and_B_forPriceComparison(sneakers);
      renderKeepingTrack(tracker);
    });
  }
};

const renderKeepingTrack = (tracker) => {
  const filterEl = document.getElementById("tracker");

  filterEl.innerText = "";

  // render

  const sneakerIds = `tracker.currentSneakerA_Id: ${tracker.currentSneakerA_Id} - tracker.currentSneakerB_Id: ${tracker.currentSneakerB_Id}`;

  filterEl.innerText = JSON.stringify(
    `tracker.page: ${tracker.page} - tracker.limit: ${tracker.limit} - tracker.currentSneakerA_Index: ${tracker.currentSneakerA_Index} - tracker.currentSneakerB_Index: ${tracker.currentSneakerB_Index} - tracker.numberAvailableSneakers: ${tracker.numberAvailableSneakers} - tracker.currentGame: ${tracker.currentGame} - tracker.gameMax: ${tracker.gameMax} - ${sneakerIds}`
  );
};
