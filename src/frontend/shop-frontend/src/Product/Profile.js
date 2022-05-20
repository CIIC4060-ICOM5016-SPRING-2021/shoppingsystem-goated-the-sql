import React from "react";
import { Button, Container, Form, Grid, Segment } from "semantic-ui-react";
import "../LogIn.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class Profile extends React.Component {

  state = { fname: '', lname: '', phone: '', password: '', admin: ''}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { fname, lname, phone, password} = this.state
    //Axios put method for updating the database
  axios.put(
        "http://127.0.0.1:5000/goated_the_sql/user/${this.props.match.params.id}",
         { user_to_update_id: '${this.props.match.params.id}',
           first_name: '${fname}',
           last_name: '${lname}',
           valid: true,
           password: '${password}',
           phone: '${phone}',
           admin: '${admin}'
         }
  ).then((res) => {console.log(res.data)});



    console.log(this.state)
  }

  componentDidMount() {
    axios
      .get(
        `http://127.0.0.1:5000/goated_the_sql/user/${this.props.match.params.id}`
      )
      .then((res) => {
        console.log(res.data);
        const fname = res.data["first_name"];
        const lname = res.data["last_name"];
        const phone = res.data["phone_#"];
        const password = res.data["password"];
        const admin = res.data["admin"]
        this.setState({ fname, lname, phone, password, admin });
      });
  }

  render() {
     const { fname, lname, phone, password } = this.state

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }} padded={"horizontally"}>
          <Container>
            <p className={"Title"}>
              {fname} {lname}
            </p>
          </Container>
          <Form size={"massive"} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Segment stacked size={"massive"}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                value={phone}
                name='phone'
                placeholder="Phone #"
                type="phone"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                value={fname}
                name='fname'
                placeholder="First Name"
                type="text"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                value={lname}
                name='lname'
                placeholder="Last Name"
                type="text"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                value={password}
                name='password'
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
              />

              <Form.Button content='Submit' />
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
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Profile);
