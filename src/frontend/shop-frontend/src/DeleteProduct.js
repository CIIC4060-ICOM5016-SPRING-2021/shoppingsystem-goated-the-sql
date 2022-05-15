import React from 'react';
import {Button, Container, Form, Grid, Segment} from "semantic-ui-react";
import './LogIn.css';
import {Link} from "react-router-dom";


function DeleteProduct() {
    return (

        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 600}} padded={'horizontally'}>
                <Container>
                    <p className={"Title"}>
                        Delete Product
                    </p>

                </Container>
                <Form size={'massive'}>
                    <Segment stacked size={'massive'}>
                        <Form.Input fluid icon={'user'}
                                    iconPosition='left'
                                    placeholder='Product Id'
                                    type='text'
                        />

                        <Button as={Link} to="/Admin" color='red' style={{width: 300}}>
                            <p className={'Login'}>Delete Product</p>
                        </Button>

                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

    )
}

export default DeleteProduct;
