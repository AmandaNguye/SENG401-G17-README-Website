import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import PostList from "../PostList/PostList";
import NavBar from "../NavBar/NavBar";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/isUserAuth`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? setUsername(data.username) : navigate("/login")
      )
      .then(() => setIsLoggedIn(true));
  });

  const loadPosts = async () => {
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    if (username) {
      try {
        console.log(username);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/posts/user/${username}`,
          payload
        ); // Port 5001 for postService
        const posts = await res.json();
        setPosts(posts);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) loadPosts();
    return () => {
      isMounted = false;
    };
  }, [username]);

  return isLoggedIn ? (
    <div>
      <NavBar
        refreshPosts={loadPosts}
        setKeywords={setKeywords}
        onDashboard={false}
      />
      <div>
<<<<<<< HEAD
        <h1 className="welcome">Welcome, {username} </h1>
        <h2 className="content-h2">Your Posts:</h2>
=======
        <h1>Welcome, {username} </h1>
        <h2>Your Posts:</h2>
>>>>>>> main
        <PostList posts={posts} refreshPosts={loadPosts} />
      </div>
    </div>
  ) : null;
};

export default Profile;
