import {Button, Card, Image} from "semantic-ui-react";
import React, {useEffect, useState} from "react";

import "./wishlist-page.css"

function WishlistPage(props) {
    const userID = props.user;
    const [wishlist, listSetter] = useState({list: []})
    const list = wishlist.list

    async function fetchWishlist(id) {
        try {
            //Print action done and make fetch request
            // console.log('GET User');
            console.log('fetching wishlist');
            const res = await fetch('http://127.0.0.1:5000/goated_the_sql/'.concat(userID).concat('/liked_list'))
            //Checks if the http request returns the appropriate status
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(data);
            listSetter({list: data})
            return data;

            //Catches network errors returned by fetch
        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {
        let promise = fetchWishlist(userID);
        console.log('in use effect')

    }, []);
    return (
        <>
            <div className="wishlist-body">
                {}
                {/*TODO: Make sure Suspense actually goes here*/}
                {/*<React.Suspense fallback={<Loader content="Loading"/>}>*/}
                <Card.Group itemsPerRow={3}>
                    {list.map((item) => (
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
                {/*</React.Suspense>*/}
            </div>
        </>
    );
}

export default WishlistPage;