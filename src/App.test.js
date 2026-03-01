import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

test('renders app title and github link', async () => {
  const timeseries = Array.from({ length: 10 }, (_, index) => ({
    date: `2020-01-${String(index + 1).padStart(2, '0')}`,
    cases: index,
    newCases: index,
  }));

  vi.stubGlobal('fetch', vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        actuals: {
          cases: 1,
          newCases: 1,
          deaths: 1,
          newDeaths: 1,
          positiveTests: 1,
          negativeTests: 1,
        }
      })
    })
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        actualsTimeseries: timeseries,
      })
    }));

  render(<App />);
  expect(screen.getByText(/ny state covid-19/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  expect(await screen.findByText(/total new cases:/i)).toBeInTheDocument();

  vi.unstubAllGlobals();
});
