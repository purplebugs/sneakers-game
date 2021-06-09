const tracker = {
  page: 0,
  limit: 100,
  currentSneakerA_Id: "",
  currentSneakerB_Id: "",
  sneakers: {},
  currentGame: 1,
  gameMax: 10,
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
    // Uncomment for debugging when developing
    // .then(() => {
    //   renderKeepingTrack(tracker);
    // })
    .catch((err) => {
      console.error("Error rendering page", err);
    });
};

renderPage();

const selectSneakerEventListener = function (e) {
  const sneakerId = e.target.getAttribute("data-id");
  selectSneaker(sneakerId);
};

document
  .getElementById("sneakerA")
  .addEventListener("click", selectSneakerEventListener);

document
  .getElementById("sneakerB")
  .addEventListener("click", selectSneakerEventListener);
