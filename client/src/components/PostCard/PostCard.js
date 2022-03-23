import React from "react";
import { useNavigate } from "react-router";

import "./PostCard.css";

const PostCard = ({ post, refreshPosts }) => {
  const navigate = useNavigate();

  const cancelVote = async (e) => {
    e.preventDefault();
    const postID = post._id;
    const username = localStorage.getItem("username");
    const data = {
      username: username,
      voteType: "",
    };
    const payload = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `http://localhost:5001/posts/${postID}/vote`,
        payload
      );
      if (res.ok) {
        refreshPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const famed = post.famed;
  const lamed = post.lamed;

  const upvote = async (e) => {
    if (famed) {
      cancelVote(e);
      return;
    }

    e.preventDefault();
    const postID = post._id;
    const username = localStorage.getItem("username");
    const data = {
      username: username,
      voteType: "fame",
    };
    const payload = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `http://localhost:5001/posts/${postID}/vote`,
        payload
      );
      if (res.ok) {
        refreshPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downvote = async (e) => {
    if (lamed) {
      cancelVote(e);
      return;
    }

    e.preventDefault();
    const postID = post._id;
    const username = localStorage.getItem("username");
    const data = {
      username: username,
      voteType: "lame",
    };
    const payload = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `http://localhost:5001/posts/${postID}/vote`,
        payload
      );
      if (res.ok) {
        refreshPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-card">
      <a
        className="title"
        onClick={(e) => {
          e.preventDefault();
          console.log(`post ${post._id} clicked`);
        }}
      >
        {post.title}
      </a>
      <p>{post.content}</p>
      <p>{post.fame_count}</p>

      <div className="card-footer">
        <button
          className="fame"
          onClick={upvote}
          style={
            famed
              ? { backgroundColor: "#644aff" }
              : { backgroundColor: "transparent" }
          }
        >
          Fame
        </button>
        <button
          className="lame"
          onClick={downvote}
          style={
            lamed
              ? { backgroundColor: "#ffd25e" }
              : { backgroundColor: "transparent" }
          }
        >
          Lame
        </button>
      </div>
    </div>
  );
};

export default PostCard;
