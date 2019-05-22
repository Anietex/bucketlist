import React, {Component} from 'react';



class LoginForm extends Component{

    constructor(props){
        super(props);

        this.state ={
                email:'',
                password:''

        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }

    handleChange(event){
        this.setState({[event.target.id]:event.target.value})
    }

    login(e){
        e.preventDefault();
        this.props.login({email:this.state.email,password: this.state.password})
    }

    render() {
        return (
            <div className='card'>
                <div className='card-content'>
                    <div className="card-title">Login</div>
                    <form onSubmit={this.login}>
                        <div className='input-field'>
                            <input type='text' value={this.state.email} onChange={this.handleChange} id='email' className='validate' required/>
                            <label htmlFor='email'>Email</label>
                        </div>

                        <div className='input-field'>
                            <input type='password' onChange={this.handleChange} value={this.state.password} id='password' className='validate' required/>
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
