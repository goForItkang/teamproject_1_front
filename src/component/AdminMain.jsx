import React from 'react';
import "../css/adminMain.css"
import {Route, Routes} from "react-router-dom";
import AdminShop from "./AdminShop";
import AdminChat from "../adminpage/AdminChat";
import AdminUsers from "./AdminUsers";
import AdminUserInfo from "./AdminUserInfo";
const AdminMain = () => {
    return (
        <div id={"adminMain-div"}>
            <Routes>
                <Route path={"/item/:urlType"} element={<AdminShop/>}/>
                <Route path={"/chatlist"} element={<AdminChat/>}/>
                <Route path={"/users/:urlType"} element={<AdminUsers/>}/>
                <Route path={"/userInfo/:id"} element={<AdminUserInfo/>}/>
            </Routes>
        </div>
    );
};

export default AdminMain;