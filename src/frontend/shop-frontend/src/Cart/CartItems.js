import React, { Component, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Header,
  Icon,
  Image,
  Modal,
  Tab,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import Product from "../Product/Product";
import CartItems from "./CartItems.css";
import rtx from "../images/xbox.png";

function CartItem(props) {
  return props.info.map((value) => {
    var product = {
      product_id: value.product_id.toString(),
      product_price: value.product_price.toString(),
      usr_id: value.usr_id.toString(),
      name: value.name.toString(),
      quantity: value.quantity,
    };

    return (
      <Card>
        <Image src={rtx} wrapped ui={false} />
        <Card.Content className={"text"}>
          <h2>{product.name}</h2>

          <h2>${product.product_price * product.quantity}</h2>
        </Card.Content>
        <CardContent>
          <ButtonGroup color="teal" fluid>
            <Button>Quantity</Button>
            <Button icon>
              <Icon name="minus"></Icon>
            </Button>
            <Button compact>{product.quantity}</Button>

            <Button icon>
              <Icon name="plus"></Icon>
            </Button>
          </ButtonGroup>
        </CardContent>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button color="red">
              <Icon name="trash"></Icon>
              Remove
            </Button>
            <Button
              onClick={() => {}}
              /*as={Link}
                        to={'/Product'}
                        onClick={Product(value)}*/
              color="blue"
            >
              View
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  });
}

export default CartItem;
