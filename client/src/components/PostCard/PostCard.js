import React from "react";
import { useNavigate } from "react-router";
import { IconButton } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

import "./PostCard.css";

const PostCard = ({ post, refreshPosts }) => {
  const navigate = useNavigate(); // for title link, comment link, etc.
  const famed = post.famed;
  const lamed = post.lamed;

  const size = 20;
  const upvoteColor = "#644aff";
  const downvoteColor = "#ffd25e";

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

  const UpvoteIcon = (
    <TriangleUpIcon w={size} h={size} _hover={{ color: upvoteColor }} />
  );

  const DownvoteIcon = (
    <TriangleDownIcon w={size} h={size} _hover={{ color: downvoteColor }} />
  );

  return (
    <div className="container">
      <div className="post-card">
        <div className="vote-box">
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
          <a
            className="title"
            onClick={(e) => {
              e.preventDefault();
              console.log(`post ${post._id} clicked`);
            }}
          >
            {post.title}
          </a>
          <p className="post-text">{post.content}</p>

          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
