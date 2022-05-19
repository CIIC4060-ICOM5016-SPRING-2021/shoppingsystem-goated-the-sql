
import {Button, ButtonGroup, Card, CardContent, Container, Header, Icon, Image, Modal, Tab} from "semantic-ui-react";
import React, {Component, useEffect, useState} from 'react';


import rtx from "../images/xbox.png"

function OrderItem(props){
    return props.info.map(value => {
        var product = {
            category: value.category.toString(),
            desc: value.desc.toString(),
            price_sold: (value.price_sold).toString(),
            name: value.name.toString(),
            quantity_bought: value.quantity_bought.toString()
        }
        return <Card>
            <Image src={rtx} wrapped ui={false}/>
            <CardContent>
                <h2>{product.name}</h2>
            </CardContent>
            <CardContent>
                <h3>Quantity: {product.quantity_bought} Cost ${product.price_sold}</h3>
            </CardContent>


        </Card>


    });
}
export default OrderItem;