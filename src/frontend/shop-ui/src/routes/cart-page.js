import {Button, Card, Divider, Grid, Loader} from "semantic-ui-react";
import React, {useMemo, useState} from "react";

import CartItem from "../components/cart-item";
import CartTotalList from "../components/cart-total-list";

import "./cart-page.css"

function CartPage(props) {
    const [state, setState] = useState({total: 0})

    const cartItems = [
        {
            "product_id": 58,
            "product_price": 80.0,
            "quantity": 3,
            "usr_id": 187
        },
        {
            "product_id": 52,
            "product_price": 129.99,
            "quantity": 8,
            "usr_id": 187
        }
    ];

    const order_total = useMemo(() => getOrderTotal(state.total), [state.total]);

    function getOrderTotal(total) {
        for (const item of cartItems) {
            total = total + (item.product_price * item.quantity);
        }
        return total;
    }

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
                                            <h1>${order_total}</h1>
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

export default CartPage;