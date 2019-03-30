import React from 'react';
import Baseformmodal from 'layouts/form-modal.jsx';
import { FormGroup ,Input ,Label} from 'reactstrap';
import 'react-drop-zone/dist/styles.css';
import app from 'app';


class formRepository extends React.Component{
  
  Save = () =>{
   let name = document.getElementById('name').value,
       jenis = document.getElementById('jenis').value,
       ket = document.getElementById('ket').value;

       if (name && jenis  && ket ) {
         app.apiPostJson('repository',{
            name: name , 
            jenis: jenis , 
            ket: ket 
         })
         .then(res =>{
            if (res) {
               app.msgok('Berhasil Disimpan','/')
            }
         }) 
  
       }else {
         app.msgerror('Masih Ada Yang Kosong')
       }  
   }

    render(){
        return(
           <div>
               <Baseformmodal title={'FORM KATEGORI'} captionbtn={'Tambah Kategori'} action={this.Save}>
               <FormGroup>
                  <Label>Nama Master Report</Label>
                  <Input placeholder="Master Report" type="text" id="name" required/>
               </FormGroup>
               <FormGroup>
                  <Label>Jenis Report</Label>
                  <Input type="select" id="jenis" required>
                    <option value="">Pilih Jenis Report</option>
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                    <option value="Tahunan">Tahunan</option>
                  </Input>
               </FormGroup>
                <FormGroup>
                  <Label>Keterangan</Label>
                  <Input placeholder="Keterangan" type="textarea" id="ket" required/>
               </FormGroup>
              </Baseformmodal>
           </div>
                
        )
    }
}

export default formRepository;