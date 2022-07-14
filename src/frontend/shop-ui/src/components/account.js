import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardMeta,
    Form,
    FormButton,
    FormGroup,
    FormInput,
    Grid,
    GridColumn,
    GridRow,
    Label
} from "semantic-ui-react";

import "./account.css"

function AccountPage(props) {
    return (
        <>
            <div className="account-page-body">
                <Grid columns={2} celled="internally">
                    <GridRow>
                            <ButtonGroup fluid basic>
                                <Button content="Account"/>
                                <Button content="Orders"/>
                            </ButtonGroup>
                    </GridRow>
                    <Grid.Row>
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
}

export default AccountPage;