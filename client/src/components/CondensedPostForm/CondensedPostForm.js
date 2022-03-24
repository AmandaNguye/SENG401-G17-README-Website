import React from "react";

import "./CondensedPostForm.css";

const CondensedPostForm = ({ setForm }) => {
  return (
    <a
      className="condensed-container"
      onClick={(e) => {
        e.preventDefault();
        setForm(true);
      }}
    >
      <div className="text-box">Create a Post</div>
    </a>
  );
};

export default CondensedPostForm;
