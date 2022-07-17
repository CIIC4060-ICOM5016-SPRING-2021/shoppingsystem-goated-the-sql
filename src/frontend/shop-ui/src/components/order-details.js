import {
    Button,
    List,
    ListContent,
    ListDescription,
    ListHeader,
    ListIcon,
    ListItem,
    ListList,
    Modal,
    ModalContent,
    ModalHeader
} from "semantic-ui-react";
import React, {useState} from "react";

function OrderDetails(props) {
    const [open, setOpen] = useState(false)
    const {products, orderID} = props;

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button floated="right" basic content="Show Details"/>}
        >
            <ModalHeader content={"Products Ordered - Order#" + orderID}/>
            <ModalContent>
                {products.map(
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
    );
}

export default OrderDetails;