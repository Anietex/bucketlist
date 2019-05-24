import React, {Component} from 'react'
import BucketListForm from "../components/BucketListForm";
import BucketListTable from "../components/BucketListTable";
import {http } from '../utils'
import {toast} from "react-toastify";
import EditBucketListModal from "../components/EditBucketListModal";

class BucketList extends Component{
   constructor(props){
       super(props);
        this.state = {
            bucketLists:null
        }

        this.addBucketList = this.addBucketList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editModal = React.createRef();
        this.editBucketList = this.editBucketList.bind(this)
       this.updateBucketList = this.updateBucketList.bind(this)
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

   editBucketList(bucketList){
       this.editModal.current.open(bucketList);
   }

   updateBucketList(bucketList){
       return new Promise((resolve, reject)=>{
           console.log(bucketList);

           let data = {
               name:bucketList.name
           }
           http.put('bucketlists/'+bucketList.id,data)
               .then(()=>{
                   toast.success("BucketList Updated");
                   this.getBucketList();
                   resolve()
               }).catch(()=>{
                   reject()
                   toast.error('Oops something went wrong')
           })
       })
   }


    addBucketList(bucketList){
       return new Promise((resolve,reject)=>{
            http.post('/bucketlists',bucketList)
                .then(({data})=>{
                    this.getBucketList();
                        resolve();
                        toast.success("Bucket item added")
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
                    <BucketListTable deleteItem={this.deleteItem}
                                     editBucketList={this.editBucketList}
                                     bucketLists={this.state.bucketLists}/>
                </div>

                <EditBucketListModal submit={this.updateBucketList}
                                     modalTitle='Edit Bucket list'
                                     ref={this.editModal}/>
            </div>
        )
    }
}


export default BucketList
