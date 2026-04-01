import { render, screen } from '@testing-library/react';
import App from './App';

test('renders player cards heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/fifa player cards/i);
  expect(headingElement).toBeInTheDocument();
});
