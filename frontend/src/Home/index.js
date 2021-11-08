import Header from '../Header/index';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import Loader from "react-loader-spinner";
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';


const StyledLoader = styled.div `
  text-align:center;
`;

const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/movies?search=';

const moviesReducer = (state, action) => {
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
          data: action.payload,
        };
      case 'MOVIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
}


const Home = () => {

    const [searchTerm, setSearchTerm] = React.useState('');
    const [spinnerLoading, setSpinnerLoading] = React.useState(true);
    const [url, setUrl] = React.useState(
        `${API_ENDPOINT}${searchTerm}`
    )

    const [movies, dispatchMovies] = React.useReducer(
        moviesReducer,
        { data: [], isLoading : false, isError: false}
    );

    const handleFetchMovies = React.useCallback(() => {
        if (!searchTerm) return;
        dispatchMovies({type: 'MOVIES_FETCH_INIT'})
        axios
          .get(url)
          .then(result => {
            dispatchMovies({
              type: 'MOVIES_FETCH_SUCCESS',
              payload: result.data
            })
          })
          .catch(() => 
            dispatchMovies({type: 'MOVIES_FETCH_FAILURE'})
          );
    }, [url])

    React.useEffect(() => {
        handleFetchMovies()
    }, [handleFetchMovies])
    
    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    }
    
    const handleSearchSubmit = event => {
        setUrl(`${API_ENDPOINT}${searchTerm}`)
        event.preventDefault();
    }

    return (
        <>
    <Header />
    <SearchForm
      searchTerm={searchTerm}
      onSearchInput={handleSearchInput}
      onSearchSubmit={handleSearchSubmit}
    />
    {movies.isError && <p>Something went wrong ...</p>}
    {movies.isLoading ? ( <StyledLoader><Loader type="TailSpin" color="#171212" height={60} width={60} visible={spinnerLoading} /></StyledLoader> ) : (
       movies.data.results !== undefined && <SearchResults list={movies.data} num_results={movies.data.count} />
    )}
    </>
  );
}

export default Home