import React from 'react';
import Baseformmodal from 'layouts/form-modal.jsx';
import { FormGroup ,Input ,Label} from 'reactstrap';
import 'react-drop-zone/dist/styles.css';


class formRepository extends React.Component{
  
  Save = () =>{
   let name = document.getElementById('name').value,
       standart = document.getElementById('standart').value,
       jenis = document.getElementById('jenis').value,
       ket = document.getElementById('ket').value;

       fetch('http://localhost:4000/repository',{
         method: 'post',
         headers: { 'Content-Type':'application/json'},
         body: JSON.stringify({
          name: name , 
          file: standart , 
          jenis: jenis , 
          ket: ket
         })
       })
       .then(res => res.json())
       .then(data => {
          if (data) {
            window.location.href ="/";
          }
       })
      }

    render(){
        return(
           <div>
               <Baseformmodal title={'FORM KATEGORI'} captionbtn={'Tambah Kategori'} action={this.Save}>
               <FormGroup>
                  <Label>Nama Master Report</Label>
                  <Input placeholder="Master Report" type="text" id="name" />
               </FormGroup>
               <FormGroup>
                  <Label>Standart File Name</Label>
                  <Input placeholder="File Name" type="text" id="standart"/>
               </FormGroup>
               <FormGroup>
                  <Label>Jenis Report</Label>
                  <Input type="select" id="jenis">
                    <option value="">Pilih Jenis Report</option>
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                    <option value="Tahunan">Tahunan</option>
                  </Input>
               </FormGroup>
                <FormGroup>
                  <Label>Keterangan</Label>
                  <Input placeholder="Keterangan" type="textarea" id="ket"/>
               </FormGroup>
              </Baseformmodal>
           </div>
                
        )
    }
}

export default formRepository;