module.exports.hello = () => {
  return "hello";
};

// TODO compare two ids by retailPrice
module.exports.compare = (sneakerA, sneakerB, userSelected_id) => {
  // TODO do not hardcode this value, proof of concept only
  // TODO implement comparison logic that returns JSON with {highest: id, lowest: id, equal: boolean}

  console.log("sneakerA", sneakerA);
  if (sneakerA.retailPrice > sneakerB.retailPrice) {
    const returnObject = {
      highest: sneakerA.id,
      lowest: sneakerB.id,
      equal: false,
    };

    return JSON.stringify(returnObject);
  }
};
