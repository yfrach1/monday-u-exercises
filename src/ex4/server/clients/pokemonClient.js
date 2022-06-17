const {
  combineTwoArrays,
  differenceOfTwoArray,
  removeAllExceptNumbers,
  generateUniqeId,
} = require("../utils/utils");

const axios = require("axios");
const pokemonApi = "https://pokeapi.co/api/v2/pokemon/";

function initFailedRequest(text, id) {
  const failedRequest = [
    {
      itemId: generateUniqeId(),
      text,
      type: "pokemon",
      pokemonId: id,
    },
  ];
  return failedRequest;
}

function handleFailedRequest(allRequestsResults) {
  let failedIds;
  let failedRquest;

  failedRquest = allRequestsResults.filter((result) => {
    return result.text.includes("not found");
  });

  if (failedRquest.length === 1) {
    const text = failedRquest[0].text;
    const id = removeAllExceptNumbers(text);
    failedRquest = initFailedRequest(text, id);
  } else if (failedRquest.length > 1) {
    failedIds = failedRquest.map((obj) => {
      return removeAllExceptNumbers(obj.text);
    });

    failedIds = failedIds.join(",");

    const text = "Failed to fetch pokemon with this input: " + failedIds;
    failedRquest = initFailedRequest(text, failedIds);
  }

  return failedRquest;
}
async function fetchPokemon(id) {
  const api = pokemonApi + id;
  let text, result;

  try {
    const response = await axios.get(api);
    text =
      "Catch " +
      response.data.name +
      " the " +
      getPokemonType(response.data.types) +
      " type pokemon";

    result = {
      itemId: generateUniqeId(),
      text,
      name: response.data.name,
      type: "pokemon",
      pokemonId: id,
    };
  } catch (e) {
    if (e.response.status == 404) {
      text = "Pokemon with ID " + id + " was not found";
      result = { itemId: generateUniqeId(), text, type: "pokemon" };
    } else {
      result = {
        text: "Unknown error",
      };
    }
    return result;
  }

  return result;
}

async function handleFetchNewPokemons(pokemonsIdToFetch) {
  let allRequestsResults;
  const allFetchRequests = pokemonsIdToFetch.map((pokemonId) => {
    return fetchPokemon(pokemonId);
  });
  allRequestsResults = await Promise.all(allFetchRequests).catch((err) => {
    console.error(err);
  });

  const faileRequests = handleFailedRequest(allRequestsResults);

  const successRequests = allRequestsResults.filter((request) => {
    return request.text.includes("Catch");
  });

  allRequestsResults = [...successRequests, ...faileRequests];

  return allRequestsResults;
}

async function newPokemonesIdHandler(data, pokemonsIdArr) {
  let newData = data;
  const alreadyFetchedIds = data.fetchedPokemon;
  const pokemonsIdToFetch = differenceOfTwoArray(
    pokemonsIdArr,
    alreadyFetchedIds
  );

  newData.fetchedPokemon = combineTwoArrays(
    alreadyFetchedIds,
    pokemonsIdToFetch
  );

  const newPokemonTasksToAdd = await handleFetchNewPokemons(pokemonsIdToFetch);

  newData.tasks = combineTwoArrays(data.tasks, newPokemonTasksToAdd);
  return newData;
}

function getPokemonType(types) {
  let typeArray = [];
  for (let i = 0; i < types.length; i++) {
    typeArray.push(types[i].type.name);
  }
  return typeArray.join("/");
}

module.exports = {
  newPokemonesIdHandler,
};
