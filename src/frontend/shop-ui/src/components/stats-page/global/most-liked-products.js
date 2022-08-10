import {Grid, List, ListItem} from "semantic-ui-react";

import "./most-liked-products.css"

function MostLikedProductsGraph(props) {
  const globalStats = props.details

  return (
    <>
      <div>
        <Grid>
          <div className="most-liked-stats">
            <Grid.Row>
              <h3>Most Liked Products</h3>
              <div className="most-liked-inside">
                <List ordered>
                  {globalStats["Most Liked Products"].map((products,index) => (
                    <ListItem content={products.name} key={`item-${index}`}/>
                  ))}
                </List>
              </div>
            </Grid.Row>
          </div>
        </Grid>
      </div>
    </>
  );
}

export default MostLikedProductsGraph;