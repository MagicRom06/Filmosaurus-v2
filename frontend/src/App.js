import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import MovieDetails from "./MovieDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movies/:movieId" element={<MovieDetails />} />
    </Routes>
  )
}

export default App;