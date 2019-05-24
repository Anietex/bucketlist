import React, {Component} from 'react';
import {confirmAlert} from "react-confirm-alert";


class BucketListItemsTable extends Component{

    constructor(props){
        super(props)
        this.markAsDone= this.markAsDone.bind(this)
    }

    markAsDone(id){
        this.props.markAsDone(id)
    }

    deleteItem(id){

        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure to delete?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteItem(id)
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    }

    render() {
        return (
            <div className='bucket-lists'>
                <div className='card'>
                    <div className='card-content'>
                        <span className='card-title'>Bucket Lists Items</span>

                        <table>
                            <thead>
                                <tr>
                                    <th width='10%'>Done</th>
                                    <th width='70%'>Name</th>
                                    <th width='20%'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.bucketListItems.map((item,index)=>(
                                <tr key={item.id}>
                                    <td>
                                        <p>
                                            <label>
                                                <input onChange={(e)=>{this.markAsDone(item.id)}}  checked={item.done} type='checkbox' className='filled-in'/>
                                                <span></span>
                                            </label>
                                        </p>
                                    </td>
                                    <td className={item.done?'strike':''}>{item.name}</td>
                                    <td>
                                        <button onClick={()=>{this.props.editBucketList(item)}} className='btn btn-small green accent-3'>Edit</button>
                                        <button onClick={()=>this.deleteItem(item.id)} className='btn btn-small red accent-3'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default BucketListItemsTable;
