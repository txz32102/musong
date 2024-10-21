import React from 'react';
import SearchBar from './SearchBar';
import './SearchPage.css';

const SearchPage = () => {
    return (
        <div className="search-page">
            <div className="logo">musong</div>
            <SearchBar modifier="search-container--page" />
        </div>
    );
};

export default SearchPage;
