import React from "react";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";

import LoginPage from "./LoginPage";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import SignUp from "./routes/sign-up";
import Home from "./routes/home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>

                <Route path="/home" element={<Home selected="home"/>}/>
                <Route path="/account" element={<Home selected="account"/>}/>
                <Route path="/wishlist" element={<Home selected="wishlist"/>}/>
                <Route path="/cart" element={<Home selected="cart"/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
