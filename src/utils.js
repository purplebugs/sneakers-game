module.exports.hello = () => {
  return "hello";
};

// TODO compare two ids by retailPrice
module.exports.compare = (sneakerA, sneakerB, userSelected_id) => {
  // TODO do not hardcode this value, proof of concept only
  // TODO implement comparison logic that returns JSON with {highest: id, lowest: id, equal: boolean}

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
