import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = () => {
      fetch("http://localhost:5000/isUserAuth", {
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
    <div>
      <h2>Landing Page</h2>
      <button type="button" onClick={() => navigate("/login")}>
        Login
      </button>
      <button type="button" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default Landing;
