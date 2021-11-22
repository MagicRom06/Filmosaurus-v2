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

const StyledTitleRow = styled.div `
    margin-top: 25px;
    font-weight: bold;

    @media only screen and (max-width: 992px) {
        text-align: center;
    }

    &:nth-child(1) {
        font-weight: bold;
        font-size: 25px;
    }
`;

const StyledRateMainDiv = styled.div `
    margin: auto;
    width: 65%;
    display: flex;
    padding: 5px;

    @media only screen and (max-width: 992px) {
        flex-direction: column;
        margin: auto;
    }
`;

const StyledRateBlock = styled.div `
    width: 50%;
    text-align:center;
    display: flex;
    flex-direction: column;
    padding: 5px;

    @media only screen and (max-width: 992px) {
        margin: auto;
        width: auto;
    }
`;

const StyledRateItem = styled.div `
    display: flex;
    width: 50%;
    margin:auto;
`;

const StyledRateRow = styled.div `
    margin: 20px;
    font-weight: bold;
    font-size: 15px;

    span {
        border-bottom: 1px solid #171212;
        padding: 5px;
    }
`;

const StyledSourceLogo = styled.div `
    font-size: 50px;
`;

const StyledHr = styled.hr `
    width: 65%;
    margin: auto;
    border: 1px solid #171212;
    margin-bottom: 10px;
    opacity: 0.2;
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
    const [rates, setRates] = React.useState(undefined)

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
            .catch(() => {
                setImage('error')
            })
    }

    const handleFetchRates = (title, year) => {
        movie.data.length !== 0  &&
        axios
            .get(`http://127.0.0.1:8000/api/v1/ratings/load?movie=${title}&year=${year}`)
            .then(result => {
                setRates(result.data.ratings)
            })
            .catch(() => {
                setRates('error')
            })
    }

    React.useEffect(() => {
        handleFetchMovie()
    }, [])

    React.useEffect(() => {
        handleFetchImage(movie.data.title, movie.data.year)
    }, [movie.data])

    React.useEffect(() => {
        handleFetchRates(movie.data.title, movie.data.year)
    }, [movie.data])

    return (
        <>
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
                        {image === undefined && !movie.isError ? (
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
                            image === null || image === 'error' ? (
                                <StyledImg src={noImage} />
                            ) : (
                                <StyledImg src={image} />
                            )
                        )}
                        </>
                        <StyledDetailCol>
                            <Detail movie={movie.data} />
                        </StyledDetailCol>
                    </>
                )
            }
            </StyledMainDiv>)
            <>
            {rates === undefined && !movie.isError
                ? (<StyledLoader>
                    <Loader
                    type="TailSpin"
                    color="#171212"
                    height={60}
                    width={60}
                    visible={spinnerLoading}
                    />
                </StyledLoader>)
                : ( 
                    <>
                    <StyledHr />
                    <Rates ratings={rates} />
                    </>)
                }
            </>
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
                <StyledTitleRow>Categories</StyledTitleRow>
                <StyledDetailItem>{movie.categories.map((item, i) => <span key={i}>{item + " "}</span>)}</StyledDetailItem>
                <StyledTitleRow>Actors</StyledTitleRow>
                <StyledDetailItem>{movie.casts.map((item, i) => <span key={i}>{item} - </span>)}</StyledDetailItem>
                <StyledTitleRow>Countries</StyledTitleRow>
                <StyledDetailItem>{movie.countries.map((item, i) => <span key={i}>{item + " "}</span>)}</StyledDetailItem>
                <StyledTitleRow>Plot</StyledTitleRow>
                <StyledDetailItem>{movie.plot}</StyledDetailItem>
            </>
            }
        </>
    )
}

const Rates = ({ratings}) => {
    console.log(ratings)
    return (
        <StyledRateMainDiv>
            <StyledRateBlock>
                <StyledSourceLogo><span className="iconify" data-icon="cib:allocine"></span></StyledSourceLogo>
                <StyledRateItem>
                    <StyledRateRow>Press {ratings[0].allocine.press}</StyledRateRow>
                    <StyledRateRow>Spectators {ratings[0].allocine.spectator}</StyledRateRow>
                </StyledRateItem>
            </StyledRateBlock>
            <StyledRateBlock>
                <StyledSourceLogo><i className="fab fa-imdb"></i></StyledSourceLogo>
                <StyledRateRow>{ratings[1].imdb}</StyledRateRow>
            </StyledRateBlock>
        </StyledRateMainDiv>
    )
}

export default MovieDetails;