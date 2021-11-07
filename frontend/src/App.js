import Header from './Header/index';
import SearchForm from './SearchForm/index';
import axios from 'axios';
import React from 'react';

const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/movies?search=';

const MoviesReducer = (state, action) => {
  switch (action.type) {
    case 'MOVIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'MOVIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'MOVIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error();
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = React.useState('');
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  )
  const [movies, dispatchMovies] = React.useReducer(
    MoviesReducer,
    {data: [], isLoading: false, isError:false}
  )

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`)
  }

  const handleFetchMovie = React.useCallback(() => {
    if (!searchTerm) return;
    dispatchMovies({type: 'MOVIES_FETCH_INIT'});
    axios
    .get(url)
    .then(result => {
      dispatchMovies({
        type: 'MOVIES_FETCH_SUCCESS',
        payload: result.data.hits,
      })
    })
    .catch(() => 
      dispatchMovies({type: 'MOVIES_FETCH_FAILURE'})
    );
  }, [url])

  React.useEffect(() => {
    handleFetchMovie()
  }, [handleFetchMovie])


  return (
    <>
    <Header />
    <SearchForm
      onInputChange={handleSearchInput}
      onInputClick={handleSearchSubmit}
    />
    </>
  );
}

export default App;
