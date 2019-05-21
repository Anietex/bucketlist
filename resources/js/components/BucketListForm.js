import React, { Component } from 'react'

class BucketListForm extends Component {

    render() {

        return (
            <div className='card'>
                <div className='card-content'>
                    <div className='row'>
                        <div className='col l10 s12'>
                            <div className='input-field'>
                                <input type='text' id='name'/>
                                <label htmlFor='name'>Name</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BucketListForm
