import React from 'react';
import Baseformmodal from 'layouts/form-modal';
import { FormGroup , Input  } from 'reactstrap';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
import app from 'app';

 


class formUpload extends React.Component{
    constructor(){
      super()
      this.state = {
        files: [],
        encode:''
      }

    }
   

    
      addFile = (file, text) => {
        this.setState({ files: [...this.state.files, file] })
        
        let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = ()=>{
              this.setState({
                encode: reader.result
              })
            }     
      }

      Save = ()=>{
            let formData = new FormData();

              formData.append('file', this.state.files[0]);
              formData.append('description', document.getElementById('description').value );
              formData.append('template', this.props.data[0].idtemplate);
              formData.append('idperiod', this.props.data[0].idperiod);
              formData.append('period', this.props.data[0].period);
              formData.append('directory', this.props.data[0].directory);
              formData.append('nodoc', this.props.data[0].nodoc);
              formData.append('repo', this.props.data[0].repo);
              formData.append('blob' , this.state.encode);
              formData.append('user' , app.dataUser[0].IDLOGIN);

              let des = formData.get('description'),
                  file = formData.get('file');
              
              let update = {  template: formData.get('template'),
                              idperiod: formData.get('idperiod')
                            }

              if (des && file !=='undefined' ) { 
                
                app.apiUpdate('uploadfile' , update)
                   .then(res =>{
                     if (res) {
                      app.apiPostFormdata('uploadfile',formData)
                      .then(res =>{
                        app.msgok('berhasil','/admin/index')
                      })         
                     }
                   })
              }else{
                app.msgerror('Masih Ada Yang Kosong')
              }
        }
      

    render(){
        return(
           <div>
              <Baseformmodal title={'FORM UPLOAD'} captionbtn={'Upload File'} action={this.Save} modal={this.props.modal} mode={this.props.mode}>
              <FormGroup>
                </FormGroup>
                <FormGroup>
                  <Input id="description" placeholder="Description" type="text" />
                </FormGroup>
                <StyledDropZone onDrop={this.addFile} /><br/>
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