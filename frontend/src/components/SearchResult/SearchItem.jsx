import React from "react";
import "./SearchItem.css";

const SearchItem = ({ title, description, url }) => {
  return (
    <div className="search-item">
      <a className="search-item__link" href={url} target="_blank" rel="noopener noreferrer">
        <h2 className="search-item__title">{title}</h2>
      </a>
      <p className="search-item__description">{description}</p>
    </div>
  );
};

export default SearchItem;
