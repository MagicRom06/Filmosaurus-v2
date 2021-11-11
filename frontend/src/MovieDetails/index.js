import { useParams } from "react-router-dom";
import Header from "../Header";

const MovieDetails = () => {

    let params = useParams();

    return (
        <>
        <Header />
        <h1>Movie Details {params.movieId}</h1>
        </>
    )
}

export default MovieDetails;