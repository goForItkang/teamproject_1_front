import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        onSearch(inputValue); // 부모 컴포넌트에 검색어 전달
    };

    return (
        <div id="search-div">
            <span className="material-symbols-outlined">search</span>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="검색어를 입력하세요"
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default Search;
