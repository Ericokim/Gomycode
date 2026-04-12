import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the to-do app heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/task flow/i);
  expect(headingElement).toBeInTheDocument();
});
