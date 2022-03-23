import React from "react";
import { useNavigate } from "react-router";

import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

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
