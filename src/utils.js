// proof of concept function for proof of concept test
module.exports.hello = () => {
  return "hello";
};

// compare two ids by retailPrice, return { "highest": sneaker, "lowest": sneaker, "equal": boolean}
module.exports.compare = (sneakerA = {}, sneakerB = {}, selected = false) => {
  // returns JSON with {highest: sneaker, lowest: sneaker, equal: boolean}

  // console.log("sneakerA", sneakerA);
  // console.log("sneakerB", sneakerB);

  const equal = sneakerA.retailPrice === sneakerB.retailPrice;

  if (equal) {
    highest = sneakerA;
    lowest = sneakerB;
  } else if (!equal) {
    highest = sneakerA.retailPrice > sneakerB.retailPrice ? sneakerA : sneakerB;
    lowest = sneakerA.retailPrice < sneakerB.retailPrice ? sneakerA : sneakerB;
  }
  const returnObject = {
    highest: highest,
    lowest: lowest,
    equal: equal,
  };

  return returnObject;
};
