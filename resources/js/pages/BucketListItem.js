import React, {Component} from 'react'
import BucketListForm from "../components/BucketListForm";
import BucketListTable from "../components/BucketListTable";
import BucketListItemsTable from "../components/BucketListItemsTable";
import BucketListItemForm from "../components/BucketListItemForm";

class BucketListItems extends Component{
   constructor(props){
       super(props);
        this.state = {
            bucketListsItems:[],
            bucketList:{
                name:'Bucket list one'
            }
        }

        this.addBucketListItem = this.addBucketListItem.bind(this);
        this.markAsDone = this.markAsDone.bind(this)
   }

    render() {
        return (
            <div className='container'>

                <div className='form'>
                    <BucketListItemForm  bucketList={this.state.bucketList}
                                     addBucketListItem={this.addBucketListItem}/>
                </div>

                <div className='table'>
                    <BucketListItemsTable bucketListItems={this.state.bucketListsItems}
                                          markAsDone={this.markAsDone}/>
                </div>
            </div>
        )
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
       bucketListItem.id = Math.round( 1+Math.random()*1000);
       return new Promise((resolve,reject)=>{

           this.setState((prevState)=>{
               return {
                   bucketListsItems:prevState.bucketListsItems.concat(bucketListItem)
               }
           },()=>{
               resolve();
           })
       })
    }
}


export default BucketListItems
