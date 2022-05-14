import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import UserView from "./UserView";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";
import Footer from "./Footer";
import Products from "./Products";
import Product from "./Product";
import AdminNav from "./AdminNav";
import Admin from './Admin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LogIn/>}/>

            <Route exact path="/Products" element={<div><UserView/><Products/></div>}/>
            <Route exact path="/Product" element={<div><UserView/><Product/></div>}/>
            <Route exact path="/Cart" element={<UserView/>}/>
            <Route exact path="/Likes" element={<UserView/>}/>
            <Route exact path="/Orders" element={<div><UserView/><Products/></div>}/>
            <Route exact path="/Dashboard" element={<div><UserView/><Dashboard/></div>}/>

            {/*ADMIN ROUTES*/}
            <Route exact path="/Admin" element={<div><AdminNav/><Admin/></div>}/>

            <Route exact path="/Admin/Products" element={<div><AdminNav/><Products/></div>}/>
            <Route exact path="/Admin/Product" element={<div><AdminNav/><Product/></div>}/>
            <Route exact path="/Admin/Cart" element={<AdminNav/>}/>
            <Route exact path="/Admin/Likes" element={<AdminNav/>}/>
            <Route exact path="/Admin/Orders" element={<div><AdminNav/><Products/></div>}/>
            <Route exact path="/Admin/Dashboard" element={<div><AdminNav/><Dashboard/></div>}/>

        </Routes>
    </BrowserRouter>
);
