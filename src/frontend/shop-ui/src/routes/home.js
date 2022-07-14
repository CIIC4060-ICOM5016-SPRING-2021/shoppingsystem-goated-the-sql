import React, {useState} from "react";
import {Loader, Menu} from "semantic-ui-react";

import ItemCards from "../components/products"

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
        console.log(state.activeItem)
    }

    return (
        // TODO: Figure out how to render pages on click and pass over the selected item
        <>
            <Menu fixed="top" borderless size="large">
                {/* TODO: Figure out why the menu items do not show what is currently selected*/}
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
                {/*Welcome to the homepage!*/}
                <React.Suspense fallback={<Loader content="Loading"/>}>
                    <ItemCards items={products}/>
                </React.Suspense>
                {/* TODO: Make the component for the account page*/}
                {/*<AccountDetails fname="Juanito" lname="Barrio" pnum={50595505} created="12/1/2345"/>*/}
                {/* TODO: Make the component for the wishlist page*/}
                {/* TODO: Make the component for the cart page*/}
            </div>
        </>
    );
}

export default Home;
