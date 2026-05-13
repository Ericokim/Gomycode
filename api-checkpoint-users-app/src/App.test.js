import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the API checkpoint heading", () => {
  render(<App />);
  expect(screen.getByText(/jsonplaceholder users/i)).toBeInTheDocument();
});
