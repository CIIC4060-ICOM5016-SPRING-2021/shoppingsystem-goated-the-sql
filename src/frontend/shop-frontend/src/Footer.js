import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Header, Image, Modal, Segment} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";


function Footer(){
    const [data, setData] = useState([{"name": 1, "Counts": 5},
        {"name": 2, "Counts": 4},
        {"name": 3, "Counts": 3},
        {"name": 4, "Counts": 2},
        {"name": 5, "Counts": 1}]);

    return <Container >

        <Segment>
            <Header as='h2' floated='right'>
                shoppingsystem-goated-the-sql
            </Header>

            <Divider clearing />
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    </Container>


}
export default Footer;
