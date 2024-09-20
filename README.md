# IT2810 Project 1: PokéBrowse

This is Group 4's submission for Project 1 in the IT2810 course. This project is a web application that allows users to explore detailed information about various Pokémon. Users can browse through different Pokémon, filter them by characteristics, search by name or Pokédex number, and mark their favorite Pokémon for quick access later.

## Features

- **Explore Pokémon:** View a list of Pokémon with basic information such as name, type, and an image.
- **Detailed View:** Click on a Pokémon to see more details, including stats, abilities, and other attributes.
- **Search and Filter:** Easily search for specific Pokémon by name or number, and filter them by ascending/descending order, and A-Z/Z-A.
- **Favorite Pokémon:** Mark Pokémon as favorites and view them later on a dedicated favorites page.


## Link to Git-Repository

[Repo](https://git.ntnu.no/IT2810-H24/T04-Project-1)

## Link to Virtual Machine

[IT2801-04/project1](http://it2810-04.idi.ntnu.no/project1/)

## Installation

1. Clone the repository
2. Run `npm install` in the root folder
3. Run `npm run dev` in the root folder

## Linting

We use eslint to lint our code. To run the linter, run `npm run lint` in the root folder.


## Formatting

We use Prettier to automatically format the codebase, by using `npm run format`

## Testing

We used Vitest for DOM, snapshot and Unit-testing. To run the tests, run `npm run test` in the root folder.
To check the test-coverage, run `npm run coverage` in the root folder.

As shown below in the coverage report, we have --- tests and --- files. Each file is correspondent to a component to be tested and we have tested the following components, with the described tests:

- Card
  - Snapshot test
  - Renders pokemon name and number
  - renders pokemon image
  - navigates to pokemon page on click
- Button
  - Snapshot test
  - Renders component
  - Adds pokemon to favourites on click
  - Changes style on click
- Navbar
  - Snapshot test navbar
  - Render test
  - Navigate to home
  - Navigate to favorites-page
- Pagination
  - Snapshot test
  - Render test
  - Navigate to next page
  - Navigate to previous page
- Searchfield
  - Snapshot test
  - Render test
  - Change textfield value
  - Correct navigation on search submit
  - Case sensitivity test
- Select
  - Snapshot test
  - Render test
  - Can change selected value
  - Renders selected value correctly
- Loader
  - Snapshot test
  - Render test
  - Displays loader correctly
- Badge
  - Snapshot test
  - Render test
  - Displays badge text correctly
  - Applies correct styles based on type



![Coverage report]()

## API-usage

The Restful API we chose for the project is called [PokeAPI](https://pokeapi.co/docs/v2). This API provides easy access to statistics for all pokémon.

We have saved the base URL of the api so that it is easier to use frequently. Which looks like this in our code: 
```const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';``` 

When we get pokémon on the pokémon page with no filters applied, the API call is as follows:

```
const url = `${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`;
```

Then for each of the pokémon, we have to call on the API to get the data for the pokémon to display on the card component. The API call is as follows:

```
const url = `${POKEAPI_BASE_URL}/pokemon/${nameOrId}`;
```

<!-- ### Sorting

We realised that the API we used offered minimal support for filtering and sorting, so we had to do it by ourselves.

To be able to sort on the pokedex number of a pokémon, we store the pokedex number in a list in local storage. When we get the pokémon from the API, we sort them by the pokedex number in the list. This is done both ascendingly and descendingly. Then each card component has to call on the previous API endpoint. -->

### Search

The API also does not have support for search, so we solved this by making the search field navigate the user to `/pokemon/{nameOrId}`. This will make the page `PokemonViewPage.tsx` do an API call on the following endpoint:

```
const url = `${POKEAPI_BASE_URL}/pokemon/${nameOrId}`;
```

If the user searches for a pokémon that does not exist, the page will display an error message (404), displaying the pokémon Ditto which is a pokemon that can transform into any other pokemon. However, if the user searched for an existing pokémon such as "lickitung", the page will display the data for Lickitung.

### Random pokémon

We have a button on the home page that takes you to a random pokémon if you do not know who to search for, and cant be bothered looking through them all.

This is done by calling the API endpoint ```'https://pokeapi.co/api/v2/pokemon-species/'``` and picking a random pokémons id with ```Math.random```. This then takes you to the ```PokemonViewPage.tsx``` for that pokémon.