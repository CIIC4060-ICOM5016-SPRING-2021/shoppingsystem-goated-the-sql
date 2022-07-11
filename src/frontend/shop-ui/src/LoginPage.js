import "./LoginPage.css";

import { Button, Container, Form, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    //TODO: Figure out a way to center this on the page
    <>
      <div className="login-page-body">
        <Container>
          <Segment secondary raised>
            <h1>Welcome to the Goat Store</h1>

            <Form align="left" size="large" className="form-input-boxes">
              <Form.Group grouped>
                <Form.Input label="First Name" />
                <Form.Input label="Password" type="password" />
              </Form.Group>
            </Form>

            <Button as={Link} to="/home" primary content="Log In" />
            <p>Don't have an account?</p>
            <Link to="/sign-up">Sign Up</Link>
          </Segment>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
