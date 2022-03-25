import React, { useState, useEffect } from "react";

import "./PostForm.css";

const PostForm = ({ refreshPosts, setForm }) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");

  const resetForm = () => {
    setTitle("");
    setTag("");
    setContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      content: content,
      tag: tag,
    };

    try {
      await fetch("http://localhost:5005/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newPost),
      });
      resetForm();
      refreshPosts();
      setForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <form className="grid-settings" onSubmit={handleSubmit}>
        <div id="title">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="inputID"
            placeholder="Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div id="tag">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            id="inputID"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        <div id="content">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="inputID"
            placeholder="Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div id="submit">
          <button type="submit">Post</button>
          <button
            className="closeBtn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setForm(false);
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
