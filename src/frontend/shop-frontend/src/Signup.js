import React from 'react';

class SignupView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: 0,
            first_name: '',
            last_name: '',
            validity: false,
            password: '',
            phone: '',
            admin: false,
            givenId: 0,
            givenFname:'',
            givenLname:'',
            givenValidity: false,
            givenPassword: '',
            givenPhone:'',
            givenAdmin: false
        }

        //Bind methods to this
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    componentDidMount(){

    }
    
    componentWillUnmount(){
    
    }

    //Saves information about the user in a JSON object
    handleSubmit(event) {
        
        //For debuging only
        console.log('Submitted data is:');
        this.printState();

        event.preventDefault(); //Network error in fetch without this, cause: page reloads preventing the request from completing
        this.saveUserInfo();
    }
    
    //Saves the given user info into the state of the component where it can only be changed by submit
    async saveUserInfo(){

        this.setState({
            user_id: this.state.givenId,
            first_name: this.state.givenFname,
            last_name: this.state.givenLname,
            validity: this.state.givenValidity,
            password: this.state.givenPassword,
            phone: this.state.givenPhone,
            admin: this.state.givenAdmin
        }, ()=> {this.handleSignup()})

    }

    // For debuggin only
    printState(){
        console.log(this.state);
        
    }

    //State values are turned into a JSON response to be sent to the backend
    async handleSignup(){

        //For debuging only
        this.printState();

        const new_user_info = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: this.state.user_id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                valid: this.state.validity,
                password: this.state.password,
                phone: this.state.phone,
                admin: this.state.admin
            })
        }

        try{
            //Print action done and make fetch request
            console.log('POST User');
            const res = await fetch(
                'http://127.0.0.1:5000/goated_the_sql/sign-up', new_user_info);

            //Checks if the http request returns the appropiate status
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }`);
            }

            //Return the needed data
            const data = await res.json();
            console.log(`New user id is: ${data['id']}`);
            console.log(data);

        //Catches network errors returned by fetch
        } catch(error) {
            console.log(error);
        }
    }

    //Handles change on a given form, requires state to have a property with the same name as the form input name
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value    
        });

    }

    render(){
        const {givenFname, givenLname, givenPassword, givenPhone} = this.state;

        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter your first name:
                    <input
                        type = 'text'
                        name='givenFname'
                        value =  {givenFname}
                        onChange = {this.handleChange}
                    />
                </label>
                <br/>
                <label>
                    Enter your last name:
                    <input
                        type = 'text'
                        name='givenLname'
                        value =  {givenLname}
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
                <label>
                    Enter your Phone:
                    <input
                        type = 'text'
                        name='givenPhone'
                        value =  {givenPhone}
                        onChange = {this.handleChange}
                    />
                </label>
                <br/>
                <input type = "submit" />
            </form>
          )
    }

}


export default SignupView;