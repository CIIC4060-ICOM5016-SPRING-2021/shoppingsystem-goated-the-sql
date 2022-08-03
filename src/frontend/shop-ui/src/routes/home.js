import React, { useState } from "react";
import { Loader, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import WishlistPage from "./wishlist-page";
import AccountDetailsPage from "./account-page";
import CartPage from "./cart-page";
import ItemCards from "../components/products-page/item-card";
import StatsPage from "./stats-page";

import "./home.css";

function Home(props) {
  const navigate = useNavigate();

  const selected = props.selected;
  const [state, setState] = useState({ activeItem: selected });
  const activeItem = state.activeItem;

  const products = [
    {
      id: 1,
      name: "Goomba",
      price: 15,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
      seller: "Nintendo",
    },
    {
      id: 2,
      name: "Koopa",
      price: 35,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
      seller: "AMD",
    },
    {
      id: 3,
      name: "Koopa",
      price: 35,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
      seller: "AMD",
    },
    {
      id: 4,
      name: "Koopa",
      price: 35,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
      seller: "AMD",
    },
    {
      id: 5,
      name: "Koopa",
      price: 35,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis adipisci corrupti nostrum earum. Dignissimos, facere natus impedit enim quasi accusamus voluptatem illum! Facere voluptate veritatis fugiat autem libero dignissimos?",
      seller: "AMD",
    },
  ];

  function itemClicked(name) {
    // TODO: Find more or decide from the options found for the changing URLs:
    // window.history.replaceState(null, name.toLocaleUpperCase(), name)
    navigate("/" + name);
    setState({ activeItem: name });
  }

  function PageToRender() {
    switch (activeItem) {
      case "home":
        return (
          <React.Suspense fallback={<Loader content="Loading" />}>
            <ItemCards items={products} />
          </React.Suspense>
        );
      case "statistics":
        return <StatsPage />;
      case "account":
        return (
          <AccountDetailsPage
            fname="Juanito"
            lname="Barrio"
            pnum={50595505}
            created="12/1/2345"
          />
        );
      case "wishlist":
        return <WishlistPage items={products} />;
      case "cart":
        return <CartPage />;
      default:
        setState({ activeItem: "home" });
        return (
          <React.Suspense fallback={<Loader content="Loading" />}>
            <ItemCards items={products} />
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
          content="Products"
        />
        <Menu.Item
          active={activeItem === "statistics"}
          onClick={() => itemClicked("statistics")}
          position="left"
          content="Statistics"
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
        <PageToRender />
      </div>
    </>
  );
}

export default Home;
