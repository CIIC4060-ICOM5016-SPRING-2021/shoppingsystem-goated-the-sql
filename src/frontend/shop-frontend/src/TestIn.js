import React from 'react';

/*
Testing adding local states to the react components classes
Instead of this.props use this.state
Add a constructor that assigns initial this.state
Components can pass down part of their state as props to child components
Example with JSX <ComponenetName propertyname={this.state.paramName} />

When creating an event handler that requires access to the component state we need
to bind the function in the constructor
For a handler this.handleClick = this.handleClick.bind(this)
Without binding, the 'this' keyword will be undefined

*/


class TestIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {/*JS Objects with the desired paramters and values*/};
    }
        
    //Runs when component produces a DOM
    componentDidMount(){

    }

    //Runs when component DOM is removed
    componentWillUnmount(){

    }
}