import React, {Component} from 'react'
import BucketListForm from "../components/BucketListForm";
import BucketListTable from "../components/BucketListTable";
import {http } from '../utils'
import {toast} from "react-toastify";

class BucketList extends Component{
   constructor(props){
       super(props);
        this.state = {
            bucketLists:null
        }

        this.addBucketList = this.addBucketList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
   }
   componentDidMount() {
       this.getBucketList();
   }

    getBucketList(){
       http.get('/bucketlists')
           .then(({data})=> {
                   this.setState( {bucketLists: data.data})
               })
   }

   deleteItem(id){

       http.delete('bucketlists/'+id)
           .then(()=>{
               this.getBucketList();
               toast.success("Bucket list deleted");
           })
   }




    addBucketList(bucketList){
       return new Promise((resolve,reject)=>{
            http.post('/bucketlists',bucketList)
                .then(({data})=>{
                    this.getBucketList();
                    // this.setState((prevState)=>{
                    //     return {
                    //         bucketLists:prevState.bucketLists.concat(data.data)
                    //     }
                    // },()=>{
                        resolve();
                        toast.success("Bucket item added")
                    // })
                }).catch((err)=>{
                    reject(err);
            });


       })
    }

    render() {
        return (
            <div className='container'>

                <div className='form'>
                    <BucketListForm  addBucketList={this.addBucketList}/>
                </div>

                <div className='table'>
                    <BucketListTable deleteItem={this.deleteItem} bucketLists={this.state.bucketLists}/>
                </div>
            </div>
        )
    }
}


export default BucketList
