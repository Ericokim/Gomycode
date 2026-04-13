import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { createAppStore } from "./app/store";

function renderApp() {
  const store = createAppStore();

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

test("renders redux task flow heading", () => {
  renderApp();

  expect(screen.getByText(/redux task flow/i)).toBeInTheDocument();
});

test("adds a new task to the list", () => {
  renderApp();

  fireEvent.change(screen.getByLabelText(/task description/i), {
    target: { value: "Prepare the Redux checkpoint submission." },
  });
  fireEvent.click(screen.getByRole("button", { name: /add task/i }));

  expect(
    screen.getByText(/prepare the redux checkpoint submission\./i)
  ).toBeInTheDocument();
});
