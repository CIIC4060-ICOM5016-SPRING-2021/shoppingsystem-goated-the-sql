import React, {useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    GridColumn,
    Header,
} from "semantic-ui-react";
import rtx from "../images/xbox.png";

import "../Orders/Orders.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import OrderItem from "../Orders/OrderItem";

export function withRouter(Children) {
    return (props) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>;
    };
}

class ViewOrder extends React.Component {
    orderfromaxios = [];
    total = 0;
    orderno = 0;
    timeoforder = "";

    componentDidMount() {
        axios({
            method: "POST",
            // Se supone que se llame user id pero se llama orderid for some reason
            url: `http://127.0.0.1:5000/goated_the_sql/user/${this.props.match.params.id}/orders`,
            data: {
                order_id: this.props.match.params.order_id,
            },
        }).then((res) => {
            const order = res.data.args;
            this.total = res.data["order_total"];
            this.orderno = res.data["order_id"];
            this.timeoforder = res.data["time_of_order"];
            this.orderfromaxios = res.data["products_ordered"];
            console.log(this.orderfromaxios);
            this.setState({order}); //no clue for what this is
        });
    }

    render() {
        const items_in_order = this.order;

        return (
            <div className={"orderbackground"}>
                <h1 className={"header"}>Order</h1>
                <Divider hidden/>
                <Container>
                    <Card.Group>
                        <Card>
                            <CardContent>
                                <h2>Order total: ${this.total}</h2>
                            </CardContent>
                            <CardContent>
                                <p>Time of order: {this.timeoforder}</p>
                            </CardContent>
                            <CardContent>
                                <h2>Order no. {this.orderno}</h2>
                            </CardContent>
                        </Card>
                        <OrderItem info={this.orderfromaxios}/>
                    </Card.Group>
                </Container>
            </div>
        );
    }
}

export default withRouter(ViewOrder);
