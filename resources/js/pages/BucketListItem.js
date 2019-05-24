import React, {Component} from 'react'

import BucketListItemsTable from "../components/BucketListItemsTable";
import BucketListItemForm from "../components/BucketListItemForm";
import {http} from '../utils';
import {toast} from "react-toastify";
import EditBucketListModal from "../components/EditBucketListModal";
import BucketListTable from "../components/BucketListTable";


class BucketListItems extends Component{
   constructor(props){
       super(props);
        this.state = {
            bucketListsItems:[],
            bucketList:{
                name:''
            }
        }

        this.id = this.props.match.params.id;

        this.addBucketListItem = this.addBucketListItem.bind(this);
        this.markAsDone = this.markAsDone.bind(this);
       this.deleteItem = this.deleteItem.bind(this);

       this.editModal = React.createRef();
       this.editBucketList = this.editBucketList.bind(this)
       this.updateBucketList = this.updateBucketList.bind(this)
   }

   componentDidMount() {
       this.getBucketList();
       this.getBucketListItems();
   }

    getBucketList(){
       http.get('/bucketlists/'+this.id)
           .then(({data})=>{
               this.setState({bucketList:data.data})
           })
   }

   getBucketListItems(){
        http.get('/bucketlists/'+this.id+'/items')
            .then(({data})=>{
                this.setState({bucketListsItems:data.data})
            })
   }


    deleteItem(id){

        http.delete('bucketlists/'+this.id+'/items/'+id)
            .then(()=>{
                this.getBucketListItems();
                toast.success("Bucket list item deleted");
            })
            .catch((err)=>{
                toast.error("Something went wrong")
            })
    }

    markAsDone(id){


      //  let items = this.state.bucketListsItems;
        let item = this.state.bucketListsItems.find((item)=>{
            return item.id === id;
        });

        return new Promise((resolve, reject)=>{

            let data = {
                done:!item.done
            }
            http.put('bucketlists/'+this.id+'/items/'+item.id,data)
                .then(()=>{
                    toast.success("Item Updated");
                    this.getBucketListItems();
                    resolve()
                }).catch(()=>{
                reject()
                toast.error('Oops something went wrong')
            })
        })









    }
    addBucketListItem(bucketListItem){
       return new Promise((resolve,reject)=>{
                http.post('/bucketlists/'+this.id+'/items',bucketListItem)
                    .then(()=>{
                        this.getBucketListItems();
                        resolve();
                        toast.success("Item added to bucket list")
                    })
                    .catch((err)=>{
                        reject(err)
                        toast.error("Something went wrong")
                    })
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

            http.put('bucketlists/'+this.id+'/items/'+bucketList.id,data)
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


    render() {
        return (
            <div className='container'>

                <div className='form'>
                    <BucketListItemForm  bucketList={this.state.bucketList}
                                         addBucketListItem={this.addBucketListItem}/>
                </div>

                <div className='table'>
                    <BucketListItemsTable deleteItem={this.deleteItem}
                                          bucketListItems={this.state.bucketListsItems}
                                          editBucketList={this.editBucketList}
                                          markAsDone={this.markAsDone}/>
                </div>

                <EditBucketListModal submit={this.updateBucketList}
                                     modalTitle='Edit Bucket list item'
                                     ref={this.editModal}/>
            </div>
        )
    }
}


export default BucketListItems
