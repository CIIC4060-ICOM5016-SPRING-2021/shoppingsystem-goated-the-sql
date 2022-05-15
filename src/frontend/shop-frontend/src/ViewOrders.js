import React, {useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container, Form, FormInput,
    Grid,
    GridColumn,
    GridRow,
    Header,
    Icon
} from "semantic-ui-react";
import {Link} from "react-router-dom";
import './Admin.css'


function Admin() {


    return (
        <Container fluid={'true'} textAlign={'center'}>
            <Header>Viewing Orders</Header>
            <Form>
                <FormInput placeholder='UserId'/>
            </Form>
            {/* DO THE SHIT ON ALLPRODUCTS*/}
            <Grid centered={'true'} divided={'true'}>
                <GridColumn width={3}>
                    <Card raised className={'adminAction'}>
                        <CardContent className={'content'}>
                            <Icon name={'newspaper'} size={'huge'}/>
                            <CardHeader textAlign={'center'}>Orders</CardHeader>
                            <Grid centered>
                                <GridRow>
                                    <Button className={'icon'} icon='eye' as={Link} to="/Orders/View"/>
                                    <Button className={'icon'} icon='edit' as={Link} to="/Orders/Edit"/>
                                    <Button className={'icon'} icon='delete' as={Link} to="/Orders/Delete"/>
                                </GridRow>
                            </Grid>
                        </CardContent>
                    </Card>
                </GridColumn>
                <GridColumn width={3}>
                    <Card raised className={'adminAction'}>

                        <CardContent>
                            <Icon name={'user'} size={'huge'}/>

                            <CardHeader>Users</CardHeader>
                            <Grid>
                                <GridColumn>
                                    <Button className={'icon'} icon='delete' as={Link} to="/Users/Delete"/>

                                </GridColumn>
                            </Grid>
                        </CardContent>
                    </Card>
                </GridColumn>
                <GridColumn width={3}>
                    <Card raised className={'adminAction'}>
                        <CardContent>
                            <Icon name={'box'} size={'huge'}/>
                            <CardHeader>Products</CardHeader>
                            <Grid centered>
                                <GridRow>
                                    <Button className={'icon'} icon='plus' as={Link} to="/Products/Add"/>
                                    <Button className={'icon'} icon='edit' as={Link} to="/Products/Edit"/>
                                    <Button className={'icon'} icon='delete' as={Link} to="/Products/Delete"/>
                                </GridRow>
                            </Grid>
                        </CardContent>
                    </Card>
                </GridColumn>
            </Grid>
        </Container>

    )
}

export default Admin;