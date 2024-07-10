// src/components/__tests__/Favourites.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Favourites from '../Favourites';

it('renders correctly', () => {
  const favorites = [
    { trackId: 1, trackName: 'Test Track 1' },
    { trackId: 2, trackName: 'Test Track 2' }
  ];

  const tree = renderer.create(
    <Favourites favorites={favorites} handleRemoveFromFavorites={jest.fn()} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});