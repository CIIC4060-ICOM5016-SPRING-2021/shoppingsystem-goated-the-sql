import React from 'react';

/**
 * CartView shows all products in the given users cart in DB
 * all information about the user will be provided in a prop
 * named user_info. Changes to the cart must be reflected on the DB.
 */

class CartView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cart: [],
            user_id: 0,
            isLoggedIn: true
        }
        //Bind spot
        this.set_user_info = this.set_user_info.bind(this);
    }

    componentDidMount(){
        this.set_user_info(); //Commented until it recieves proper prop values
    }

    componentWillUnmount(){

    }

        //Set prop info to state
        set_user_info(){
            this.setState({
                            user_id: this.props.user_info.user_id,
                            first_name: this.props.user_info.first_name,
                            last_name: this.props.user_info.last_name,
                            validity: this.props.user_info.validity,
                            password: this.props.user_info.password,
                            phone: this.props.user_info.phone,
                            admin: this.props.user_info.admin
                }, ()=>{this.loadCart(this.state.user_id)}) //Await the state update
        }

        //TODO Get the cart with the given id    
        async loadCart(user_id) {

            try{
                //Print action done and make fetch request
                console.log('GET Cart');
                const res = await fetch(`http://127.0.0.1:5000/goated_the_sql/cart/${user_id}`);
    
                //Checks if the http request returns the appropriate status
                if(!res.ok) {
                    throw new Error(`HTTP error! Status: ${ res.status }`);
                }
    
                //Return the needed data
                const data = await res.json();
                console.log(data);
                this.setState({cart: data});
                return data;
    
            //Catches network errors returned by fetch
            } catch(error) {
                console.log(error);
            }
    
        }


    render(){
        if(this.state.isLoggedIn){
            return(
                <div>
                    <h1> {this.props.user_info.user_id} </h1>
                </div>
            )
        }
    }

}

export default CartView;