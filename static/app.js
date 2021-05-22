let renderPage = () => {
  getSneakers()
    .then((sneakers) => {
      renderSneakers(sneakers);
      return sneakers;
    })
    .catch((err) => {
      console.error("Error rendering page", err);
    });
};

renderPage();
