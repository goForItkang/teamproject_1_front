import React, {useContext, useEffect, useState} from 'react';
import "../css/main.css"
import axios from "axios";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import MainHomeMenu from "../component/MainHomeMenu";
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
    } // header에 넣을것 - 수정
    return (
        <div id={"main-background"}>
            <div id={"main-home-menu-div"}>
                <div className={"health-menu"}>
                    <button>운동 기구</button>
                </div>
                <div className={"health-menu"}>
                    <button>헬스 의류 & 액세서리</button>
                </div>
                <div className={"health-menu"}>
                    <button>영양제 & 보충제</button>
                </div>
                <div className={"health-menu"}>
                    <button>홈트레이닝 용품</button>
                </div>
                <div className={"health-menu"}>
                    <button>스포츠 음료 & 간식</button>
                </div>

            </div>
            <div id={"main-home-text"}>
                <p>The Real Value of Health,</p>
                <p>Health Products.</p>
            </div>
        </div>
    );
};

export default Main;