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
import axios from "axios";

let logo = 'heart'
let likePrev = 1
let likeNow = 0

function Likes_item(props) {

  return props.info.map((value) => {
    var product = {
      id: value.id,
      name: value.name.toString(),
      price: value.price.toString(),
      desc: value.desc.toString(),
      category: value.category.toString()
    };
    function likeitem() {
      axios.get(`http://127.0.0.1:5000//goated_the_sql/product/${product.id}`).then((res) => {
         likePrev = res.data[1]["liked_count"];
        console.log(likePrev);
      });


      let url =`http://127.0.0.1:5000//goated_the_sql/product/${product.id}`
      axios({
        method: "PUT",
        url: url,
        data: {
          user_id: props.user_id.toString(),
        },
      }).then((res) => {
        likeNow = res.data[1]["liked_count"];
        console.log(likeNow);
      });

    }

    return (
      <Card>
        <Image src={rtx} wrapped ui={false} />
        <Card.Content className={"text"}>

          <h3 className={"text"}>{product.name}</h3>
          <h3 className={"text"}>${product.price}</h3>
        </Card.Content>
        <Card.Content extra>
          <div className="ui three buttons">
            <Button onClick={likeitem} color="red" icon>

              <Icon name={"heart"}></Icon>
            </Button>
            <Button as={Link} to={`/Products/${product.id}`} color={"blue"}>
              View
            </Button>
            <Button color={"green"}>Add</Button>
          </div>
        </Card.Content>
      </Card>
    );
  });
}
export default Likes_item;
