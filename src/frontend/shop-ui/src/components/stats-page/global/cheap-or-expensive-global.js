import {Grid} from "semantic-ui-react";
import {Funnel, FunnelChart, LabelList, Tooltip,} from "recharts";

import "./cheap-or-expensive-global.css"

function CheapnExpensiveProductsList(props) {
  const globalStats = props.details["Global Statistics"]

  console.log(globalStats)

  return (
    <>
      <div>
        <Grid>
          <div className="cheapest-stats">
            <Grid.Row>
              <h3>Cheapest Products</h3>
              <div className="cheapest-stats-inside">
                <FunnelChart width={335} height={250} >
                  <Tooltip/>
                  <Funnel dataKey="price" data={globalStats["Cheapest Products"]} isAnimationActive>
                    <LabelList position="center" fill="#000" stroke="none" dataKey="name" />
                  </Funnel>
                </FunnelChart>
              </div>
            </Grid.Row>
          </div>
          <div className="most-expensive-stats">
            <Grid.Row>
              <h3>Most Expensive Products</h3>
              <div className="cheapest-stats-inside">
                <FunnelChart width={335} height={250} >
                  <Tooltip/>
                  <Funnel dataKey="price" data={globalStats["Most Expensive Products"]} isAnimationActive>
                    <LabelList position="center" fill="#000" stroke="none" dataKey="name" />
                  </Funnel>
                </FunnelChart>
              </div>
            </Grid.Row>
          </div>
        </Grid>
      </div>
    </>
  );
}

export default CheapnExpensiveProductsList;
