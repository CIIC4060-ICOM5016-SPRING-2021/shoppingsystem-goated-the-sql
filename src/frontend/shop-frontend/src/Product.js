import React, {useState} from 'react';
import {Card, Container, Grid, Header, Image} from "semantic-ui-react";
import ps5 from "./PS5.png"
import './Product.css';
import {Outlet} from "react-router";

function Product(product) {
    const [data, setData] = useState("show");
    let dummy =
        {
            "pid": 1,
            "pname": "RTX 3080",
            "pprice": 1.01,
            "pdescription": "description",
            "image": ps5,
            "condition": "used"
        }
    console.log(product)
    return (<div className={"background"}>

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
                            </Container>

                        </div>

                    </Grid.Column>
                    <Grid.Column>
                        <div className={'backgroundPic'}>

                        </div>
                        {/*<Image src={dummy['image']} className={'backgroundPic'}/>*/}
                        <Container className={'description'}>
                            <p>
                                {dummy['pdescription']}
                            </p>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>

    )

}

export default Product;