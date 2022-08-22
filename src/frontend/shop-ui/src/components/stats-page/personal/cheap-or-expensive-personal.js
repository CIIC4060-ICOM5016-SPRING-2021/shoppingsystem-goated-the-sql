import {Grid} from "semantic-ui-react";
import {Bar, BarChart, Cell, Tooltip, XAxis, YAxis,} from "recharts";

import "./cheap-or-expensive-personal.css"

function CheapnExpensiveProductsList(props) {
    const accountStats = props.details


    return (
        <>
            <div>
                <Grid>
                    <div className="cheapest-bought-stats">
                        <Grid.Row>
                            <h3>Cheapest Bought Products</h3>
                            {/* TODO: Add CSS for the following */}
                            <div className="cheapest-bought-stats-inside">
                                <BarChart width={335} height={150} data={accountStats[2]["Cheapest Bought Products"]}>
                                    <XAxis dataKey="name"/>
                                    <YAxis
                                        ticks={[0, 100, 200, 300, 400]}
                                        domain={[0, 400]}
                                        unit='$'/>
                                    <Tooltip/>
                                    <Bar dataKey="price">
                                        {accountStats[2]["Cheapest Bought Products"].map((category, index) => (
                                            <Cell
                                                cursor="pointer"
                                                fill="#E55812"
                                                key={`cell-${index}`}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </div>
                        </Grid.Row>
                    </div>
                    <div className="most-expensive-bought-stats">
                        <Grid.Row>
                            <h3>Most Expensive Bought Products</h3>
                            {/* TODO: Add CSS for the following */}
                            <div className="most-expensive-bought-stats-inside">
                                <BarChart width={335} height={150}
                                          data={accountStats[3]["Most Expensive Bought Products"]}>
                                    <XAxis dataKey="name"
                                    />
                                    <YAxis
                                        ticks={[0, 100, 200, 300, 1000]}
                                        domain={[80, 200]}
                                        unit='$'
                                    />
                                    <Tooltip/>
                                    <Bar dataKey="price">
                                        {accountStats[2]["Cheapest Bought Products"].map((category, index) => (
                                            <Cell
                                                cursor="pointer"
                                                fill="#E55812"
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
    )
        ;
}

export default CheapnExpensiveProductsList;
