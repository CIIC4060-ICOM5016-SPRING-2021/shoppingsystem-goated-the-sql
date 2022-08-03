import { Grid } from "semantic-ui-react";

function StatsPage() {
    return <Grid celled="internally">
        <Grid.Column width={8}>
            <h1>Global</h1>
        </Grid.Column>
        <Grid.Column width={8}>
            <h1>Personal</h1>
        </Grid.Column>
    </Grid>;
}

export default StatsPage;
