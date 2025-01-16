import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";

const AdminChat = () => {
    const JwtCookie = 'JwtCookie';
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const [chatList,setChatList] = useState([]);
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
            
        </div>
    );
};

export default AdminChat;