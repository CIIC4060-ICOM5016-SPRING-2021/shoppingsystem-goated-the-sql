import { Grid, List, ListItem } from "semantic-ui-react";
import { BarChart, Bar, Cell } from "recharts";

function HottestStats(props) {
  const globalStats = props.details["Global Statistics"];

  return (
    <>
      <div>
        <Grid>
          <div className="hottest-stats-categories">
            <Grid.Row>
              <h3>Hottest Categories</h3>
              {/* TODO: Add CSS for the following */}
              <div className="hottest-stats-categories-inside">
                <BarChart
                  width={150}
                  height={40}
                  data={globalStats["Hottest Categories"]}
                >
                  <Bar dataKey="quantity_bought">
                    {globalStats["Hottest Categories"].map((entry, index) => (
                      <Cell
                        cursor="pointer"
                        fill="#82ca9d"
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
              <h3>Hottest Products</h3>
              {/* TODO: Add CSS for the following */}
              <div className="hottest-stats-products-inside">
                <List ordered>
                  {globalStats["Hottest Products"].map((product) => (
                    <ListItem content={product.name} />
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

export default HottestStats;
