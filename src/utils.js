module.exports.hello = () => {
  return "hello";
};

// TODO compare two ids by retailPrice
module.exports.compare = (sneakerA, sneakerB, userSelectedSneaker) => {
  // TODO do not hardcode this value, proof of concept only
  // TODO implement comparison logic that returns JSON with {highest: id, lowest: id, equal: boolean}
  return {
    highest: "1deddc2f-eb10-4a58-b0c6-5880e68e084d",
    lowest: "098a95ad-6b19-4e95-8955-d1fa7d4a087f",
    equal: false,
  };
};
