import { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import '../index.css';
import { client_id, client_secret, token } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { addTokens } from '../redux/tokenSlice';
import InfoUser from './infoUser';
import Loader from './loader';

function Home() {
  // Initialize necessary variables and hooks
  let dispatch = useDispatch();
  let valor = "";
  let contador = 0;
  let [accessToken, setToken] = useState("");
  let navigate = useNavigate();
  let response = "";

  // Effect hook to run code on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href);
    valor = urlParams.get("code");

    // Increment the counter and call tokenApi if it's the first time
    contador++;
    if (contador !== 2) {
      tokenApi(valor);
    }
  }, []);

  // Function to handle token exchange
  let tokenApi = async (data) => {
    // Check if 'refresh_token' is not present in local storage
    if (
      localStorage.getItem("refresh_token") == null ||
      localStorage.getItem("refresh_token") == "undefined" ||
      localStorage.getItem("refresh_token") == undefined
    ) {
      // API call for initial token exchange
      let datos = await fetch(token, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "client_id": client_id,
          "client_secret":client_secret,
          "code": data,
          "grant_type": "authorization_code",
        }),
      });

      response = await datos.json();

      // Check for errors in the response and navigate back if errors exist
      if (response.errors !== undefined) {
        navigate("/");
      } else {
        // Store 'refresh_token' in local storage and dispatch user data to Redux
        localStorage.setItem("refresh_token", response.refresh_token);
        dispatch(addUser(response));
      }
    }

    // If 'refresh_token' is present in local storage
    if (localStorage.getItem("refresh_token") !== null) {
      // API call for token refresh
      let refresh = await fetch(token, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "client_id": "118172",
          "client_secret": "e39a01863bdd5130d5b61f62e0fe4af5a6c96f35",
          "refresh_token": localStorage.getItem("refresh_token"),
          "grant_type": "refresh_token",
        }),
      });

      // Get the response, set the access token, and update Redux state
      let responseRefresh = await refresh.json();
      setToken(responseRefresh.access_token);
      localStorage.setItem("token", responseRefresh.access_token);
      dispatch(addTokens({ token: localStorage.getItem("token"), refresh_token: localStorage.getItem("refresh_token") }));

      // Navigate to the "/activities" route
      navigate("/activities");
    }
  };

  return (
    <div>
      {/* Display Loader component if 'accessToken' is empty, otherwise display InfoUser component */}
      {accessToken === "" ? <Loader /> : <InfoUser />}
    </div>
  );
}

export default Home;
