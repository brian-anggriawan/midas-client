import React from 'react';
import Baseformmodal from 'layouts/form-modal.jsx';
import { FormGroup , Input } from 'reactstrap';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';


class formUpload extends React.Component{
    constructor(){
      super()
      this.state = {
        files: [],
        kategori: []
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
            let count = this.state.files.length;

            for (let i = 0; i <= (count - 1); i++){
              formData.append('file', this.state.files[i])
            }

           

            fetch('http://192.168.40.88:4000/uploadfile',{
              method: 'post',
              body: formData
            })
            
        }


    render(){
        return(
           <div>
              <Baseformmodal title={'FORM UPLOAD'} captionbtn={'Upload File'} action={this.Save}>
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