import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from "react-router-dom";
import './App.css';
import logo from './images/logo.png';
import * as routes from './routes/routes';
import New from './pages/new';
import Trend from './pages/trend';
import Login from './pages/login';
import Create from './pages/create';
import AskQ from './pages/askq';
import Tags from './pages/tag';
import Questions from './pages/question';
import Auth from './auth/auth';
import Users from './pages/user';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (localStorage.getItem('auth')=='1') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routes.LOGIN,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {login: false};
    this.loggedIn = this.loggedIn.bind(this);
  }

  signOut(){
    this.setState({login: false});
    Auth.setLogin('0');
  }

  componentDidMount(){
    if(localStorage.getItem('auth') == '1'){
      this.setState({login: true})
    } else {
      this.setState({login: false})
    }
  }

  loggedIn(){
    this.setState({login: true})
    Auth.setLogin('1');
  }

  render() {
    let login = null;
    if(localStorage.getItem('auth') == '1'){
      login = <button className="uk-button uk-button-primary uk-margin-small-left uk-margin-small-right" onClick={()=>this.signOut()} style={{backgroundColor: "#ff7361"}}>Sign Out</button>;
    } else {
      login = <Link className="uk-button uk-button-primary uk-margin-small-left uk-margin-small-right" style={{backgroundColor: "#ff7361"}} to={routes.LOGIN}>Sign In</Link>;
    }

    return (
      <Router>
                <div className="uk-panel">
                    <nav className="uk-navbar-container uk-margin" style={{background: "#2f3239"}} uk-navbar="true">
                        <div className="uk-navbar-left">
                            <div className="uk-navbar-toggle uk-position-up uk-hidden@s">
                                <button className="uk-margin-small-left uk-icon" uk-icon="icon: menu"></button>
                                <a className="uk-margin-small-left" style={{textDecoration: "none"}} href="/">
                                    <img src={logo} />
                                </a>
                            </div>
                            <Link className="uk-navbar-item uk-logo uk-visible@s" to={routes.INDEX}><img src={logo} /></Link>
                        </div>
                        <div className="uk-navbar-right uk-visible@s">
                            <ul className="uk-navbar-nav">
                                <li>
                                    <Link to={routes.INDEX}>
                                        <span className="uk-icon uk-margin-small-right" uk-icon="icon: star"></span>
                                        New
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routes.TREND}>
                                        <span className="uk-icon uk-margin-small-right" uk-icon="icon: bolt"></span>
                                        Trending
                                    </Link>
                                </li>
                            </ul>

                            <Link className="uk-button uk-button-primary uk-margin-small-left uk-margin-small-right" to={routes.ASKQ}>Ask Question</Link>
                            {login}
                        </div>
                        
                    </nav>
                    {/* <div className="uk-position-center uk-hidden@s" style={{marginTop: "30%"}}>
                            <a className="uk-button uk-button-primary " href="#">Ask Question</a>
                            <button className="uk-button uk-button-primary uk-margin-small-left" style={{backgroundColor: "#ff7361"}} href="#">Sign In</button> 
                    </div> */}
                    <div className="mainbody">
                     <Switch>
                      <Route 
                        exact path={routes.INDEX}
                        component={() => <New /> }
                      />
                      <Route 
                        exact path={routes.TREND}
                        component={() => <Trend /> }
                      />
                      <Route 
                        exact path={routes.LOGIN}
                        component={() => <Login logged={this.loggedIn} /> }
                      />
                      <Route 
                        exact path={routes.CREATE}
                        component={() => <Create logged={this.loggedIn} /> }
                      />
                      <Route
                        path={routes.TAGS}
                        component={()=> <Tags />}
                      />
                      <Route
                        path={routes.QUESTION}
                        component={()=> <Questions /> }
                      />
                      <Route
                        path={routes.USERID}
                        component={()=> <Users /> }
                      />
                      <PrivateRoute path={routes.ASKQ} component={AskQ} />
                    </Switch>
                    </div>
                    <div className="footer" uk-sticky="bottom: true">

                    </div>
                    <style jsx="true">{`
                        .mainbody {
                            margin-left: 10%;
                            margin-right: 10%;
                            margin-top: 5%;
                            border: 2px solid red;
                        }
                        
                    `}
                    </style>
                </div>
            </Router>
    );
  }
}

export default App;
