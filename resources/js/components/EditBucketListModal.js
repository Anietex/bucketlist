import React , {Component} from 'react';
import M from 'materialize-css'

class EditBucketListModal extends Component{
    constructor(props){
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);


        this.modalRef = React.createRef();

        this.state ={
            name:''
        }
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }


    componentDidMount() {
        console.log(M)
        this.modal = M.Modal.init(this.modalRef.current);

    }

    render() {
        return (
            <div id="edit-modal" ref={this.modalRef} className="modal">
                <form onSubmit={this.submit}>
                    <div className="modal-content">
                        <h4>{this.props.modalTitle}</h4>
                        <div className='input-field'>
                            <input type='text' id='name' onChange={this.handleChange} value={this.state.name} name='name'/>
                            <label htmlFor='name'>Name</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type='submit' className='btn waves-effect' >Update</button>
                        <button  className='btn red  waves-effect modal-close' >Close</button>

                    </div>
                </form>

            </div>
        )
    }


    open(bucketList){
        this.bucketList = bucketList;
        this.setState({name:bucketList.name},()=>{M.updateTextFields()});

        this.modal.open();
    }

    close(){
        this.modal.close();
    }


    submit(e){
        e.preventDefault();

        this.bucketList.name = this.state.name;

        this.props.submit(this.bucketList)
            .then(()=>{
            this.close();
        })
            .catch(()=>{

        })
    }


}


export default EditBucketListModal
