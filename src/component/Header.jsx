import React, {useEffect} from 'react';
import "../css/header.css"
import axios from "axios";
import {getItem} from "../api/ItemApi";
import Cookies from "js-cookie";
const Header = () => {
    const JwtCookie = 'JwtCookie';
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const jwtCookie = getJwtCookie();
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/header", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtCookie}`,
                    },
                });
                localStorage.setItem("role", response.data);
                console.log(localStorage.getItem("role"));
            } catch (err) {
                console.error("Header API 호출 오류:", err);
            }
        };

        fetchRole();
    }, []); // 빈 배열로 의존성을 제거해 최초 1회만 실행

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