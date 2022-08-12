import {Button, Card, Dropdown, Grid, Icon, Image} from "semantic-ui-react";
import React, {useEffect} from "react";

import "./item-card.css";
import Loading from "../utility/loading";

import {useDispatch, useSelector} from "react-redux";
import {filterByCat, getAllProducts, orderByPriceAsc, orderByPriceDesc} from "../../features/products/productSlice";
import {addProductToCartDB} from "../../features/cart/cartSlice";
import {addLikedItemDB} from "../../features/likes/likesSlice";

function Products() {
  const {products, isLoading} = useSelector((store) => store.product);
  const {id} = useSelector((store) => store.user.details);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }

    if (id === undefined) {
      window.location.href = "/";
    }
  }, [dispatch, products, id]);

  const categories = [
    {
      key: 0,
      text: "All",
      value: "all",
    },
    {
      key: 1,
      text: "Audio",
      value: "audio",
    },
    {
      key: 2,
      text: "Collectibles",
      value: "collectibles",
    },
    {
      key: 3,
      text: "Consoles",
      value: "consoles",
    },
    {
      key: 4,
      text: "Controllers",
      value: "controllers",
    },
    {
      key: 5,
      text: "Gift Cards",
      value: "gift cards",
    },
    {
      key: 6,
      text: "PC",
      value: "pc",
    },
    {
      key: 7,
      text: "Peripherals",
      value: "peripherals",
    },
    {
      key: 8,
      text: "Smartphones",
      value: "smartphones",
    },
    {
      key: 9,
      text: "Storage",
      value: "storage",
    },
    {
      key: 10,
      text: "Video Games",
      value: "video games",
    },
  ];

  function likeItem(itemID) {
    dispatch(addLikedItemDB({user_id: id, product: itemID}));
  }

  function orderByPriceAscending() {
    dispatch(orderByPriceAsc());
  }

  function orderByPriceDescending() {
    dispatch(orderByPriceDesc());
  }

  function orderByCategory(e, category) {
    dispatch(filterByCat(category));
  }

  function addToCart(item) {
    dispatch(addProductToCartDB({product: item, user_id: id}));
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
                  defaultValue="all"
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
                        src="https://i.ytimg.com/vi/hYIsp4qA-z4/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDkz9Org_0z_DjBie5FR9YuflgXcg"/>
                      <Card.Content>
                        <Card.Header content={item.name}/>
                        <Card.Meta content={item.category}/>
                        <Card.Description content={item.desc}/>
                      </Card.Content>
                      <Card.Content>
                        <div className="item-card-body">
                          <div className="price-n-quantity">
                            <div className="item-card-price">${item.price}</div>
                          </div>
                          <div className="item-card-cart-n-wishlist">
                            <Button icon="heart" primary onClick={() => likeItem(item)}/>
                            <Button positive animated="fade" size="medium" fluid onClick={() => addToCart(item)}>
                              <Button.Content visible>
                                <Icon name="arrow right"/>
                              </Button.Content>
                              <Button.Content hidden>Add to Cart</Button.Content>
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
