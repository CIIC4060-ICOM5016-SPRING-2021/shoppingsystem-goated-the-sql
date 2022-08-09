import {Container, List, Loader} from "semantic-ui-react";
import React from "react";

import "./orders-section.css";
import OrderDetails from "./order-details";
import {useSelector} from "react-redux";
import Loading from "../utility/loading";

function OrdersSection() {
  const {isLoading} = useSelector(store => store.user);
  const orders = useSelector(store => store.user.orders);

  if (isLoading) {
    return (<Loading/>);
  } else {
    return (
      <>
        <Container className="orders-section-title">
          <h1>Your Orders</h1>
        </Container>
        <React.Suspense fallback={<Loader content="Loading..."/>}>
          <Container>
            <List divided>
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
          </Container>
        </React.Suspense>
      </>
    );
  }
}

export default OrdersSection;
