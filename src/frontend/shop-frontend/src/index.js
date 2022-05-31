import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
// Imports for view files
import HomePage from "./HomePage";
import UserView from "./UserView";
import Dashboard from "./Dashboard";
import TestView from "./Test";
import LoginView from "./Login";


const root = ReactDOM.createRoot( document.getElementById('root') );
root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/Home" element={<HomePage/>} />
            <Route exact path="/UserView" element={<UserView/>} />
            <Route exact path="/Dashboard" element={<Dashboard/>} />
            <Route exact path="/Test" element={<TestView/>} />
            <Route exact path="/LogIn" element={<LoginView/>} />
        </Routes>
    </BrowserRouter>
);