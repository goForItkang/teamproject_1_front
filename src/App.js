import logo from './logo.svg';
import './App.css';
import Header from "./component/Header";
import Main from "./page/Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
        <Header></Header>
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Main />} />
                    <Route path={"/chat"}/>
                    <Route path={"/login"}/>
                    <Route path={"/signup"}/>
                    <Route path={"/shop"}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;