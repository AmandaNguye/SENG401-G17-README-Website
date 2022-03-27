import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { IconButton } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

import EditForm from "../EditForm/EditForm";

import "./PostCard.css";

const PostCard = ({ post, refreshPosts }) => {
  const navigate = useNavigate(); // for title link, comment link, etc.
  const [isCreator, setIsCreator] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const famed = post.famed;
  const lamed = post.lamed;

  const size = 20;
  const upvoteColor = "#644aff";
  const downvoteColor = "#ffd25e";

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/isUserAuth`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn
          ? setIsCreator(data.username === post.creator)
          : navigate("/login")
      );
  });

  const cancelVote = async (e) => {
    e.preventDefault();
    const postID = post._id;
    const data = {
      voteType: "",
    };
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postID}/vote`,
        payload
      );
      if (res.ok) {
        refreshPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const upvote = async (e) => {
    if (famed) {
      cancelVote(e);
      return;
    }

    e.preventDefault();
    const postID = post._id;
    const data = {
      voteType: "fame",
    };
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postID}/vote`,
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
    const data = {
      voteType: "lame",
    };
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postID}/vote`,
        payload
      );
      if (res.ok) {
        refreshPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    const payload = {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${post._id}`,
        payload
      );
      if (res.ok) {
        refreshPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpvoteIcon = (
    <TriangleUpIcon w={size} h={size} _hover={{ color: upvoteColor }} />
  );

  const DownvoteIcon = (
    <TriangleDownIcon w={size} h={size} _hover={{ color: downvoteColor }} />
  );

  return (
    <div className="card-container">
      <div className="post-card">
        <div className="post-vote-box">
          <IconButton
            role="group"
            onClick={upvote}
            backgroundColor="transparent"
            color={famed ? upvoteColor : "gray"}
            boxShadow="none !important"
            border="none"
            cursor="pointer"
            icon={UpvoteIcon}
          />
          <p>{post.fame_count}</p>
          <IconButton
            role="group"
            onClick={downvote}
            backgroundColor="transparent"
            color={lamed ? downvoteColor : "gray"}
            boxShadow="none !important"
            border="none"
            cursor="pointer"
            icon={DownvoteIcon}
          />
        </div>
        <div className="post-content">
          <p className="post-header">Posted by {post.creator}</p>
          <a
            className="title"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/post-page/${post._id}`);
            }}
          >
            {post.title}
          </a>
          <p className="post-text">{post.content}</p>

          <div className="card-footer">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/post-page/${post._id}`);
              }}
            >
              Comments
            </button>
            <button>Share</button>
            {isCreator ? (
              <div className="user-options">
                <button
                  className="edit"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing(true);
                  }}
                >
                  Edit
                </button>
                <button className="edit" onClick={deletePost}>
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {editing ? (
        <EditForm
          post={post}
          refreshPosts={refreshPosts}
          setEditing={setEditing}
        />
      ) : null}
    </div>
  );
};

export default PostCard;
