import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

function Home() {
  const [state, setState] = useState({});
  const activeItem = state;

  let itemClicked = (e, { name }) => {
    setState({ activeItem: name });
  };

  return (
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
    </>
  );
}

export default Home;
