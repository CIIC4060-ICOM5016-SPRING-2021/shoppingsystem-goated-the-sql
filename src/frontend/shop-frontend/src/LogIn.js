import React from 'react';
import {Button, Container, Form, Grid, Segment} from "semantic-ui-react";
import './LogIn.css';
import {Link} from "react-router-dom";


function LogIn() {
    return (

        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 600}} padded={'horizontally'}>
                <Container>
                    <p className={"Title"}>
                        GoatStop
                    </p>
                </Container>
                <Form size={'massive'}>
                    <Segment stacked size={'massive'}>
                        <Form.Input fluid icon='user'
                                    iconPosition='left'
                                    placeholder='Phone #'
                                    type='phone'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                        <Button as={Link} to="/Products" color='red' style={{width: 300}}>
                            <p className={'Login'}>Login</p>
                        </Button>
                        <Button as={Link} to="/Admin/Products" color='red' style={{width: 300}}>
                            <p className={'Login'}>Admin Login</p>
                        </Button>

                    </Segment>
                </Form>
                <Grid textAlign='center' columns={2} padded={'vertically'}>
                    <Grid.Column>
                        <Link onClick to={'/ForgotPassword'}> Forgot Password? </Link> </Grid.Column>
                    <Grid.Column>
                        <Link onClick to={'/CreateAccount'}>Create Account </Link>
                    </Grid.Column>

                </Grid>
            </Grid.Column>
        </Grid>

    )
}

export default LogIn;
