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
import SignupView from './Signup';

// To add a new view, import component to this file and add route to root.render function
const root = ReactDOM.createRoot( document.getElementById('root') );

root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginView/>} />
            <Route exact path="/UserView" element={<UserView/>} />
            <Route exact path="/Dashboard" element={<Dashboard/>} />
            <Route exact path="/Test" element={<TestView/>} />
            <Route exact path="/ShowProducts" element={<ShowProducts/>} />
            <Route exact path="/LogIn" element={<LoginView/>} />
            <Route exact path="/Signup" element={<SignupView/>} />
            <Route exact path="/IvanView" element={<IvanView/>} />

        </Routes>
    </BrowserRouter>
);