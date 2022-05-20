import React from 'react';
import {Button, Container, Form, Grid, Segment} from "semantic-ui-react";
import '../LogIn.css';
import {Link} from "react-router-dom";
import axios from "axios";


class DeleteProduct extends React.Component {
    state = {product_id: ""}

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {fname, lname, phone, password, admin} = this.state;
        //Axios put method for updating the database
        axios
            .put(
                `http://127.0.0.1:5000/goated_the_sql/user/${this.props.match.params.id}`,
                {
                    user_to_update_id: parseInt(this.props.match.params.id),
                    first_name: fname,
                    last_name: lname,
                    valid: true,
                    password: password,
                    phone: phone,
                    admin: admin,
                }
            )
            .then((res) => {
                console.log(res.data);
            });

        console.log(this.state);
    };

    render() {
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
}

export default DeleteProduct;
