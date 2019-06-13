import React, { Component } from 'react';
import Modal from 'layouts/form-modal';
import { FormGroup ,Input ,Label ,Form} from 'reactstrap';
import Select from 'react-select';
import Serialize from 'form-serialize';
import app from 'app';

export default class entryUsers extends Component {
    constructor(){
        super()
        this.state = {
            dpt:[]
        }
        this.dpt = this.dpt.bind(this);
    }

    dpt(e){
        app.apiGet1('dpt',e.value)
           .then(res =>{
               this.setState({
                   dpt: res
               })
           })  
    }

    Save(){
        let form = document.getElementById('form');
        let hasil = Serialize( form , { hash: true});

        let count = Object.keys(hasil).length

        if (count !== 4) {
          app.msgerror('Masih Ada Yang Kosong')
        }else{
          app.apiGet1('cekuser' , hasil.name)
             .then(res =>{
                 if (res) {
                    app.msgerror('Username Sudah Ada') 
                 }else{
                    app.apiPostJson('daftarauth' , hasil)
                        .then(()=>{
                            app.msgok('Berhasil Disimpan' , '/admin/datausers')
                        })
                 }
             })
        }
    }

    render() {
        return (
            <Modal title={'Form User'} action={this.Save} modal={this.props.modal} mode={this.props.mode}>
                <Form id='form'>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input type='text' name='name'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type='password' name='pas'/>
                    </FormGroup>
                    <FormGroup>
                         <Select placeholder={'Pilih Akses'} name='acc' options={[
                             {
                                 value: 0,
                                 label: 'Administrator'
                             },
                             {
                                 value: 1,
                                 label: 'Direksi'
                             },
                             {
                                 value: 2,
                                 label: 'Super user'
                             },
                             {
                                 value: 3,
                                 label: 'User'
                             }
                         ]}
                         
                         />
                    </FormGroup>
                    <FormGroup>
                        <Select placeholder={'Pilih SBU'} onChange={this.dpt} options={this.props.sbu.map((x)=>({
                                                value: x.SYSTEM_ID,
                                                label: x.SBU
                                            }))} />
                    </FormGroup>
                    <FormGroup>
                        <Select placeholder={'Pilih Division'}  options={this.state.dpt.map((x)=>({
                                                value: x.SYSTEM_ID,
                                                label: x.DIVISION
                                            }))} name='dpt' />
                    </FormGroup>
                </Form>
            </Modal>
        )
    }
}
