import React from 'react';
import Baseformmodal from 'layouts/form-modal.jsx';
import { FormGroup , Input , InputGroup , InputGroupAddon, InputGroupText } from 'reactstrap';
import { StyledDropZone } from 'react-drop-zone';
import ReactDatetime from "react-datetime";
import 'react-drop-zone/dist/styles.css';


class formUpload extends React.Component{
    constructor(){
      super()
      this.state = {
        files: [],
        kategori: [],
        tanggal:''
      }


    }
   

      componentDidMount(){
        fetch('http://192.168.40.88:4000/uploadsckategori',{
          method:'get',
          headers: { 'Content-Type':'application/json'}
        })
        .then( res  => res.json())
        .then(data =>{
          this.setState({
            kategori: data
          })
        })
      }
    
      addFile = (file, text) => {
        this.setState({ files: [...this.state.files, file] })
      }

      Save = ()=>{
            let formData = new FormData();

              formData.append('file', this.state.files[0]);
              formData.append('description', document.getElementById('description').value );
              formData.append('kategori', document.getElementById('kategori').value );
              formData.append('tanggal',this.state.tanggal);
        

            fetch('http://192.168.40.88:4000/uploadfile',{
              method: 'post',
              body: formData,
            })
            .then(res => res.json())
            .then(data =>{
              window.location.href="/admin/listfile";
            })      
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