const tracker = {
  page: 0,
  limit: 100,
  currentSneakerA_Index: 0,
  currentSneakerB_Index: 1,
  sneakers: {},
  numberAvailableSneakers: 0,
  currentGame: 1,
  gameMax: 5,
};

let renderPage = () => {
  getSneakers(tracker.limit, tracker.page)
    .then((sneakers) => {
      loadSneakers(sneakers);
      return sneakers;
    })
    .then((sneakers) => {
      // tracker.sneakers is set when loadSneakers() has successfully finished
      renderSneakers_A_and_B_forPriceComparison(tracker.sneakers);
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
