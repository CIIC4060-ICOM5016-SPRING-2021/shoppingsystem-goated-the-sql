import {Container, List, ListContent, ListDescription, ListHeader, ListIcon, ListItem, Loader} from "semantic-ui-react";
import React from "react";

import "./orders-section.css"
import OrderDetails from "./order-details";

function OrdersSection(props) {
    const orders = props.orders;

    return (
        <>
            <Container className="orders-section-title">
                <h1>Your Orders</h1>
            </Container>
            <React.Suspense fallback={<Loader content="Loading..."/>}>
                <Container>
                    <List divided>
                        {orders.map((order) =>
                            <ListItem className="orders-section-item" key={order.order_id}>
                                <ListIcon name="archive" size="large" verticalAlign="middle"/>
                                <ListContent>
                                    <OrderDetails orderID={order.order_id} products={order.products_ordered}/>
                                    <ListHeader content={"Order #" + order.order_id}/>
                                    <ListDescription
                                        content={new Date(order.time_of_order).toLocaleDateString() + " - Total: $" + order.order_total}/>
                                </ListContent>
                            </ListItem>
                        )}
                    </List>
                </Container>
            </React.Suspense>
        </>
    )
        ;
}

export default OrdersSection;