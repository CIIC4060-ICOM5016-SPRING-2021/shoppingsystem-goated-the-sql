import {Card, Container, Grid, Loader} from "semantic-ui-react";
import React from "react";

import CartItem from "../components/cart-item";
import "./cart-page.css"

function CartPage(props) {

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
                                        <Container>
                                            <CartItem items={cartItems}/>
                                        </Container>
                                    </React.Suspense>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <div className="cart-page-order-details">
                                        <h1>Total</h1>
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