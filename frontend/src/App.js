import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetails from "./MovieDetails";
import Header from "./Header";
import Register from "./Registrer";
import LogOut from "./LogOut";
import React from "react";
import { useCookies } from 'react-cookie';

const App = () => {

  const [token, setToken] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);

  token && setCookie('auth-token', token, {path: '/', maxAge: 86400})

  return (
    <>
    {cookies["auth-token"] ? (<Header isAthenticated={true}/>) : <Header isAthenticated={false}/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movies/:movieId" element={<MovieDetails />} />
      <Route path="accounts/register" element={<Register getToken={setToken} />} />
      <Route path="accounts/logout" element={<LogOut />} />
    </Routes>
    </>
  )
}

export default App;