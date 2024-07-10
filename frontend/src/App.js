//This code is a React.js application that allows users to search for items in the iTunes Store, 
//manage a list of their favorite items, and provides a visually appealing user interface. 

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner, ListGroup, Tab, Tabs, Alert } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import './App.css';
import appleLogo from './images/apple-logo.png';
import Favourites from './components/Favourites.js';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [favorites, setFavorites] = useState([]);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    const callbackName = `itunesSearchCallback_${Date.now()}`;
    const itunesApiUrl = `https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}&callback=${callbackName}`;

    const script = document.createElement('script');
    script.src = itunesApiUrl;

    window[callbackName] = (data) => {
      if (data && data.results) {
        setSearchResults(data.results);
      } else {
        console.error('Invalid JSONP response:', data);
      }

      setLoading(false);
      document.body.removeChild(script);
      delete window[callbackName];
    };

    script.onerror = (error) => {
      console.error('Error loading JSONP script:', error);
      setLoading(false);
    };

    document.body.appendChild(script);
  };

  const addToFavorites = async (item) => {
    try {
      const response = await fetch('/api/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();
      setFavorites([...favorites, data]);

      setShowAddAlert(true);
      setTimeout(() => {
        setShowAddAlert(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavorites = (item) => {
    addToFavorites(item);
    setFavorites([...favorites, item]);

    setShowAddAlert(true);
    setTimeout(() => {
      setShowAddAlert(false);
    }, 4000);
  };

  const handleRemoveFromFavorites = async (itemToRemove) => {
    try {
      await fetch(`/api/favourites/${itemToRemove.id}`, {
        method: 'DELETE',
      });

      const updatedFavorites = favorites.filter((item) => item.id !== itemToRemove.id);
      setFavorites(updatedFavorites);

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch('/api/favourites')
      .then((response) => response.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const background = document.querySelector('.background');
    const colors = [
      ['#ff5f6d', '#ffc371'],
      ['#6A11CB', '#2575FC'],
      ['#FC5C7D', '#6A82FB'],
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const [color1, color2] = colors[randomIndex];
    background.style.background = `linear-gradient(to bottom right, ${color1}, ${color2})`;
  }, []);

  return (
    <div className="background">
      <Container>
        {showAddAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAddAlert(false)}
            dismissible
          >
            Item added to favorites!
          </Alert>
        )}
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Item removed from favorites!
          </Alert>
        )}
        <div className="search-container">
          <div className="header-content">
            <img
              src={appleLogo}
              alt="Apple Logo"
              className="apple-logo img-fluid"
              style={{ maxWidth: '100px' }}
            />
            <h1
              className="search-header"
              style={{ fontSize: '70px', fontWeight: 'bold' }}
            >
              <b>iTunes Search</b>
            </h1>
          </div>
          <div className="search-content">
            <Tabs
              activeKey={activeTab}
              onSelect={(key) => setActiveTab(key)}
              className="rounded-tabs"
            >
              <Tab eventKey="search" title="Search">
                <Form className="search-form">
                  <Form.Group className="search-input">
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <BsSearch className="search-icon" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      as="select"
                      value={mediaType}
                      onChange={(e) => setMediaType(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="movie">Movie</option>
                      <option value="podcast">Podcast</option>
                      <option value="music">Music</option>
                      <option value="audiobook">Audiobook</option>
                      <option value="shortFilm">Short Film</option>
                      <option value="tvShow">TV Show</option>
                      <option value="software">Software</option>
                      <option value="ebook">Ebook</option>
                    </Form.Control>
                  </Form.Group>
                  <div className="mb-3"></div>
                  <Button data-testid="search-button" variant="primary" onClick={handleSearch}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        {' Searching...'}
                      </>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </Form>
                <div className="mt-4">
                  {searchResults.length > 0 ? (
                    <ListGroup>
                      {searchResults.map((result) => (
                        <ListGroup.Item
                          key={result.trackId}
                          className="searched-item"
                        >
                          {result.trackName}
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="ml-8"
                            onClick={() => handleAddToFavorites(result)}
                          >
                            Add to Favorites
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p>Results</p>
                  )}
                </div>
              </Tab>
              <Tab eventKey="favourite" title="Favourites">
                <Favourites
                  addToFavorites={handleAddToFavorites}
                  removeFromFavorites={handleRemoveFromFavorites}
                  favorites={favorites}
                  handleRemoveFromFavorites={handleRemoveFromFavorites}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Search;
