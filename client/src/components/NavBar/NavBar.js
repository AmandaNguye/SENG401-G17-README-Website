import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";

/*
* use searchValue to show the value of what users are typing (refer to input tag inside PostForm.js to see how to work with onChange and value)
* onSubmit will setKeywords(searchValue) and then call refreshPosts()
*/



const NavBar = ({ refreshPosts, searchPosts, setKeywords, onDashboard }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setKeywords(searchValue);
    searchPosts();
  }
  const resetSearch = () => {
    setSearchValue("");
    setKeywords("");
  }
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  
  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };


  return (
    <div className="navbar">
      <nav className="navbaritems">
        <h1 className="navbar-logo"> <a href="" onClick={(e) => handleDashboard(e)}>README</a> </h1>
        {onDashboard
        ? 
        <form className="searchbar" onSubmit={handleSubmit}>
          <input type="text" placeholder="Search Posts..." value={searchValue} onChange={(e=>setSearchValue(e.target.value))}/>
          <button type="button" className="clearform" onClick = {(e=>resetSearch())}>x</button>
        </form>
        :
        <div className="searchbar-placeholder"></div>
        }
        <ul className="navbarlinks">
          <li><a href="" onClick={(e) => handleProfile(e)}>Profile</a></li>
          <li><a href="" onClick={(e) => handleDashboard(e)}>Dashboard</a></li>
          <li><a href="" onClick={(e) => handleLogout(e)}>Logout</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
