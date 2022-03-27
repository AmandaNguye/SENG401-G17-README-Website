import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import PostList from "../PostList/PostList";
import PostForm from "../PostForm/PostForm";
import CondensedPostForm from "../CondensedPostForm/CondensedPostForm";
import PageSelector from "../PageSelector/PageSelector";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currPage, setCurrPage] = useState(0);

  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5005/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? setIsLoggedIn(true) : navigate("/login")
      );
  });

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

  const nextPage = (e) => {
    e.preventDefault();
    setCurrPage(currPage + 1);
  };

  const prevPage = (e) => {
    e.preventDefault();
    setCurrPage(currPage - 1);
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
        `http://localhost:5005/posts?page=${currPage}`,
        payload
      );
      const posts = await res.json();
      setPosts(posts);
      // console.log(posts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [currPage]);

  return (
    isLoggedIn && (
      <div className="dashboard-wrapper">
        <h2>Dashboard</h2>
        <button type="button" onClick={(e) => handleLogout(e)}>
          Log Out
        </button>
        <button type="button" onClick={(e) => handleProfile(e)}>
          Profile
        </button>
        {posting ? (
          <PostForm refreshPosts={loadPosts} setForm={setPosting} />
        ) : (
          <CondensedPostForm setForm={setPosting} />
        )}
        <PostList posts={posts} refreshPosts={loadPosts} />

        <div className="dashboard-footer">
          <PageSelector
            pageNo={currPage}
            nextPage={nextPage}
            prevPage={prevPage}
            hasPosts={posts.length > 0}
          />
        </div>
      </div>
    )
  );
};

export default Dashboard;
