import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Form, Button } from "semantic-ui-react";


function SignUp() {
  return (
    <>
      <Container>
        <Segment>
          <h1>Sign Up</h1>
          <Form align="left">
            <Form.Group>
              <Form.Input
                label="First Name"
                placeholder="John"
                required
                width={10}
              />
              <Form.Input
                label="Last Name"
                placeholder="Smith"
                required
                width={10}
              />
            </Form.Group>
            <Form.Input
              label="Phone Number"
              placeholder="(123) 456-7890"
              required
            />
            <Form.Input
              label="Password"
              type="password"
              placeholder="g00mb4"
              required
            />
          </Form>
          <Button as={Link} to="/home" primary>
            Sign Up
          </Button>
        </Segment>
      </Container>
    </>
  );
}

export default SignUp;
