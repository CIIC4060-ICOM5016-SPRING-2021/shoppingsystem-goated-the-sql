import {Button, List} from "semantic-ui-react";
import React, {useState} from "react";
import {useSelector} from "react-redux";

function CartItem(props) {
  const cartItems = props.items;
  let [state, setState] = useState(cartItems);

  const {products} = useSelector(store => store.product);

  //TODO: Figure out why the button only shows the value the first time the state is changed
  function increaseQuantity(itemID) {
    const newCartItems = state.map((item) => {
      if (item["product_id"] === itemID) item["quantity"] += 1;
      return {...item};
    });

    setState(newCartItems);
    console.log(state);
  }

  function reduceQuantity(itemID) {
    const newCartItems = state.map((item) => {
      if (item["product_id"] === itemID)
        if (item["quantity"] > 0) item["quantity"] -= 1;
        else item["quantity"] = 0;

      return {...item};
    });

    setState(newCartItems);
    console.log(state);
  }

  function getProductName(product_id) {
    const product = products["Products"].find(product => product.id === product_id);
    return product.name;
  }

  //TODO: Add functionality that sends an API call to add or remove a quantity for a product
  return (
    <List divided>
      {cartItems.map((item) => (
        <List.Item key={item.product_id}>
          <List.Icon name="shopping cart" verticalAlign="middle"/>
          <List.Content>
            <Button.Group floated="right" basic compact>
              {/*
                TODO: Find a way for these changes to make their way to the cart-total-list so that it can
                re-render the total amount for the order
              */}
              <Button
                icon="plus"
                onClick={() => increaseQuantity(item.product_id)}
              />
              <Button content={item.quantity} disabled/>
              <Button
                icon="minus"
                onClick={() => reduceQuantity(item.product_id)}
              />
            </Button.Group>
            {/* TODO: Get the details of the item via API call and place the name below*/}
            <List.Header>
              {getProductName(item.product_id)}
            </List.Header>
            <List.Description content={" - $" + item.product_price}/>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}

export default CartItem;
