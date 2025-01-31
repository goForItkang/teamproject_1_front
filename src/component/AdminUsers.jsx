import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {getJwt} from "../utils/Jwt";
import {useNavigate} from "react-router-dom";

const AdminUsers = () => {
    const size = 3;
    const [currentPage,setCurrentPage] = useState(1);
    const [totalData,setTotalData] = useState(0) // 전체 데이터
    const [users,setUsers] = useState([]);
    const JwtCookie = 'JwtCookie';
    const navigate = useNavigate();
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const btnhandler = (id)=>{
        navigate(`/admin/userinfo/${id}`);
    }
    const jwtCookie = getJwtCookie();
    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/users/findAll",{
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${jwtCookie}`

            },
            params : {
                size : size,
                page : currentPage
            }
        })
            .then((res)=>{
                setUsers(res.data.userData);
                console.log("유저 정보",res.data.userData);
                console.log("사람 전체수",res.data.count);
                setTotalData(res.data.count); // 전체 데이털르 가져와야함
            })
    }, []);
    return (
        <div>

            {users.map((item)=>(
                <li key={item.id}>
                    <h3>이메일 : {item.email}</h3>
                    <p>이름 : {item.username}</p>
                    <button onClick={()=>btnhandler(item.id)}>조회</button>
                </li>
            ))}
        </div>
    );
};

export default AdminUsers;