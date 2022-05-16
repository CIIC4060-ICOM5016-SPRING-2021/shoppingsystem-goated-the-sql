import React, {useState} from 'react';
import {Card, Container} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import rtx from "../3080.png"
import "./Products.css"
import axios from "axios";
import {useParams} from "react-router-dom";

export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

class Products extends React.Component{


    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/goated_the_sql/product/${this.props.match.params.id}`)
            .then(res => {
                const persons = res.data;
                this.likes = res.data[1];
                this.product = res.data[0];
                console.log(this.product)

                this.setState({persons});
            })
    }
    render() {
        let random_info = [
            {"pid": 1, "pname": "RTX 3080", "pprice": 1.01, "pdescription": "description", "image": rtx},
            {"pid": 2, "pname": "Intel 11th gen i7 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
            {"pid": 3, "pname": "Intel 11th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
            {"pid": 4, "pname": "Intel 12th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
            {"pid": 5, "pname": "PS5", "pprice": 1.01, "pdescription": "description", "image": rtx},
            {"pid": 6, "pname": "Xbox Controller", "pprice": 1.01, "pdescription": "description", "image": rtx}];

        return(<div className={"prodbackground"}>
                <Container >
                    <Card.Group centered>
                        <AllProducts info={random_info}/>
                    </Card.Group>
                </Container>
            </div>

        )
    }
}
export default withRouter(Products);










/*
function Products() {
    const [data, setData] = useState("show");
    let random_info = [
        {"pid": 1, "pname": "RTX 3080", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 2, "pname": "Intel 11th gen i7 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 3, "pname": "Intel 11th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 4, "pname": "Intel 12th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 5, "pname": "PS5", "pprice": 1.01, "pdescription": "description", "image": rtx},
        {"pid": 6, "pname": "Xbox Controller", "pprice": 1.01, "pdescription": "description", "image": rtx}];


    return <div className={"prodbackground"}>
    <Container >
        <Card.Group centered>
            <AllProducts info={random_info}/>
        </Card.Group>
    </Container>
    </div>
}

export default Products;*/
