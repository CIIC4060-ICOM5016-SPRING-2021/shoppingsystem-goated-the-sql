import {Button, Container, List, Loader} from "semantic-ui-react";
import React, {useEffect} from "react";

import "./orders-section.css";
import OrderDetails from "./order-details";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../utility/loading";
import {fetchOrdersInfo} from "../../features/user/accountSlice";

function OrdersSection() {
    const {isLoadingOrders} = useSelector(store => store.user);
    const {id} = useSelector(store => store.user.details);
    const orders = useSelector(store => store.user.orders["Orders"]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id !== undefined && orders === undefined) {
            dispatch(fetchOrdersInfo(id));
        } else if (id === undefined) {
            window.location.href = "/";
        }
    }, [dispatch, id, orders, isLoadingOrders]);

    function showOrders() {
        if (isLoadingOrders) {
            return <Loading/>;
        } else {
            if (isLoadingOrders === false && orders === null) {
                return <h2>No orders</h2>;
            } else {
                return <List divided>
                    {orders.map((order) => (
                        <List.Item className="orders-section-item" key={order.order_id}>
                            <List.Icon name="archive" size="large" verticalAlign="middle"/>
                            <List.Content>
                                <OrderDetails
                                    orderID={order.order_id}
                                    products={order.products_ordered}
                                />
                                <List.Header content={"Order #" + order.order_id}/>
                                <List.Description
                                    content={
                                        new Date(order.time_of_order).toLocaleDateString() +
                                        " - Total: $" +
                                        order.order_total
                                    }
                                />
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            }
        }
    }

    return (
        <>
            <Container className="orders-section-title">
                <h1>Your Orders</h1>
                <Button icon="refresh" content="Refresh" basic onClick={() => dispatch(fetchOrdersInfo(id))}/>
            </Container>
            <React.Suspense fallback={<Loader content="Loading..."/>}>
                <Container>
                    {showOrders()}
                </Container>
            </React.Suspense>
        </>
);
}

export default OrdersSection;
