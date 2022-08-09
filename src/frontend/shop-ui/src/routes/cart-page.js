import {Button, Card, Divider, Grid, Loader} from "semantic-ui-react";
import React from "react";

import CartItem from "../components/cart-page/cart-item";
import CartTotalList from "../components/cart-page/cart-total-list";

import "./cart-page.css"
import {useSelector} from "react-redux";
import Loading from "../components/utility/loading";

function CartPage() {
  const {cartItems, isLoading, total} = useSelector(state => state.cart)

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
                    <React.Suspense fallback={<Loader content="Loading..."/>}>
                      <CartItem items={cartItems}/>
                    </React.Suspense>
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