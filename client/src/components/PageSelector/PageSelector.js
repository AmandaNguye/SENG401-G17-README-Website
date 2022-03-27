import React from "react";

import "./PageSelector.css";

const PageSelector = ({ pageNo, nextPage, prevPage, hasPosts }) => {
  const isNotFirstPage = pageNo !== 0;
  return (
    <div>
      {isNotFirstPage && (
        <button className="leftBtn" type="button" onClick={prevPage}>
          Previous Page
        </button>
      )}
      {hasPosts && (
        <button className="rightBtn" type="button" onClick={nextPage}>
          Next Page
        </button>
      )}
    </div>
  );
};

export default PageSelector;
