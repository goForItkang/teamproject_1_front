import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";

const RoseApi = () => {
    const [role,setRoes] = useState('');
    const JwtCookie = 'JwtCookie';
    const getJwtCookie = () => {
        return Cookies.get(JwtCookie);
    };
    const jwtCookie = getJwtCookie();
    console.log(jwtCookie);

    useEffect(() => {
        axios.get("http://localhost:8080/api/roles",{
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${jwtCookie}`
        })
            .then((res)=>{
                console.log(res.data);
            })
    }, []);
    return role;
};

export default RoseApi;