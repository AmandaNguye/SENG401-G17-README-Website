import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../PostList/PostList";

const Profile = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:5005/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? setUsername(data.username) : navigate("/dashboard")
      );
  });

  const [posts, setPosts] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
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

    try {
      const res = await fetch(
        `http://localhost:5005/posts/user/${username}`,
        payload
      ); // Port 5001 for postService
      const posts = await res.json();
      console.log(posts);
      setPosts(posts);
      // console.log(posts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
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
  );
};

export default Profile;
