import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Form,
  FormButton,
  FormGroup,
  FormInput,
  GridColumn,
  Label,
} from "semantic-ui-react";
import React from "react";
import {useSelector} from "react-redux";
import Loading from "../utility/loading";

function AccountSection() {
  const {isLoading} = useSelector(store => store.account);
  const accountDetails = useSelector((store) => store.account.details);

  if (isLoading) {
    return (<Loading/>);
  } else {
    return (
      <>
        <GridColumn width={7}>
          <Card raised>
            <CardContent textAlign="center">
              <div className="account-current-details">
                <Label content="Current details" size="medium" horizontal/>
              </div>
              <CardHeader
                content={accountDetails["first name"] + " " + accountDetails["last name"]}
                textAlign="center"
              />
              <CardDescription
                content={"Phone Number: " + accountDetails["phone #"]}
                textAlign="center"
              />
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
            <FormInput
              fluid
              label="Password"
              type="password"
              placeholder="p455w0rd"
            />
            <div className="account-form-button">
              <FormButton content="Submit" secondary/>
            </div>
          </Form>
        </GridColumn>
      </>
    );
  }
}

export default AccountSection;
