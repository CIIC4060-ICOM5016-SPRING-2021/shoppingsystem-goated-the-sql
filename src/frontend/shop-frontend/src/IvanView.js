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
            render: false,
        }
        
        // this.get_products = this.get_products.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.ivanProducts = this.ivanProducts.bind(this);
        this.ivan1Product = this.ivan1Product.bind(this);
        this.seeProd = this.seeProd.bind(this);

    }


    async ivanProducts(){
            //Print action done and make fetch request
            console.log('Fetching all products');
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

            console.log(this.props.user_info);

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
                <h1>Test Passing Data</h1>
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