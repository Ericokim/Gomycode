import { render, screen } from '@testing-library/react';
import App from './App';

test('renders movie hub heading', () => {
  render(<App />);
  expect(screen.getByText(/movie hub/i)).toBeInTheDocument();
});
