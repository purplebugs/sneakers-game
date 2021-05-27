const tap = require("tap");
const utils = require("../src/utils.js");

sneakerA = {
  id: "1deddc2f-eb10-4a58-b0c6-5880e68e084d",
  sku: "CZ0790-801",
  brand: "Air Jordan",
  name: "Air Jordan 1 Low OG 'Starfish'",
  colorway: "Starfish/White/Black",
  gender: "men",
  silhouette: "Air Jordan 1",
  releaseYear: 2021,
  releaseDate: "2021-08-26",
  retailPrice: 130,
  estimatedMarketValue: 2000,
  story: "",
  image: {
    original:
      "https://image.goat.com/attachments/product_template_pictures/images/054/937/557/original/CZ0790_801.png.png",
    small:
      "https://image.goat.com/750/attachments/product_template_pictures/images/054/937/557/original/CZ0790_801.png.png",
    thumbnail:
      "https://image.goat.com/400/attachments/product_template_pictures/images/054/937/557/original/CZ0790_801.png.png",
  },
  links: {
    stockx: "",
    goat: "https://goat.com/sneakers/air-jordan-1-low-og-cz0790-801",
    flightClub: " https://flightclub.com/air-jordan-1-low-og-cz0790-801",
  },
};

sneakerB = {
  id: "098a95ad-6b19-4e95-8955-d1fa7d4a087f",
  sku: "CU0449-002",
  brand: "Air Jordan",
  name: "Air Jordan 1 Retro High OG PS 'Seafoam'",
  colorway: "Seafoam/Healing Orange/White",
  gender: "youth",
  silhouette: "Air Jordan 1",
  releaseYear: 2021,
  releaseDate: "2021-08-12",
  retailPrice: 80,
  estimatedMarketValue: 80,
  story:
    "Crafted for little kids, the Air Jordan 1 Retro High OG PS ‘Seafoam’ updates the iconic silhouette with a two-tone palette geared for the warm weather months. The upper is constructed from clean white leather with contrasting nubuck overlays in a pale green finish. The same pastel hue is repeated on the signature Swoosh, Nike branded tongue tag and durable rubber outsole. Woven white laces are outlined in reddish bronze for an unexpected pop of contrasting color.",
  image: {
    original:
      "https://image.goat.com/attachments/product_template_pictures/images/052/534/307/original/CU0449_002.png.png",
    small:
      "https://image.goat.com/750/attachments/product_template_pictures/images/052/534/307/original/CU0449_002.png.png",
    thumbnail:
      "https://image.goat.com/400/attachments/product_template_pictures/images/052/534/307/original/CU0449_002.png.png",
  },
  links: {
    stockx: "",
    goat: "https://goat.com/sneakers/air-jordan-1-retro-high-og-ps-seafoam-cu0449-002",
    flightClub:
      " https://flightclub.com/air-jordan-1-retro-high-og-ps-seafoam-cu0449-002",
  },
};

// proof of concept test
tap.test("hello() returns string 'hello'", (t) => {
  t.equal(utils.hello(), "hello");
  t.end();
});

// compare() function tests
tap.test(
  "compare() - sneakerA.retailPrice is higher than sneakerB.retailPrice",
  (t) => {
    t.same(
      utils.compare(sneakerA, sneakerB, "1deddc2f-eb10-4a58-b0c6-5880e68e084d"),
      {
        highest: sneakerA,
        lowest: sneakerB,
        equal: false,
      },
      "sneakerA.retailPrice should be the highest"
    );
    t.end();
  }
);

tap.test(
  "compare() - sneakerA.retailPrice is equal to sneakerB.retailPrice",
  (t) => {
    t.same(
      utils.compare(sneakerA, sneakerA, "1deddc2f-eb10-4a58-b0c6-5880e68e084d"),
      {
        highest: sneakerA,
        lowest: sneakerA,
        equal: true,
      },
      "sneakerA.retailPrice is equal to sneakerB.retailPrice"
    );
    t.end();
  }
);
