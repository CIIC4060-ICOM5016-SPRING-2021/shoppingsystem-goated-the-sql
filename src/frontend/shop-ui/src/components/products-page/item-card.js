import { Button, Card, Icon, Image, Grid, Dropdown } from "semantic-ui-react";
import React from "react";

import "./item-card.css";
import Loading from "../utility/loading";

import {useDispatch, useSelector} from "react-redux";
import {addLikedItem} from "../../features/likes/likesSlice";
import {filterByCat, orderByPriceAsc, orderByPriceDesc} from "../../features/products/productSlice";

function Products() {
  const {products, isLoading} = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const categories = [
    {
      key: 0,
      text: "Audio",
      value: "audio",
    },
    {
      key: 1,
      text: "Collectibles",
      value: "collectibles",
    },
    {
      key: 2,
      text: "Consoles",
      value: "consoles",
    },
    {
      key: 3,
      text: "Controllers",
      value: "controllers",
    },
    {
      key: 4,
      text: "Gift Cards",
      value: "gift cards",
    },
    {
      key: 5,
      text: "PC",
      value: "pc",
    },
    {
      key: 6,
      text: "Peripherals",
      value: "peripherals",
    },
    {
      key: 7,
      text: "Smartphones",
      value: "smartphones",
    },
    {
      key: 8,
      text: "Storage",
      value: "storage",
    },
    {
      key: 9,
      text: "Video Games",
      value: "video games",
    },
  ];

  function likeItem(id) {
    dispatch(addLikedItem(id));
  }
  function orderByPriceAscending() {
    dispatch(orderByPriceAsc());
  }
  function orderByPriceDescending() {
    dispatch(orderByPriceDesc());
  }
  function orderByCategory(e,category) {
    dispatch(filterByCat(category));
  }

  if (isLoading) {
    return <Loading/>
  } else {
    return (
      <>
        <div className="product-list-body">
          <Grid celled="internally">
            <Grid.Row>
              <div className="product-list-sort-selection">
                <h1>Sort by</h1>
                {/* TODO: Add indicator of which button was clicked */}
                {/* TODO: Disable category button if filter by price has been selected and vice versa */}
                <Button icon="up arrow" basic content="Price: Ascending" onClick={() => orderByPriceAscending()}/>
                <Button icon="down arrow" basic content="Price: Descending" onClick={() => orderByPriceDescending()}/>
                <Dropdown
                  placeholder="Category"
                  selection
                  options={categories}
                  onChange={orderByCategory}

                  // TODO: Find out how to add onClick functionality to dynamic selection values
                ></Dropdown>
              </div>
            </Grid.Row>
            <Grid.Row>
              <div className="product-list-item-cards">
                <Card.Group itemsPerRow={3}>
                  {products["Products"].map((item) => (
                    <Card key={item.id}>
                      <Image
                        src="https://i.ytimg.com/vi/z_wcL_zg2hM/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDo4Dzvudez6Op0QRM9DCt9INaCZQ"/>
                      <Card.Content>
                        <Card.Header content={item.name}/>
                        <Card.Meta content={item.category}/>
                        <Card.Description content={item.desc}/>
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
                          <div className="item-card-cart-n-wishlist">
                            <Button icon="heart" primary onClick={() => likeItem(item.id)}/>
                            <Button positive animated="fade" size="medium" fluid>
                              <Button.Content visible>
                                <Icon name="arrow right"/>
                              </Button.Content>
                              <Button.Content hidden>Buy</Button.Content>
                            </Button>
                          </div>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </div>
            </Grid.Row>
          </Grid>
          {/*</React.Suspense>*/}
        </div>
      </>
    );
  }
}

export default Products;
