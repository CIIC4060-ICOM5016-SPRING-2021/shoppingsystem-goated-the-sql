import {Container, List, Loader} from "semantic-ui-react";
import React, {useEffect} from "react";

import "./orders-section.css";
import OrderDetails from "./order-details";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../utility/loading";
import {fetchAccountInfo, fetchOrdersInfo} from "../../features/user/accountSlice";

function OrdersSection() {
  const {isLoadingOrders} = useSelector(store => store.user);
  const {id} = useSelector(store => store.user.details);
  const orders = useSelector(store => store.user.orders["Orders"]);
  const dispatch = useDispatch();

  useEffect(() => {
    if ((orders === undefined || orders.length === 0) && id === undefined) {
      dispatch(fetchOrdersInfo(id));
    } else {
      dispatch(fetchAccountInfo(187));
    }
  }, [dispatch, id, orders, isLoadingOrders]);

  function showOrders() {
    if (isLoadingOrders) {
      return <Loading/>;
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

  return (
    <>
      <Container className="orders-section-title">
        <h1>Your Orders</h1>
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
