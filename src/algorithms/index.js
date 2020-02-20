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

const generatePermutationsOfIndexes = (length) => {
  const indexes = Array.from({ length: length }).map((_, i) => {
    return i;
  });

  const permutator = (inputIndexes) => {
    const permutations = [];

    const permute = (indexes, acc = []) => {
      if (indexes.length === 0) {
        permutations.push(acc);
      } else {
        for (let i = 0; i < indexes.length; i++) {
          let curr = indexes.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), acc.concat(next));
        }
      }
    };

    permute(inputIndexes);

    return permutations;
  };

  return permutator(indexes);
};

const calculateIndexesPermutationDistance = (indexesPermutation, distancesMatrix) => {
  const initialValue = {
    distance: 0,
    previous: indexesPermutation[0]
  };

  const indexesPermutationDistance = indexesPermutation.reduce((acc, index) => {
    return {
      distance: acc.distance + distancesMatrix[index][acc.previous],
      previous: index
    };
  }, initialValue);

  return indexesPermutationDistance.distance;
};

const generateShortestOverallPath = (pubs, distancesMatrix) => {
  const indexesPermutations = generatePermutationsOfIndexes(pubs.length);

  let shortestDistance = Number.MAX_SAFE_INTEGER;
  let shortestIndexesPermutation;

  for (const indexesPermutation of indexesPermutations) {
    const distance = calculateIndexesPermutationDistance(indexesPermutation, distancesMatrix);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      shortestIndexesPermutation = indexesPermutation;
    }
  }

  const newPubs = shortestIndexesPermutation.map((index) => {
    return pubs[index];
  });

  return newPubs;
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
