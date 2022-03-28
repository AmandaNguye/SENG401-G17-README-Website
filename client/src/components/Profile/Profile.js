import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import PostList from "../PostList/PostList";

const Profile = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState([]);

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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

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
    loadPosts();
  }, [username]);

  return isLoggedIn ? (
    <div>
      {isLoading ? (
        <CircularProgress size="40" />
      ) : (
        <div>
          <button type="button" onClick={(e) => handleLogout(e)}>
            Log Out
          </button>
          <button type="button" onClick={(e) => handleDashboard(e)}>
            Dashboard
          </button>
          <h1>Welcome, {username} </h1>
          <h2>Your Posts:</h2>
          <PostList posts={posts} refreshPosts={loadPosts} />
        </div>
      )}
    </div>
  ) : (
    <CircularProgress size="40" />
  );
};

export default Profile;
