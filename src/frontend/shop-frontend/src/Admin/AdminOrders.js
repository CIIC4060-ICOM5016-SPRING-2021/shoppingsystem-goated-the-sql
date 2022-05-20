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
import {Link, useParams} from "react-router-dom";
import './Admin.css'

function AdminOrders(Orders) {

    return Orders.info.map(value => {
        value.products_ordered = [];
        var order = {
            id: value.order_id.toString(),
            total: value.order_total.toString(),
            // products: value.products_ordered.toArray(),
            user_id: value.user_id.toString()
        }
        return (

            <Card raised className={'adminAction'}>
                <CardContent className={'content'}>
                    <Icon name={'newspaper'} size={'huge'}/>
                    <CardHeader textAlign={'center'}>{order.id}</CardHeader>
                    <Grid centered>
                        <GridRow>
                            <Button className={'icon'} icon='eye' as={Link} to={order.id}/>
                        </GridRow>
                    </Grid>
                </CardContent>
            </Card>

        )
    });
}

export default AdminOrders;
