import React from 'react';
import {Button, Container, Form, Grid, Segment} from "semantic-ui-react";
import './LogIn.css';
import {Link} from "react-router-dom";


function EditOrder() {
    return (

        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 600}} padded={'horizontally'}>
                <Container>
                    <p className={"Title"}>
                        Edit Order
                    </p>

                </Container>
                <Form size={'massive'}>
                    <Segment stacked size={'massive'}>
                        <Form.Input fluid
                                    iconPosition='left'
                                    placeholder='Order Id'
                                    type='text'
                        />
                        <Form.Input fluid icon='user'
                                    iconPosition='left'
                                    placeholder='User ID'
                                    type='text'
                        />
                        <Form.Input fluid icon='money'
                                    iconPosition='left'
                                    placeholder='Order Total'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Category'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Description'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Name'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Price Sold'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Quantity Bought'
                                    type='text'
                        />

                        <Button as={Link} to="/Admin" color='red' style={{width: 300}}>
                            <p className={'Login'}>Edit Order</p>
                        </Button>

                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

    )
}

export default EditOrder;
