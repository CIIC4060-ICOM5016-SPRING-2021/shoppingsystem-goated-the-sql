import React from 'react';
import {Button, Container, Form, Grid, Segment} from "semantic-ui-react";
import './LogIn.css';
import {Link} from "react-router-dom";


function Profile() {
    return (

        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 600}} padded={'horizontally'}>
                <Container>
                    <p className={"Title"}>
                        FirstName + LastName
                    </p>
                </Container>
                <Form size={'massive'}>
                    <Segment stacked size={'massive'}>
                        <Form.Input fluid icon='user'
                                    iconPosition='left'
                                    placeholder='Phone #'
                                    type='phone'
                        />
                        <Form.Input fluid icon='user'
                                    iconPosition='left'
                                    placeholder='First Name'
                                    type='text'
                        />
                        <Form.Input fluid icon='user'
                                    iconPosition='left'
                                    placeholder='Last Name'
                                    type='text'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button as={Link} to="/Products" color='red' style={{width: 300}}>
                            <p className={'Login'}>Done</p>
                        </Button>

                        <Button as={Link} to="/" color='red' style={{width: 300}}>
                            <p className={'Login'}>ERASE ACCOUNT</p>
                        </Button>

                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

    )
}

export default Profile;
