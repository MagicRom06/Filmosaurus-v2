import styled from 'styled-components';
import React from 'react';


const StyledItem = styled.div `
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  margin-top:10px;
`;

const StyledColumn = styled.span `
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  a {
    color: inherite;
  }
  width: ${props => props.width};
`;

const StyledSearchDiv = styled.div `
  margin: auto;
  width: 50%;
  margin-top: 5%;
`;

const StyledHr = styled.hr `
  border: 1px solid #171212;
  opacity: 0.1;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledSearchCount = styled.span `
  font-size:20px;
  font-weight:bold;
`;

const SearchResults = ({list, num_results}) => {
    return (
      <StyledSearchDiv>
        <StyledSearchCount>{num_results} results</StyledSearchCount>
        <StyledHr />
        <List list={list} />
      </StyledSearchDiv>
    )
}
  
const List = React.memo(({list}) => {
    return list.results.map(item => {
      return (
          <div key={item.id}><Item item={item} /></div>
      )
    })
})
  
const Item = ({item}) => {
    return (
      <StyledItem>
        <StyledColumn width='60%'>{item.title}</StyledColumn>
        <StyledColumn width='25%'>{item.year}</StyledColumn>
        <StyledColumn width='40%'>directed by {item.directors}</StyledColumn>
      </StyledItem>
    )
}

export default SearchResults;