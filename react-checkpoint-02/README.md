# React Checkpoint 02

This project is a simple FIFA player cards app built with React JS and React-Bootstrap.

## Project Goal

The app displays a list of football players using reusable card components.

Each player card shows:

- Name
- Team
- Nationality
- Jersey number
- Age
- Player image

## Features

- Built with `create-react-app`
- Uses `react-bootstrap` card components
- Stores player data in a separate `players.js` file
- Renders player cards dynamically with `.map()`
- Uses prop de-structuring in the `Player` component
- Includes default props for player attributes
- Uses simple inline styling in the player card

## Project Structure

`src/players.js`
Contains the array of player objects.

`src/Player.js`
Contains the reusable player card component.

`src/PlayersList.js`
Maps through the player data and renders all player cards.

`src/App.js`
Imports and renders the `PlayersList` component.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production.

### `npm test`

Runs the test suite.

## Dependencies

- `react`
- `react-dom`
- `react-bootstrap`
- `bootstrap`

## Notes

Bootstrap styles are imported in `src/index.js`.

The player cards are rendered from local data stored in `src/players.js`.
