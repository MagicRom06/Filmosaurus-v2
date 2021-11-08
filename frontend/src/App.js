import Header from './Header/index';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';


const StyledForm = styled.form `
    padding: 70px 0;
    text-align: center;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

const StyledButton = styled.button `
  background: transparent;
  border: 1px solid #171212;
  padding: 18px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    background: #171212;
    color: #ffffff;
    fill: #ffffff;
    stroke: #ffffff;
  }
  @media only screen and (max-width: 411px) {
    margin-top: 5px;
    width: 50%;
    border: none;
}
`;

const StyledLabel = styled.label `
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input `
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
  width: 300px;
  &:focus {
    outline: none;
  }
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

const App = () => {

  const [searchTerm, setSearchTerm] = React.useState('');
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  )

  const [movies, dispatchMovies] = React.useReducer(
    moviesReducer,
    { data: [], isLoading : false, isError: false}
  );
  console.log(searchTerm)
  console.log(url)
  console.log(movies)
  
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
    {movies.isLoading ? ( <p>Loading ...</p> ) : (
       movies.data.results !== undefined && <List list={movies.data} />
    )}
    </>
  );
}

const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => {
  return (
      <StyledForm onSubmit={onSearchSubmit}>
          <InputWithLabel
            id="search"
            value={searchTerm}
            type="text"
            onInputChange={onSearchInput}
          >
            Search : 
          </InputWithLabel>
          <StyledButton type="submit" disabled={!searchTerm}>Search</StyledButton>
      </StyledForm>
  )
}

const InputWithLabel = ({id, value, type, onInputChange, children}) => {

  const inputRef = React.useRef();

  return (
    <>
    <StyledLabel htmlFor={id}>{children}</StyledLabel>
    <StyledInput 
      ref={inputRef}
      onChange={onInputChange}
      id={id}
      type={type}
      value={value}
    />
    </>
  )
}

const List = React.memo(({list}) => {
  console.log(list.results)
  return list.results.map(item => {
    return (
        <p>{item.title}</p>
    )
  })
})

export default App;
