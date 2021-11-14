import { useParams } from "react-router-dom";
import Header from "../Header";
import styled from 'styled-components';
import React from "react";
import axios from 'axios';
import noImage from '../assets/images/noImage.png'
import Loader from "react-loader-spinner";

const StyledMainDiv = styled.div `
    margin: auto;
    width: 65%;
    display: flex;

    @media only screen and (max-width: 992px) {
        flex-direction: column;
        width: 50%;
    }
`;

const StyledDetailCol = styled.div `
    display: flex;
    flex-direction: column;
    padding: 15px;
`;

const StyledDetailItem = styled.div `
    font-size: 18px;
    padding: 10px;

    &:nth-child(1) {
        font-weight: bold;
        font-size: 25px;
    }

    @media only screen and (max-width: 992px) {
        text-align: center;
    }
`;

const StyledLoader = styled.div `
    margin: auto;
    width: 50%;
    text-align:center;
`;

const StyledImg = styled.img `
    width: 300px;
    height: auto;

    @media only screen and (max-width: 992px) {
        width: 100%;
        height: 80%
    }
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
        default:
            return state
    }
}

const MovieDetails = () => {

    let params = useParams();
    const url = `http://127.0.0.1:8000/api/v1/movie/${params.movieId}`
    const [spinnerLoading] = React.useState(true);
    const [movie, dispatchMovie] = React.useReducer(
        movieDetailReducer,
        {data: [], isLoading: false, isError: false}
    );
    const [image, setImage] = React.useState(undefined)


    const handleFetchMovie = async () => {
        dispatchMovie({type: 'MOVIE_FETCH_INIT'})
        axios
            .get(url)
            .then(result => {
                dispatchMovie({
                    type: 'MOVIE_FETCH_SUCCESS',
                    payload: result.data,
                })
            })
            .catch(() => {
                dispatchMovie({type: 'MOVIE_FETCH_FAILURE'})
            })
    }

    const handleFetchImage = (title, year) => {
        movie.data.length !== 0  &&
        axios
            .get(`http://127.0.0.1:8000/api/v1/image/get?movie=${title}&year=${year}`)
            .then(result => {
                setImage(result.data.image)
            })
            .catch(e => {
                console.log(e);
            })
    }

    React.useEffect(() => {
        handleFetchMovie()
    }, [])

    React.useEffect(() => {
        handleFetchImage(movie.data.title, movie.data.year)
    }, [movie.data])

    console.log(image)
    return (
        <>
        <Header />
        <StyledMainDiv>
            {movie.isError && <p>Something went wrong ...</p>}
            {movie.isLoading 
                ? ( <StyledLoader>
                        <Loader
                        type="TailSpin"
                        color="#171212"
                        height={60}
                        width={60}
                        visible={spinnerLoading}
                        />
                    </StyledLoader> ) 
                : (
                    <>  
                        <>
                        {image === undefined ? (
                            <StyledLoader>
                                <Loader
                                type="TailSpin"
                                color="#171212"
                                height={60}
                                width={60}
                                visible={spinnerLoading}
                                />
                            </StyledLoader>
                        ) : (
                            <StyledImg src={image} />
                        )}
                        </>
                        <StyledDetailCol>
                            <Detail movie={movie.data} />
                        </StyledDetailCol>
                    </>
                )
            }
            </StyledMainDiv>)
        </>
    )
}

const Detail = ({movie}) => {
    return (
        <>
            {movie.length !== 0 && 
            <>
                <StyledDetailItem>{movie.title} ({movie.year})</StyledDetailItem>
                <StyledDetailItem>Directed by {movie.directors} </StyledDetailItem>
                <StyledDetailItem>{movie.categories.map((item, i) => <span key={i}>{item + " "}</span>)}</StyledDetailItem>
                <StyledDetailItem>{movie.casts.map((item, i) => <span key={i}>{item} - </span>)}</StyledDetailItem>
                <StyledDetailItem>{movie.countries.map((item, i) => <span key={i}>{item + " "}</span>)}</StyledDetailItem>
                <StyledDetailItem>{movie.plot}</StyledDetailItem>
            </>
            }
        </>
    )
}

export default MovieDetails;