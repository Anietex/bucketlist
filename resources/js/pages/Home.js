import React, { Component } from 'react';
import BucketListForm from "../components/BucketListForm";

class Home extends Component{

    render() {
        return (
            <div className='container'>
                <div className='form'>
                    <BucketListForm></BucketListForm>
                </div>
            </div>
        )
    }
}


export default Home;
