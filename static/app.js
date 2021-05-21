let renderPage = () => {
  getSneakers()
    .then((sneakers) => {
      return sneakers;
    })
    .catch((err) => {
      console.error("Error rendering page", err);
    });
};

renderPage();
