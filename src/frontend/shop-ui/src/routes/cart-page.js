import {Button, Card, Divider, Grid} from "semantic-ui-react";
import React, {useEffect} from "react";

import CartItem from "../components/cart-page/cart-item";
import CartTotalList from "../components/cart-page/cart-total-list";

import "./cart-page.css"
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/utility/loading";
import {setTotal} from "../features/cart/cartSlice";

function CartPage() {
  const {cartItems, isLoading, total} = useSelector(state => state.cart)
  const dispatch = useDispatch();

  function calculatedTotal(cartItems) {
    let total = 0;
    cartItems.forEach(item => {
      total += item.product_price * item.quantity;
    })
    return total;
  }

  useEffect(() => {
    dispatch(setTotal(calculatedTotal(cartItems)));
  } ,[cartItems, dispatch])
  if (isLoading) {
    return <Loading/>
  } else {
    return (
      <>
        <div className="cart-page-body">
          <Card raised fluid>
            <Card.Content>
              <Grid celled="internally">
                <Grid.Row columns={2}>
                  <Grid.Column width={10}>
                    <h1>Cart</h1>
                    <CartItem items={cartItems}/>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <h1>Total</h1>
                    <div className="cart-page-order-details">
                      <CartTotalList items={cartItems}/>
                      <div className="cart-page-order-section-end">
                        <Divider clearing/>
                        <h1>${total}</h1>
                        <Button positive content="Checkout"/>
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        </div>
      </>
    );
  }
}

export default CartPage;