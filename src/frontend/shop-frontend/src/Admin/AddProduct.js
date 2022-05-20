import React from 'react';
import {Button, Container, Form, Grid, Segment} from "semantic-ui-react";
import '../LogIn.css';
import {Link} from "react-router-dom";


function AddProduct() {
    return (

        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 600}} padded={'horizontally'}>
                <Container>
                    <p className={"Title"}>
                        Add Product
                    </p>

                </Container>
                <Form size={'massive'}>
                    <Segment stacked size={'massive'}>
                        <Form.Input fluid
                                    placeholder='Name'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Description'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Price'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Category'
                                    type='text'
                        />
                        <Form.Input fluid
                                    placeholder='Stock'
                                    type='text'
                        />

                        <Button as={Link} to="/Admin" color='red' style={{width: 300}}>
                            <p className={'Login'}>Add Product</p>
                        </Button>

                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

    )
}

export default AddProduct;
