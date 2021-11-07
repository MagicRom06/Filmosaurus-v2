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

  return (
    <>
    <Header />
    <SearchForm />
    </>
  );
}

const SearchForm = () => {
  return (
      <StyledForm>
          <StyledLabel>Search : </StyledLabel>
          <StyledInput />
          <StyledButton>Search</StyledButton>
      </StyledForm>
  )
}

export default App;
