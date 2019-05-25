import React, { Component } from 'react';
import LoginForm from "../components/LoginForm";

import {http,Auth} from '../utils'


class Home extends Component{

    constructor(props){
        super(props);

        this.login = this.login.bind(this)
    }

    login(user){

        http.post('/login',user)
            .then(({data})=>{
                Auth.loginUser(data.data.user,data.data.token)
               this.props.history.push('/bucketlist');
            })

    }

    componentDidMount() {

        if(Auth.userIsLogged()){
            this.props.history.push('/bucketlist')
        }
    }

    render() {
        return (
            <div className='container'>

                <div className='login-form'>
                    <div className='row'>
                        <div className='col l6 offset-l3 s12'>
                            <LoginForm login={this.login}/>
                        </div>
                    </div>
                </div>

                <div className="meta">
                    <div className='row'>
                        <div className='col l6 offset-l3 s12'>
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-title">Info</div>
                                    <div>
                                        <a className="block" target='_blank' href="https://documenter.getpostman.com/view/6340830/S1TR5Kpb?version=latest ">API Docs</a>
                                        <p>Email: admin@test.dev</p>
                                        <p>Password: password</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Home;
