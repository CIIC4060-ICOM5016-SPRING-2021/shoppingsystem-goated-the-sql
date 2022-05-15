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
import ForgotPassword from "./ForgotPassword";
import CreateAccount from "./CreateAccount";
import Cart from "./Cart/Cart";
import ViewOrders from "./ViewOrders";
import EditOrder from "./EditOrder";
import DeleteOrder from "./DeleteOrder";
import DeleteUser from "./DeleteUser";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import Profile from "./Profile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            {/*Signed Off*/}
            <Route path="/" element={<LogIn/>}/>
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
            <Route path='/CreateAccount' element={<CreateAccount/>}/>

            {/*USER ROUTES*/}
            <Route exact path="/Profile" element={<div><UserView/><Profile/></div>}/>
            <Route exact path="/Products" element={<div><UserView/><Products/></div>}/>
            <Route exact path="/Product" element={<div><UserView/><Product/></div>}/>
            <Route exact path="/Cart" element={<UserView/>}/>
            <Route exact path="/Likes" element={<UserView/>}/>
            <Route exact path="/Orders" element={<div><UserView/><Products/></div>}/>
            <Route exact path="/Dashboard" element={<div><UserView/><Dashboard/></div>}/>

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
