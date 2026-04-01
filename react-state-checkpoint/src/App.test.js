import { render, screen } from '@testing-library/react';
import App from './App';

test('renders state checkpoint heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/react state checkpoint/i);
  expect(headingElement).toBeInTheDocument();
});
