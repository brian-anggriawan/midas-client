import React from 'react';
import Spiner from 'react-spinner-material';
import {
    Modal
} from 'reactstrap';

class loadingModal extends React.Component{

 
    render(){
        return (
            <React.Fragment>
            <Modal
                className = 'modal-dialog-centered'
                isOpen = {this.props.modal}
            >
                <div className='modal-body' style={{marginLeft: '30%'}}>
                   <Spiner size={120} spinnerColor={'blue'}  spinnerWidth={2} visible={true} />
                </div>
                <h1 className="display-3 text-center">{this.props.text}</h1> 
            </Modal>
            </React.Fragment>
        )
    }
}

export default loadingModal;