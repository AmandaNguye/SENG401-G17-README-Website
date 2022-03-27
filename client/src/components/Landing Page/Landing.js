import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import landingPic from "../../assets/logo.webp";

import "./Landing.css";

const Landing = () => {
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
      className="landing--container"
      style={{ backgroundImage: `url(${landingPic})` }}
    >
      <h2 className="landing--header">WELCOME . . .</h2>
      <button
        type="button"
        className="landing--button landing--button--login"
        onClick={() => navigate("/login")}
      >
        LOGIN
      </button>
      <button
        className="landing--button landing--button--register"
        type="button"
        onClick={() => navigate("/register")}
      >
        REGISTER
      </button>
    </div>
  );
};

export default Landing;
