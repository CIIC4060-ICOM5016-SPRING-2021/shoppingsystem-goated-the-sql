import React, {Component, useState} from 'react';
import {Button, Container, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
import ShowProducts from "./ShowProducts";

class TestView extends React.Component {

    async get_products() {
        try{
            //Print action done and make fetch request
            console.log('GET Products');
            const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/products/all`);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(data["Products"]);
            return <Container>
                <ShowProducts info = {data["Products"]}/>
            </Container>
        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }

    }

    async add_product() {

        const new_product_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name:"Keyboard2",
                description:"The fanciest keyboard youve ever seen!",
                price: 1999.99,
                category:"Peripherals",
                stock: 1
            })
        }

        try{
            //Print action done and make fetch request
            console.log('POST Product');
            const res = await fetch(
                'http://127.0.0.1:5000/goated_the_sql/product/add', new_product_options);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(`New product id is: ${data['id']}`);
            console.log(data);

        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }
    }

    async delete_product() {

        let product_id = 150;

        const delete_product_options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: 213
            })
        }

        try{
            //Print action done and make fetch request
            console.log(`DELETE Product: ${product_id}`);
            const res = await fetch(
                `http://127.0.0.1:5000/goated_the_sql/product/${product_id}`, delete_product_options);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(data);

        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }
    }

    async update_product() {

        const product_id = 151;

        const update_product_options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([
                {
                    user_id: 213
                },
                {
                    product_id: `${product_id}`,
                    name: "Prod1",
                    description: "They call me Houdini",
                    price: 169.99,
                    category: "Consoles",
                    stock: 1,
                    visible: true
                }
            ])
        }

        try{
            //Print action done and make fetch request
            console.log('PUT Product');
            const res = await fetch(
                `http://127.0.0.1:5000/goated_the_sql/product/${product_id}`, update_product_options);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(data);

        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }
    }

    async get_users() {
        try{
            //Print action done and make fetch request
            console.log('GET Users');
            const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/users/all`);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(data);

        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }

    }

    async get_user() {

        let user_id = 187;

        try{
            //Print action done and make fetch request
            console.log('GET Users');
            const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/user/${user_id}`);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(data);

        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }

    }

    render() {
        return (
          <div className="Test">
            <h1>Test Fetch</h1>
                <button 
                onClick={this.get_products}
                >
                GET Products
                </button>
                <button 
                onClick={this.add_product}
                >
                POST Product
                </button>
                <button 
                onClick={this.delete_product}
                >
                DELETE Product
                </button>
                <button 
                onClick={this.update_product}
                >
                PUT Product
                </button>
                <button 
                onClick={this.get_users}
                >
                GET Users
                </button>
                <button 
                onClick={this.get_user}
                >
                GET User
                </button>
          </div>

        );
      }
}


export default TestView;