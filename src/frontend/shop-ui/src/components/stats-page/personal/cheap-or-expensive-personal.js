import { Grid } from "semantic-ui-react";
import {
  Funnel,
  FunnelChart, LabelList, Tooltip,
} from "recharts";

function CheapnExpensiveProductsList(props) {
  const accountStats = props.details["User Statistics"]


  return (
    <>
      <div>
        <Grid>
          <div className="cheapest-bought-stats">
            <Grid.Row>
              <h3>Cheapest Bought Products</h3>
              {/* TODO: Add CSS for the following */}
              <div className="cheapest-bought-stats-inside">
                <FunnelChart width={335} height={250} >
                  <Tooltip/>
                  <Funnel dataKey="price" data={accountStats[2]["Cheapest Bought Products"]} isAnimationActive>
                    <LabelList position="center" fill="#000" stroke="none" dataKey="name" />
                  </Funnel>
                </FunnelChart>
              </div>
            </Grid.Row>
            <div className="most-expensive-bought-stats">
            <Grid.Row>
              <h3>Most Expensive Bought Products</h3>
              {/* TODO: Add CSS for the following */}
              <div className="most-expensive-bought-stats-inside">
                <FunnelChart width={335} height={250} >
                  <Tooltip/>
                  <Funnel dataKey="price" data={accountStats[3]["Most Expensive Bought Products"]} isAnimationActive>
                    <LabelList position="center" fill="#000" stroke="none" dataKey="name" />
                  </Funnel>
                </FunnelChart>
              </div>
            </Grid.Row>
            </div>
          </div>
        </Grid>
      </div>
    </>
  );
}

export default CheapnExpensiveProductsList;
