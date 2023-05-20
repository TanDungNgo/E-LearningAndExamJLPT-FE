import axios from "axios";
import { useState } from "react";

function RequestHttp() {
  const getToken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    return token;
  };

  const [token, setToken] = useState(getToken());

  const setTokenToLocalStorage = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  const request = axios.create({
    baseURL: "https://e-learningandexamjlpt-be-production.up.railway.app/api",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  return { request, getToken, setToken: setTokenToLocalStorage };
}

export default RequestHttp;
