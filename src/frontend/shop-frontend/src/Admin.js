import React, {useState} from 'react';
import {Card, CardContent, CardHeader, Container, Grid, GridColumn, GridRow, Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";


function Admin() {

    return (
        <Container fluid={'true'} textAlign={'center'}>
            <Header>Admin Actions</Header>
            <Grid centered={'true'}>
                <GridColumn>
                    <Card>
                        <CardContent>
                            <Icon name={'newspaper'}/>
                            <CardHeader>Orders</CardHeader>
                            <Grid>
                                <GridColumn>
                                    <Icon as={Link} to={'/Orders/View'} name={'eye'}/>
                                </GridColumn>
                                <GridColumn>
                                    <Icon as={Link} to={'/Orders/Edit'} name={'edit'}/>
                                </GridColumn>
                                <GridColumn>
                                    <Icon as={Link} to={'/Orders/Delete'} name={'delete'} color={'red'}/>
                                </GridColumn>
                            </Grid>
                        </CardContent>
                    </Card>
                </GridColumn>
                <GridColumn>
                    <Card>
                        <CardContent>
                            <Icon name={'user'}/>
                            <CardHeader>Users</CardHeader>
                            <Grid>
                                <GridColumn>
                                    <Icon as={Link} to={'/Users/Delete'} name={'delete'}/>
                                </GridColumn>
                            </Grid>
                        </CardContent>
                    </Card>
                </GridColumn>
                <GridColumn>
                    <Card>
                        <CardContent>
                            <Icon name={'box'}/>
                            <CardHeader>Products</CardHeader>
                            <Grid>
                                <GridColumn>
                                    <Icon as={Link} to={'/Products/Add'} name={'plus'}/>
                                </GridColumn>
                                <GridColumn>
                                    <Icon as={Link} to={'/Products/Edit'} name={'edit'}/>
                                </GridColumn>
                                <GridColumn>
                                    <Icon as={Link} to={'/Products/Delete'} name={'delete'}/>
                                </GridColumn>
                            </Grid>
                        </CardContent>
                    </Card>
                </GridColumn>
            </Grid>
        </Container>

    )
}

export default Admin;