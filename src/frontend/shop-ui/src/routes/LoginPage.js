import "./LoginPage.css";
import {fetchAccountInfo} from "../features/user/accountSlice";

import { Button, Container, Form, Segment } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";


function LoginPage() {

  const [userID, setUser] = useState("");
  const [password, setPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function get_user(userID) {

    try {
        //Print action done and make fetch request
        // console.log('GET User');
        const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/user/${userID}`);

        //Checks if the http request returns the appropriate status
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        //Return the needed data
        const data = await res.json();
        //console.log(data);
        return data;

        //Catches network errors returned by fetch
    } catch (error) {
        console.log(error);
    }

  }

  function movingHome(userID) {
    navigate('/home');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let accountDetails = await get_user(userID);
    // console.log(dbpass)

    if (password === accountDetails['password']) {
        // console.log("Correct password")
        dispatch(fetchAccountInfo(userID));
        movingHome(userID);
    } else {
        console.log("Incorrect password")
    }
  }

  return (
    <>
      <div className="login-page-body">
        <Container>
          <Segment secondary raised>
            <h1>Welcome to the Goomba Store</h1>
            <Form align="left" size="large" className="login-form-boxes">
              <Form.Group grouped>
                <Form.Input 
                label="UserID" 
                type="text"
                value={userID}
                name = 'userID'
                onChange={(e) => setUser(e.target.value)}
                />
                <Form.Input 
                label="Password" 
                type="password" 
                value={password} 
                name='password'
                onChange={(e) => setPass(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div className="login-form-button">
              <Button primary content="Log In" onClick={handleSubmit}/>
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
