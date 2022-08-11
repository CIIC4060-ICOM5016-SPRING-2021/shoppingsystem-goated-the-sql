import {Button, Card, Image} from "semantic-ui-react";
import React, {useEffect} from "react";

import "./likes-page.css"
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/utility/loading";
import {getAllLikes, removeLikedItem} from "../features/likes/likesSlice";
import {fetchAccountInfo} from "../features/user/accountSlice";

function LikesPage() {
  const wishlistItems = useSelector(store => store.likes.items);
  const {isLoading} = useSelector(store => store.likes);
  const {id} = useSelector(store => store.user.details);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id === undefined) {
      dispatch(fetchAccountInfo(187));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getAllLikes(id));
    }
  }, [dispatch, id]);

  function removeItem(id) {
    dispatch(removeLikedItem(id));
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
              src="https://i.ytimg.com/vi/z_wcL_zg2hM/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDo4Dzvudez6Op0QRM9DCt9INaCZQ"/>
            <Card.Content>
              <Card.Header content={item.name}/>
              <Card.Meta content={item.category}/>
              <Card.Description content={item.desc}/>
            </Card.Content>
            <Card.Content>
              <div className="wishlist-item-buttons">
                <Button fluid negative icon="trash" onClick={() => removeItem(item.id)}/>
                <Button fluid positive icon="cart" content="Add to Cart"/>
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