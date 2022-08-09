import {Button, ButtonGroup, Container, Grid, GridRow} from "semantic-ui-react";

import "./account-page.css"
import React, {useState} from "react";
import AccountSection from "../components/account-page/account-section";
import OrdersSection from "../components/account-page/orders-section";

function AccountPage() {
  const [state, setState] = useState({activeSection: "account"})
  const activeSection = state.activeSection;

  function sectionClicked(name) {
    setState({activeSection: name})
  }

  return (
    <>
      <div className="account-page-body">
        <Grid celled="internally">
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
            {
              (() => {
                if (activeSection === "account") {
                  return (<AccountSection/>);
                } else if (activeSection === "orders") {
                  return (<OrdersSection/>);
                }
              })()
            }
          </Grid.Row>
        </Grid>
      </div>
    </>
  )
}

export default AccountPage;