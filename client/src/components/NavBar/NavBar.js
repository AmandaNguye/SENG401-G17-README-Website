import React, { useState } from "react";

import "./NavBar.css";

/*
 * use searchValue to show the value of what users are typing (refer to input tag inside PostForm.js to see how to work with onChange and value)
 * onSubmit will setKeywords(searchValue) and then call refreshPosts()
 */
const NavBar = ({ refreshPosts, setKeywords }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="navbar">
      NavBar
      <div></div>
    </div>
  );
};

export default NavBar;
