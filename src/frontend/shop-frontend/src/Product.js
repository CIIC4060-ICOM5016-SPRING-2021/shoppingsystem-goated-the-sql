import React, {useState} from 'react';
import './Product.css';
import {BrowserRouter, Route, Routes,useParams} from 'react-router-dom';

import axios from "axios";
import {Button, Card, CardContent, Container, Grid, Header, Icon, Image} from "semantic-ui-react";
import {Label} from "recharts";

export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

 class Product extends React.Component  {

    product = []
    likes = []
    componentDidMount() {
/*

        ${this.props.pid}
*/
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

        return (
            <div className={"background"}>
                <Grid columns={2} verticalAlign={'middle'}>
                    <Grid.Row centered={'true'}>
                        <Grid.Column verticalAlign={"middle"} textAlign={'center'}>
                            <div class='info'>
                                <Image src={this.product['name']} size={'medium'}/>
                                <Header as={'h1'} inverted color={'black'}>{this.product['name']}</Header>
                                <Header as={'h3'} inverted color={'black'}>${this.product['price']}</Header>

                                <Container>
                                    <Header as={'h3'} inverted color={'black'} className={'Condition'}>Condition:
                                        <Header as={'h3'} inverted color={'black'}>{'New'}</Header>
                                    </Header>
                                    <Button.Group>
                                        <Button labelPosition='left' icon='minus'/>
                                        <Button icon='cart' content='Add to cart'/>
                                        <Button labelPosition='right' icon='plus'/>
                                    </Button.Group>
                                    <br/>
                                    <Button as='div' labelPosition='right'>
                                        <Button color='red'>
                                            <Icon name='heart'/>
                                            Like
                                        </Button>
                                        <Label as='a' basic color='red' pointing='left'>
                                            2,048
                                        </Label>
                                    </Button>
                                </Container>
                            </div>

                        </Grid.Column>
                        <Grid.Column>
                            <Card centered className={'card_description'}>
                                <CardContent>
                                    {this.product['desc']}
                                </CardContent>
                            </Card>

                            {/*<Image src={this.product['image']} className={'backgroundPic'}/>*/}

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

        )
    }
}
export default withRouter(Product);

//
// function Product(product) {
//     const [data, setData] = useState("show");
//
//     let this.product =
//         {
//             "pid": 1,
//             "pname": "RTX 3080",
//             "pprice": 1.01,
//             "pdescription": "It's worth mentioning that there's nothing inherently wrong with cheap handheld emulators. Hit em with the supersized shirts and the SOOOUUULJAAAA BOOYYYYYYY",
//             "image": ps5,
//             "condition": "used"
//         }
//     console.log(product)
//     return (<div className={"background"}>
//
//             <Grid columns={2} verticalAlign={'middle'}>
//                 <Grid.Row centered={'true'}>
//                     <Grid.Column verticalAlign={"middle"} textAlign={'center'}>
//                         <div class='info'>
//                             <Image src={this.product['image']} size={'medium'}/>
//                             <Header as={'h1'} inverted color={'black'}>{this.product['pname']}</Header>
//                             <Header as={'h3'} inverted color={'black'}>${this.product['pprice']}</Header>
//                             <Container>
//                                 <Header as={'h3'} inverted color={'black'} className={'Condition'}>Condition:
//                                     <Header as={'h3'} inverted color={'black'}>{this.product['condition']}</Header>
//                                 </Header>
//                                 <Button.Group>
//                                     <Button labelPosition='left' icon='minus'/>
//                                     <Button icon='cart' content='Add to cart'/>
//                                     <Button labelPosition='right' icon='plus'/>
//                                 </Button.Group>
//                                 <br/>
//                                 <Button as='div' labelPosition='right'>
//                                     <Button color='red'>
//                                         <Icon name='heart'/>
//                                         Like
//                                     </Button>
//                                     <Label as='a' basic color='red' pointing='left'>
//                                         2,048
//                                     </Label>
//                                 </Button>
//                             </Container>
//                         </div>
//
//                     </Grid.Column>
//                     <Grid.Column>
//                         <Card centered={'true'} className={'card_description'}>
//                             <CardContent>
//                                 {this.product['pdescription']}
//                             </CardContent>
//                         </Card>
//
//                         {/*<Image src={this.product['image']} className={'backgroundPic'}/>*/}
//
//                     </Grid.Column>
//                 </Grid.Row>
//             </Grid>
//         </div>
//
//     )
//
// }
//
// export default Product;