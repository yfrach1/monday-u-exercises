class PokemonClient {
  alreadyFetchedId = null;
  pokemonsId = {};
  listOfFavoritePokemon = [
    "bulbasaur",
    "charizard",
    "onix",
    "nidoking",
    "vileplume",
  ];
  id = "pokemon fetch";
  api = "https://pokeapi.co/api/v2/pokemon/";

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

      const text = ["Failed to fetch pokemon with this input: " + failedIds];
      failedRquest = [{ id: failedIds, text }];
    }

    return failedRquest;
  }
  createPokemonTask(name, types) {
    return (
      "Catch " + name + " the " + this.getPokemonType(types) + " type pokemon"
    );
  }
  async fetchPokemon(id) {
    const api = this.api + id;
    let text, result;
    try {
      const rawResponse = await fetch(api);
      //check status
      const content = await rawResponse.json();
      this.pokemonsId[content.name] = id;

      text = this.createPokemonTask(content.name, content.types);
      result = { id, text };
    } catch (e) {
      this.pokemonsId[id] = id;
      text = "Pokemon with ID " + id + " was not found";
      result = { id, text };
    }

    return result;
  }

  async handleFetchNewPokemons(pokemonsIdToFetch) {
    let allRequestsResults;
    const allFetchRequest = pokemonsIdToFetch.map((pokemonId) => {
      return this.fetchPokemon(pokemonId);
    });
    allRequestsResults = await Promise.all(allFetchRequest);

    const faileRequests = this.handleFailedRequest(allRequestsResults);

    const successRequest = allRequestsResults.filter((request) => {
      return request.text.includes("Catch");
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
