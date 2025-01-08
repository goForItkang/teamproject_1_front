import logo from './logo.svg';
import './App.css';
import Header from "./component/Header";
import Main from "./page/Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./page/Chat";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Shop from "./page/Shop";

function App() {
  return (
    <div>
        <Header></Header>
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Main />} />
                    <Route path={"/chat"} element={<Chat/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/signup"} element={<Signup/>}/>
                    <Route path={"/shop"} element={<Shop/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;