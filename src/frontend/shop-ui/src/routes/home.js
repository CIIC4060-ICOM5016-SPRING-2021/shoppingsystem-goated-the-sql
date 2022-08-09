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
            <ItemCards />
        );
      case "statistics":
        return <StatsPage />;
      case "account":
        return (
          <AccountDetailsPage/>
        );
      case "wishlist":
        return <WishlistPage />;
      case "cart":
        return <CartPage />;
      default:
        setState({ activeItem: "home" });
        return (
          <React.Suspense fallback={<Loader content="Loading" />}>
            <ItemCards />
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
