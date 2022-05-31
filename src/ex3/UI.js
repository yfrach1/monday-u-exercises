import chalk from "chalk";

export const description = {
  add: "Add new task, You can enter:\n\t\t   1 - A number that will be treated as a pokemon id.  \n\t\t   2 - A normal taskd. \n\t\t   3 - A string with pokemons id seperated by comma. \n\t\t   4 - A string with multiply tasks seperated by comma. \n\t\t   5 - A mixed string with pokemon id and tasks.\n",
  get: "All the tasks you have, will be presente to you (pokemon tasks will have a nice color).\n\n",
  delete:
    "You will have the option to delete one index at a time from your tasks list.\n\n",
};

export const messageToUser = {
  "delete empty array": "\nThere is no task to delete, try to add one :)\n",
  "get empty array": "\nThere is no task to display, try to add one :)\n",
  "index out of range": "\nThe index you entered is out of range\n",
  "write error": "\nAn error occured while writing JSON Object to File.\n",
  "read error": "\nAn error occured while reading JSON File.\n",
  "delete successed": "\nTask deleted successfully\n",
  "add task seccessed": "\nNew todo added succseefully\n",
  "load successed": "\nSuccessfully load all tasks\n",
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
