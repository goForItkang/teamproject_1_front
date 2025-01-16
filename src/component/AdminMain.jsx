import React from 'react';
import "../css/adminMain.css"
import {Route, Routes} from "react-router-dom";
import AdminShop from "./AdminShop";
import AdminChat from "../adminpage/AdminChat";
const AdminMain = () => {
    return (
        <div id={"adminMain-div"}>
            <Routes>
                <Route path={"/item/:urlType"} element={<AdminShop/>}/>
                <Route path={"/chatlist"} element={<AdminChat/>}/>
            </Routes>
        </div>
    );
};

export default AdminMain;