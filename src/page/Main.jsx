import React, {useContext, useEffect, useState} from 'react';
import "../css/main.css"
import axios from "axios";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
const Main = () => {
    const nav = useNavigate();
    const [userName,setUserName] = useState('');
    useEffect(() => {
        const JwtCookie = 'JwtCookie';
        const getJwtCookie = () => {
            return Cookies.get(JwtCookie);
        };
        const jwtCookie = getJwtCookie();
        axios.get("http://localhost:8080/api/home",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtCookie}`
            },
        })
            .then((res)=>{
                console.log(res.data);
                setUserName(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }, []);
    const chatHandler =()=>{
        nav(`/chat/${encodeURIComponent(userName)}`);
    }
    return (
        <div id={"main-background"}>
            <button id={"product-button"}>상품보기</button>
            <button onClick={chatHandler}>문의하기</button>
        </div>
    );
};

export default Main;