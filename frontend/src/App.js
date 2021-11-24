import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import MovieDetails from "./MovieDetails";
import Header from "./Header";
import Register from "./Registrer";

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movies/:movieId" element={<MovieDetails />} />
      <Route path="accounts/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App;