import React, {Component} from 'react';


class LoginForm extends Component{


    render() {
        return (
            <div className='card'>
                <div className='card-content'>
                    <div className="card-title">Login</div>
                    <form>
                        <div className='input-field'>
                            <input type='text' id='email' className='validate' required/>
                            <label htmlFor='email'>Email</label>
                        </div>

                        <div className='input-field'>
                            <input type='password' id='password' className='validate' required/>
                            <label htmlFor='password'>Password</label>
                        </div>

                        <div className='center'>
                            <button className='btn waves-effect'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}


export default LoginForm
