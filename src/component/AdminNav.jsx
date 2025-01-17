import React from 'react';
import {Link} from "react-router-dom";
import "../css/adminNav.css"
const AdminNav = () => {
    return (
        <nav id={"admin-nav"}>
            <div className={"admin-home-div"}>
                <li className={"admin-home-li"}><Link to={"/admin"}>매출 현황</Link></li>
                <div>
                    <ul><Link>월별 매출</Link></ul>
                    <ul><Link>년도 매출</Link></ul>
                </div>
            </div>
            <div className={"admin-home-div"}>
                <li className={"admin-home-li"}><Link to={"/admin"}>상품</Link></li>
                <div>
                    <ul><Link to={"/admin/item/register"}>등록</Link></ul>
                    <ul><Link to={"/admin/item/find"}>조회</Link></ul>
                    <ul><Link to={"/admin/item/delete"}>삭제</Link></ul>
                </div>
            </div>
            <div className={"admin-home-div"}>
                <li><Link to={"/admin"}>회원</Link></li>
                <div>
                    <ul><Link to={"/admin/users/select"}>조회</Link></ul>
                    <ul><Link to={"/admin/users/blacklists"}>블랙 리스트 목록</Link></ul>
                </div>
            </div>
            <div className={"admin-home-div"}>
                <li><Link to={"/admin"}>배송지</Link></li>
                <div>
                    <ul><Link to={"/admin/delivery"}>배송지 변경</Link></ul>
                </div>
            </div>
            <div className={"admin-home-div"}>
                <li><Link to={"/admin/chatlist"}>문의</Link></li>
            </div>
        </nav>
    );
};

export default AdminNav;