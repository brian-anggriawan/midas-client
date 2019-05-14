import React from 'react';
import {
    Button,
    Modal
} from 'reactstrap';
import 'app.css';


class formModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false
        }
    }

    render(){
        return (
            <React.Fragment>  
            <Modal
                className = 'modal-dialog-centered'
                isOpen = {this.props.modal}
                toggle = {this.props.mode}
                size='lg'
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>
                        {this.props.title}
                    </h5>
                    <Button
                        aria-label='Close'
                        className='close'
                        data-dismiss ='modal'
                        type ='button'
                        onClick={this.props.mode}
                    >
                        <span aria-hidden = {true}> x </span>
                    </Button>
                </div>
                <div className='modal-body'>
                    {this.props.children}
                </div>
                <div className='modal-footer'>

                </div>
            </Modal>
            </React.Fragment>
        )
    }
}

export default formModal;