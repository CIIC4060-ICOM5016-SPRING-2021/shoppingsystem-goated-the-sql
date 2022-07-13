import {Button, Card, Icon, Image, Loader} from "semantic-ui-react";
import React from "react";
import "./products.css";

function products(props) {
    const products = props.items;

    return (
        <>
            <div className="product-list-body">
                <React.Suspense fallback={<Loader content="Loading"/>}>
                    <Card.Group itemsPerRow={3}>
                        {products.map((item) => (
                            <Card key={item.id}>
                                <Image
                                    src="https://i.ytimg.com/vi/z_wcL_zg2hM/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDo4Dzvudez6Op0QRM9DCt9INaCZQ"/>
                                <Card.Content>
                                    <Card.Header content={item.name}/>
                                    <Card.Meta content={item.seller}/>
                                    <Card.Description content={item.description}/>
                                </Card.Content>
                                <Card.Content>
                                    <div className="item-card-body">
                                        <div className="price-n-quantity">
                                            <div className="item-card-price">${item.price}</div>
                                            <Button.Group basic size="medium">
                                                <Button icon="plus"/>
                                                <Button disabled content="14"/>
                                                <Button icon="minus"/>
                                            </Button.Group>
                                        </div>
                                        <Button positive animated="fade" size="medium" fluid>
                                            <Button.Content visible>
                                                <Icon name="arrow right"/>
                                            </Button.Content>
                                            <Button.Content hidden>Add to Cart</Button.Content>
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </React.Suspense>
            </div>
        </>
    );
}

export default products;
