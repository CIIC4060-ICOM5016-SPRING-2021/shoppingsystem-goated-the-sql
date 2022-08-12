import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Form,
  FormGroup,
  FormInput,
  GridColumn,
  Label,
} from "semantic-ui-react";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../utility/loading";

import "./account-section.css";
import {fetchAccountInfo, setUserDetails, updateUserDB} from "../../features/user/accountSlice";

function AccountSection() {
  const {isLoadingAccount} = useSelector(store => store.user);
  const accountDetails = useSelector((store) => store.user.details);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accountDetails.id === undefined) {
      window.location.href = "/";
    } else if(isLoadingAccount === true) {
      dispatch(fetchAccountInfo(accountDetails.id));
    }
  }, [dispatch, accountDetails, isLoadingAccount]);

  function updateUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    //The following values are made into constants because they seem to be the only way to access the values in the form
    //since those values are not accessible through the user object creation functions
    const fn = formData.get("first_name");
    const ln = formData.get("last_name");
    const pn = formData.get("phone_number");
    const pw = formData.get("password");

    const adfn = accountDetails["first name"];
    const adln = accountDetails["last name"];
    const adpn = accountDetails["phone #"];
    const adpw = accountDetails["password"];

    const userDBCopy = {
      user_id: accountDetails.id,
      first_name: fn ? fn : adfn,
      last_name: ln ? ln : adln,
      phone_number: pn ? pn : adpn,
      password: pw ? pw : adpw,
    };

    const userStateCopy = {
      id: accountDetails.id,
      "first name": fn ? fn : adfn,
      "last name": ln ? ln : adln,
      "phone #": pn ? pn : adpn,
      password: pw ? pw : adpw,
    }
    dispatch(updateUserDB(userDBCopy));
    dispatch(setUserDetails(userStateCopy));
  }

  if (isLoadingAccount === true || accountDetails === undefined) {
    return (
      <div className="loading-account-section">
        <Loading/>
      </div>
    );
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
          <Form onSubmit={updateUser}>
            <FormGroup widths="equal">
              <FormInput fluid name="first_name" label="First Name" placeholder="Paquita"/>
              <FormInput fluid name="last_name" label="Last Name" placeholder="La Del Barrio"/>
            </FormGroup>
            <FormInput fluid name="phone_number" label="Phone Number" placeholder="(787)-123-4567"/>
            <FormInput
              fluid
              name="password"
              label="Password"
              type="password"
              placeholder="p455w0rd"
            />
            <div className="account-form-button">
              <Button type="submit" content="Submit" secondary/>
            </div>
          </Form>
        </GridColumn>
      </>
    );
  }
}

export default AccountSection;
