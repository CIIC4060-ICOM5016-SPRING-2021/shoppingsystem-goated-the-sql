import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardMeta,
    Container,
    Form,
    FormButton,
    FormGroup,
    FormInput,
    Grid,
    GridColumn,
    GridRow,
    Label,
    List, ListContent, ListDescription, ListHeader,
    ListIcon, ListItem,
    Loader
} from "semantic-ui-react";

import "./account.css"
import React, {useState} from "react";

function AccountPage(props) {
    const [state, setState] = useState({activeSection: "account"})
    const activeSection = state.activeSection;

    function sectionClicked(name) {
        setState({activeSection: name})
    }

    if (activeSection === "account") {
        return (
            <>
                <div className="account-page-body">
                    <Grid columns={2} celled="internally">
                        <GridRow>
                            <Container textAlign="center" className="account-section-buttons">
                                <ButtonGroup fluid basic>
                                    <Button content="Account"
                                            active={activeSection === "account"}
                                            onClick={() => {
                                                sectionClicked("account")
                                            }}
                                    />
                                    <Button content="Orders"
                                            active={activeSection === "orders"}
                                            onClick={() => {
                                                sectionClicked("orders")
                                            }}
                                    />
                                </ButtonGroup>
                            </Container>
                        </GridRow>
                        <Grid.Row>
                            {/*TODO: Make the following stuff their own components*/}
                            <GridColumn width={7}>
                                <Card raised>
                                    <CardContent textAlign="center">
                                        <div className="account-current-details">
                                            <Label content="Current details" size="medium" horizontal/>
                                        </div>
                                        <CardHeader content={props.fname + " " + props.lname} textAlign="center"/>
                                        <CardMeta content={"Joined " + props.created} textAlign="center"/>
                                        <CardDescription content={"Phone Number: " + props.pnum} textAlign="center"/>
                                    </CardContent>
                                </Card>
                            </GridColumn>
                            <GridColumn width={9}>
                                <Form>
                                    <FormGroup widths="equal">
                                        <FormInput fluid label="First Name" placeholder="Paquita"/>
                                        <FormInput fluid label="Last Name" placeholder="La Del Barrio"/>
                                    </FormGroup>
                                    <FormInput fluid label="Phone Number" placeholder="(787)-123-4567"/>
                                    <FormInput fluid label="Password" type="password" placeholder="p455w0rd"/>
                                    <div className="account-form-button">
                                        <FormButton content="Submit" secondary/>
                                    </div>
                                </Form>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
                </div>
            </>
        );
    } else if (activeSection === "orders") {
        return (
            <>
                <div className="account-page-body">
                    <Grid columns={1} celled="internally">
                        <GridRow>
                            <Container textAlign="center" className="account-section-buttons">
                                <ButtonGroup fluid basic>
                                    <Button content="Account"
                                            active={activeSection === "account"}
                                            onClick={() => {
                                                sectionClicked("account")
                                            }}
                                    />
                                    <Button content="Orders"
                                            active={activeSection === "orders"}
                                            onClick={() => {
                                                sectionClicked("orders")
                                            }}
                                    />
                                </ButtonGroup>
                            </Container>
                        </GridRow>
                        <Grid.Row>
                            <Container className="orders-section-title">
                                <h1>Your Orders</h1>
                            </Container>
                            <React.Suspense fallback={<Loader content="Loading..."/>}>
                                {/*TODO: Make the following stuff their own components*/}
                                <Container>
                                <List divided>
                                    {/*TODO: Add padding to these orders*/}
                                    <ListItem>
                                        <ListIcon name="archive" size="large" verticalAlign="middle"/>
                                        <ListContent>
                                            <Button basic floated="right" content="Show Details"/>
                                            <ListHeader content="Order #12345"/>
                                            <ListDescription content="Fulfilled on 12/09/1776"/>
                                        </ListContent>
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon name="archive" size="large" verticalAlign="middle"/>
                                        <ListContent>
                                            <Button basic floated="right" content="Show Details"/>
                                            <ListHeader content="Order #12345"/>
                                            <ListDescription content="Fulfilled on 12/09/1776"/>
                                        </ListContent>
                                    </ListItem>
                                </List>
                                </Container>
                            </React.Suspense>
                        </Grid.Row>
                    </Grid>
                </div>
            </>
        );
    }
}

export default AccountPage;