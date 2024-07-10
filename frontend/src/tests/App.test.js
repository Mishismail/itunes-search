// src/__tests__/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../App';

beforeEach(() => {
  fetch.resetMocks();
  jest.clearAllMocks();
});

test('handles search and displays results', async () => {
  fetch.mockResponseOnce(JSON.stringify([{ trackId: 1, trackName: 'Test Song' }]));

  // Mock the JSONP script injection
  const originalCreateElement = document.createElement;
  global.document.createElement = jest.fn((element) => {
    if (element === 'script') {
      const script = originalCreateElement.call(document, element);
      setTimeout(() => {
        window.itunesSearchCallback_1({
          results: [{ trackId: 1, trackName: 'Test Song' }],
        });
      }, 100);
      return script;
    }
    return originalCreateElement.call(document, element);
  });

  render(<Search />);

  const searchInput = screen.getByPlaceholderText(/search/i);
  fireEvent.change(searchInput, { target: { value: 'test' } });

  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);

  const resultItem = await screen.findByText('Test Song');
  expect(resultItem).toBeInTheDocument();

  // Restore the original createElement after the test
  document.createElement = originalCreateElement;
});


