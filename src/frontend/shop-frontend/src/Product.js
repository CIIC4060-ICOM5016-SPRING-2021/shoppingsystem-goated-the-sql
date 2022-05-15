import React, {useState} from 'react';
import './Product.css';

import axios from "axios";
import {Button, Card, CardContent, Container, Grid, Header, Icon, Image} from "semantic-ui-react";
import {Label} from "recharts";

export default class Product extends React.Component {
    product = []

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/goated_the_sql/product/142')
            .then(res => {
                const persons = res.data;
                this.product = res.data;
                console.log(this.product[0])
                this.setState({persons});
            })
    }

    render() {

        return (
            <div className={"background"}>
                {
                    this.product
                        .map(product =>
                            <p>{product['category']}</p>
                        )
                }
                <Grid columns={2} verticalAlign={'middle'}>
                    <Grid.Row centered={'true'}>
                        <Grid.Column verticalAlign={"middle"} textAlign={'center'}>
                            <div class='info'>
                                <Image src={dummy['image']} size={'medium'}/>
                                <Header as={'h1'} inverted color={'black'}>{dummy['pname']}</Header>
                                <Header as={'h3'} inverted color={'black'}>${dummy['pprice']}</Header>
                                <Container>
                                    <Header as={'h3'} inverted color={'black'} className={'Condition'}>Condition:
                                        <Header as={'h3'} inverted color={'black'}>{dummy['condition']}</Header>
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
                                    {dummy['pdescription']}
                                </CardContent>
                            </Card>

                            {/*<Image src={dummy['image']} className={'backgroundPic'}/>*/}

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

        )
    }
}
//
// function Product(product) {
//     const [data, setData] = useState("show");
//
//     let dummy =
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
//                             <Image src={dummy['image']} size={'medium'}/>
//                             <Header as={'h1'} inverted color={'black'}>{dummy['pname']}</Header>
//                             <Header as={'h3'} inverted color={'black'}>${dummy['pprice']}</Header>
//                             <Container>
//                                 <Header as={'h3'} inverted color={'black'} className={'Condition'}>Condition:
//                                     <Header as={'h3'} inverted color={'black'}>{dummy['condition']}</Header>
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
//                                 {dummy['pdescription']}
//                             </CardContent>
//                         </Card>
//
//                         {/*<Image src={dummy['image']} className={'backgroundPic'}/>*/}
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