import React, {Component, useState} from 'react';
import {Button, Card, CardContent, Container, Icon, Image, Label, Tab} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Product from "../Product/Product";





function Likes_item(props){
    return props.info.map(value => {
        var product = {
            id: value.pid.toString(),
            name: value.pname.toString(),
            price: value.pprice.toString(),
            image: value.image.toString(),
            like: value.like.Boolean
        }
        return <Card >
            <Image src={value.image} wrapped ui={false}/>
            <Card.Content className={"text"}>
                <h3 className={"text"}>{value.pname}</h3>
                <h3 className={"text"}>${value.pprice}</h3>
            </Card.Content>
            <Card.Content extra>
                <div className='ui three buttons'>
                    <Button color ='red' icon>
                        <Icon name = "like"></Icon>
                    </Button>
                    <Button  color={"blue"}>
                        View
                    </Button>
                    <Button   color={"green"}>
                        Add
                    </Button>
                </div>
            </Card.Content>
        </Card>

            });
}
export default Likes_item;