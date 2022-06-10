import chalk from "chalk";

export const description = {
  add: [
    `\nAdd new task, You can enter: 
          \t\t 1 - A number that will be treated as a pokemon id.
          \t\t 2 - A normal taskd.
          \t\t 3 - A string with pokemons id seperated by comma. 
          \t\t 4 - A string with multiply tasks seperated by comma. 
          \t\t 5 - A mixed string with pokemons id and tasks.\n\n`,
    `\nArguments:
               string      text with tasks or/and pokemon id.\n`,
  ],
  get: `\nGet all tasks:
              All the tasks you have, will be presente to you (pokemon tasks will have a nice color).\n\n`,
  delete: `\nDelete one or all tasks:
              You will have the option to delete one task (by index) or go wild and delete all ths tasks.\n\n`,
  "show pokemon": `\nShow pokemon: 
              Show one pokemon from our favorite pokemon list\n`,
};

export const messageToUser = {
  "delete empty array": "\nThere is no task to delete, try to add one :)\n",
  "get empty array": "\nThere is no task to display, try to add one :)\n",
  "index out of range": "\nThe index you entered is out of range\n",
  "write error": "\nAn error occured while writing JSON Object to File.\n",
  "read error": "\nAn error occured while reading JSON File.\n",
  "delete successed": "\nTask deleted successfully\n",
  "delete all successed": "\nAll tasks deleted successfully\n",
  "add task seccessed": "\nNew todo added succseefully\n",
  "load successed": "\nSuccessfully load all tasks\n",
  "No added": "\nNo new tasks were added.\n",
  "show pokemon seccessed": "\nPokemon Successfully displayed",
};

export const pokemonTypeColor = {
  poison: chalk.hex("#A040A0"),
  grass: chalk.hex("#78C850"),
  electric: chalk.hex("#F8D030"),
  fire: chalk.hex("#F08030"),
  water: chalk.hex("#6890F0"),
  flying: chalk.hex("#A890F0"),
  normal: chalk.hex("#A8A878"),
  ground: chalk.hex("#E0C068"),
  fighting: chalk.hex("#C03028"),
  rock: chalk.hex("#B8A038"),
  bug: chalk.hex("#A8B820"),
  ghost: chalk.hex("#705898"),
  steel: chalk.hex("#B8B8D0"),
  psychic: chalk.hex("#F85888"),
  ice: chalk.hex("#98D8D8"),
  dragon: chalk.hex("#7038F8"),
  dark: chalk.hex("#705848"),
  fairy: chalk.hex("#EE99AC"),
  unknown: chalk.hex("#68A090"),
};
["bulbasaur", "charmander", "squirtle", "pikachu"];
export const pokemonImageUrl = {
  bulbasaur:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  charmander:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  squirtle:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
  pikachu:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
};
