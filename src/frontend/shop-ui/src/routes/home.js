import React, {useState} from "react";
import {Menu} from "semantic-ui-react";
import ItemCard from "../components/item-card";

function Home() {
    const [state, setState] = useState({activeItem: "products"});
    const activeItem = state;

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

    let itemClicked = (e, {name}) => {
        setState({activeItem: name});
    };

    return (
        // TODO: Figure out how to render pages on click and pass over the selected item
        <>
            <Menu fixed="top" size="large">
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
            <div>Home</div>
            <ItemCard items={products}/>
        </>
    );
}

export default Home;
