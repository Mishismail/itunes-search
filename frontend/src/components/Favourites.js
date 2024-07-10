//This code is a React functional component. It receives an array of favorite items (favorites) and a function (handleRemoveFromFavorites) as props. 
//The component renders a list of favorite items with a "Remove" button next to each item, allowing users to remove items from their favorites list.

import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function Favourites({ favorites, handleRemoveFromFavorites }) {
  return (
    <div>
      <h2>Favourites</h2>
      <ListGroup>
        {favorites.map((favorite) => (
          <ListGroup.Item key={favorite.trackId} className="searched-item">
            {favorite.trackName}
            <Button
              variant="outline-danger"
              size="sm"
              className="ml-2"
              onClick={() => handleRemoveFromFavorites(favorite)}
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Favourites;