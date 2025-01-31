import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AdminUserInfo = () => {
    const pathName=  useLocation().pathname;
    const jwtCookie =  Cookies.get('JwtCookie');
    const [userInfo,setUserInfo]  = useState(null);// 수정 필요 결재 내역도 봐야함
    useEffect(() => {
        axios.get(`http://localhost:8080/api${pathName}`,{
            headers : {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${jwtCookie}`
            },
        })
            .then((res)=>{
                setUserInfo(res.data);
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
        }, [pathName]);
        const getRoleName = (role) => {
        if (role === "ADMIN") return "관리자";
        if (role === "USER") return "일반 사용자";
        return "알 수 없음"; // 혹시 다른 값이 올 경우 대비
    };
    return (
        <div>
            {
                userInfo ? (
                    <div>
                    <p>아이디 : {userInfo.email}</p>
                    <p>이름 : {userInfo.username}</p>
                    <p>전화번호 : {userInfo.phoneNumber}</p>
                        <div>
                            <p>권한 :{getRoleName(userInfo.role)}</p>
                            <button>권한 변경</button>
                        </div>
                    </div>
                    )


                    :(<p>사용자 정보를 불러오는 중입니다</p>)
            }
        </div>
    );
};

export default AdminUserInfo;