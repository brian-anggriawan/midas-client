import React from 'react';
import Baseformmodal from 'layouts/form-modal.jsx';
import { FormGroup , Input , InputGroup , InputGroupAddon, InputGroupText } from 'reactstrap';
import { StyledDropZone } from 'react-drop-zone';
import ReactDatetime from "react-datetime";
import 'react-drop-zone/dist/styles.css';
import app from 'app';


class formUpload extends React.Component{
    constructor(){
      super()
      this.state = {
        files: [],
        kategori: [],
        tanggal:'',
        encode:''
      }


    }
   

      componentDidMount(){

        app.apiGet('uploadsckategori')
           .then(res =>{
              this.setState({
                kategori: res
              })
           });
        
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
              formData.append('kategori', document.getElementById('kategori').value );
              formData.append('tanggal',this.state.tanggal);
              formData.append('blob' , this.state.encode);

              let des = formData.get('description'),
                  kategori = formData.get('kategori'),
                  tanggal = formData.get('tanggal'),
                  file = formData.get('file');

              if (des && kategori && tanggal && file !=='undefined' ) { 
                app.apiPostFormdata('uploadfile',formData)
                .then(res =>{
                  app.msgok('berhasil','/admin/listfile')
                }) 
                
              }else{
                app.msgerror('Masih Ada Yang Kosong')
              }
        }
      
      getDate =(date)=>{
       this.setState({
          tanggal: date._d
        })

      }
      

    render(){
        return(
           <div>
              <Baseformmodal title={'FORM UPLOAD'} captionbtn={'Upload File'} action={this.Save}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText >
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime  onChange={this.getDate} 
                      closeOnSelect={true}
                      timeFormat={false}
                      inputProps={{
                        placeholder: "Tanggal Period",
                      }}
                    />
                </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Input id="description" placeholder="Description" type="text" />
                </FormGroup>
                <FormGroup>
                  <Input type="select" id="kategori">
                  <option value=''>Pilih Kategori</option>   
                    {
                      this.state.kategori.map(kategori=>
                        <option key = {kategori.VCIDREPO} value={kategori.VCIDREPO}>{kategori.VCDESCRIPTION}</option>   
                      )
                    }
                  </Input>
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