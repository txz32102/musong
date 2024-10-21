import React from 'react';
import SearchBar from '../SearchPage/SearchBar';
import SearchItem from './SearchItem'; // Make sure the path is correct
import SearchFooter from './SearchFooter';

const SearchResult = () => {
    const searchItems = [
        {
            title: "Item 1",
            description: "Description for item 1",
            url: "https://example.com/item1"
        },
        {
            title: "Item 2",
            description: "Description for item 2",
            url: "https://example.com/item2"
        },
        // Add more items as needed
    ];

    return (
        <div>
            <SearchBar modifier="search-container--page" />
            <div className="search-results">
                {searchItems.map((item, index) => (
                    <SearchItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        url={item.url}
                    />
                ))}
            </div>
            <SearchFooter/>
        </div>
    );
};

export default SearchResult;
