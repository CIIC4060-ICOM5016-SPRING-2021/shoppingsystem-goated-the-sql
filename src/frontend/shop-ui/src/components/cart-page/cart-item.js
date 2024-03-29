import {Button, List} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";

import {decreaseCartItemQuantity, increaseCartItemQuantity, removeItemFromCartDB} from "../../features/cart/cartSlice";
import React from "react";
import Loading from "../utility/loading";
import {getAllProducts} from "../../features/products/productSlice";

function CartItem(props) {
  const cartItems = props.items.items;

  const dispatch = useDispatch();
  const {products} = useSelector(store => store.product);

  function increaseQuantity(itemID) {
    dispatch(increaseCartItemQuantity(itemID));
  }
  function reduceQuantity(itemID) {
    // check if the item quantity is about to hit 0, if so, remove the item from the cart
    if (cartItems.find(item => item.product_id === itemID).quantity === 1) {
      dispatch(removeItemFromCartDB({product_id: itemID, user_id: props.items.user_id}));
    }

    dispatch(decreaseCartItemQuantity(itemID));
  }
  function getProductName(product_id) {
    const product = products["Products"].find(product => product.id === product_id);
    return product.name;
  }

  if(products["Products"] === undefined) {
    dispatch(getAllProducts());
    return <Loading/>
  }else {
    return (
      <List divided>
        {cartItems.map((item) => (
          <List.Item key={item.product_id}>
            <List.Icon name="shopping cart" verticalAlign="middle"/>
            <List.Content>
              <Button.Group floated="right" basic compact>
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
}

export default CartItem;
