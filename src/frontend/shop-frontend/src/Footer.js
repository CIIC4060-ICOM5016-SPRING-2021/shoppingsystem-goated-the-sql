import React, {Component, useState} from 'react';
import {Button, Card, Container, Divider, Grid, GridColumn, Header, Image, Modal, Segment} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import "./Footer.css"

function Footer(){

    return <div className={"Foot"}><Divider></Divider>
    <Container   className ='footer'>







        <Grid columns={2} columns='equal' padded  >
            <GridColumn >
                <h2 > Shopping System </h2>
            </GridColumn>
            <GridColumn >
                <h3>
                    Members
                </h3>
                <p>Francisco A Casiano Rosado - francisco.casiano2@upr.edu</p>
                <p>Ivan G Jackson Rivera - ivan.jackson@upr.edu</p>
                <p>Orlando E Saldana Ramirez - orlando.saldana@upr.edu</p>
                <p>Edwin J Vega Reyes - edwin.vega4@upr.edu</p>
            </GridColumn>
        </Grid>

    </Container>
    </div>


}
export default Footer;
