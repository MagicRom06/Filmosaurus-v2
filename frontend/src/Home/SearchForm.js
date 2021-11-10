import styled from 'styled-components';
import React from 'react';


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

export default SearchForm;