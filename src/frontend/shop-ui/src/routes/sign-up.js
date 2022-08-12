import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, Container, Form, Segment} from "semantic-ui-react";

import {setUserDetails} from "../features/user/accountSlice";

import "./sign-up.css"

function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //State variables for user creation
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  //Userid for new user made

  async function handleSubmit(e) {
    e.preventDefault();
    const info = await handleSignup();
    dispatch(setUserDetails(info))
    moveLogin()
  }

  function moveLogin() {
    navigate('/home');
  }

  //State values are turned into a JSON response to be sent to the backend
  async function handleSignup() {

    const new_user_info = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        first_name: fname,
        last_name: lname,
        valid: true,
        password: password,
        phone: number,
        admin: false
      })
    }

    try {
      //Print action done and make fetch request
      console.log('POST User');
      const res = await fetch(
        'http://127.0.0.1:5000/goated_the_sql/sign-up', new_user_info);

      //Checks if the http request returns the appropiate status
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      //Return the needed data
      const data = await res.json();
      console.log(data);
      return data;

      //Catches network errors returned by fetch
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                  width={10}
                />
                <Form.Input
                  label="Last Name"
                  placeholder="Smith"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                  width={10}
                />
              </Form.Group>
              <Form.Input
                label="Phone Number"
                placeholder="(123) 456-7890"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
              <Form.Input
                label="Password"
                type="password"
                placeholder="g00mb4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form>
            <div className="sign-up-form-button">
              <Button onClick={handleSubmit} primary>
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
