import "./LoginPage.css";

import { Button, Container, Form, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <div className="login-page-body">
        <Container>
          <Segment secondary raised>
            <h1>Welcome to the Goomba Store</h1>
            <Form align="left" size="large" className="login-form-boxes">
              <Form.Group grouped>
                <Form.Input label="First Name" />
                <Form.Input label="Password" type="password" />
              </Form.Group>
            </Form>
            <div className="login-form-button">
              <Button as={Link} to="/home" primary content="Log In" />
            </div>
            <p>Don't have an account?</p>
            <Link to="/sign-up">Sign Up</Link>
          </Segment>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
