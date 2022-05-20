import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  GridColumn,
  Header,
} from "semantic-ui-react";
import rtx from "../images/xbox.png";
import CartItems from "./CartItems";
import "./Cart.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class Cart extends React.Component {
  cartitemsfromaxios = [];
  componentDidMount() {
    axios.get("http://127.0.0.1:5000/goated_the_sql/cart/213").then((res) => {
      const prods = res.data.args;
      this.cartitemsfromaxios = res.data;
      //console.log(this.cartitems)
      this.setState({ prods }); //no clue for what this is
    });
  }

  render() {
    /*let random_info = [
            {"product_id": 1, "product_price": 1.01, "usr_id": 213, "name": "name", "quantity":1},
            {"product_id": 1, "product_price": 1.01, "usr_id": 213, "name": "name", "quantity":1},
            {"product_id": 1, "product_price": 1.01, "usr_id": 213, "name": "name", "quantity":2},
            {"product_id": 1, "product_price": 1.01, "usr_id": 213, "name": "name", "quantity":1},
            {"product_id": 1, "product_price": 1.01, "usr_id": 213, "name": "name", "quantity":1},
            {"product_id": 1, "product_price": 1.01, "usr_id": 213, "name": "name", "quantity":1}

        ];*/

    function gettotal(arr) {
      let total = 0;
      let tot = arr.map((val) => {
        total = total + val.product_price;
        //console.log(val.product_price);
      });
      return total;
    }
    return (
      <div className={"cartbackground"}>
        <h1 className={"header"}>Cart</h1>

        <Container>
          <Card.Group centered>
            <CartItems info={this.cartitemsfromaxios} />
          </Card.Group>
        </Container>
        <Divider></Divider>
        <Container className="footer">
          <h2> Total: ${gettotal(this.cartitemsfromaxios)}</h2>
          <h4>Shipping & taxes are calculated at checkout.</h4>
          <Grid columns={2} columns="equal" padded>
            <GridColumn>
              <Button color="red" size="massive">
                Clear Cart
              </Button>
            </GridColumn>
            <GridColumn>
              <Button color="green" size="massive">
                Check Out
              </Button>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default withRouter(Cart);

/*
function Cart() {
    const [data, setData] = useState("show");
    let random_info = [
        {"pid": 1, "pname": "RTX 3080", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":1},
        {"pid": 2, "pname": "Intel 11th gen i7 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":2},
        {"pid": 3, "pname": "Intel 11th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":1},
        {"pid": 4, "pname": "Intel 12th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":1},
        {"pid": 5, "pname": "PS5", "pprice": 1.01, "pdescription": "description", "image": rtx , "quantity":1},
        {"pid": 6, "pname": "Xbox Controller", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":1}

    ];


    return <div><Container >
        <Card.Group centered>
            <CartItems info={random_info}/>
        </Card.Group>
    </Container>
        <Divider></Divider>
    <Container   className ='footer'>
        <h2 > Total: ${1.89}</h2>
        <h4>
            Shipping & taxes are calculated at checkout.

        </h4>
        <Grid columns={2} columns='equal' padded  >
            <GridColumn >
                <Button color ='red' size='massive' >
                    Clear Cart
                </Button>
            </GridColumn>
            <GridColumn >

                <Button color ='green' size='massive'>
                    Check Out
                </Button>

            </GridColumn>
        </Grid>

    </Container>
    </div>
}

export default Cart;*/