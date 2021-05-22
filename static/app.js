const filter = {
  page: 0,
  limit: 100,
  currentSneakerId: 0,
  sneakers: {},
  numberAvailableSneakers: 0,
};

let renderPage = () => {
  getSneakers()
    .then((sneakers) => {
      renderSneakers(sneakers);
      return sneakers;
    })
    .then((sneakers) => {
      // filter.sneakers is set when renderSneakers() has successfully finished
      renderSneaker(filter.sneakers);
      return sneakers;
    })
    .then(() => {
      renderKeepingTrack(filter);
    })
    .catch((err) => {
      console.error("Error rendering page", err);
    });
};

renderPage();
