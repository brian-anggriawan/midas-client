import React from 'react';
import Baseformmodal from 'layouts/form-modal.jsx';
import ReactDatetime from 'react-datetime';
import { FormGroup , InputGroup, InputGroupAddon , InputGroupText , Input } from 'reactstrap';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';


class formUpload extends React.Component{

    state = {
        files: []
      }
    
      addFile = (file, text) => {
        this.setState({ files: [...this.state.files, file] })
        console.log(file)
      }
    render(){
        return(
           <div>
               <Baseformmodal title={'FORM UPLOAD'} captionbtn={'Upload File'}>
               <FormGroup>
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                        inputProps={{
                            placeholder: "Tanggal Upload"
                        }}
                        timeFormat={false}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                <Input
                  id="ket"
                  placeholder="Keterangan"
                  type="textarea"
                />
              </FormGroup>
              <StyledDropZone onDrop={this.addFile} />
        <ul>
          {
            this.state.files.map(file =>
              <li key={file.name} >
                <i className='fa fa-file' /> {file.name}
              </li>
            )
          }
        </ul>
                </Baseformmodal>
           </div>
                
        )
    }
}

export default formUpload;