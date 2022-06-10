import fetch from "node-fetch";
import dotenv from "dotenv";

import { pokemonTypeColor } from "./UI.js";
import {
  combineTwoArrays,
  differenceOfTwoArray,
  removeAllExceptNumbers,
} from "./utils.js";

dotenv.config();

class PokemonClient {
  pokemonApi = "https://pokeapi.co/api/v2/pokemon/";

  handleFailedRequest(allRequestsResults) {
    let failedIds;
    let failedRquest;

    failedRquest = allRequestsResults.filter((result) => {
      return result.text.includes("not found");
    });

    if (failedRquest.length === 1) {
      const text = failedRquest[0].text;
      const id = removeAllExceptNumbers(text);
      failedRquest = [{ id, text }];
    } else if (failedRquest.length > 1) {
      failedIds = failedRquest.map((obj) => {
        return removeAllExceptNumbers(obj.text);
      });

      failedIds = failedIds.join(",");

      const text = "Failed to fetch pokemon with this input: " + failedIds;
      failedRquest = [
        { id: failedIds, text, name: null, type: null, url: null },
      ];
    }

    return failedRquest;
  }
  async fetchPokemon(id) {
    const api = this.pokemonApi + id;
    let text, result;
    try {
      const rawResponse = await fetch(api);
      //
      const content = await rawResponse.json();
      const url = content.sprites.other["official-artwork"].front_default;

      const typesColored = this.getPokemonType(content.types)
        .split("/")
        .map((type) => {
          return pokemonTypeColor[type](type);
        })
        .join("/");
      text = "Catch " + content.name + " the " + typesColored + " type pokemon";

      result = {
        id,
        text,
        name: content.name,
        type: this.getPokemonType(content.types),
        url,
      };
    } catch (e) {
      text = "Pokemon with ID " + id + " was not found";
      result = { id, text, name: null, type: null, url: null };
    }

    return result;
  }

  async handleFetchNewPokemons(pokemonsIdToFetch) {
    let allRequestsResults;
    const allFetchRequest = pokemonsIdToFetch.map((pokemonId) => {
      return this.fetchPokemon(pokemonId);
    });
    allRequestsResults = await Promise.all(allFetchRequest).catch((err) => {
      console.error(err);
    });

    const faileRequests = this.handleFailedRequest(allRequestsResults);

    const successRequest = allRequestsResults.filter((request) => {
      return request.text.includes("Catch");
    });

    allRequestsResults = [...successRequest, ...faileRequests];

    return allRequestsResults;
  }

  async newPokemonesIdHandler(data, PokemonsIdArr) {
    let newData = data;
    const alreadyFetchedIds = data.fetchedPokemon;
    const pokemonsIdToFetch = differenceOfTwoArray(
      PokemonsIdArr,
      alreadyFetchedIds
    );
    if (!pokemonsIdToFetch.length) {
      return "pokemon id exist";
    }

    newData.fetchedPokemon = combineTwoArrays(
      alreadyFetchedIds,
      pokemonsIdToFetch
    );
    const newPokemonTasksToAdd = await this.handleFetchNewPokemons(
      pokemonsIdToFetch
    );

    newData.tasks = combineTwoArrays(data.tasks, newPokemonTasksToAdd);
    return newData;
  }

  getPokemonType(types) {
    let typeArray = [];
    for (let i = 0; i < types.length; i++) {
      typeArray.push(types[i].type.name);
    }
    return typeArray.join("/");
  }
}

export default PokemonClient;
