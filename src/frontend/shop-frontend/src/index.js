import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import HomePage from "./HomePage";
import UserView from "./UserView";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Products from "./Products";
import {Divider} from "semantic-ui-react";


const root = ReactDOM.createRoot( document.getElementById('root') );
//const top = ReactDOM.createRoot( document.getElementById('top') );

root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/Home" element={<HomePage/>} />
            <Route exact path="/Products" element={<div><UserView/><Divider /> <Products /> </div>} />
            <Route exact path="/Cart" element={<UserView/> }/>
            <Route exact path="/Likes" element={<UserView/>} />
            <Route exact path="/Orders" element={<div><UserView/><Divider /> <Products /> </div>} />
            <Route exact path="/Dashboard" element={<div><UserView/><Divider /><Dashboard /></div>} />

        </Routes>
    </BrowserRouter>
);
/*
top.render(<div>
        <Footer/>
</div>

);*/
