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

  // clear any existing rendering
  sneakerA_El.innerText = "";
  sneakerB_El.innerText = "";

  // remove any existing correct/incorrect class info
  sneakerA_El.classList.remove("correct");
  sneakerA_El.classList.remove("incorrect");

  sneakerB_El.classList.remove("correct");
  sneakerB_El.classList.remove("incorrect");

  // render text

  sneakerA_El.setAttribute("data-id", tracker.currentSneakerA_Id);
  sneakerB_El.setAttribute("data-id", tracker.currentSneakerB_Id);

  const sneakerA_TextElement = document.createElement("span");
  const sneakerB_TextElement = document.createElement("span");

  sneakerA_TextElement.classList.add("sneakerText");
  sneakerB_TextElement.classList.add("sneakerText");

  sneakerA_TextElement.setAttribute("id", "sneakerAText");
  sneakerB_TextElement.setAttribute("id", "sneakerBText");

  sneakerA_El.appendChild(sneakerA_TextElement);
  sneakerB_El.appendChild(sneakerB_TextElement);

  sneakerA_TextElement.innerText = `${sneakerA.name}`;
  sneakerB_TextElement.innerText = `${sneakerB.name}`;

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

    // TODO take into account equal

    // update sneaker class to render colour outline indicating highest and lowest prices
    const highestShoeElement = document.querySelectorAll(
      `[data-id="${response.highest.id}"]`
    );

    highestShoeElement[0].classList.add("correct");

    const lowestShoeElement = document.querySelectorAll(
      `[data-id="${response.lowest.id}"]`
    );

    lowestShoeElement[0].classList.add("incorrect");

    // render price
    // TODO render price separately from sneaker name in a different colour or something
    const sneakerAText = document.getElementById("sneakerAText");
    sneakerAText.innerText = `${tracker.sneakers[0].name} - $${tracker.sneakers[0].retailPrice}`;

    const sneakerBText = document.getElementById("sneakerBText");
    sneakerBText.innerText = `${tracker.sneakers[1].name} - $${tracker.sneakers[1].retailPrice}`;

    // Uncomment to automatically get another sneaker after guessing
    //setTimeout(getAnotherSneaker, 3000);
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

      // keep track of latest sneakers
      tracker.sneakers = sneakers;
      console.log("[APP LOG] sneakers", sneakers);

      // keep track of current rendered sneaker ids
      tracker.currentSneakerA_Id = sneakers[0].id;
      tracker.currentSneakerB_Id = sneakers[1].id;
      renderSneakers_A_and_B_forPriceComparison(sneakers);
      // Uncomment for debugging when developing
      // renderKeepingTrack(tracker);
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
