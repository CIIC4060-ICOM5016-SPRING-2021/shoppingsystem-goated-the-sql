import React from "react";
import { Button, Container, Form, Grid, Segment } from "semantic-ui-react";
import "./LogIn.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class Profile extends React.Component {
  componentDidMount() {
    // TODO: Remove the hardcoded user id
    axios
      .get(
        `http://127.0.0.1:5000/goated_the_sql/user/${this.props.match.params.id}`
      )
      .then((res) => {
        const user = res.data;

        console.log(user);
      });
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }} padded={"horizontally"}>
          <Container>
            <p className={"Title"}>FirstName + LastName</p>
          </Container>
          <Form size={"massive"}>
            <Segment stacked size={"massive"}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Phone #"
                type="phone"
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
                type="text"
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
                type="text"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button
                as={Link}
                to="/Products"
                color="red"
                style={{ width: 300 }}
              >
                <p className={"Login"}>Done</p>
              </Button>

              <Button as={Link} to="/" color="red" style={{ width: 300 }}>
                <p className={"Login"}>ERASE ACCOUNT</p>
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Profile);
