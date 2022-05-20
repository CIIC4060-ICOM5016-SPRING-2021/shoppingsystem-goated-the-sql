import React from 'react';
import {Button, Container, Form, Grid, Segment} from "semantic-ui-react";
import '../LogIn.css';
import {Link} from "react-router-dom";


function DeleteOrder() {
    return (

        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 600}} padded={'horizontally'}>
                <Container>
                    <p className={"Title"}>
                        Delete Order
                    </p>

                </Container>
                <Form size={'massive'}>
                    <Segment stacked size={'massive'}>
                        <Form.Input fluid
                                    iconPosition='left'
                                    placeholder='Order Id'
                                    type='phone'
                        />

                        <Button as={Link} to="/Admin" color='red' style={{width: 300}}>
                            <p className={'Login'}>Delete Order</p>
                        </Button>

                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

    )
}

export default DeleteOrder;
