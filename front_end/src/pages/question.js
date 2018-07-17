import React, {Component} from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import * as myp from './data';
import fetch from 'isomorphic-fetch';

class Questions extends Component {

    constructor(props){
        super(props);
        this.state = {data: null, answer: '', update: true, vote: 0};
        this.getPro = this.getPro.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.voteit = this.voteit.bind(this);
    }

    voteit(ty, v, id){
        let obj = {};
        if(ty){
            obj["Id"] = id;
            obj["vote"] = parseInt(v)+1;
        } else {
            obj["Id"] = id;
            obj["vote"] = parseInt(v)-1;
        }
        this.fetch(`/api/questions/vote`, {
            method: 'POST',
            body: JSON.stringify(obj)
          }).then((res)=>{
            res.json().then((data)=>{
                if(data.statusValue){
                    this.setState({update: true, vote: obj["vote"]});
                }
            })
          }).catch((err)=>{
                console.log(err);
          })
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
        let obj = {Answer: this.state.answer, Time: new Date().toString().slice(0,15), userId: parseInt(localStorage.getItem("login")), questionId: this.state.data.question.id, vote: 0};
        this.fetch(`/api/answers`, {
            method: 'POST',
            body: JSON.stringify(obj)
          }).then(res => {
            res.json().then((data)=>{
                this.setState({update: true});
            })
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
        const id  = this.props.match.params.qid;
        const post = myp.Posts.filter((val)=>{
            return val.id == id;
        });
        this.fetch(`/api/questions/`+id, {method: 'GET'}).then((res)=>{
            res.json().then((data)=>{
                console.log(data);
                if(data.statusValue){
                    this.setState({data: data.data, vote: data.data.question.vote});
                }
            })
        })
        // this.setState({data: post[0]}, ()=>{
        //     console.log(this.state.data)
        // });
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
        const question = data.question;
        const answer = data.answers;
        // console.log(data, answer, this.state.data)
        let answers = [];
        for(let i=0;i<answer.length;i++){
            answers.push(<li key={i}><article className="uk-comment uk-comment-primary">
                    <header className="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid="true">
                        <div className="uk-width-expand">
                            <h4 className="uk-comment-title uk-margin-remove"><Link className="uk-link-reset" to={"/user/"+answer[i].userId}>{answer[i].user}</Link></h4>
                            <p>{answer[i].time}</p>
                        </div>
                    </header>
                    <div className="uk-comment-body">
                        <p>{answer[i].answer}</p>
                    </div>
                </article>
            </li>);
        }
        
        // for(let i=0;i<this.state.data.tags.length;i++){
        //     tags.push(<span className="uk-badge uk-margin-small-left poi" key={i}>{this.state.data.tags[i]}</span>);
        // }
        const isInvalid = this.state.answer === '';
        return (
            <div>
                <article className="uk-article">
                    <h3 className="uk-article-title"><a className="uk-link-reset" href="#">{question.title}</a></h3>
                    <hr className="uk-divider-icon" />
                    <div className="uk-text-center" uk-grid="true">
                        <div className="uk-width-1-6">
                            <ul className="uk-iconnav uk-iconnav-vertical" style={{textAlign: "center"}}>
                                <li onClick={()=>this.voteit(true, question.vote, question.id)}><a uk-icon="icon: triangle-up; ratio: 3"></a></li>
                                <li style={{fontSize: "30px"}}>{this.state.vote}</li>
                                <li onClick={()=>this.voteit(false, question.vote, question.id)}><a uk-icon="icon: triangle-down; ratio: 3"></a></li>
                            </ul>
                        </div>
                        <div className="uk-width-5-6">
                            <p>{question.body}</p>
                        </div>
                    </div>

                    {/* <div className="uk-grid-small uk-child-width-auto uk-margin-small-left" uk-grid="true">
                        {tags}
                    </div> */}
                </article>
                <hr className="uk-divider-icon" />
                <h3>{answer.length} Answers </h3>
                <ul className="uk-list uk-list-divider">
                    {answers}
                </ul>
                <hr className="uk-divider-icon" />
                <h3>Your Answer</h3>
                <form className="uk-form-horizontal uk-margin-large" onSubmit={this.handleSubmit}>
                        <div className="uk-margin">
                            <textarea className="uk-textarea" name="body" onChange={this.handleChange} rows="5" placeholder="Explain Your Answer, Be Specific" required></textarea>
                        </div>
                        <div className="uk-margin" style={{textAlign: "center"}}>
                            <button type="submit" disabled={isInvalid} className="uk-button uk-button-danger">Post Your Answer</button>
                        </div>
                </form>
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


export default withRouter(Questions);