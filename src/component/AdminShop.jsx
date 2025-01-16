import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AdminShop = () => {
    const parameter = useParams();
    const [info,setInfo] = useState('');
    console.log("파리미터값",parameter.urlType);
    const JwtCookie = 'JwtCookie';
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const jwtCookie = getJwtCookie();
    useEffect(() => {
        if(parameter.urlType === 'find'){
            axios.get("http://localhost:8080/api/admin/item/find",{
                headers : {
                    "Content-Type" : "application/json",
                    'Authorization': `Bearer ${jwtCookie}`
                },
            })
                .then((res)=>{
                    console.log(res.data);
                    setInfo('조회');
                })
                .catch(err=>{
                    console.log(err);
                })
        }else{

        }
    }, []);
    return (
        <div>
            <div>{info}</div>
        </div>
    );
};

export default AdminShop;