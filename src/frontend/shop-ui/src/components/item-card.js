import { Button, Item, Icon, Card, Image } from "semantic-ui-react";
import "./item-card.css";

function itemCard(props) {
  const itemName = props.name;
  const itemPrice = props.price;
  const itemSeller = props.seller;

  return (
    <>
      <Card>
        <Image src="https://i.ytimg.com/vi/z_wcL_zg2hM/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDo4Dzvudez6Op0QRM9DCt9INaCZQ" />
        <Card.Content>
          <Card.Header content={itemName} />
          <Card.Meta content={itemSeller} />
          <Card.Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            voluptatum tenetur deserunt! Minima velit modi facilis, placeat
            officia molestiae itaque!
          </Card.Description>
        </Card.Content>
        <Card.Content>
            <div className="item-card-price">
              ${itemPrice}
            </div>
          <div className="item-card-body">
            <Button positive floated="right" animated="fade" size="medium">
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
              <Button.Content hidden>Buy</Button.Content>
            </Button>
            <Button.Group basic size="medium">
              <Button icon="plus" />
              <Button disabled content="14" />
              <Button icon="minus" />
            </Button.Group>
          </div>
        </Card.Content>
      </Card>
      {/* <Item>
        <Item.Image
          as="a"
          href="https://www.youtube.com"
          src="https://i.ytimg.com/vi/z_wcL_zg2hM/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDo4Dzvudez6Op0QRM9DCt9INaCZQ"
        />
        <Item.Content>
          <Item.Header content={itemName + " - $" + itemPrice} />
          <Item.Meta>{itemSeller}</Item.Meta>
          <Item.Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            eius ex molestiae tempora ea animi. Culpa commodi error, distinctio
            maiores quaerat nemo ratione quas, laboriosam facilis possimus
            ipsum, omnis tenetur.
          </Item.Description>
          <Item.Extra>
            <div className="item-card-body">
              <Button positive floated="right" animated="fade" size="medium">
                <Button.Content visible>
                  <Icon name="shop" />
                </Button.Content>
                <Button.Content hidden>Buy</Button.Content>
              </Button>
              <Button.Group basic floated="right" size="medium">
                <Button icon="plus" />
                <Button disabled content="14" />
                <Button icon="minus" />
              </Button.Group>
            </div>
          </Item.Extra>
        </Item.Content>
      </Item> */}
    </>
  );
}

export default itemCard;
