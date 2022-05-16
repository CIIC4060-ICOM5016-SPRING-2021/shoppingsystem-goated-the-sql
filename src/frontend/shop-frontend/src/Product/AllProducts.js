import React, {Component, useState} from 'react';
import {Button, Card, Container, Icon, Image, Modal, Tab} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Navigate} from "react-router";
import Product from "./Product";
import rtx from "../images/xbox.png"

function AllProducts(props) {

    return props.info.map(value =>
    {


        console.log(value)
        var product = {
            id: value.id.toString(),
            name: value.name.toString(),
            price: value.price.toString(),
        }
        return <Card>
            <Image src={rtx} wrapped ui={false}/>
            <Card.Content>
                <Card.Header textAlign='center'>{product.name}</Card.Header>
                <Card.Meta textAlign='center'>{product.price}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <div className='ui three buttons'>
                    <Button color='red'>
                        <Icon name='like'></Icon>
                        like
                    </Button>
                    <Button
                        as={Link}
                        to={product.id}
/*
                        onClick={goProduct()}
*/
                        color='blue'>
                        View
                    </Button>
                    <Button animated color={'green'}>
                        <Button.Content visible>
                            <Icon name='cart'/>
                        </Button.Content>
                        <Button.Content hidden>
                            <Icon name='cart arrow down'/>
                        </Button.Content>
                    </Button>

                </div>
            </Card.Content>
        </Card>
    });
}

export default AllProducts;