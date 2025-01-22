import React from 'react';

const PageBar = ({totalData,currentPage,size,onPageChange}) => {
    const outputPage = 10;
    const totalPages = Math.ceil(totalData/size);
    const startPage = Math.floor((currentPage-1)/outputPage)*outputPage+1;
    const endPage = Math.min(startPage+(outputPage-1),totalPages);

    const pageButtons = [];
    for(let i =startPage; i<=endPage; i++){
        pageButtons.push(
            <button key={i}
                onClick={()=>onPageChange(i)}
            >
                {i}
            </button>
        )
    }
    return (
        <div>
            {pageButtons}
        </div>
    )

};

export default PageBar;