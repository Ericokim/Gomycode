# Checkpoint: Building React Apps with TypeScript

## Goal

Convert the provided React JavaScript components to TypeScript while keeping the same behavior.

## Step-by-step changes made

1. **Renamed files to TypeScript React format**

   - `.js`/`.jsx` files become `.tsx` files because they contain JSX.

2. **Added explicit prop typing for the functional component**

   - Created `GreetingProps` interface with:
     - `name: string`
   - Applied it to `Greeting` component so TypeScript validates prop usage.

3. **Added explicit state typing for the class component**

   - Created `CounterState` interface with:
     - `count: number`
   - Used `Component<{}, CounterState>` to type class component props and state.

4. **Typed methods and state initialization**

   - Annotated `increment` with return type `void`.
   - Typed `state` as `CounterState` to keep it fully type-safe.

5. **Improved state update pattern**
   - Replaced `this.setState({ count: this.state.count + 1 })` with
     `this.setState((prevState) => ({ count: prevState.count + 1 }))`.
   - This is safer in React when multiple updates are batched.

## Files created

- `src/Greeting.tsx`
- `src/Counter.tsx`

## Converted code summary

- **Greeting** now has strongly typed props.
- **Counter** now has strongly typed state and a safer increment logic.
