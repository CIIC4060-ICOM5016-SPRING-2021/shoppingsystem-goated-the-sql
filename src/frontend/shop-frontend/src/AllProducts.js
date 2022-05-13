import React, {Component, useState} from 'react';
import {Button, Card, Container, Icon, Image, Modal, Tab} from "semantic-ui-react";

function AllProducts(props) {
    console.log(props)
    props.info.forEach(value => console.log(value.pname));
    return props.info.map(value => {return <Card >
        <Image src={value.image} wrapped ui={false} />
        <Card.Content>
            <Card.Header textAlign = 'center'>{value.pname}</Card.Header>
            <Card.Meta textAlign = 'center'>{value.pprice}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
            <div className='ui three buttons'>
                <Button  color='red'>
                    <Icon name='like'></Icon>
                    like
                </Button>
                <Button  color='blue'>
                    View
                </Button>
                <Button animated color={'green'}>
                    <Button.Content visible>
                        <Icon name='cart' />
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name='cart arrow down' />
                    </Button.Content>
                </Button>

            </div>
        </Card.Content>
    </Card>});
}
export default AllProducts;