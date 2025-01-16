import React, {useEffect} from 'react';
import axios from "axios";
import Cookies from "js-cookie";

import "../css/adminHome.css";
import AdminNav from "../component/AdminNav";
import AdminMain from "../component/AdminMain";

//관리자 메인 페이지
const AdminHome = () => {
    const JwtCookie = 'JwtCookie';
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const jwtCookie = getJwtCookie();


    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/home",
            {
                headers : {
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${jwtCookie}`
                },
            }
        )

            .then((res)=>{
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }, []);
    return (
        <div id={"adminHome-div"}>
            <AdminNav></AdminNav>
            <AdminMain />
        </div>
    );
};

export default AdminHome;