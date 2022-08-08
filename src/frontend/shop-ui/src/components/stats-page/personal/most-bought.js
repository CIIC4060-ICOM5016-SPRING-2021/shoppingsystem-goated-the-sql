import {Grid, List, ListItem} from "semantic-ui-react";
import {Bar, BarChart, Cell, XAxis, YAxis} from "recharts";

function MostBought(props) {
    const accountStats = props.details["User Statistics"]


    return (
      <>
          <div>
              <Grid>
                  <div className="hottest-stats-categories">
                      <Grid.Row>
                          <h3>Most Bought Categories</h3>
                          {/* TODO: Add CSS for the following */}
                          <div className="hottest-stats-categories-inside">
                              <BarChart width={335} height={150} data={accountStats[0]["Most Bought Categories"]}>
                                  <XAxis dataKey="name"/>
                                  <YAxis/>
                                  <Bar dataKey="quantity_bought">

                                      {accountStats[0]["Most Bought Categories"].map((category, index) => (
                                        <Cell
                                          cursor="pointer"
                                          fill="#0984e3"
                                          key={`cell-${index}`}
                                        />
                                      ))}
                                  </Bar>
                              </BarChart>
                          </div>
                      </Grid.Row>
                  </div>
                  <div className="hottest-stats-products">
                      <Grid.Row>
                          <h3>Most Bought Products</h3>
                          {/* TODO: Add CSS for the following */}
                          <div className="hottest-stats-products-inside">
                              <List ordered>
                                  {accountStats[1]["Most Bought Products"].map((product, index) => (
                                    <ListItem
                                      content={product.name}
                                      key={`list-item-${index}`}
                                    />
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

export default MostBought;