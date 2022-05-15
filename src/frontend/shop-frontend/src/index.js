import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import HomePage from "./HomePage";
import UserView from "./UserView";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";
import Footer from "./Footer";
import Products from "./Products";
import {Divider} from "semantic-ui-react";
import Product from "./Product";
import Cart from "./Cart/Cart";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route exact path="/Home" element={<HomePage/>}/>
            <Route exact path="/UserView" element={<UserView/>}/>
            <Route exact path="/Products" element={<div><UserView/><Products/></div>}/>
            <Route exact path="/Product" element={<div><UserView/> <Product/></div>}/>
            <Route exact path="/Cart" element={<div><UserView/><Cart /></div>}/>
            <Route exact path="/Likes" element={<UserView/>}/>
            <Route exact path="/Orders" element={<div><UserView/><Products/></div>}/>
            <Route exact path="/Dashboard" element={<div><UserView/><Dashboard/></div>}/>

        </Routes>
    </BrowserRouter>
);
