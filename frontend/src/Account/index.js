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
`;

const StyledBlockDiv = styled.div `
    border: 1px solid #171212;
    width: 30%;
    padding: 5px;
    margin: 10px;
    display: flex;
    flex-direction: column;
`;

const StyledColumDiv = styled.div `
    display: flex;
    flex-direction: column;
    text-align: left;
`;

const StyledItemRow = styled.div `
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

const Account = ({token}) => {
    const [watchList, setWatchList] = React.useState([])
    const endpoint = 'http://127.0.0.1:8000/api/v1/accounts/watchlist/list';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const handleLoadWatchlist = React.useCallback(() => {
        axios
            .get(endpoint, {headers: headers})
            .then(res => {
                setWatchList(res.data.results);
            })
    }, [])

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
                                <Item item={item} />
                            )
                        })}
                    </StyledColumDiv>
                </StyledBlockDiv>
                <StyledBlockDiv>
                    <StyledHeadlineSecondary>Historic</StyledHeadlineSecondary>
                </StyledBlockDiv>
                <StyledBlockDiv>
                    <StyledHeadlineSecondary>Personal</StyledHeadlineSecondary>
                </StyledBlockDiv>
            </StyledRowDiv>
        </StyledContainer>
        </>
    )
}

const Item = ({item}) => {
    return (
        <StyledItemRow><Link to={`/movies/${item.movie_id}`}>{item.title} ({item.year})</Link></StyledItemRow>
    )
}

export default Account;