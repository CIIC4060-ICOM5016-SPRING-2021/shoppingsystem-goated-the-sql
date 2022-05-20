import React, { Component, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Icon,
  Image,
  Label,
  Tab,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";

import rtx from "../3080.png";

function Likes_item(props) {
  return props.info.map((value) => {
    var product = {
      id: value.id.toString(),
      name: value.name.toString(),
      price: value.price.toString(),
      desc: value.desc.toString(),
      category: value.category.toString(),
    };
    return (
      <Card>
        <Image src={rtx} wrapped ui={false} />
        <Card.Content className={"text"}>
          <h3 className={"text"}>{product.name}</h3>
          <h3 className={"text"}>${product.price}</h3>
        </Card.Content>
        <Card.Content extra>
          <div className="ui three buttons">
            <Button as={Link} to={product.id} color="red" icon>
              <i class="thumbs down outline icon"></i>
            </Button>
            <Button as={Link} to={`/Products/${product.id}`} color={"blue"}>
              View
            </Button>
            <Button color={"green"} content="center">Add to Cart</Button>
          </div>
        </Card.Content>
      </Card>
    );
  });
}
export default Likes_item;
