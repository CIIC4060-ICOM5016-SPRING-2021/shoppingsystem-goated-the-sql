import React from 'react';
import {Button, Container, Form, Grid, Segment} from "semantic-ui-react";
import '../LogIn.css';
import {Link} from "react-router-dom";


function DeleteUser() {
    return (

        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 600}} padded={'horizontally'}>
                <Container>
                    <p className={"Title"}>
                        Delete User
                    </p>

                </Container>
                <Form size={'massive'}>
                    <Segment stacked size={'massive'}>
                        <Form.Input fluid icon={'user'}
                                    iconPosition='left'
                                    placeholder='User Id'
                                    type='text'
                        />

                        <Button as={Link} to="/Admin" color='red' style={{width: 300}}>
                            <p className={'Login'}>Delete User</p>
                        </Button>

                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

    )
}

export default DeleteUser;
