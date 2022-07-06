import React from 'react';
import IvanView from './IvanView';

/**
 * The login needs a form for the user to insert the data
 * Then it must verify that information with the backend
 * After it must pass this information to the next component
 */

class LoginView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user_id: 0,
            first_name: '',
            last_name: '',
            validity: false,
            password: '',
            phone: '',
            admin: false,
            givenId: 0,
            givenPassword: '',
            isLoggedIn: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.get_user = this.get_user.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    //Get the record with the given id    
    async get_user(user_id) {

        try{
            //Print action done and make fetch request
            console.log('GET User');
            const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/user/${user_id}`);

            //Checks if the http request returns the appropriate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            //console.log(data);
            return data;

        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }

    }

    async saveUserInfo(){

        const new_data = await this.get_user(this.state.givenId);
        console.log(new_data);


        this.setState({
            user_id: new_data['id'],
            first_name: new_data['first name'],
            last_name: new_data['last name'],
            validity: new_data['validity'],
            password: new_data['password'],
            phone: new_data['phone #'],
            admin: new_data['admin']
        }, ()=> {this.handleLogin()})

    }

    //If this function is not asynchronous the console log will not wait for the promise
    handleLogin(){

        console.log(this.state);

        //Compare the given password with the real password
        if(this.state.password === this.state.givenPassword){
            console.log("Correct password")
            this.setState({isLoggedIn: true});
        }else{
            console.log("Incorrect password")
        }
        //If successful go to another page passing the user_id as a prop
        

    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value    
        });

    }

    handleSubmit(event) {
        console.log('Submitted data is:');
        console.log('Id:' + this.state.givenId);
        console.log('Password:' + this.state.givenPassword);
        event.preventDefault(); //Network error in fetch without this, cause: page reloads preventing the request from completing
        this.saveUserInfo();
    }

    render(){

        const {givenId, givenPassword} = this.state;

        if (this.state.isLoggedIn){
            return(
            <div>
                <IvanView user_info = {this.state} />
            </div>
            )

        }else{
            return(
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your Id:
                        <input
                            type = 'text'
                            name='givenId'
                            value =  {givenId}
                            onChange = {this.handleChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Enter your Password:
                        <input
                            type = 'password'
                            name='givenPassword'
                            value =  {givenPassword}
                            onChange = {this.handleChange}
                        />
                    </label>
                    <br/>
                    <input type = "submit" />
                </form>
              )
        }    
    }
        
}

export default LoginView;