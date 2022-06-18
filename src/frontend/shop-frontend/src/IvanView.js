import React from 'react';
import {Button} from 'semantic-ui-react';
import ShowProducts from "./ShowProducts";
import {Link} from "react-router-dom";

class IvanView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            category: '',
            desc: '',
            id: 143,
            name: '',
            price: 0,
            stock: 0,
            visible: false,
            seeingProducts: false,
            render: false
        }
        // this.get_products = this.get_products.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.ivanProducts = this.ivanProducts.bind(this);
        this.ivan1Product = this.ivan1Product.bind(this);
        this.seeProd = this.seeProd.bind(this);

    }

    async get_products(){
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
            console.log(data["Products"][0]);
            this.setState({
                products: data['Products'][1],
                category: data["Products"][0]['category'],
                desc: data["Products"][0]['desc'],
                id: data["Products"][0]['id'],
                name: data["Products"][0]['name'],
                price: data["Products"][0]['price'],
                stock: data["Products"][0]['stock'],
                visible: data["Products"][0]['visible']
            });

            console.log(this.state);

        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }

    }

    async ivanProducts(){
            //Print action done and make fetch request
            console.log('ivan');
            const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/products/all`);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(data);

            this.setState({
                products: data['Products']
            });
            // console.log(this.state);

    }

    async ivan1Product(id){
            //Print action done and make fetch request
            console.log('ivan');
            let string2fetch = 'http://127.0.0.1:5000/goated_the_sql/product/'.concat(id.toString())
            console.log(string2fetch);

            const res = await fetch(string2fetch);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();

            this.setState({
                category: data[0]['category'],
                desc: data[0]['desc'],
                id: data[0]['id'],
                name: data[0]['name'],
                price: data[0]['price'],
                stock: data[0]['stock'],
                visible: data[0]['visible']
            });
            // console.log(this.state);

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

    getProduct(id){
        this.ivan1Product(id);
        this.setState({
            seeingProducts: true
        });
    }

    seeProd(){
        this.setState({
            render: false,
            seeingProducts: true
        });
    }


    getProducts(){
        this.ivanProducts();
        this.setState( {
            render: true,
            seeingProducts: false

        });
    }
    render() {
        if (this.state.seeingProducts) {
            return (
                    <div className="Test">
                        <ShowProducts info={this.state}/>
                    </div>
            );
        }
        else {
             return (
            // {seeingProducts &&
            <div className="Test">
                <h1>Test Fetch</h1>
                <Button
                    onClick={this.getProducts}
                >
                    GET Products
                </Button>
                 <Button
                    onClick={this.getProduct}
                    info={this.state}
                    // as={Link} to={'/ShowProducts'}

                >
                    GET 1 PRODUCT
                </Button>
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
                <br/>
                {this.state.render &&
                <ul>
                    {this.state.products.map(product => (
                         <li key={product.id}>
                             <Button
                                 info={product}
                                 onClick={() => this.getProduct(product.id)}
                                 >
                                    {product.name}
                             </Button>
                         </li>
                        ))}
                </ul>
                }
            </div>


    // }
        );
        }

    }
}


export default IvanView;