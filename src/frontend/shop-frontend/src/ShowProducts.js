import React from 'react';
import {Button, Header} from "semantic-ui-react";
import IvanView from "./IvanView";

class ShowProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            desc: '',
            id: 0,
            name: '',
            price: 0,
            stock: 0,
            visible: false,
            seeingProducts: true
        }
        this.render = this.render.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        console.log("goingback");
        this.setState({
            seeingProducts: false
        })
    }
    render() {

        return (

            <div className={"test"}>
                {this.state.seeingProducts ?
                    <div>
                        <Header as='h1'>{this.props.info.id}</Header>
                        <Header as='h1'>{this.props.info.name}</Header>
                        <Header as='h1'>{this.props.info.category}</Header>
                        <Header as='h1'>{this.props.info.price}</Header>
                        <Header as='h1'>{this.props.info.desc}</Header>

                        <Button
                            onClick={() => console.log(this.props.info)}>
                            Hey
                        </Button>
                        <Button
                            onClick={() => this.goBack()}>
                            Goback
                        </Button>
                    </div>
                    :
                    <IvanView/>
                }
            </div>
        )
    }

    }



export default ShowProducts;