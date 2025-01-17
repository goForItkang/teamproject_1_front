import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";

const AdminChat = () => {
    const JwtCookie = 'JwtCookie';
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const [chatList,setChatList] = useState(['']);
    const jwtCookie = getJwtCookie();
    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/chatlist",{
            headers : {
                "Content-Type" : "application/json",
                'Authorization': `Bearer ${jwtCookie}`
            }
        }).then((res)=>{
            console.log(res.data);
            setChatList(res.data);
        }).catch(err=>{
            console.log(err);
        })
    }, []);
    return (
        <div>
            {chatList.length>0 ? (
                <div>
                    {chatList.map((userName,index)=>(
                        <Link to={`/chat/${encodeURIComponent("username: "+userName)}`}>{userName}</Link>
                    ))}
                </div>
            ):(<p>문의 내역이 없습니다 </p>)}
        </div>
    );
};

export default AdminChat;