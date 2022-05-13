import React, {useState} from 'react';
import {Card, Container} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import rtx from "./3080.png"

function Products() {
    const [data, setData] = useState("show");
    let random_info = [
        {"pid": 1, "pname": "RTX 3080", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 2, "pname": "Intel 11th gen i7 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 3, "pname": "Intel 11th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 4, "pname": "Intel 12th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 5, "pname": "PS5", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 6, "pname": "Xbox Controller", "pprice": 1.01, "pdescription": "description", "image": rtx}];


    return <Container style={{height: 800}}>
        <Card.Group centered>
            <AllProducts info={random_info}/>
        </Card.Group>
    </Container>
}

export default Products;