import constants from '../constants';

const findClosestPubToPubAtPubIndex = (
  pubIndex,
  distancesMatrix,
  visitedPubsIndexes
) => {
  const initialValue = {
    distance: Number.MAX_SAFE_INTEGER,
    index: undefined
  };

  const closestPub = distancesMatrix[pubIndex].reduce((acc, distance, index) => {
    if (visitedPubsIndexes.includes(index) || pubIndex === index) {
      return acc;
    }

    if (distance < acc.distance) {
      return {
        distance: distance,
        index: index
      };
    }

    return acc;
  }, initialValue);

  return closestPub.index;
};

const generateShortestOverallPath = (pubs) => {
  return pubs;
};

const generateShortestGreedyPath = (pubs, distancesMatrix) => {
  const newPubs = [pubs[0]];
  const visitedPubsIndexes = [0];

  while (newPubs.length < pubs.length) {
    const lastPubIndex = visitedPubsIndexes[visitedPubsIndexes.length - 1];
    const nextPubIndex = findClosestPubToPubAtPubIndex(
      lastPubIndex,
      distancesMatrix,
      visitedPubsIndexes
    );

    newPubs.push(pubs[nextPubIndex]);
    visitedPubsIndexes.push(nextPubIndex);
  }

  return newPubs;
};

const generateRatingAscPath = (pubs) => {
  const newPubs = pubs.sort((pubA, pubB) => {
    return pubA.rating - pubB.rating;
  });

  return newPubs;
};

const generateRatingDescPath = (pubs) => {
  const newPubs = pubs.sort((pubA, pubB) => {
    return pubB.rating - pubA.rating;
  });

  return newPubs;
};

const algoRunner = (algo, pubs, distancesMatrix) => {
  let newPubs;

  switch (algo) {
    case constants.ALGO_SHORTEST:
      newPubs = generateShortestOverallPath(pubs, distancesMatrix);
      break;
    case constants.ALGO_GREEDY:
      newPubs = generateShortestGreedyPath(pubs, distancesMatrix);
      break;
    case constants.ALGO_RATING_ASC:
      newPubs = generateRatingAscPath(pubs);
      break;
    case constants.ALGO_RATING_DESC:
      newPubs = generateRatingDescPath(pubs);
      break;
    default:
      newPubs = pubs;
  }

  return newPubs;
};

export default algoRunner;
