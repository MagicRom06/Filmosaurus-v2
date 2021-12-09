import axios from 'axios';
import React from 'react';
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
                    <div>2</div>
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

export default Account;