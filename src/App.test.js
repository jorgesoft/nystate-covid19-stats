import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title and github link', () => {
  render(<App />);
  expect(screen.getByText(/ny state covid-19/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
});
