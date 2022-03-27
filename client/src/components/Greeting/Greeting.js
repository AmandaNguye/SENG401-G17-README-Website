import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import greetingPic from "../../assets/logo.webp";

import "./Greeting.css";

const Greeting = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const checkLoggedIn = () => {
      fetch(`${process.env.REACT_APP_API_URL}/isUserAuth`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => (data.isLoggedIn ? navigate("/dashboard") : null));
    };
    checkLoggedIn();
  });

  return (
    <div
      className="greeting--container"
      style={{ backgroundImage: `url(${greetingPic})` }}
    >
      <h2 className="greeting--header">WELCOME . . .</h2>
      <button
        type="button"
        className="greeting--button greeting--button--login"
        onClick={() => navigate("/login")}
      >
        LOGIN
      </button>
      <button
        className="greeting--button greeting--button--register"
        type="button"
        onClick={() => navigate("/register")}
      >
        REGISTER
      </button>
    </div>
  );
};

export default Greeting;
