import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Menu,
  Icon,
} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import rtx from "../3080.png";
import "./Products.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class Products extends React.Component {
  GlobalStatisticsdb = [];
  Productsdb = [];
  order_asc = true;

  componentDidMount() {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/goated_the_sql/products/all",
    }).then((res) => {
      const prods = res.data.args;
      this.Productsdb = res.data;
      console.log(this.Productsdb);
      this.setState({ prods }); //no clue for what this is
    });
  }

  async nameQuery(in_ascending_order) {
    if (in_ascending_order === true) {
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/goated_the_sql/products/all",
        data: {
          request: "ordered",
          filter: "name",
          in_ascending_order: true,
        },
      });
      this.Productsdb = res.data;
      console.log(this.Productsdb);
      this.forceUpdate();
    } else {
      const res_1 = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/goated_the_sql/products/all",
        data: {
          request: "ordered",
          filter: "name",
          in_ascending_order: false,
        },
      });
      this.Productsdb = res_1.data;
      console.log(this.Productsdb);
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className={"prodbackground"}>
        <Container textAlign="center">
          <Dropdown text="Filter">
            <Dropdown.Menu>
              <Dropdown.Item
                text="By Name"
                onClick={() => this.nameQuery(this.order_asc)}
              />
              <Dropdown.Item text="By Price" />
              <Dropdown.Item text="By Category" />
            </Dropdown.Menu>
          </Dropdown>
          <Button icon onClick={() => (this.order_asc = false)}>
            <Icon name="arrow down" />
          </Button>
          <Button icon onClick={() => (this.order_asc = true)}>
            <Icon name="arrow up" />
          </Button>
          <Card.Group centered>
            <AllProducts info={this.Productsdb} />
          </Card.Group>
        </Container>
      </div>
    );
  }
}
export default withRouter(Products);
