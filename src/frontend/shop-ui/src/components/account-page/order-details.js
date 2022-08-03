import {
  Button,
  List,
  Modal,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import React, { useState } from "react";

function OrderDetails(props) {
  const [open, setOpen] = useState(false);
  const { products, orderID } = props;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button floated="right" basic content="Show Details" />}
    >
      <ModalHeader content={"Products Ordered - Order#" + orderID} />
      <ModalContent>
        {products.map((product, index) => (
          <List key={index}>
            {/*TODO: Maybe add the ability to click on item name and it will take you to the item's page*/}
            <List.Item>
              <List.Icon name="tag" />
              <List.Content>
                <List.Header content={product.name} />
                <List.Description>
                  <List.List>
                    <List.Item content={"- Category: " + product.category} />
                    <List.Item
                      content={"- Price Bought: $" + product.price_sold}
                    />
                    <List.Item
                      content={"- Quantity: " + product.quantity_bought}
                    />
                  </List.List>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        ))}
      </ModalContent>
    </Modal>
  );
}

export default OrderDetails;
