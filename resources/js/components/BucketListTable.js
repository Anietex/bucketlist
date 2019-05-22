import React, {Component} from 'react';


class BucketListTable extends Component{

    constructor(props){
        super(props)
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
                            {this.props.bucketLists.map((bucketList,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{bucketList.name}</td>
                                    <td>
                                        <button className='btn btn-small green accent-3'>Edit</button>
                                        <button className='btn btn-small red accent-3'>Delete</button>
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
