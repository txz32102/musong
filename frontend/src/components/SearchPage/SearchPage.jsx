import React from 'react';
import './SearchPage.css'; // Assuming you'll create a CSS file for styles

const SearchPage = () => {
    return (
        <div className="search-page">
            <div className="logo">musong</div>
            <div className="search-bar">
                <input type="text" placeholder="Search Google or type a URL" />
                <button>🔍</button>
            </div>
        </div>
    );
};

export default SearchPage;
