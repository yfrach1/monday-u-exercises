import {
  differenceOfTwoArray,
  combineTwoArrays,
  removeAllExceptNumbers,
  removeItemFromArray,
} from "./utils.js";
class PokemonClient {
  constructor() {
    this.alreadyFetchedId = null;
    this.pokemonsId = {};
    this.listOfFavoritePokemon = [
      "bulbasaur",
      "charizard",
      "onix",
      "nidoking",
      "vileplume",
    ];
    this.id = "pokemon fetch";
    this.api = "https://pokeapi.co/api/v2/pokemon/";
  }

  handleFailedRequest(allRequestsResults) {
    let failedIds;
    let failedRquest;

    failedRquest = allRequestsResults.filter((result) => {
      return result.includes("not found");
    });

    if (failedRquest.length > 1) {
      failedIds = failedRquest.map(removeAllExceptNumbers);
      failedIds = failedIds.join(",");

      failedRquest = ["Failed to fetch pokemon with this input: " + failedIds];
    }

    return failedRquest;
  }

  async handleFetchNewPokemons(pokemonsIdToFetch) {
    let allRequestsResults;
    const allFetchRequest = pokemonsIdToFetch.map((pokemonId) => {
      return this.fetchPokemon(pokemonId);
    });
    allRequestsResults = await Promise.all(allFetchRequest);

    const faileRequests = this.handleFailedRequest(allRequestsResults);

    const successRequest = allRequestsResults.filter((request) => {
      return request.includes("Catch");
    });

    allRequestsResults = [...successRequest, ...faileRequests];
    return allRequestsResults;
  }

  async handleNewPokemonesId(newPokemonsIdArr) {
    let pokemonsIdToFetch = newPokemonsIdArr;

    if (!this.alreadyFetchedId) {
      this.alreadyFetchedId = [...newPokemonsIdArr];
    } else {
      pokemonsIdToFetch = differenceOfTwoArray(
        newPokemonsIdArr,
        this.alreadyFetchedId
      );

      this.alreadyFetchedId = combineTwoArrays(
        this.alreadyFetchedId,
        pokemonsIdToFetch
      );
    }
    return await this.handleFetchNewPokemons(pokemonsIdToFetch);
  }

  getPokemonType(types) {
    let typeArray = [];
    for (let i = 0; i < types.length; i++) {
      typeArray.push(types[i].type.name);
    }
    return typeArray.join("/");
  }

  createPokemonTask(name, types) {
    return (
      "Catch " + name + " the " + this.getPokemonType(types) + " type pokemon"
    );
  }

  async fetchPokemon(id) {
    const api = this.api + id;
    let text;
    try {
      const rawResponse = await fetch(api);
      const content = await rawResponse.json();
      this.pokemonsId[content.name] = id;

      text = this.createPokemonTask(content.name, content.types);
    } catch (e) {
      this.pokemonsId[id] = id;
      text = "pokemon with ID " + id + " was not found";
    }
    return text;
  }

  extractNameOutFromText(text) {
    if (text.includes("Catch")) {
      return text.split(" ")[1];
    } else if (text.includes("not found")) {
      return text.split(" ")[3];
    } else if (text.includes("fetch")) {
      return text.split(" ")[7];
    } else {
      return "text";
    }
  }
  getPokemonIdByName(text) {
    let name = this.extractNameOutFromText(text);
    if (name.includes(",")) {
      return name;
    } else if (name === "text") {
      return name;
    } else {
      return this.pokemonsId[name];
    }
  }

  resetData() {
    this.alreadyFetchedId = null;
    this.pokemonsId = {};
  }

  removePokemonIdFromStorage(id) {
    if (id.includes(",")) {
      let idArray = id.split(",");
      idArray.forEach((id) => {
        removeItemFromArray(this.alreadyFetchedId, id);
        delete this.pokemonsId[id];
      });
    } else {
      removeItemFromArray(this.alreadyFetchedId, id);
      delete this.pokemonsId[id];
    }
  }

  checkForPokemonInNoramlTasks(tasks) {
    let pokemonsName = [];
    tasks.forEach((task) => {
      if (this.listOfFavoritePokemon.indexOf(task) > -1) {
        pokemonsName.push(task);
      }
    });
    return pokemonsName;
  }
}

export default PokemonClient;
