import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
// Imports for view files
import UserView from "./UserView";
import Dashboard from "./Dashboard";
import TestView from "./Test";
import ShowProducts from "./ShowProducts";
import IvanView from "./IvanView";
import LoginView from "./Login";


const root = ReactDOM.createRoot( document.getElementById('root') );

root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<IvanView/>} />
            <Route exact path="/UserView" element={<UserView/>} />
            <Route exact path="/Dashboard" element={<Dashboard/>} />
            <Route exact path="/Test" element={<TestView/>} />
            <Route exact path="/ShowProducts" element={<ShowProducts/>} />
            <Route exact path="/LogIn" element={<LoginView/>} />

        </Routes>
    </BrowserRouter>
);