import React from "react";

const PostCard = ({ post, refreshPosts }) => {
  const upvote = async () => {};

  const downvote = async () => {};

  return (
    <div className="post-card">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.fame_count}</p>

      <div className="card-footer">
        <button className="fame" onClick={upvote}>
          Fame
        </button>
        <button className="lame" onClick={downvote}>
          Lame
        </button>
      </div>
    </div>
  );
};

export default PostCard;
