import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { IconButton } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import Comment from "../Comment/Comment";
import "./PostPage.css";

const PostPage = () => {
  let user;
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [numComments, setNumComments] = useState(5);
  const [text, setText] = useState("");
  const { id } = useParams();

  const loadPost = async () => {
    const payload = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${id}`,
        payload
      );
      const posts = await res.json();
      setPost(posts);
    } catch (err) {
      console.error(err);
    }
  };

  const loadComment = async () => {
    const payload = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${id}/comments?limit=99`,
        payload
      );
      const comments = await res.json();
      setComments(comments);
    } catch (err) {
      console.error(err);
    }
  };

  const loadUsername = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/isUserAuth`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      user = await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPost();
    loadComment();
    loadUsername();
  }, []);

  const { content, creator, fame_count, famed, lamed, tag, title } = post;

  const CommentObjects = comments
    .map((e) => (
      <Comment key={e._id} comment={e} refreshComments={loadComment}></Comment>
    ))
    .slice(0, numComments);

  const loadMoreComments = () => {
    setNumComments((prevNum) => prevNum + 5);
  };

  const cancelVote = async (e) => {
    e.preventDefault();
    const postID = id;
    const data = {
      voteType: "",
    };
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postID}/vote`,
        payload
      );
      if (res.ok) {
        loadPost();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const upvote = async (e) => {
    if (famed) {
      cancelVote(e);
      return;
    }

    e.preventDefault();
    const postID = id;
    const data = {
      voteType: "fame",
    };
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postID}/vote`,
        payload
      );
      if (res.ok) {
        loadPost();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const downvote = async (e) => {
    if (lamed) {
      cancelVote(e);
      return;
    }

    e.preventDefault();
    const postID = id;
    const data = {
      voteType: "lame",
    };
    const payload = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postID}/vote`,
        payload
      );
      if (res.ok) {
        loadPost();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UpvoteIcon = (
    <TriangleUpIcon w={20} h={20} _hover={{ color: "#644aff" }} />
  );

  const DownvoteIcon = (
    <TriangleDownIcon w={20} h={20} _hover={{ color: "#ffd25e" }} />
  );

  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault();
    const payload = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        content: text,
      }),
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${id}/comments`,
        payload
      );
      if (res.ok) {
        loadComment();
      }
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <section className="page__content">
        <h3 className="page__content__title">{title}</h3>
        <p className="page__content__body">{content}</p>
        <div className="page__content__famelame">
          <IconButton
            icon={UpvoteIcon}
            backgroundColor="transparent"
            boxShadow="none !important"
            border="none"
            cursor="pointer"
            color={famed ? "#644aff" : "gray"}
            onClick={upvote}
          ></IconButton>
          <div
            className="page__content__famelame__famecount"
            style={{ color: fame_count >= 0 ? "#b2a5ff" : "#ffd25e" }}
          >
            {fame_count}
          </div>
          <IconButton
            icon={DownvoteIcon}
            backgroundColor="transparent"
            boxShadow="none !important"
            border="none"
            cursor="pointer"
            color={lamed ? "#ffd25e" : "gray"}
            onClick={downvote}
          ></IconButton>
        </div>
        <div
          className={
            fame_count >= 0 ? "page__metadata famed" : "page__metadata lamed"
          }
        >
          <div className="page__metadata__creator">
            &lt;author&gt; {creator} &lt;/author&gt;
          </div>
          <div className="page__metadata__tag">
            &lt;tag&gt; {tag} &lt;/tag&gt;
          </div>
        </div>
      </section>
      <section className="page__comments">
        <form className="page__comments__top" onSubmit={handleSubmit}>
          <h3 className={"page__comments__top__title"}>C O M M E N T S</h3>
          <textarea
            type="text"
            maxLength={200}
            className="page__comments__top__input"
            placeholder="Enter comment here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="page__comments__top__input__submit">
            char count: {text.length}
            <input type="submit" />
          </div>
        </form>
        <ul className="page__comments__commentlist">{CommentObjects}</ul>
        {comments.length > numComments && (
          <div className="page__comments__loadmore" onClick={loadMoreComments}>
            <h3>LOAD MORE</h3>
            <TriangleDownIcon />
          </div>
        )}
      </section>
    </div>
  );
};

export default PostPage;
