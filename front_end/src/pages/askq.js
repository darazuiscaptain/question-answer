import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

class AskQ extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            Title: '', 
            Body: '', 
            tags: '',
            Time: null,
            userId: parseInt(localStorage.getItem("login")),
            response: {}, 
            isSubmited: false
        };
        this.fetch = this.fetch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            // form is invalid! so we do nothing
            return;
        }
        //Set the isSubmitted true for showing the response to the user
        this.setState({isSubmited: true, Time: new Date().toString().slice(0,15)}, ()=>{
            this.fetch(`/api/questions`, {
                method: 'POST',
                body: JSON.stringify(this.state)
              }).then(res => {
                  res.json().then(data=>{
                    console.log(data);
                    this.setState({response: data});
                  }).catch(err=>{
                      this.setState({response: err});
                  })
              }).catch(err => {
                this.setState({response: err});
            });
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

    handleChange = (event) => {
        switch(event.target.name){
            case "title":
                this.setState({Title: event.target.value});
                break;
            case "body":
                this.setState({Body: event.target.value});
                break;
            case "tags":
                this.setState({Tags: event.target.value});
        }
    };

    render(){

        const {
            title,
            body,
            tags
          } = this.state;
      
          const isInvalid =
            title === '' ||
            body === '';

        return (
            <div>
               <form className="uk-form-horizontal uk-margin-large" onSubmit={this.handleSubmit}>
                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-horizontal-text">Title</label>
                                <div className="uk-form-controls">
                                    <input className="uk-input" id="form-horizontal-text" name="title" type="text" onChange={this.handleChange} placeholder="What's your question? Be specific" required/>
                                </div>
                            </div>

                            <div className="uk-margin">
                                <textarea className="uk-textarea" name="body" onChange={this.handleChange} rows="5" placeholder="Explain Your Problem" required></textarea>
                            </div>

                            {/* <div className="uk-margin">
                                <input className="uk-input" id="form-horizontal-text" name="tags" type="text" onChange={this.handleChange} placeholder="Tags" required/>
                            </div> */}

                            <div className="uk-margin" style={{textAlign: "center"}}>
                                <button type="submit" disabled={isInvalid} className="uk-button uk-button-primary">Submit</button>
                            </div>
                </form>
            </div>
        );
    }
}


export default withRouter(AskQ);