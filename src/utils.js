module.exports.hello = () => {
  return "hello";
};

// TODO compare two ids by retailPrice
module.exports.compare = (sneakerA, sneakerB, userSelected_id) => {
  // returns JSON with {highest: sneaker, lowest: sneaker, equal: boolean}

  // console.log("sneakerA", sneakerA);
  // console.log("sneakerB", sneakerB);

  const equal = sneakerA.retailPrice === sneakerB.retailPrice;
  let highest = {};
  let lowest = {};

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

  return JSON.stringify(returnObject);
};
