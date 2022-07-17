import {Button, List} from "semantic-ui-react";
import React from "react";

function CartItem(props) {
    const cartItems = props.items;

    return (
        <List divided>
            {cartItems.map((item) =>
                <List.Item key={item.product_id}>
                    <List.Icon name="shopping cart" verticalAlign="middle"/>
                    <List.Content>
                        <Button.Group floated="right" basic compact>
                            <Button icon="plus"/>
                            <Button content={item.quantity} disabled/>
                            <Button icon="minus"/>
                        </Button.Group>
                        <List.Header content="Item Name"/>
                        <List.Description content={item.product_price}/>
                    </List.Content>
                </List.Item>
            )}
        </List>
    );
}

export default CartItem;