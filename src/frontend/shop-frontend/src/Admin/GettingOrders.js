import React, {useState} from "react";
import {
    Button,
    Card,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu, Grid, GridColumn, Header,
    Menu,
} from "semantic-ui-react";
import adminOrders from "./AdminOrders";
import axios from "axios";
import {useParams} from "react-router-dom";
import ViewOrders from "./ViewOrders";
import AdminOrders from "./AdminOrders";

export function withRouter(Children) {
    return (props) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>;
    };
}

class GettingOrders extends React.Component {
    Orders = [];

    componentDidMount() {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/goated_the_sql/user/213/orders",
        }).then((res) => {
            const prods = res.data.args;
            this.Orders = res.data;
            console.log(this.Orders);
            this.setState({prods}); //no clue for what this is
        });
    }

    render() {
        return (
            <div className={"prodbackground"}>
                <Container>
                    <Header>Viewing Orders</Header>
                    <Grid centered={'true'} divided={'true'}>
                        <GridColumn width={3}>
                            <Card.Group centered>
                                <AdminOrders info={this.Orders}/>
                            </Card.Group>
                        </GridColumn>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withRouter(GettingOrders);
