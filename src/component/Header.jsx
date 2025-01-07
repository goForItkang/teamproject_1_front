import React from 'react';
import "../css/header.css"
const Header = () => {
    return (
        <header id={"Header"}>
            <div id={"header-logo"}>Health-shop</div>
            <div id={"header-sub"}>
                <p>로그인</p>
                <p><span className="material-symbols-outlined">shopping_cart</span></p>
            </div>
        </header>
    );
};

export default Header;