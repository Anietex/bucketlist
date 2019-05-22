import React, {Component} from 'react'

import BucketListItemsTable from "../components/BucketListItemsTable";
import BucketListItemForm from "../components/BucketListItemForm";
import {http} from '../utils';
import {toast} from "react-toastify";


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
        this.markAsDone = this.markAsDone.bind(this)
       this.deleteItem = this.deleteItem.bind(this)
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
        let items = this.state.bucketListsItems;
        let index = this.state.bucketListsItems.findIndex((item)=>{
            return item.id == id;
        });

        items[index].done = !items[index].done;
        this.setState({bucketListItems:items})
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


    render() {
        return (
            <div className='container'>

                <div className='form'>
                    <BucketListItemForm  bucketList={this.state.bucketList}
                                         addBucketListItem={this.addBucketListItem}/>
                </div>

                <div className='table'>
                    <BucketListItemsTable deleteItem={this.deleteItem} bucketListItems={this.state.bucketListsItems}
                                          markAsDone={this.markAsDone}/>
                </div>
            </div>
        )
    }
}


export default BucketListItems
