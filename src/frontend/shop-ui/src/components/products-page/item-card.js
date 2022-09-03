import {Button, Card, Dropdown, Form, Grid, Icon, Image, Modal} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import "./item-card.css";
import Loading from "../utility/loading";

import {useDispatch, useSelector} from "react-redux";
import {
  addNewProductToDB,
  deleteProduct,
  filterByCat,
  getAllProducts,
  orderByPriceAsc,
  orderByPriceDesc,
  setProductDetails,
  updateProduct
} from "../../features/products/productSlice";
import {addProductToCartDB} from "../../features/cart/cartSlice";
import {addLikedItemDB} from "../../features/likes/likesSlice";

function Products() {
  const {products, isLoading} = useSelector((store) => store.product);
  const {id, admin} = useSelector((store) => store.user.details);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let categories = [{key: 0, text: "All", value: "all"}];

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts())
        .then(

        );
    }

    if (id === undefined) {
      window.location.href = "/";
    }
  }, [dispatch, products, id]);

  // Adds the categories to the dropdown dynamically so that there is always an up-to-date list of categories
  if (products["Products"] !== undefined) {
    products["Products"].forEach((product) => {
      if (categories.filter((category) => category.text === product.category).length === 0) {
        categories.push(
          {
            key: categories.length,
            text: product.category,
            value: product.category.toLowerCase()
          }
        );
      }
    });
  }

    function likeItem(itemID) {
      dispatch(addLikedItemDB({user_id: id, product: itemID}));
    }
    function addToCart(item) {
      dispatch(addProductToCartDB({product: item, user_id: id}));
    }
    function removeProduct(item) {
      dispatch(deleteProduct({requesterId: id, product: item})).then(() => {
        dispatch(getAllProducts())
      });
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

    function updateProductDetails(event, item) {
      event.preventDefault();
      const formData = new FormData(event.target);

      const fn = formData.get("item_name");
      const fc = formData.get("item_category");
      const fd = formData.get("item_description");
      const fp = formData.get("item_price");
      const fs = formData.get("item_stock");

      const itemLabel = item.children[0].props.label;
      const itemId = parseInt(itemLabel.match(/\d+/)[0]);

      const pn = item.children[0].props.placeholder;
      const pc = item.children[1].props.placeholder;
      const pd = item.children[2].props.placeholder;
      const pp = parseFloat(item.children[3].props.placeholder);
      const ps = parseInt(item.children[4].props.placeholder);

      const productDBCopy = {
        product_id: itemId,
        name: fn ? fn : pn,
        description: fd ? fd : pd,
        price: fp ? fp : pp,
        category: fc ? fc : pc,
        stock: fs ? fs : ps,
        visible: true,
      }
      const productStateCopy = {
        category: fc ? fc : pc,
        desc: fd ? fd : pd,
        id: itemId,
        name: fn ? fn : pn,
        price: fp ? fp : pp,
        stock: fs ? fs : ps,
        visible: true,
      }
      dispatch(updateProduct({requesterId: id, product: productDBCopy}));
      dispatch(setProductDetails(productStateCopy));
    }

    function ShowAddProductButton() {
      if (admin === true) {
        if (isLoading) {
          return <Loading/>;
        } else {
          return (
            <>
              <Modal
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                open={open}
                trigger={<Button content="Add Product" icon="plus" positive onClick={() => setOpen(true)}/>}
              >
                <Modal.Header>Add Product</Modal.Header>
                <Modal.Content>
                  <Form size="small" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);

                    const fn = formData.get("item_name");
                    const fc = formData.get("item_category");
                    const fd = formData.get("item_description");
                    const fp = formData.get("item_price");
                    const fs = formData.get("item_stock");

                    const newProductDetails = {
                      name: fn,
                      category: fc,
                      description: fd,
                      price: fp,
                      stock: fs,
                    }

                    dispatch(addNewProductToDB({product: newProductDetails}))
                      .then(() => {
                        dispatch(getAllProducts());
                        setOpen(false);
                      });
                  }}>
                    <Form.Input label="Product Name" name="item_name"/>
                    <Form.Input label="Category" name="item_category"/>
                    <Form.TextArea label="Description" name="item_description"/>
                    <Form.Input label="Price" name="item_price"/>
                    <Form.Input label="Stock" name="item_stock"/>
                    <Form.Button primary fluid type="submit" content="Add Product"/>
                  </Form>
                </Modal.Content>
              </Modal>
            </>
          );
        }
      }
    }
    function showAdminDetails(item) {
      if (admin === true) {
        return (
          <>
            <Image
              src="https://i.ytimg.com/vi/hYIsp4qA-z4/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDkz9Org_0z_DjBie5FR9YuflgXcg"/>
            <Card.Content>
              <Form size="small" onSubmit={(e, item) => updateProductDetails(e, item)}>
                <Form.Input label={`Product Name (ID:${item.id})`} placeholder={item.name} name="item_name"/>
                <Form.Input label="Category" placeholder={item.category} name="item_category"/>
                <Form.TextArea label="Description" placeholder={item.desc} name="item_description"/>
                <Form.Input label="Price" placeholder={item.price} name="item_price"/>
                <Form.Input label="Stock" placeholder={item.stock} name="item_stock"/>
                <Form.Button primary fluid type="submit">Update</Form.Button>
              </Form>
            </Card.Content>
            <Card.Content>
              <div className="item-card-body">
                <div className="item-card-cart-n-wishlist">
                  <Button icon="trash" content="Remove" negative fluid onClick={() => removeProduct(item)}/>
                </div>
              </div>
            </Card.Content>
          </>
        );
      } else {
        return (
          <>
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
                  <div className="item-card-price">
                    ${item.price}
                    <h6>{item.stock} in stock</h6>
                  </div>
                </div>
                <div className="item-card-cart-n-wishlist">
                  <Button icon="heart" primary onClick={() => likeItem(item)}/>
                  <Button positive animated="fade" size="medium" fluid
                          onClick={() => addToCart(item)}>
                    <Button.Content visible>
                      <Icon name="arrow right"/>
                    </Button.Content>
                    <Button.Content hidden>Add to Cart</Button.Content>
                  </Button>
                </div>
              </div>
            </Card.Content>
          </>
        );
      }
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
                  <Button icon="up arrow" basic content="Price: Ascending"
                          onClick={() => orderByPriceAscending()}/>
                  <Button icon="down arrow" basic content="Price: Descending"
                          onClick={() => orderByPriceDescending()}/>
                  <Dropdown
                    placeholder="Category"
                    selection
                    options={categories}
                    defaultValue="all"
                    onChange={orderByCategory}
                  ></Dropdown>
                  {ShowAddProductButton()}
                </div>
              </Grid.Row>
              <Grid.Row>
                <div className="product-list-item-cards">
                  <Card.Group itemsPerRow={3}>
                    {products["Products"].map((item) => (
                      <Card key={item.id}>
                        {showAdminDetails(item)}
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
