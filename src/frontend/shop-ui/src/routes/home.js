import React, { useState } from "react";
import { Item, Menu } from "semantic-ui-react";
import ItemCard from "../components/item-card";

function Home() {
  const [state, setState] = useState({});
  const activeItem = state;

  let itemClicked = (e, { name }) => {
    setState({ activeItem: name });
  };

  return (
    // TODO: Figure out how to render pages on click and pass over the selected item
    <>
      <Menu attached="top" borderless size="large">
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

        <ItemCard name="Goomba" price={15} seller="Nintendo"/>
        <ItemCard name="Goomba2" price={35} seller="AMD"/>

    </>
  );
}

export default Home;
