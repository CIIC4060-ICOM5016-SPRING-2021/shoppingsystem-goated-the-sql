import React, {Component, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import rtx from "../../../../../shoppingsystem-goated-the-sql-1/src/frontend/shop-frontend/src/3080.png"
function Products() {
    const [data, setData] = useState("show");
    let random_info = [
        {"pname": "RTX 3080", "pprice": 1.01, "pdescription": "description","image": rtx},
        {"pname": "Intel 11th gen i7 CPU", "pprice": 1.01, "pdescription": "description","image": rtx},
        {"pname": "Intel 11th gen i9 CPU", "pprice": 1.01, "pdescription": "description","image": rtx},
        {"pname": "Intel 12th gen i9 CPU", "pprice": 1.01, "pdescription": "description","image": rtx},
        {"pname": "PS5", "pprice": 1.01, "pdescription": "description","image": rtx},
        {"pname": "Xbox Controller", "pprice": 1.01, "pdescription": "description","image": rtx}];


    return <Container  style={{ height: 800 }}>
    <Card.Group centered>
        <AllProducts info={random_info}/>
    </Card.Group>
    </Container>
}

export default Products;