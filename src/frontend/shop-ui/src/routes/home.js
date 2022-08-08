import React, {useEffect, useState} from "react";
import {Loader, Menu} from "semantic-ui-react";
import {useLocation, useNavigate} from "react-router-dom"

import WishlistPage from "./wishlist-page";
import AccountDetails from "./account-page"
import CartPage from "./cart-page";
import ItemCards from "../components/item-card";

import "./home.css"
import LoginPage from "./LoginPage";
import SignUp from "./sign-up";

function Home(props) {

    const navigate = useNavigate();
    const selected = props.selected;

    const [state, setState] = useState({activeItem: selected});
    const [data, dataGetter] = useState({products: []})
    const activeItem = state.activeItem;
    const products = data.products;

    let rendered = false;
    const location = useLocation();

    function itemClicked(name) {
        // TODO: Find more or decide from the options found for the changing URLs:
        // window.history.replaceState(null, name.toLocaleUpperCase(), name)
        navigate("/" + name);
        setState({activeItem: name});
    }

    async function fetchProducts() {
        const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/products/all`);

        //Checks if the http request returns the appropiate status
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        //Return the needed data
        const data = await res.json();
        dataGetter({products: data["Products"]})
        console.log(data["Products"]);
        console.log('data fetched')
    }
    
    useEffect(() => {
        if (!rendered) {
            rendered = true;
            let promise = fetchProducts();

            console.log(location.state.id)
        }
        console.log('in use effect')

    }, []);

    function PageToRender() {
        switch (activeItem) {
            case "account":
                return <AccountDetails userID = {location.state.id}/>;
            case "wishlist":
                return <WishlistPage items={products}/>;
            case "cart":
                return <CartPage/>;
            case "sign-up":
                return <SignUp/>;
            case "login":
                return <LoginPage/>;
            default:
                return (
                    <React.Suspense fallback={<Loader content="Loading"/>}>
                        <ItemCards items={products}/>
                    </React.Suspense>
                );
        }
    }

    return (
        <>
            <Menu fixed="top" borderless size="large">
                <Menu.Item
                    active={activeItem === "home"}
                    onClick={() => itemClicked("home")}
                    position="left"
                    content="Products"
                />
                <Menu.Item
                    active={activeItem === "account"}
                    onClick={() => itemClicked("account")}
                    content="Account"
                />
                <Menu.Item
                    active={activeItem === "wishlist"}
                    onClick={() => itemClicked("wishlist")}
                    content="Wishlist"
                />
                <Menu.Item
                    active={activeItem === "cart"}
                    onClick={() => itemClicked("cart")}
                    content="Cart"
                />
            </Menu>
            <div className="content-body">
                <PageToRender/>
            </div>
        </>
    );
}

export default Home;
