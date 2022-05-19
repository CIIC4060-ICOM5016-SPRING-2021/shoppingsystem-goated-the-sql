import React, {useState} from 'react';
import {Button, Card, Container, Dropdown, DropdownItem, Menu} from "semantic-ui-react";
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
    GlobalStatisticsdb = []
    Productsdb = []
    sort = true
    order = 'price'


    componentDidMount() {
        /*fetch('http://127.0.0.1:5000/goated_the_sql/products/all', {
            body: formData,
            method: 'GET'
        }).then(res => {
            const prods = res.data;
            this.Productsdb = res.data;
            console.log(this.Productsdb)
            this.setState({prods});//no clue for what this is
        });*/

        /*const getData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/goated_the_sql/products/all`, {
                    method: 'GET',
                    body: JSON.stringify({
                        request: "ordered",
                        filter: "name",
                        in_ascending_order: true
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                    .then(response => response.json())
                    .then(json => console.log(json))
                    .then(json => this.Productsdb);
                console.warn(response.data);
            } catch (error) {
                console.warn(error);
            }
        }*/
        axios({

            method: "POST",
            url: "http://127.0.0.1:5000/goated_the_sql/products/all",
            data: {
                "request": "filtered&ordered",
                "category": "Peripherals",
                "filter": "name",
                "in_ascending_order": true
            }
        }).then(res => {
            const prods = res.data.args;
            this.Productsdb = res.data;
            console.log(this.Productsdb)
            this.setState({prods});//no clue for what this is
        });
        /*axios.get(`http://127.0.0.1:5000/goated_the_sql/products/all`)
            .then(res => {
                const prods = res.data;
                this.Productsdb = res.data["Products"];
                console.log(this.Productsdb)
                this.setState({prods});//no clue for what this is
            })*/
    }
    render() {

        var formData = new FormData(); // Currently empty
        formData.append('request', 'ordered');
        formData.append('category', 'Consoles');
        formData.append('filter', 'name');
        formData.append('in_ascending_order', true);
        const options = [
            { key: 1, text: 'name', value: 1 ,},
            { key: 2, text: 'price', value: 2 },
        ]
        const options2 = [
            { key: 1, text: 'High to Low', value: 1 },
            { key: 2, text: 'Low to High', value: 2 },
        ]


        return(<div className={"prodbackground"}>



                <Container >

                    <Card.Group centered>
{/*

                        <AllProducts info = {random_info2} />
*/}


                        <AllProducts info={this.Productsdb}/>

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
        {"id": 1, "name": "RTX 3080", "price": 1.01, "desc": "description", "image": rtx},
        {"id": 2, "name": "Intel 11th gen i7 CPU", "price": 1.01, "desc": "description", "image": rtx},
        {"id": 3, "name": "Intel 11th gen i9 CPU", "price": 1.01, "desc": "description", "image": rtx},
        {"id": 4, "name": "Intel 12th gen i9 CPU", "price": 1.01, "desc": "description", "image": rtx},
        {"id": 5, "name": "PS5", "price": 1.01, "desc": "description", "image": rtx},
        {"id": 6, "name": "Xbox Controller", "price": 1.01, "desc": "description", "image": rtx}];


    return <div className={"prodbackground"}>
    <Container >
        <Card.Group centered>
            <AllProducts info={random_info}/>
        </Card.Group>
    </Container>
    </div>
}

export default Products;*/
