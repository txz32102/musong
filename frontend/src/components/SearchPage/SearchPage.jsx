import React from 'react';
import axios from 'axios';
import './SearchPage.css';

console.log("hello world");

function GetUrls() {
  var urls;
  axios.get('http://localhost:8000/test')
  .then(function (response) {
    // handle success
    console.log("from test");
    console.log(response.data["websites"]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
    return (
      <div ClassName="App">
        <p>this is a App function</p>
      </div>
    )
  }

var res = GetUrls();

console.log(res);

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
