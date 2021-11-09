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

const StyledRow = styled.div `
  margin: auto;
  width: 50%;
  margin-top: 1%;
  margin-bottom:1%;
`;

const List = React.memo(({list}) => {
    return list.map(item => {
      return (
          <StyledRow key={item.id}><Item item={item} /></StyledRow>
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

export default List;