import {Button, Card, Image} from "semantic-ui-react";
import React from "react";

import "./wishlist-page.css"
import {useSelector} from "react-redux";
import Loading from "../components/utility/loading";

function WishlistPage() {
  const wishlistItems = useSelector(store => store.wishlist.items);
  const {isLoading} = useSelector(store => store.wishlist);

  if (isLoading) {
    return (<Loading/>);
  } else {
    return (
      <>
        <div className="wishlist-body">
          <Card.Group itemsPerRow={3}>
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
                    <Button fluid negative icon="trash"/>
                    <Button fluid positive icon="cart" content="Add to Cart"/>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      </>
    );
  }
}

export default WishlistPage;