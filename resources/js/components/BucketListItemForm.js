import React, { Component } from 'react'

class BucketListItemForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
        };

        this.handleChange = this.handleChange.bind(this)
        this.addBucketListItem = this.addBucketListItem.bind(this)

    }

    handleChange(event){
        this.setState({[event.target.id]:event.target.value})
    }

    addBucketListItem(event){
        event.preventDefault();

        this.
        props
            .addBucketListItem({name:this.state.name,done:false})
            .then(()=>{
                this.setState({name:''})
            });
    }

    render() {


        return (
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>Add new  to   {this.props.bucketList.name}</span>
                    <form onSubmit={this.addBucketListItem}>
                        <div className='row'>
                            <div className='col l10 s12'>
                                <div className='input-field'>
                                    <input type='text' id='name' value={this.state.name} onChange={this.handleChange} />
                                    <label htmlFor='name'>Name</label>
                                </div>
                            </div>
                            <div className='col l2 s12'>
                                <button className=' btn'>Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default BucketListItemForm
