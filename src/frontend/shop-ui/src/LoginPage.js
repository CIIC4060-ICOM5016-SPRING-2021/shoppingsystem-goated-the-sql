import "./LoginPage.css"
import {Button, Container, Form, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const isReal = (props) => {

}

function LoginPage() {
    return (
        <>
            {/*TODO: Figure out a way to center this on the page*/}
            <Container>
                <Segment>
                    <h1>Welcome to the Goat Store</h1>
                    <Form align='left'>
                        <Form.Input label='First Name'/>
                        <Form.Input label='Password' type='password'/>
                    </Form>
                    <Button
                        primary
                        content='Log In'
                        onClick={isReal()}
                    />
                </Segment>
            </Container>
            <p>Don't have an account?</p>
            <Link to='/sign-up' classname='route'>Sign Up</Link>
        </>
    );
}

export default LoginPage;
