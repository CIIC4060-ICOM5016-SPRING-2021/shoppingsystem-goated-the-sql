import { Grid } from "semantic-ui-react";
import HottestStats from "../components/stats-page/hottest-stats";
import CheapestnMostExpensiveProducts from "../components/stats-page/cheap-or-expensive";
import MostLikedProducts from "../components/stats-page/most-liked-products";

import "./stats-page.css"

function StatsPage() {
    return (
      <div className="stats-body">
        <Grid celled="internally">
          <Grid.Column width={8}>
            <h1>Global</h1>
            <Grid>
              <Grid.Row>
                <HottestStats />
              </Grid.Row>
              <Grid.Row>
                <CheapestnMostExpensiveProducts />
              </Grid.Row>
              <Grid.Row>
                <MostLikedProducts />
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={8}>
            <h1>Personal</h1>
          </Grid.Column>
        </Grid>
      </div>
    );
}

export default StatsPage;
