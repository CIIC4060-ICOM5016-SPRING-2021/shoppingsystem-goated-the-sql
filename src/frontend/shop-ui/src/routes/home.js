import React, {useState} from "react";
import {Loader, Menu} from "semantic-ui-react";
import AccountDetails from "./account-page"
import ItemCards from "../components/item-card";

import "./home.css"

function Home() {
    const [state, setState] = useState({activeItem: "products"});
    const activeItem = state.activeItem;

    const products = [
        {
            id: 1,
            name: "Goomba",
            price: 15,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
            seller: "Nintendo"
        },
        {
            id: 2,
            name: "Koopa",
            price: 35,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
            seller: "AMD"
        }, {
            id: 3,
            name: "Koopa",
            price: 35,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
            seller: "AMD"
        }, {
            id: 4,
            name: "Koopa",
            price: 35,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
            seller: "AMD"
        }, {
            id: 5,
            name: "Koopa",
            price: 35,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
            seller: "AMD"
        },
    ]

    function itemClicked(name) {
        setState({activeItem: name});
    }

    function PageToRender() {
        switch (activeItem) {
            case "account":
                return <AccountDetails fname="Juanito" lname="Barrio" pnum={50595505} created="12/1/2345"/>;
            case "products":
                return (
                    <React.Suspense fallback={<Loader content="Loading"/>}>
                        <ItemCards items={products}/>
                    </React.Suspense>
                );
            case "wishlist":
                return "this should be the wishlist page";
            case "cart":
                return "this should be the cart page";
            default:
                setState({activeItem: "products"})
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
                    active={activeItem === "products"}
                    onClick={() => itemClicked("products")}
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