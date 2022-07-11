import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

function Home() {
  const [state, setState] = useState({});

  let itemClicked = (e, { name }) => {
    setState({ activeItem: name });
  };

  const activeItem = state;
  return (
    <>
      <Menu>
        <Menu.Item
          name="products"
          active={activeItem === "products"}
          onClick={itemClicked}
        >
          Products
        </Menu.Item>
        <Menu.Item
          name="account"
          active={activeItem === "account"}
          onClick={itemClicked}
        >
          Account
        </Menu.Item>
        <Menu.Item
          name="orders"
          active={activeItem === "orders"}
          onClick={itemClicked}
        >
          Orders
        </Menu.Item>
      </Menu>
      <div>Home</div>
    </>
  );
}

export default Home;
