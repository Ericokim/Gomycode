import React, { Component } from "react";

interface CounterState {
  count: number;
}

class Counter extends Component<Record<string, never>, CounterState> {
  state: CounterState = {
    count: 0,
  };

  increment = (): void => {
    // Use the previous state so the update stays correct across renders.
    this.setState((previousState) => ({
      count: previousState.count + 1,
    }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button type="button" onClick={this.increment}>
          Increment
        </button>
      </div>
    );
  }
}

export default Counter;
