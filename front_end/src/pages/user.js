import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as myp from './data';
import fetch from 'isomorphic-fetch';

class Users extends Component {

    constructor(props){
        super(props);
        this.state = {data: null, answer: ''}
        this.getPro = this.getPro.bind(this);
    }

    componentDidMount(){
        this.getPro();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            // form is invalid! so we do nothing
            return;
        }
        //Set the isSubmitted true for showing the response to the user
        this.setState({isSubmited: true});
        this.fetch(`/post-new`, {
            method: 'POST',
            body: JSON.stringify(this.state)
          }).then(res => {
            this.setState({response: res});
          }).catch(err => {
            this.setState({response: err});
        });
   }

    fetch(url, options){
        // performs api calls sending the required authentication headers
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    
        return fetch(url, {
          headers,
          ...options
        })
    }

    getPro(){
        const id  = this.props.match.params.uid;
        const post = myp.Posts.filter((val)=>{
            return val.userId == id;
        });
        this.setState({data: post[0]}, ()=>{
            console.log(this.state.data)
        });
    }

    handleChange = (event) => {
        switch(event.target.name){
            case "body":
                this.setState({answer: event.target.value});
                break;
        }
    };
    
    render(){
        if(this.state.data == null)
            return <div className="loader"></div>;
        const data = this.state.data;
        let tags = [];
        for(let i=0;i<this.state.data.tags.length;i++){
            tags.push(<span className="uk-badge uk-margin-small-left poi" key={i}>{this.state.data.tags[i]}</span>);
        }
        const isInvalid = this.state.answer === '';
        return (
            <div>
                
                <style jsx="true">{`
                    .card-footer {
                        padding: 1px 1px;
                    }
                    .newit {
                        width: 4%;
                    }
                    .loader {
                        border: 16px solid #f3f3f3;
                        border-radius: 50%;
                        border-top: 16px solid blue;
                        border-right: 16px solid green;
                        border-bottom: 16px solid red;
                        width: 120px;
                        height: 120px;
                        -webkit-animation: spin 2s linear infinite;
                        animation: spin 2s linear infinite;
                      }
                      
                      @-webkit-keyframes spin {
                        0% { -webkit-transform: rotate(0deg); }
                        100% { -webkit-transform: rotate(360deg); }
                      }
                      
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                `}
                </style>
            </div>
        );
    }
}


export default withRouter(Users);