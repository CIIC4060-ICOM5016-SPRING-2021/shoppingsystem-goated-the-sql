import {List} from "semantic-ui-react";
import React from "react";

import "./cart-total-list.css"

function CartTotalList(props) {
    const cartItems = props.items;

    return (
        <>
            <List divided>
                {cartItems.map((item) =>
                    <List.Item key={item.product_id}>
                        <List.Content>
                            {/* TODO: Get the details of the item via API call and place the name below*/}
                            <List.Header content={"$" + (item.product_price * item.quantity)}/>
                            <div className="cart-page-order-item-math">
                                <List.Description content={"$" + item.product_price + " * " + item.quantity}/>
                            </div>
                        </List.Content>
                    </List.Item>
                )}
            </List>
        </>
    );
}

export default CartTotalList;