import React, {Component} from 'react'
import BucketListForm from "../components/BucketListForm";
import BucketListTable from "../components/BucketListTable";

class BucketList extends Component{
   constructor(props){
       super(props);
        this.state = {
            bucketLists:[]
        }

        this.addBucketList = this.addBucketList.bind(this);
   }

    render() {
        return (
            <div className='container'>

                <div className='form'>
                    <BucketListForm  addBucketList={this.addBucketList}/>
                </div>

                <div className='table'>
                    <BucketListTable bucketLists={this.state.bucketLists}/>
                </div>
            </div>
        )
    }


    addBucketList(bucketList){
       return new Promise((resolve,reject)=>{

           this.setState((prevState)=>{
               return {
                   bucketLists:prevState.bucketLists.concat(bucketList)
               }
           },()=>{
               resolve();
           })
       })
    }
}


export default BucketList
