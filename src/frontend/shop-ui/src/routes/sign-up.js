import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Form, Button } from "semantic-ui-react";

import "./sign-up.css"

function SignUp() {
  return (
    // TODO: Edit so that it is in the center of the page
    <>
      <div className="sign-up-page-body">
        <Container>
          <Segment raised>
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
            <div className="sign-up-form-button">
              <Button as={Link} to="/home" primary>
                Sign Up
              </Button>
            </div>
          </Segment>
        </Container>
      </div>
    </>
  );
}

export default SignUp;
