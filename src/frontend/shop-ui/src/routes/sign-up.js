import { Button, Container, Form, Segment } from "semantic-ui-react";

export default function SignUp() {
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
          <Button primary content="Submit" />
        </Segment>
      </Container>
    </>
  );
}
