const tracker = {
  page: 0,
  limit: 100,
  currentSneakerIndex: 0,
  currentSneakerIds: [],
  sneakers: {},
  numberAvailableSneakers: 0,
  gameMin: 1,
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
      renderSneaker(tracker.sneakers);
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
