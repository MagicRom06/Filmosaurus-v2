import Header from '../Header/index';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import Loader from "react-loader-spinner";
import SearchForm from './SearchForm';
import List from './SearchResults';

const StyledLoader = styled.div `
  text-align:center;
`;

const StyledHr = styled.hr `
  border: 1px solid #171212;
  opacity: 0.1;
  margin-bottom: 10px;
  margin: auto;
  width: 50%;
`;

const StyledSearchCount = styled.p `
  font-size:20px;
  font-weight:bold;
  margin: auto;
  width: 50%;
  margin-bottom: 1%;
`;
  

const API_ENDPOINT = 'http://127.0.0.1:8000/api/v1/search?query=';
const API_BASE = 'http://127.0.0.1:8000/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const getUrl = (searchTerm, page) => (
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
)
const extractSearchTerm = url => {
  return url
    .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
    .replace(PARAM_SEARCH, '');
}

const extractPage = url => {
  const page = url.split('=')
  return parseInt(page[page.length - 1])
}

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
          data: 
            action.payload.page === 1
              ? action.payload.list
              : state.data.concat(action.payload.list),
          page: action.payload.page,
          count: action.payload.count,
          next: action.payload.next
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
    const [spinnerLoading] = React.useState(true);
    const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)])
    const [actualSearch, setActualSearch] = React.useState('')

    const [movies, dispatchMovies] = React.useReducer(
        moviesReducer,
        { data: [], count: 0, next: true, isLoading : false, isError: false}
    );

    const handleFetchMovies = React.useCallback(() => {
        if (!searchTerm) return;
        dispatchMovies({type: 'MOVIES_FETCH_INIT'})
        setActualSearch(searchTerm)
        axios
          .get(urls)
          .then(result => {
            dispatchMovies({
              type: 'MOVIES_FETCH_SUCCESS',
              payload: {
                next: result.data.next,
                list: result.data.results,
                count: result.data.count,
              }
            })
          })
          .catch(() => 
            dispatchMovies({type: 'MOVIES_FETCH_FAILURE'})
          );
    }, [urls])

    React.useEffect(() => {
        handleFetchMovies()
    }, [handleFetchMovies])
    
    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    }
    
    const handleSearchSubmit = event => {
      handleSearch(searchTerm, 1)
        event.preventDefault();
    }

    const handleSearch = (searchTerm, page) => {
      const url = getUrl(searchTerm, page);
      setUrls(url);
    }

    const handleMore = () => {
      console.log(movies.next)
      const searchTerm = extractSearchTerm(urls);
      const page = extractPage(urls)
      handleSearch(searchTerm, page + 1);
    }

    return (
        <>
    <Header />
    <SearchForm
      searchTerm={searchTerm}
      onSearchInput={handleSearchInput}
      onSearchSubmit={handleSearchSubmit}
    />
    {movies.data !== undefined &&
        <>
        <StyledSearchCount>{movies.count} results for {actualSearch}</StyledSearchCount>
        <StyledHr />
        <List
          list={movies.data}
        />
        </>
    }
    {movies.isError && <p>Something went wrong ...</p>}
    {movies.isLoading 
      ? ( <StyledLoader>
            <Loader
              type="TailSpin"
              color="#171212"
              height={60}
              width={60}
              visible={spinnerLoading}
            />
          </StyledLoader> ) 
      : (movies.next !== null && <button type="button" onClick={handleMore}>More</button>)}
    </>
  );
}

export default Home