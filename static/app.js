const tracker = {
  page: 0,
  limit: 100,
  currentSneakerId: 0,
  sneakers: {},
  numberAvailableSneakers: 0,
  gameMin: 1,
  gameMax: 20,
};

let renderPage = () => {
  getSneakers(20, 0)
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
