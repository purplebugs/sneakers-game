const tracker = {
  page: 0,
  limit: 100,
  currentSneakerA_Index: 0,
  currentSneakerB_Index: 1,
  currentSneakerA_Id: "",
  currentSneakerB_Id: "",
  sneakers: {},
  currentGame: 1,
  gameMax: 5,
};

let renderPage = () => {
  //  getSneakers(tracker.limit, tracker.page) // use this if want to preload with fixed page of sneakers instead of random
  getRandomSneakers(2) // randomly get two sneakers randomly in the dataset
    .then((sneakers) => {
      // keep track of latest sneakers
      tracker.sneakers = sneakers;
      console.log("[APP LOG] sneakers", sneakers);

      return sneakers;
    })
    .then((sneakers) => {
      renderSneakers_A_and_B_forPriceComparison(sneakers);
      return sneakers;
    })
    .then(() => {
      renderKeepingTrack(tracker);
    })
    .catch((err) => {
      console.error("Error rendering page", err);
    });
};

renderPage();
