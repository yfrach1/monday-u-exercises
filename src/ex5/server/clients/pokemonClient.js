const {
  combineTwoArrays,
  differenceOfTwoArray,
  removeAllExceptNumbers,
  generateUniqeId,
} = require("../utils/utils");

const axios = require("axios");
const pokemonApi = "https://pokeapi.co/api/v2/pokemon/";

function handleFailedRequest(allRequestsResults) {
  //console.log("allRequestsResults: ", allRequestsResults);
  let failedIds;
  let failedRquest;
  let result = [];
  failedRquest = allRequestsResults.filter((result) => {
    return result.includes("not found");
  });

  console.log("failedRquest: ", failedRquest);

  if (failedRquest.length === 1) {
    result.push(failedRquest[0]);
  } else if (failedRquest.length > 1) {
    failedIds = failedRquest.map((result) => {
      return removeAllExceptNumbers(result);
    });

    failedIds = failedIds.join(",");

    const failedResult =
      "Failed to fetch pokemon with this input: " + failedIds;
    result.push(failedResult);
  }

  return result;
}
async function fetchPokemon(id) {
  const api = pokemonApi + id;
  let text, result;

  try {
    const response = await axios.get(api);

    result =
      "Catch " +
      response.data.name +
      " the " +
      getPokemonType(response.data.types) +
      " type pokemon";
  } catch (e) {
    if (e.response.status == 404) {
      result = "Pokemon with ID " + id + " was not found";
    } else {
      result = "Unknown error";
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
  console.log("68 faileRequests: ", faileRequests);

  const successRequests = allRequestsResults.filter((request) => {
    return request.includes("Catch");
  });

  allRequestsResults = [...successRequests, ...faileRequests];
  //console.log("allRequestsResults: ", allRequestsResults);
  return allRequestsResults;
}

async function newPokemonesIdHandler(pokemonsIdArr) {
  let newPokemonTasks;
  try {
    newPokemonTasks = await handleFetchNewPokemons(pokemonsIdArr);
  } catch (e) {}
  console.log("newPokemonTasks: ", newPokemonTasks);
  return newPokemonTasks;
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
