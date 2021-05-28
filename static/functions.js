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

const compareSneakers = async (idA, idB, selected) => {
  const response = await fetch("/api/compare/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idA: idA, idB: idB, selected: selected }),
  });

  if (response.status === 200 || response.status === 304) {
    const responseJSON = response.json();
    return responseJSON;
  } else {
    throw new Error("Unable to fetch data");
  }
};

const renderSneakers_A_and_B_forPriceComparison = (sneakers) => {
  // get the sneakers
  const sneakerA = sneakers[0];
  const sneakerB = sneakers[1];

  console.log("sneakerA", sneakerA);
  console.log("sneakerB", sneakerB);

  // keep track of current rendered sneaker ids
  tracker.currentSneakerA_Id = sneakers[0].id;
  tracker.currentSneakerB_Id = sneakers[1].id;

  const sneakerA_El = document.getElementById("sneakerA");
  const sneakerB_El = document.getElementById("sneakerB");

  // render text

  sneakerA_El.setAttribute("data-id", tracker.currentSneakerA_Id);
  sneakerB_El.setAttribute("data-id", tracker.currentSneakerB_Id);

  const sneakerA_String = `sneakerA.name: ${sneakerA.name} - sneakerA.retailPrice: ${sneakerA.retailPrice}`;
  const sneakerB_String = `sneakerB.name: ${sneakerB.name} - sneakerB.retailPrice: ${sneakerB.retailPrice}`;

  sneakerA_El.innerText = JSON.stringify(sneakerA_String);
  sneakerB_El.innerText = JSON.stringify(sneakerB_String);

  // render image
  const sneakerA_Img = document.createElement("img");
  sneakerA_Img.setAttribute("src", sneakerA.image.thumbnail);
  sneakerA_Img.setAttribute("data-id", tracker.currentSneakerA_Id);

  const sneakerB_Img = document.createElement("img");
  sneakerB_Img.setAttribute("src", sneakerB.image.thumbnail);
  sneakerB_Img.setAttribute("data-id", tracker.currentSneakerB_Id);

  sneakerA_El.appendChild(sneakerA_Img);
  sneakerB_El.appendChild(sneakerB_Img);
};

const selectSneaker = (selected) => {
  console.log("selected", selected);

  compareSneakers(
    tracker.currentSneakerA_Id,
    tracker.currentSneakerB_Id,
    selected
  ).then((response) => {
    console.log("response", response);

    const correct = response.highest.id === selected;
    const result = `You selected: ${selected} - Highest: ${response.highest.id} - Lowest: ${response.lowest.id} - Equal: ${response.equal}`;

    // TODO send results to webpage
    if (correct) {
      console.log(`Correct! ${result}`);
    } else {
      console.log(`Almost! ${result}`);
    }
  });
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
      // keep track of current rendered sneaker ids
      tracker.currentSneakerA_Id = sneakers[0].id;
      tracker.currentSneakerB_Id = sneakers[1].id;
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
    `tracker.page: ${tracker.page} - tracker.limit: ${tracker.limit} - tracker.currentGame: ${tracker.currentGame} - tracker.gameMax: ${tracker.gameMax} - ${sneakerIds}`
  );
};
