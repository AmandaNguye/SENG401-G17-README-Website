import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

import EditForm from "../EditForm/EditForm";

import "./PostCard.css";

const PostCard = ({ post, refreshPosts }) => {
  const navigate = useNavigate(); // for title link, comment link, etc.
  const [isCreator, setIsCreator] = useState(false);
  // const [confirmDel, setConfirmDel] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const isLong = post.content.length > 500;
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

  // const toggleCopy = () => {
  //   setCopied(true);

  //   setCopied(false);
  // };

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
          <p className="post-header">
            Posted by {post.creator}
            {post.tag ? <span className="tag"> #{post.tag}</span> : null}
          </p>
          <a
            className="title"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/post-page/${post._id}`);
            }}
          >
            {post.title}
          </a>
          <p className="post-text">
            {showMore ? post.content : post.content.substring(0, 500)}
            {isLong ? (
              <button
                className="show-more"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "See less" : "...See more"}
              </button>
            ) : null}
          </p>

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
            {/* <CopyToClipboard
              text={`${process.env.REACT_APP_URL}/post-page/${post._id}`}
              onCopy={() => {
                setCopied(true);
              }}
            >
              <button type="button">Share</button>
            </CopyToClipboard>
            {copied ? <p className="fade-out">Copied!</p> : null} */}
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
