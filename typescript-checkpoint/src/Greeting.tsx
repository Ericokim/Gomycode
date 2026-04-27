import React from "react";

// 1) Define the shape of props using an interface.
// This makes TypeScript enforce that `name` is always a string.
interface GreetingProps {
  name: string;
}

// 2) Apply the props interface to the functional component.
// Now, if `name` is missing or not a string, TypeScript will show an error.
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;
