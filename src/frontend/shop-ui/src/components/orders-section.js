import {
    Button,
    Container,
    List,
    ListContent,
    ListDescription,
    ListHeader,
    ListIcon,
    ListItem,
    ListList,
    Loader,
    Modal,
    ModalContent,
    ModalHeader
} from "semantic-ui-react";
import React, {useState} from "react";

import "./orders-section.css"

function OrdersSection(props) {
    const [state, setState] = useState({showModal: false});
    const orders = props.orders;

    function modalVisible(bool) {
        setState({showModal: bool})
    }

    return (
        <>
            <Container className="orders-section-title">
                <h1>Your Orders</h1>
            </Container>
            <React.Suspense fallback={<Loader content="Loading..."/>}>
                {/*TODO: Make the following stuff their own components*/}
                <Container>
                    <List divided>
                        {/*TODO: Figure out why the ordered products only show up for a single order and not all of them*/}
                        {orders.map(({order_id, time_of_order, products_ordered, order_total}) =>
                            <ListItem className="orders-section-item" key={order_id}>
                                <ListIcon name="archive" size="large" verticalAlign="middle"/>
                                <ListContent>
                                    <Modal
                                        onClose={() => modalVisible(false)}
                                        onOpen={() => modalVisible(true)}
                                        open={state.showModal}
                                        trigger={<Button floated="right" basic content="Show Details"/>}
                                    >
                                        <ModalHeader content={"Products Ordered - Order#" + order_id}/>
                                        <ModalContent>
                                            {products_ordered.map(
                                                (product, index) =>
                                                    <List key={index}>
                                                        {/*TODO: Maybe add the ability to click on item name and it will take you to the item's page*/}
                                                        <ListItem>
                                                            <ListIcon name="tag"/>
                                                            <ListContent>
                                                                <ListHeader content={product.name}/>
                                                                <ListDescription>
                                                                    <ListList>
                                                                        <ListItem
                                                                            content={"- Category: " + product.category}/>
                                                                        <ListItem
                                                                            content={"- Price Bought: $" + product.price_sold}/>
                                                                        <ListItem
                                                                            content={"- Quantity: " + product.quantity_bought}/>
                                                                    </ListList>
                                                                </ListDescription>
                                                            </ListContent>
                                                        </ListItem>
                                                    </List>
                                            )
                                            }
                                        </ModalContent>
                                    </Modal>
                                    <ListHeader content={"Order #" + order_id}/>
                                    <ListDescription
                                        content={new Date(time_of_order).toLocaleDateString() + " - Total: $" + order_total}/>
                                </ListContent>
                            </ListItem>
                        )}
                    </List>
                </Container>
            </React.Suspense>
        </>
    )
        ;
}

export default OrdersSection;