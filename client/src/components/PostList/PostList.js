import React from "react";

import PostCard from "../PostCard/PostCard";
import "./PostList.css";

const PostList = ({ posts, refreshPosts }) => {
  return (
    <div className="post-list">
      {posts &&
        posts.map((post) => (
          <PostCard key={post._id} post={post} refreshPosts={refreshPosts} />
        ))}
    </div>
  );
};

export default PostList;
