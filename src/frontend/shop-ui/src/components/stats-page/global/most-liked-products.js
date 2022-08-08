import {Grid, List, ListItem} from "semantic-ui-react";

function MostLikedProductsGraph(props) {
  const globalStats = props.details["Global Statistics"]

  return (
    <>
      <div>
        <Grid>
          <div className="most-liked">
            <Grid.Row>
              <h3>Most Liked Products</h3>
              {/* TODO: Add CSS for the following */}
              <div className="most-liked-inside">
                <List ordered>
                  {globalStats["Most Liked Products"].map((products) => (
                    <ListItem content={products.name}/>
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