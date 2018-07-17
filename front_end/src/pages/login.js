import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as routes from '../routes/routes';
import Auth from '../auth/auth';
import fetch from 'isomorphic-fetch'

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE };
        this.fetch = this.fetch.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {
          email,
          password,
        } = this.state;
    
        const {
          history,
        } = this.props;
        
        console.log(email, password)

        this.fetch(`/api/login`, {method: 'POST', body: JSON.stringify({Username: email, Password: password})}).then((res)=>{
            res.json().then((data)=>{
                console.log(data)
                if(data.statusValue){
                    Auth.setLogin("1");
                    localStorage.setItem("login", data.data+"");
                    this.props.logged();
                    history.push(routes.INDEX);
                }
            }).catch((err)=>{
                this.setState({error: err});
            })
        }).catch(err=>{
            this.setState({error: err});
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

    render(){

        const {
            email,
            password,
            error,
          } = this.state;
      
          const isInvalid =
            password === '' ||
            email === '';

        return (
            <div>
               <form onSubmit={this.onSubmit} className="middle">
                <div className="uk-margin">
                    { error && <p>{error.message}</p> }
                </div>
                <div className="uk-margin">
                    <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    className="uk-input"
                    placeholder="Email Address"
                    />
                </div>
                <div className="uk-margin">
                    <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    id="password_field"
                    className="uk-input"
                    placeholder="Password"
                    />
                </div>
                <div className="uk-margin" style={{textAlign: "center"}}>
                    <button disabled={isInvalid} type="submit" className="uk-button uk-button-danger">
                        Sign In
                    </button>
                    <h3><Link class="uk-link-heading" to={routes.CREATE}>Do not Have Account? SignUP</Link></h3>
                </div>
            </form>
            </div>
        );
    }
}


export default withRouter(Login);