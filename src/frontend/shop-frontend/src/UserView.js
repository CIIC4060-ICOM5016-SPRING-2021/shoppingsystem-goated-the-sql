import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Icon, Input, Menu, MenuItem, Modal, Tab} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import Products from "./Products";
import './UserView.css';
import {Link} from "react-router-dom";


function UserView() {

    const [active, setActive] = useState('Products')

    const goProduct = () => {
        setActive('Products');
    }
    const goDash = () => {
        setActive('Dashboard');
    }
    const goLikes = () => {
        setActive('Likes');
    }
    const goCart = () => {
        setActive('Cart');
    }
    const goOrders = () => {
        setActive('Orders');
    }


    return <div className={'behindNav'}>
        <div className={'nav'}>
            <Menu stackable>
                <Menu.Item
                    as={Link}
                    color={'blue'}
                    to='/Dashboard'
                    name='Products'
                    active={active === 'Dashboard'}
                    link='true'
                    onClick={goDash}
                    className={'item'}
                >
                    Dashboard
                </Menu.Item>
                <Menu.Item header> Goat & co </Menu.Item>
                <Menu.Item
                    position={'right'}
                    as={Link}
                    color={'blue'}
                    to='/Products'
                    name='Products'
                    active={active === 'Products'}
                    link='true'
                    onClick={goProduct}
                >
                    Products
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    color={'blue'}
                    to='/Likes'
                    name='Products'
                    active={active === 'Likes'}
                    link='true'
                    onClick={goLikes}
                >
                    Likes
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    color={'blue'}
                    to='/Cart'
                    name='Cart'
                    active={active === 'Cart'}
                    link='true'
                    onClick={goCart}
                >
                    Cart
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    color={'blue'}
                    to='/Orders'
                    name='Orders'
                    active={active === 'Orders'}
                    link='true'
                    onClick={goOrders}
                >
                    Orders
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    color={'red'}
                    to='/'
                    name='Log Out'
                    active={active === 'Log Out'}
                    link='true'
                    onClick={goOrders}
                >
                    Log Out
                </Menu.Item>
            </Menu>
        </div>
    </div>


}

export default UserView;
