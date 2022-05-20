import React, {useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container, Form, FormInput,
    Grid,
    GridColumn,
    GridRow,
    Header,
    Icon
} from "semantic-ui-react";
import {Link} from "react-router-dom";
import './Admin.css'
import axios from 'axios';


function ViewOrders() {

    // TODO: Make this use the admin's correct id instead of a hardcoded one
    axios
        .get(
            `http://127.0.0.1:5000/goated_the_sql/user/213/orders`
        )
        .then((res) => {
            console.log(res.data)
        });

    return (
        <Container fluid={'true'} textAlign={'center'}>
            <Header>Viewing Orders</Header>
            <Form>
                <FormInput placeholder='UserId'/>
            </Form>
            {/* DO THE SHIT ON ALLPRODUCTS*/}
            <Grid centered={'true'} divided={'true'}>
                <GridColumn width={3}>
                    <Card raised className={'adminAction'}>
                        <CardContent className={'content'}>
                            <Icon name={'newspaper'} size={'huge'}/>
                            <CardHeader textAlign={'center'}>Orders</CardHeader>
                            <Grid centered>
                                <GridRow>
                                    <Button className={'icon'} icon='eye' as={Link} to="/Orders/View"/>
                                </GridRow>
                            </Grid>
                        </CardContent>
                    </Card>
                </GridColumn>
            </Grid>
        </Container>

    )
}

export default ViewOrders;