import React from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import "./Likes.css";
import AllLikes from "./Likes_item";
import axios from "axios";
import { useParams } from "react-router-dom";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class Likes extends React.Component {
  prods = [];

  componentDidMount() {
    axios
      .get(
        `http://127.0.0.1:5000/goated_the_sql/${this.props.match.params.user_id}/liked_list`
      )
      .then((res) => {
        const lee = res.data.args;
        this.prods = res.data;
        console.log(this.prods);
        this.setState({ lee });
      });
  }

  render() {
    return (
      <div className={"back"}>
        <h1 className={"header"}>Likes</h1>
        <Container>
          <Card.Group centered>
            <AllLikes
              user_id={this.props.match.params.user_id}
              info={this.prods}
            />
          </Card.Group>
        </Container>
        <Divider></Divider>
        <Container className="footer">
          <Grid columns={2} padded>
            <GridColumn>
              <Button color="red" size="massive">
                Clear Likes list
              </Button>
            </GridColumn>
            <GridColumn>
              <Button color="green" size="massive">
                Add all to Cart
              </Button>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default withRouter(Likes);
