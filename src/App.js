import logo from './logo.svg';
import './App.css';
import Header from "./component/Header";
import Main from "./page/Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./page/Chat";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Shop from "./page/Shop";
import AdminHome from "./adminpage/AdminHome";
import Profile from "./page/Profile";
import ItemAdd from "./page/ItemAdd";
import ItemList from "./page/ItemList";
import ItemDetail from "./page/ItemDetail"
import ItemEdit from "./page/ItemEdit";

function App() {
  return (
    <div>
        <Header></Header>
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/chat/:userName" element={<Chat/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/signup"} element={<Signup/>}/>
                    <Route path={"/shop"} element={<Shop/>}/>
                    <Route path={"/admin/*"} element={<AdminHome/>}/>
                    <Route path={"/admin/item/add"} element={<ItemAdd/>}/>
                    <Route path={"/admin/item/edit/:id"} element={<ItemEdit/>}/>
                    <Route path={"/user/profile/edit"} element={<Profile/>}/>
                    <Route path={"/items"} element={<ItemList/>}/>
                    <Route path={"/item/:itemId"} element={<ItemDetail/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;