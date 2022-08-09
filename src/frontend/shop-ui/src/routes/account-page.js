import {Button, ButtonGroup, Container, Grid, GridRow} from "semantic-ui-react";

import "./account-page.css"
import React, {useState} from "react";
import AccountSection from "../components/account-page/account-section";
import OrdersSection from "../components/account-page/orders-section";

function AccountPage() {
    const [state, setState] = useState({activeSection: "account"})
    const activeSection = state.activeSection;

    //TODO: Remove once logic is in place
    const ordersList = [
        {
            order_id: 144,
            order_total: "375",
            products_ordered: [
                {
                    category: "Storage",
                    desc: "Generic USB Drive 1GB",
                    name: "USB Drive 1GB",
                    price_sold: "25",
                    quantity_bought: 15
                }
            ],
            time_of_order: "2022-05-22 16:52:41.286809",
            total_product_quantity: 15,
            user_id: 193
        },
        {
            order_id: 141,
            order_total: "750",
            products_ordered: [
                {
                    category: "Storage",
                    desc: "Generic USB Drive 1GB",
                    name: "USB Drive 1GB",
                    price_sold: "25",
                    quantity_bought: 15
                },
                {
                    category: "Storage",
                    desc: "Generic USB Drive 1GB",
                    name: "USB Drive 1GB",
                    price_sold: "25",
                    quantity_bought: 15
                }
            ],
            time_of_order: "2022-05-19 00:48:51.005344",
            total_product_quantity: 30,
            user_id: 193
        }
    ]

    function sectionClicked(name) {
        setState({activeSection: name})
    }

    function getAccountDetails() {
        //TODO: Add logic here
    }

    function getOrderDetails() {
        //TODO: Add logic here
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
                                    getAccountDetails()
                                    return (<AccountSection />);
                                } else if (activeSection === "orders") {
                                    getOrderDetails()
                                    return (<OrdersSection orders={ordersList}/>);
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