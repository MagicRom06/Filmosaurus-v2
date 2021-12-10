import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div `
    display: flex;
    text-align: center;
    flex-direction: column;
`;

const StyledHeadlinePrimary = styled.h1 `
    font-size: 35px;
    font-weight: 300;
    letter-spacing: 2px;
`;

const StyledHeadlineSecondary = styled.h1 `
    font-size: 30px;
    font-weight: 300;
    letter-spacing: 2px;
    border-bottom: 1px solid #171212;
    padding: 15px;
    margin: 0;
`;

const StyledRowDiv = styled.div `
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 992px) {
        flex-direction: column;
    }
`;

const StyledBlockDiv = styled.div `
    width: 30%;
    padding: 5px;
    margin: 10px;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 992px) {
        width: 80%;
    }
`;

const StyledColumDiv = styled.div `
    display: flex;
    flex-direction: column;
    text-align: left;
`;

const StyledItemRow = styled.div `
    width: 100%;
    display:flex;
    margin: 5px;
    padding: 10px;
    margin-right: 0;
    margin-left: 0;
    font-size: 20px;

    a {
        color: #171212;
        text-decoration: none;
        display: block;
    }

    &:hover {
        background-color: #171212;
        transition: 0.1s;
    }

    &:hover a{
        color: white;
    }
`;

const ButtonRowDiv = styled.div `
    display: flex;
`;

const StyledButton = styled.button `
  background: transparent;
  border: 1px solid #171212;
  margin: 5px;
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    background: #171212;
    color: #ffffff;
    fill: #ffffff;
    stroke: #ffffff;
  }
`;

const StyledContainerItem = styled.div `
  display: flex;
`;

const Account = ({token}) => {
    const [watchList, setWatchList] = React.useState([])
    const endpoint_load = 'http://127.0.0.1:8000/api/v1/accounts/watchlist/list';
    const endpoint_update = 'http://127.0.0.1:8000/api/v1/accounts/watchlist/update/seen/';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const handleLoadWatchlist = React.useCallback(() => {
        axios
            .get(endpoint_load, {headers: headers})
            .then(res => {
                setWatchList(res.data);
            })
    }, [])

    const handleViewedClick = watchlist_id => {
        axios
            .put(endpoint_update, {watchlist_id: watchlist_id}, {headers: headers})
            .then(res => {
                handleLoadWatchlist()
            })
    }

    React.useEffect(() => {
        handleLoadWatchlist()
    }, [handleLoadWatchlist])

    return (
        <>
        <StyledContainer>
        <StyledHeadlinePrimary>Account</StyledHeadlinePrimary>
            <StyledRowDiv>
                <StyledBlockDiv>
                    <StyledHeadlineSecondary>Watchlist</StyledHeadlineSecondary>
                    <StyledColumDiv>
                        {watchList.map(item => {
                            return (
                                <div key={item.id}>
                                {!item.seen && <Item item={item} handleClick={() => handleViewedClick(item.id)} />}
                                </div>
                            )
                        })}
                    </StyledColumDiv>
                </StyledBlockDiv>
                <StyledBlockDiv>
                    <StyledHeadlineSecondary>Historic</StyledHeadlineSecondary>
                    <StyledColumDiv>
                        {watchList.map(item => {
                            return (
                                <div key={item.id}>
                                {item.seen && <Item item={item} />}
                                </div>
                            )
                        })}
                    </StyledColumDiv>
                </StyledBlockDiv>
                <StyledBlockDiv>
                    <StyledHeadlineSecondary>Personal</StyledHeadlineSecondary>
                </StyledBlockDiv>
            </StyledRowDiv>
        </StyledContainer>
        </>
    )
}

const Item = ({item, handleClick}) => {
    return (
        <StyledContainerItem>
        <StyledItemRow>
            <Link to={`/movies/${item.movie_id}`}>
                {item.title} ({item.year})
            </Link>
        </StyledItemRow>
        {!item.seen && (
            <ButtonRowDiv>
                <StyledButton onClick={handleClick}>Viewed</StyledButton>
            </ButtonRowDiv>
        )}
        </StyledContainerItem>
    )
}

export default Account;