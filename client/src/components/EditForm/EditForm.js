import React, { useState } from "react";

import "./EditForm.css";

const EditForm = ({ post, refreshPosts, setEditing }) => {
  const [title, setTitle] = useState(post.title);
  const [tag, setTag] = useState(post.tag);
  const [content, setContent] = useState(post.content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      content: content,
      tag: tag,
    };
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ update: newPost }),
      });
      refreshPosts();
      setEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
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
                setEditing(false);
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
