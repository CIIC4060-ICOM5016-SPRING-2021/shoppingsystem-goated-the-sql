import { Grid } from "semantic-ui-react";
import {
  Funnel,
  FunnelChart,
} from "recharts";

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
              {/* TODO: Add CSS for the following */}
              <div className="cheapest-stats-inside">
                <FunnelChart
                  width={335}
                  height={150}
                  data={globalStats["Cheapest Products"]}
                >
                  <Funnel dataKey="price"></Funnel>
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
