import React, { Component } from 'react';
import BucketListForm from "../components/BucketListForm";
import LoginForm from "../components/LoginForm";

class Home extends Component{

    render() {
        return (
            <div className='container'>

                <div className='login-form'>
                    <div className='row'>
                        <div className='col l6 offset-l3 s12'>
                            <LoginForm/>
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
                                        <a className="block" href="#">API Docs</a>
                                        <p>Email: email@example.com</p>
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
