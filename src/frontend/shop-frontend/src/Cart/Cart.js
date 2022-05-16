import React, {useState} from 'react';
import {Button, Card, Container, Divider, Grid, GridColumn, Header} from "semantic-ui-react";
import rtx from "../images/xbox.png"
import CartItems from "./CartItems";
import "./Cart.css"

export default class Cart extends React.Component{

    render() {
        let random_info = [
            {"pid": 1, "pname": "RTX 3080", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":1},
            {"pid": 2, "pname": "Intel 11th gen i7 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":2},
            {"pid": 3, "pname": "Intel 11th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":1},
            {"pid": 4, "pname": "Intel 12th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":1},
            {"pid": 5, "pname": "PS5", "pprice": 1.01, "pdescription": "description", "image": rtx , "quantity":1},
            {"pid": 6, "pname": "Xbox Controller", "pprice": 1.01, "pdescription": "description", "image": rtx, "quantity":1}

        ];
        return(<div className={"cartbackground"}>
            <h1 className={"header"}>Cart</h1>

            <Container >
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
        </div>)


    }
}











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
