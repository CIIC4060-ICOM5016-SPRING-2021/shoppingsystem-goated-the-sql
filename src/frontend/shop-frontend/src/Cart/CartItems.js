import React, {Component, useEffect, useState} from 'react';
import {Button, ButtonGroup, Card, CardContent, Container, Header, Icon, Image, Modal, Tab} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Navigate} from "react-router";
import Product from "../Product/Product";
import CartItems from "./CartItems.css";


function CartItem(props) {

    return props.info.map(value => {


        console.log(value)
        var product = {
            id: value.pid.toString(),
            name: value.pname.toString(),
            price: (value.pprice).toString(),
            image: value.image.toString(),
            quantity: value.quantity,
        }


        return <Card>
            <Image src={value.image} wrapped ui={false}/>
            <Card.Content className={"text"}>
                
                <h2>{value.pname}</h2>

                <h2>${value.pprice*value.quantity}</h2>



            </Card.Content>
            <CardContent>
            <ButtonGroup color='teal' fluid>

                <Button >
                    Quantity
                </Button>
                <Button icon>
                    <Icon name='minus'></Icon>

                </Button>
                <Button compact>

                    {product.quantity}
                </Button>

                <Button
                    icon
                >
                    <Icon name='plus'></Icon>

                </Button>
            </ButtonGroup>
            </CardContent>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button color='red'>
                        <Icon name='trash'></Icon>

                        Remove
                    </Button>
                    <Button
                        onClick = {() => {console.log('PR')}}

                        /*as={Link}
                        to={'/Product'}
                        onClick={Product(value)}*/
                        color='blue'>
                        View
                    </Button>


                </div>
            </Card.Content>
        </Card>
    });
}

export default CartItem;