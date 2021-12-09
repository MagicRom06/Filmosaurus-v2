import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetails from "./MovieDetails";
import Header from "./Header";
import Register from "./Registrer";
import LogOut from "./LogOut";
import Login from "./Login";
import Account from "./Account";
import React from "react";
import { useCookies } from 'react-cookie';

const App = () => {

  const [token, setToken] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);

  const handleLogin = () => {
    setCookie('auth-token', token, {path: '/', maxAge: 86400})
  }

  token !== null && handleLogin()

  return (
    <>
    {cookies["auth-token"] ? (<Header isAthenticated={true}/>) : <Header isAthenticated={false}/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movies/:movieId" element={<MovieDetails token={cookies["auth-token"]} />} />
      <Route path="accounts/register" element={<Register getToken={setToken} />} />
      <Route path="accounts/login" element={<Login getToken={setToken} />} />
      <Route path="accounts/logout" element={<LogOut removeCookie={removeCookie} setToken={setToken} />} />
      {cookies['auth-token'] && (
        <Route path="account" element={<Account token={cookies["auth-token"]} />} />
      )}
    </Routes>
    </>
  )
}

export default App;