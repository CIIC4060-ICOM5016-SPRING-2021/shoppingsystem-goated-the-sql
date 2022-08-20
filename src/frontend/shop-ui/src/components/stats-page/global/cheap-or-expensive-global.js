import {Grid} from "semantic-ui-react";
import {Bar, BarChart, Cell, Funnel, FunnelChart, LabelList, Tooltip, XAxis, YAxis,} from "recharts";

import "./cheap-or-expensive-global.css"

function CheapnExpensiveProductsList(props) {
    const globalStats = props.details

    return (
        <>
            <div>
                <Grid>
                    <div className="cheapest-stats">
                        <Grid.Row>
                            <h3>Cheapest Products</h3>
                            <div className="cheapest-stats-inside">
                                <BarChart width={335} height={150} data={globalStats["Cheapest Products"]}
                                          margin={{
                                              top: 5,
                                              right: 30,
                                              left: 20,
                                              bottom: 5,
                                          }}>
                                    <XAxis dataKey="name"/>
                                    <YAxis
                                        ticks={[-2, 1, 10, 26]}
                                        domain={[0, 26]}
                                        unit='$'/>
                                    <Tooltip/>
                                    <Bar dataKey="price">
                                        {globalStats["Cheapest Products"].map((category, index) => (
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
                    <div className="most-expensive-stats">
                        <Grid.Row>
                            <h3>Most Expensive Products</h3>
                            <div className="cheapest-stats-inside">
                                <BarChart width={335} height={150} data={globalStats["Most Expensive Products"]}
                                          margin={{
                                              top: 5,
                                              right: 30,
                                              left: 20,
                                              bottom: 5,
                                          }}>
                                    <XAxis dataKey="name"/>
                                    <YAxis
                                        ticks={[1000, 1300, 1600, 1900, 2100]}
                                        domain={[900, 2200]}
                                        unit='$'
                                    />
                                    <Tooltip/>
                                    <Bar dataKey="price">
                                        {globalStats["Most Expensive Products"].map((category, index) => (
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
                </Grid>
            </div>
        </>
    );
}

export default CheapnExpensiveProductsList;
