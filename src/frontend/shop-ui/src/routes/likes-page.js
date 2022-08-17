import {Button, Card, Image} from "semantic-ui-react";
import React, {useEffect} from "react";

import "./likes-page.css"
import Loading from "../components/utility/loading";
import {useDispatch, useSelector} from "react-redux";
import {addLikedItemDB, getAllLikes, removeLikedItem} from "../features/likes/likesSlice";
import {addProductToCartDB} from "../features/cart/cartSlice";

function LikesPage() {
  const wishlistItems = useSelector(store => store.likes.items);
  const {isLoading} = useSelector(store => store.likes);
  const {id} = useSelector(store => store.user.details);
  const dispatch = useDispatch();


  useEffect(() => {
    if (id === undefined) {
      window.location.href = "/";
    } else {
      dispatch(getAllLikes(id));
    }
  }, [id, dispatch]);

  function removeItem(item, userId) {
    dispatch(removeLikedItem(item.id));
    dispatch(addLikedItemDB({product: item, user_id: userId}));
  }

  function addToCart(item) {
    dispatch(addProductToCartDB({product: item, user_id: id}));
  }

  function showLikes(wishlistItems) {
    if (wishlistItems.length === 0) {
      return (<div className="no-items-in-cart-message">
        <h1>You have no items in your Likes</h1>
      </div>);
    } else {
      return (<Card.Group itemsPerRow={3}>
        {wishlistItems.map((item) => (
          <Card key={item.id}>
            <Image
              src="https://i.ytimg.com/vi/hYIsp4qA-z4/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDkz9Org_0z_DjBie5FR9YuflgXcg"/>
            <Card.Content>
              <Card.Header content={item.name}/>
              <Card.Meta content={item.category}/>
              <Card.Description content={item.desc}/>
            </Card.Content>
            <Card.Content>
              <div className="wishlist-item-buttons">
                <Button fluid negative icon="trash" onClick={() => removeItem(item, id)}/>
                <Button fluid positive icon="cart" content="Add to Cart" onClick={()=>addToCart(item, id)}/>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>)
    }
  }

  if (isLoading) {
    return (<Loading/>);
  } else {
    return (
      <>
        <div className="wishlist-body">
          {showLikes(wishlistItems)}
        </div>
      </>
    );
  }
}

export default LikesPage;