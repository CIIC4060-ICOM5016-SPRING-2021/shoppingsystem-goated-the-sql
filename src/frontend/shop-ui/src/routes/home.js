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

    const location = useLocation();

    const [state, setState] = useState({activeItem: selected});
    const [data, dataGetter] = useState({products: []})
    const [user, userGetter] = useState({userId: location.state.id})

    const activeItem = state.activeItem;
    const products = data.products;
    // const products = [
    //     {
    //         id: 1,
    //         name: "Goomba",
    //         price: 15,
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
    //         seller: "Nintendo"
    //     },
    //     {
    //         id: 2,
    //         name: "Koopa",
    //         price: 35,
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
    //         seller: "AMD"
    //     }, {
    //         id: 3,
    //         name: "Koopa",
    //         price: 35,
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
    //         seller: "AMD"
    //     }, {
    //         id: 4,
    //         name: "Koopa",
    //         price: 35,
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
    //         seller: "AMD"
    //     }, {
    //         id: 5,
    //         name: "Koopa",
    //         price: 35,
    //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
    //         seller: "AMD"
    //     },
    // ]

    let rendered = false;

    function itemClicked(name) {
        // TODO: Find more or decide from the options found for the changing URLs:
        // window.history.replaceState(null, name.toLocaleUpperCase(), name)
        navigate("/" + name, {state: {id: 0}});
        setState({activeItem: name});
    }

    async function fetchProducts() {
        const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/products/all`);

        //Checks if the http request returns the appropriate status
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
                return <AccountDetails name="Juanito" lname="Barrio" pnum={50595505} created="12/1/2345"/>;
            // case "home":
            //     return (
            //         <React.Suspense fallback={<Loader content="Loading"/>}>
            //             <ItemCards items={products}/>
            //         </React.Suspense>
            //     );
            case "wishlist":
                return <WishlistPage user={user.userId}/>;
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
