import React from "react";

import PostCard from "../PostCard/PostCard";
import "./PostList.css";

const PostList = ({ posts, refreshPosts }) => {
  const hasPosts = posts.length > 0;
  return (
    <div className="post-list">
      {hasPosts ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} refreshPosts={refreshPosts} />
        ))
      ) : (
        <p className="no-posts">
          Nothing to see here, just an empty void, like my soul
        </p>
      )}
    </div>
  );
};

export default PostList;
