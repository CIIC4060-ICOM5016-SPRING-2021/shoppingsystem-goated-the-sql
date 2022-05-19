import React, {useState} from 'react';
import {Button, Card, Container, Divider, Grid, GridColumn, Header} from "semantic-ui-react";
import rtx from "../images/xbox.png"
import "./Orders.css"
import {useParams} from "react-router-dom";
import axios from "axios";
import OrderCard from "./OrderCard";

export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}
class Orders extends React.Component{
    orderlistformaxios = []
    componentDidMount() {
        axios({

            method: "POST",
            url: "http://127.0.0.1:5000/goated_the_sql/user/193/orders"

        }).then(res => {
            const prods = res.data.args;
            this.orderlistformaxios = res.data;
            console.log(this.orderlistformaxios)
            this.setState({prods});//no clue for what this is
        });
}
    render() {
        let random_info = [
            {"order_id": 115,"order_total": "375","time_of_order": "Mon, 18 Apr 2022 03:13:03 GMT","total_product_quantity": 15},
            {"order_id": 115,"order_total": "375","time_of_order": "Mon, 18 Apr 2022 03:13:03 GMT","total_product_quantity": 15}
        ]
        return(
            <div className={"orderbackground"}>
                <h1 className={"header"}>Orders</h1>
                <Divider hidden />
                <Container >
                    <Card.Group >

                        <OrderCard info={this.orderlistformaxios}/>

                    </Card.Group>
                </Container>
            </div>
        )
    }
}
export default withRouter(Orders)