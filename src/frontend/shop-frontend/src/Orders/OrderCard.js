import React, { Component, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Icon,
  Image,
  Modal,
  Tab,
} from "semantic-ui-react";
import rtx from "../images/xbox.png";
import { Link } from "react-router-dom";

function OrderCard(props) {
  return props.info.map((value) => {
    var product = {
      order_id: value.order_id.toString(),
      order_total: value.order_total.toString(),
      time_of_order: value.time_of_order.toString(),
      total_product_quantity: value.total_product_quantity.toString(),
      link: "/User/" + value.user_id.toString() + "/Order/" + value.order_id.toString(),
    };
    return (
      <Card href={product.link} fluid>
        <CardContent>
          <Grid columns={4} relaxed="very">
            <Grid.Column width={5}>
              <p>Ordered on: {product.time_of_order}</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p> Items in order: {product.total_product_quantity}</p>
            </Grid.Column>
            <GridColumn width={4}>
              <p>Order total ${product.order_total}</p>
            </GridColumn>
            <Grid.Column width={3}>
              <p> Order no. {product.order_id}</p>
            </Grid.Column>
          </Grid>
        </CardContent>
      </Card>
    );
  });
}

export default OrderCard;
