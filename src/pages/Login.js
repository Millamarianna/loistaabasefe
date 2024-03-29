import { useForm } from "react-hook-form";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";

import useAuth from "../hooks/useAuth";
import cookie from 'cookie'

const Login = (props) => {
  //show which layout is used
  const lay = props.lay;
  //define database
  const db = process.env.REACT_APP_DB;
  //define state for api error
  const [apiError, setApiError] = useState();
  //useAuth hook
  const { isLoggedIn, setLoggedIn, setAuth } = useAuth();
  const cookie = require('cookie');
  //useNavigate hook
  let navigate = useNavigate();

  //useForm hook
  const { register, handleSubmit, formState: { errors }, } = useForm();

  //get user data from server
  const getUserData = async (token) => {
    const response = await fetch(`https://${db}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let userData = await response.json();
      console.log("getUserData:" + userData);
      userData["token"] = token;
      setAuth((prevAuth) => {
        console.log("Login: Authprovider, getuserdata, if response ok, previous auth:" + JSON.stringify(prevAuth));
        console.log("Login: getUserData:" + JSON.stringify(userData));
        userData["token"] = token; 
        return userData;
      });
      setLoggedIn(true)
      setApiError(null);
      navigate("/", { replace: true });
    }
  };

  //onFormSubmit function
  const onFormSubmit = async (data) => {
    const response = await fetch(`https://${db}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      putCookies(result);
    } else {
      let errorResponse = await response.json();
      setApiError(errorResponse["detail"]);
      setAuth(null);
    }
  };

  //putCookies function
  function putCookies(res) {
    console.log('Response from server:', res);
    const jwt = res.token;
    console.log('Before setting cookie:', document.cookie);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/, SameSite=None";
    document.cookie = cookie.serialize(
        'jwt', jwt,
        {
          path: '/',
          sameSite: 'strict',
          maxAge:  30 * 24 * 60 * 60,
        }
      )
      getUserData(jwt);
      console.log('After setting cookie:', document.cookie);
      
  }

  //onErrors function
  const onErrors = (errors) => console.error(errors);

  return (
    <Container className="login-container">
          

      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="sähköposti"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="email"
            autoComplete="off"
            {...register("email", { required: "Sähköpostiosoite vaaditaan" })}
          />
          {errors?.email && errors.email.message}

          <input
            type="password"
            placeholder="********"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="password"
            {...register("password", { required: "Salasana vaaditaan" })}
          />
          {errors?.password && errors.password.message}

          <button className={lay == 1 ? "home1-button" : "home-button"}>
            Kirjaudu sisään
          </button>
        </div>
      </form>
      
          <div>
            <p>Admin-tunnukset tekstimuokkausta varten:</p>
            Sähköposti: admin@admin.fi<br/>
            Salasana: admin
          </div>

      {apiError && (
        <div className="alert alert-error shadow-lg">
          <div>
            <span>Väärä käyttäjätunnus tai salasana!</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Login;