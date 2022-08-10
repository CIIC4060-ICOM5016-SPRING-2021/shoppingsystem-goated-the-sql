import {Grid} from "semantic-ui-react";
import HottestStats from "../components/stats-page/global/hottest-stats";
import CheapestnMostExpensiveProducts from "../components/stats-page/global/cheap-or-expensive-global";
import CheapestnMostExpensiveProductsPersonal from "../components/stats-page/personal/cheap-or-expensive-personal";
import MostLikedProducts from "../components/stats-page/global/most-liked-products";
import MostBought from "../components/stats-page/personal/most-bought";

import "./stats-page.css";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/utility/loading";
import {setGlobalStats} from "../features/statistics/statsSlice";
import {getAllProducts} from "../features/products/productSlice";

function StatsPage() {
  const gStateStats = useSelector(store => store.product.products);
  // const aStateStats = useSelector(store => store.user);
  const {globalStats, accountStats, isLoading} = useSelector((store) => store.stats);
  const dispatch = useDispatch();

  // Set global stats
  if(gStateStats !== undefined || true) {
    dispatch(setGlobalStats(gStateStats));
  } else if(globalStats === undefined) {
    dispatch(getAllProducts());
    dispatch(setGlobalStats(gStateStats));
  }

  // Set account stats
  if(accountStats !== undefined || true) {
    // dispatch(setAccountStats());
  }

  if (isLoading) {
    return <Loading/>;
  } else {
    return (
      <div className="stats-body">
        <Grid celled="internally">
          <Grid.Column width={8}>
            <h1>Global</h1>
            <Grid>
              <Grid.Row>
                <HottestStats details={globalStats}/>
              </Grid.Row>
              <Grid.Row>
                <CheapestnMostExpensiveProducts details={globalStats}/>
              </Grid.Row>
              <Grid.Row>
                <MostLikedProducts details={globalStats}/>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={8}>
            <h1>Personal</h1>
            <Grid>
              <Grid.Row>
                <MostBought details={accountStats}/>
              </Grid.Row>
              <Grid.Row>
                <CheapestnMostExpensiveProductsPersonal
                  details={accountStats}
                />
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default StatsPage;
