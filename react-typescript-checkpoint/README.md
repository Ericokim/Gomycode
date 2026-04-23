# React TypeScript Checkpoint

This project is a small React app that converts two JavaScript components to TypeScript.

## What Was Converted

### Code 01
- A functional `Greeting` component
- The `name` prop is typed with a `GreetingProps` interface

### Code 02
- A class-based `Counter` component
- The component state is typed with a `CounterState` interface
- The counter update uses the previous state for a safe increment

## Steps Used To Convert The Code

1. Create a new React project structure that supports TypeScript.
2. Rename JavaScript files from `.js` to `.tsx` where React JSX is used.
3. Add explicit TypeScript interfaces for props and state.
4. Type the component logic so React knows the expected data shapes.
5. Keep the UI simple and render both converted examples on one page.

## Project Structure

`src/components/Greeting.tsx`
Contains the typed functional component.

`src/components/Counter.tsx`
Contains the typed class component.

`src/App.tsx`
Renders both converted checkpoint examples.

## Run The Project

```bash
npm install
npm start
```

## Why This Solution Is Simple

- Only one new project folder was added.
- The app focuses only on the two required conversions.
- The TypeScript types use small interfaces instead of advanced patterns.
