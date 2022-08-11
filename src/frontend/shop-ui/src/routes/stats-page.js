import {Grid} from "semantic-ui-react";
import HottestStats from "../components/stats-page/global/hottest-stats";
import CheapestnMostExpensiveProducts from "../components/stats-page/global/cheap-or-expensive-global";
import CheapestnMostExpensiveProductsPersonal from "../components/stats-page/personal/cheap-or-expensive-personal";
import MostLikedProducts from "../components/stats-page/global/most-liked-products";
import MostBought from "../components/stats-page/personal/most-bought";

import "./stats-page.css";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/utility/loading";
import {setAccountStats, setGlobalStats} from "../features/statistics/statsSlice";
import {getAllProducts} from "../features/products/productSlice";
import {useEffect} from "react";
import {fetchAccountInfo, fetchOrdersInfo} from "../features/user/accountSlice";

function StatsPage() {
  const gStateStats = useSelector(store => store.product);
  const aStateStats = useSelector(store => store.user);

  const {id} = useSelector(store => store.user.details);

  const {globalStats, accountStats, isLoadingPersonal, isLoadingGlobal} = useSelector((store) => store.stats);
  const dispatch = useDispatch();

  //Logic for setting the global stats
  useEffect(() => {
    if (gStateStats.products.length === 0) {
      dispatch(getAllProducts());
    } else {
      dispatch(setGlobalStats(gStateStats.products["Global Statistics"]));
    }

    if (id === undefined) {
      dispatch(fetchAccountInfo(187));
    }
  }, [dispatch, gStateStats.products, id]);

  if (isLoadingGlobal || isLoadingPersonal) {
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
