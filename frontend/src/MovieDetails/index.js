import { useParams } from "react-router-dom";
import Header from "../Header";
import styled from 'styled-components';
import React from "react";
import axios from 'axios';

const StyledDiv = styled.div `
    border: 1px solid black;
`;

const movieDetailReducer = (state, action) => {
    switch (action.type) {
        case 'MOVIE_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'MOVIE_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'MOVIE_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
    }
}

const MovieDetails = () => {

    let params = useParams();
    const url = `http://127.0.0.1:8000/api/v1/movie/${params.movieId}`

    const [data, dispatchData] = React.useReducer(
        movieDetailReducer,
        {data: [], isLoading: false, isError: false}
    );
    
    const handleFetchMovie = React.useCallback(( )=> {
        dispatchData({type: 'MOVIES_FETCH_INIT'})
        axios
            .get(url)
            .then(result => {
                dispatchData({
                    type: 'MOVIE_FETCH_SUCCESS',
                    payload: result.data,
                })
            })
            .catch(() => {
                dispatchData({type: 'MOVIE_FETCH_FAILURE'})
            })
    }, [url])

    React.useEffect(() => {
        handleFetchMovie()
    }, [handleFetchMovie])

    return (
        <>
        <Header />
        <StyledDiv>
        <h1>Movie Details {params.movieId}</h1>
        </StyledDiv>
        </>
    )
}

export default MovieDetails;