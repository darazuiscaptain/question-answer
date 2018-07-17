import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch'

class Trend extends Component {
    constructor(props){
        super(props);
        this.state = {data: []}
        this.gotoMyPro = this.gotoMyPro.bind(this);
        this.fetch = this.fetch.bind(this);
        this.getData = this.getData.bind(this);
        this.getData();
    }

    gotoMyPro(id){
        const {
            history,
          } = this.props;
        
        console.log(id);

        history.push("/question/"+id);
    }

    getData(){
        this.fetch(`/api/questions/trend`, {method: 'GET'}).then((res)=>{
            res.json().then((data)=>{
                console.log(data);
                this.setState({data: data.data});
            });
        }).catch((err)=>{
            window.alert(err);
        })
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


    getUI(data){
        // console.log(data);
        let tags = [];
        // for(let i=0;i<data.tags.length;i++){
        //     tags.push(<span className="uk-badge uk-margin-small-left poi" key={i}>{data.tags[i]}</span>);
        // }
        return (
                <li key={data.id}>
                    <div className="uk-card uk-card-default uk-card-body">
                        <div className="uk-position-top" style={{marginBottom: "5em"}}>
                            <div className="uk-float-left" style={{marginLeft: "17%", textAlign: "center"}}>
                            <h3 className="uk-card-title" >{data.vote}</h3>
                            <span>votes</span>
                            </div>
                            {/* <div className="uk-float-right" style={{marginRight: "17%", textAlign: "center"}}>
                            <h3 className="uk-card-title">{data.answer}</h3>
                            <span>answers</span>
                            </div> */}
                        </div>
                        <h3 className="uk-card-title poi" onClick={()=>this.gotoMyPro(data.id)}>{data.title}</h3>
                        <p>{data.body}</p>
                        <div className="card-footer">
                            {tags}
                            <div style={{position: "absolute", right: 0}} className="uk-margin-small-right" >
                            <span className="uk-badge uk-margin-small-left poi">by <Link to={"/user/"+data.userId} className="uk-margin-small-left" style={{textDecoration: "none", color: "white"}}>{data.user}</Link></span>
                            <span className="uk-badge uk-margin-small-left">at {data.time}</span>
                            </div>
                        </div>
                    </div>
                    </li>
        );
    }

    render(){
        if(this.state.data == null)
            return <div className="loader"></div>;
        let posts = [];
        const data = this.state.data;
        for(let i = 0;i<data.length;i++){
            posts.push(this.getUI(data[i]));
        }
        return (
            <div>
                <ul className="uk-list">
                    {posts}
                </ul>
                <style jsx="true">{`
                    .card-footer {
                        padding: 1px 1px;
                    }
                    .poi {
                        cursor: pointer;
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


export default withRouter(Trend);