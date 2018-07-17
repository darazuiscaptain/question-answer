import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class Tags extends Component {
    
    render(){
        return (
            <div>
                <ul className="uk-list">
                    <li>
                    <div className="uk-card uk-card-default uk-card-body">
                        <div className="uk-position-top" style={{marginBottom: "5em"}}>
                            <div className="uk-float-left" style={{marginLeft: "17%", textAlign: "center"}}>
                            <h3 className="uk-card-title" >0</h3>
                            <span>votes</span>
                            </div>
                            <div className="uk-float-right" style={{marginRight: "17%", textAlign: "center"}}>
                            <h3 className="uk-card-title">0</h3>
                            <span>answers</span>
                            </div>
                        </div>
                        <h3 className="uk-card-title">Default skdjf skdjfsjf sljdfwiejf skdiowef ks aiwf sdfhwie sknwie fksnwioejf</h3>
                        <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="card-footer">
                            <span className="uk-badge uk-margin-small-left">100</span>
                            <span className="uk-badge uk-margin-small-left">100</span>
                            <span className="uk-badge uk-margin-small-left">100</span>
                            <div style={{position: "absolute", right: 0}} className="uk-margin-small-right" >
                            <span className="uk-badge uk-margin-small-left">by Aditya kumar Pandey</span>
                            <span className="uk-badge uk-margin-small-left">at 2 jul 2018</span>
                            </div>
                        </div>
                    </div>
                    </li>
                    <li>
                    <div className="uk-card uk-card-default uk-card-body">
                        <h3 className="uk-card-title">Default</h3>
                        <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    </li>
                    <li>
                    <div className="uk-card uk-card-default uk-card-body">
                        <h3 className="uk-card-title">Default</h3>
                        <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    </li>
                </ul>
                <style jsx="true">{`
                    .card-footer {
                        padding: 1px 1px;
                    }
                `}
                </style>
            </div>
        );
    }
}


export default withRouter(Tags);