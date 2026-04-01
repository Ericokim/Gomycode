# React State Checkpoint

This project is a simple React app built for the React State Checkpoint.

## Project Goal

The goal of this project is to practice:

- Creating a class-based component
- Using component state
- Toggling content with a button
- Using lifecycle methods
- Tracking time with `setInterval`

## Features

- Built with `create-react-app`
- `App.js` is written as a class component
- State includes a `Person` object with:
  - `fullName`
  - `bio`
  - `imgSrc`
  - `profession`
- State also includes a boolean `shows`
- A button toggles whether the profile is displayed
- A timer shows how many seconds have passed since the component mounted

## Project Structure

`src/App.js`
Contains the class-based component, state, toggle logic, and lifecycle methods.

`src/App.css`
Contains the simple styles for the page and profile card.

`src/App.test.js`
Contains a basic test for the rendered heading.

## Lifecycle Logic

The app uses:

- `componentDidMount()` to start the timer
- `componentWillUnmount()` to clear the timer

This keeps the timer running only while the component is mounted.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production.

### `npm test`

Runs the test suite.

## Notes

The implementation was kept simple on purpose to match the checkpoint requirements.
