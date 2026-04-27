import React, { Component } from "react";

// 1) Define the state type for the class component.
// This guarantees `count` is always a number.
interface CounterState {
  count: number;
}

// 2) Add generic types to Component:
// - First generic: props type ({} because this component has no props)
// - Second generic: state type (CounterState)
class Counter extends Component<{}, CounterState> {
  // 3) Type-safe initial state.
  state: CounterState = {
    count: 0,
  };

  // 4) Use functional setState with prevState for safer state updates.
  // This avoids stale state bugs when updates are batched.
  increment = (): void => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
