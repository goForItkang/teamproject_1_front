import React, {useEffect, useState} from 'react';
import "../css/header.css"
import axios from "axios";
import {getItem} from "../api/ItemApi";
import Cookies from "js-cookie";
import MainHomeMenu from "./MainHomeMenu";
import {useNavigate} from "react-router-dom";
const Header = () => {
    const JwtCookie = 'JwtCookie';
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const nav = useNavigate();
    const jwtCookie = getJwtCookie();
    const [searchData,setSearchData] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
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
    useEffect(() => {
        const timer = setTimeout(()=>{
            setDebouncedSearch(searchData);
        },500)
        return () => clearTimeout(timer);
    }, [searchData]);

    useEffect(() => {
        if(searchData.length>0){
            axios.get(`http://localhost:8080/api/search/${debouncedSearch}`,
                {
                    headers : {
                     "Content-Type" : "application/json",
                     Authorization : `Bearer ${jwtCookie}`
                    }
                }
                )
                .then((res)=>{
                    console.log(res.data);
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }, [debouncedSearch]);
    const pageHandler = (path)=>{
      nav(`/${path}`);
    }
    return (
        <header id={"Header"}>
            <div id={"header-logo-div"}>
                <img src="/images/main-logo.png" alt="mainLogo"/>
            </div>
            <div id={"header-mid-div"}>
            <div id={"header-search-div"}>
                <input type="text" placeholder={"상품을 입력해주세요"}
                       onChange={(e)=>setSearchData(e.target.value)}/>
                <div id={"search-icon"}>
                    <img src="/images/icon%20_Search_.png" alt="dd"/>
                </div>
            </div>
            </div>
            <div id={"header-sub"}>
                <button className={"main-home-button"} onClick={() => pageHandler("signup")}>
                    <img src="/images/icon%20_Person_%20.png" alt=""/>
                    <p>로그인</p>
                </button>
                <button className={"main-home-button"}>
                    <img src="/images/icon%20_Cart_.png" alt=""/>
                    <p>장바구니</p>
                </button>
                <button className={"main-home-button"} >
                    <img src="/images/Group.png" alt=""/>
                    <p>문의</p>
                </button>
            </div>
        </header>
    );
};

export default Header;