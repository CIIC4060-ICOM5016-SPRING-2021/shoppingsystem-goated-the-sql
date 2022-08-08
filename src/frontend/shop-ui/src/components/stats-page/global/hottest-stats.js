import {Grid, List, ListItem} from "semantic-ui-react";
import {Bar, BarChart, Cell, Tooltip, XAxis, YAxis} from "recharts";

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
                <BarChart width={335} height={150} data={globalStats["Hottest Categories"]}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="quantity_bought">
                    {globalStats["Hottest Categories"].map((category, index) => (
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
              <h3>Hottest Products</h3>
              {/* TODO: Add CSS for the following */}
              <div className="hottest-stats-products-inside">
                <List ordered>
                  {globalStats["Hottest Products"].map((product, index) => (
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

export default HottestStats;
