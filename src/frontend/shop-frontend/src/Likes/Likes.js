import React, {useState} from 'react';
import {Button, Card, Container, Divider, Grid, GridColumn, Header} from "semantic-ui-react";
import "./Likes.css"
import rtx from "../3080.png";
import AllLikes from "./Likes_item"

export default class Likes extends React.Component {


    render() {
        let random_info = [
            {"pid": 1, "pname": "RTX 3080"             , "pprice": 1.01, "pdescription": "description", "image": rtx, "like": true},
            {"pid": 2, "pname": "Intel 11th gen i7 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "like": true},
            {"pid": 3, "pname": "Intel 11th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "like": true},
            {"pid": 4, "pname": "Intel 12th gen i9 CPU", "pprice": 1.01, "pdescription": "description", "image": rtx, "like": true},
            {"pid": 5, "pname": "PS5"                  , "pprice": 1.01, "pdescription": "description", "image": rtx, "like": true},
            {"pid": 6, "pname": "Xbox Controller"      , "pprice": 1.01, "pdescription": "description", "image": rtx, "like": true}
        ];
        return (
            <div className={"back"}>
                <h1 className={"header"}>Likes</h1>
                <Container >
                    <Card.Group  centered>
                        <AllLikes info={random_info}/>
                    </Card.Group>
                </Container>
                <Divider></Divider>
                <Container   className ='footer'>

                    <Grid columns={2} columns='equal' padded  >
                        <GridColumn >
                            <Button color ='red' size='massive' >
                                Clear Likes list
                            </Button>
                        </GridColumn>
                        <GridColumn >

                            <Button color ='green' size='massive' >
                                Add all to Cart
                            </Button>

                        </GridColumn>
                    </Grid>

                </Container>



            </div>
        )
    }
}


