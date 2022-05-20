import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import MenuBar from "./MenuBar/MenuBar";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";
import Footer from "./Footer";
import Products from "./Product/Products";
import Product from "./Product/Product";
import AdminNav from "./Admin/AdminNav";
import Admin from './Admin/Admin';
import ForgotPassword from "./ForgotPassword";
import CreateAccount from "./CreateAccount";
import Cart from "./Cart/Cart";
import ViewOrders from "./Admin/ViewOrders";
import EditOrder from "./Admin/EditOrder";
import DeleteOrder from "./Admin/DeleteOrder";
import DeleteUser from "./Admin/DeleteUser";
import DeleteProduct from "./Admin/DeleteProduct";
import EditProduct from "./Admin/EditProduct";
import AddProduct from "./Admin/AddProduct";
import Profile from "./Product/Profile";
import Likes from "./Likes/Likes";
import Orders from "./Orders/Orders";
import Order from "./Orders/Order";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            {/*Signed Off*/}
            <Route path="/" element={<LogIn/>}/>
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
            <Route path='/CreateAccount' element={<CreateAccount/>}/>

            {/*USER ROUTES*/}
            <Route path="/Profile/:id" element={<div><MenuBar/><Profile/></div>}/>
            <Route exact path="/Products" element={<div><MenuBar/><Products/><Footer/></div>}/>
            {/*
            <Route exact path="/Product" element={<div><MenuBar/><Product/></div>}/>
*/}
            {/*
            <Route       path="/Product/:id" element={<div><MenuBar/><Product/></div>}/>
*/}

            <Route path="/Products/:id" element={<div><MenuBar/><Product/></div>}/>

            <Route       path="/User/:user_id/Cart" element={<div><MenuBar/><Cart /></div>}/>
            <Route       path="/User/:user_id/Likes" element={<div><MenuBar/><Likes /></div>}/>
            <Route       path="/User/:user_id/Orders" element={<div><MenuBar/><Orders/></div>}/>
            <Route       path="/User/:user_id/Order/:order_id" element={<div><MenuBar/><Order/></div>}/>
            <Route exact path="/Dashboard" element={<div><MenuBar/><Dashboard/></div>}/>

            {/*ADMIN ROUTES*/}
            <Route exact path="/Admin/Products" element={<div><AdminNav/><Products/></div>}/>
            <Route exact path="/Admin/Product" element={<div><AdminNav/><Product/></div>}/>
            <Route exact path="/Admin/Cart" element={<AdminNav/>}/>
            <Route exact path="/Admin/Likes" element={<AdminNav/>}/>
            <Route exact path="/Admin/Orders" element={<div><AdminNav/><Products/></div>}/>
            <Route exact path="/Admin/Dashboard" element={<div><AdminNav/><Dashboard/></div>}/>

            {/*ADMIN ACTION ROUTES*/}
            <Route exact path="/Admin" element={<div><AdminNav/><Admin/></div>}/>
            <Route exact path="/Admin/Orders/View" element={<div><AdminNav/><ViewOrders/></div>}/>
            <Route exact path="/Admin/Orders/Edit" element={<div><AdminNav/><EditOrder/></div>}/>
            <Route exact path="/Admin/Orders/Delete" element={<div><AdminNav/><DeleteOrder/></div>}/>
            <Route exact path="/Admin/User/Delete" element={<div><AdminNav/><DeleteUser/></div>}/>
            <Route exact path="/Admin/Product/Add" element={<div><AdminNav/><AddProduct/></div>}/>
            <Route exact path="/Admin/Product/Edit" element={<div><AdminNav/><EditProduct/></div>}/>
            <Route exact path="/Admin/Product/Delete" element={<div><AdminNav/><DeleteProduct/></div>}/>

        </Routes>
    </BrowserRouter>
);
