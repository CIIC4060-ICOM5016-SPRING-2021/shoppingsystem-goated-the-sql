import React from "react";
import { Card, Container, Divider } from "semantic-ui-react";
import "./Orders.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderCard from "./OrderCard";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}
class Orders extends React.Component {
  orderlistformaxios = [];
  componentDidMount() {
    axios({
      method: "POST",
      url: `http://127.0.0.1:5000/goated_the_sql/user/${this.props.match.params.user_id}/orders`,
    }).then((res) => {
      const prods = res.data.args;
      this.orderlistformaxios = res.data;
      console.log(this.orderlistformaxios);
      this.setState({ prods }); //no clue for what this is
    });
  }
  render() {
    return (
      <div className={"orderbackground"}>
        <h1 className={"header"}>Orders</h1>
        <Divider hidden />
        <Container>
          <Card.Group>
            <OrderCard info={this.orderlistformaxios} />
          </Card.Group>
        </Container>
      </div>
    );
  }
}
export default withRouter(Orders);
