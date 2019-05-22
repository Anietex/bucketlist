import React, {Component} from 'react';
import {confirmAlert} from "react-confirm-alert";
import {Link} from "react-router-dom";


class BucketListTable extends Component{

    constructor(props){
        super(props)
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
                        <span className='card-title'>Bucket Lists</span>

                        <table>
                            <thead>
                                <tr>
                                    <th width='10%'>S/N</th>
                                    <th width='70%'>Name</th>
                                    <th width='20%'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            { this.props.bucketLists && this.props.bucketLists.items.map((bucketList,index)=>(
                                <tr key={bucketList.id}>
                                    <td>{index+1}</td>
                                    <td><Link to={'/bucketlist/'+bucketList.id}>{bucketList.name}</Link></td>
                                    <td>
                                        <button  className='btn btn-small green accent-3'>Edit</button>
                                        <button  onClick={(e)=>this.deleteItem(bucketList.id)} className='btn btn-small red accent-3'>Delete</button>
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


export default BucketListTable;
