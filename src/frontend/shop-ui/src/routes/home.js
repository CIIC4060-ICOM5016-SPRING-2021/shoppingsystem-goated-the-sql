import React, {useState} from "react";
import {Loader, Menu} from "semantic-ui-react";

import ItemCards from "../components/products"

import "./home.css"



function Home() {
    const [state, setState] = useState({});
    const activeItem = state;

    async function productFetcher() {
        //Print action done and make fetch request
        console.log('Fetching all products');
        const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/products/all`);

        //Checks if the http request returns the appropiate status
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        //Return the needed data
        const data = await res.json();
        // console.log(data);

        setState({
            products: data['Products']
        });

        console.log("This is the state: " + state.products);
    }

    productFetcher()
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

    const itemClicked = (name) => {
        setState({activeItem: name});
    };

    return (
        // TODO: Figure out how to render pages on click and pass over the selected item
        <>
            <Menu fixed="top" borderless size="large">
                {/* TODO: Figure out why the menu items do not show what is currently selected*/}
                <Menu.Item
                    name="products"
                    active={activeItem === "products"}
                    onClick={itemClicked}
                    position="left"
                    content="Products"
                />
                <Menu.Item
                    name="account"
                    active={activeItem === "account"}
                    onClick={itemClicked}
                    content="Account"
                />
                <Menu.Item
                    name="wishlist"
                    active={activeItem === "wishlist"}
                    onClick={itemClicked}
                    content="Wishlist"
                />
                <Menu.Item
                    name="cart"
                    active={activeItem === "cart"}
                    onClick={itemClicked}
                    content="Cart"
                />
            </Menu>
            <div className="content-body">
                {/*Welcome to the homepage!*/}
                <React.Suspense fallback={<Loader content="Loading"/>}>
                    <ItemCards items={state.products}/>
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
