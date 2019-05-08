import React from 'react';
import Baseformmodal from 'layouts/form-modal.jsx';
import { FormGroup ,Input ,Label ,Form} from 'reactstrap';
import 'react-drop-zone/dist/styles.css';
import app from 'app';
import Serilaze from 'form-serialize';


class formRepository extends React.Component{
   constructor(){
      super()
      this.state ={
         sbu: [],
         dpt: []
      }
   }


   componentDidMount(){
      app.apiGet('sbu')
         .then(res =>{
            this.setState({
               sbu: res
            })
         })


        
   }

   Divisi =(e)=>{
      let id = e.target.value;
      app.apiGet1('dpt', id)
         .then(res =>{
           this.setState({
              dpt: res
           })
         })

   }
  
  Save = () =>{

   let form = document.getElementById('form');

   let data = Serilaze(form , { hash: true });

       if (data.name && data.jenis  && data.ket && data.sbu && data.divisi && data.nodoc ) {
         app.apiPostJson('repository',data)
         .then(res =>{
            if (res) {
               app.msgok('Berhasil Disimpan','/admin/listrepository')
            }
         }) 
       }else {
         app.msgerror('Masih Ada Yang Kosong')
       }  
   }

    render(){
        return(
           <div>
               <Baseformmodal title={'FORM KATEGORI'} action={this.Save} modal={this.props.modal} mode={this.props.mode}>
               <Form id="form">
                  <FormGroup>
                     <Label>Nama Master Report</Label>
                     <Input placeholder="Master Report" type="text" name="name" required/>
                  </FormGroup>
                  <FormGroup>
                     <Label>No Document</Label>
                     <Input placeholder="No Document" type="text" name="nodoc" required/>
                  </FormGroup>
                  <FormGroup>
                     <Label>SBU</Label>
                     <Input type="select" name="sbu" onChange={this.Divisi} required>
                        <option value='0'> Pilih SBU </option>
                        {
                           this.state.sbu.map(sbu=>
                              <option key={sbu.SYSTEM_ID} value={sbu.SYSTEM_ID}>{sbu.SBU}</option>
                           )
                        }
                     
                     </Input>
                  </FormGroup>
                  <FormGroup>
                     <Label>Divisi</Label>
                     <Input type="select" name="divisi" id="divisi" required>
                     <option value="">Pilih Divisi</option>
                     {
                        this.state.dpt.map(dpt =>
                              <option key={dpt.SYSTEM_ID} value={dpt.SYSTEM_ID}> {dpt.DIVISION}</option>
                           )
                     }
                     </Input>
                  </FormGroup>
                  <FormGroup>
                     <Label>Jenis Report</Label>
                     <Input type="select" id="jenis" name="jenis" required>
                        <option value="">Pilih Jenis Report</option>
                        <option value="Harian">Harian</option>
                        <option value="Mingguan">Mingguan</option>
                        <option value="Bulanan">Bulanan</option>
                        <option value="Tahunan">Tahunan</option>
                        <option value="Insidentil">Insidentil</option>
                     </Input>
                  </FormGroup>
                  <FormGroup>
                     <Label>Keterangan</Label>
                     <Input placeholder="Keterangan" type="textarea" id="ket" name="ket" required/>
                     <Input  type="hidden" name="user" value={app.dataUser[0].IDLOGIN}/>
                  </FormGroup>
               </Form>
              </Baseformmodal>
           </div>
                
        )
    }
}

export default formRepository;