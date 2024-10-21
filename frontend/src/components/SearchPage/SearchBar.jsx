import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; 

const SearchBar = ({ modifier }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className={`search-container ${modifier}`}>
            <input
                type="text"
                className="search-container__input"
                placeholder="Try to search~"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                }}
            />
            <button className="search-container__button" onClick={handleSearch}>
                🔍
            </button>
        </div>
    );
};

export default SearchBar;
