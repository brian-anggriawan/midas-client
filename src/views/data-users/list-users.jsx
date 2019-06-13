import React, { Component } from 'react';
import Pageadmin from 'layouts/page-admin';
import app from 'app';
import Select from 'react-select';
import { Row , Col , Button } from 'reactstrap';
import Tabel from 'layouts/tabel';
import Entry from './entry-users';

export default class listUsers extends Component {
    constructor(){
        super()
        this.state = {
            sbu:[],
            dpt:[],
            modal: false,
            users: []
        }

        this.mode = this.mode.bind(this);
        this.dpt = this.dpt.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.Button = this.Button.bind(this);
    }
    componentWillMount(){
        app.apiGet('sbu')
        .then(res =>{
            this.setState({
                sbu: res
            })
        })
    }

    mode(){
        this.setState({ modal: !this.state.modal})
    }

    dpt(e){
        app.apiGet1('dpt',e.value)
           .then(res =>{
               this.setState({
                   dpt: res
               })
           })  
    }

    getUsers(e){
        app.apiGet1('usersby', e.value)
            .then(res=>{
                this.setState({ users: res})
            })
    }

    delete(id){
        app.msgdialog('Delete')
            .then(res =>{
                if (res) {
                   app.apiDelete('deluserbyid',{ id: id})
                      .then((res)=>{
                          if (res) {
                              app.msgok('Berhasil Dihapus' , '/admin/datausers')
                          }
                      }) 
                }
            })
    }

    Button(id){
        return <Button className='btn btn-danger' onClick={()=> this.delete(id)} size='sm' type='button'>Delete user</Button>
    }


    render() {
        return (
            <div>
                <Pageadmin>
                    <Entry modal={this.state.modal} mode={this.mode} sbu={this.state.sbu}/>
                    <Row>
                        <Col sm='3'>
                            <Select placeholder={'Pilih SBU'} onChange={this.dpt} options={this.state.sbu.map((x)=>({
                                            value: x.SYSTEM_ID,
                                            label: x.SBU
                                        }))} />
                        </Col>
                        <Col sm='3'>
                            <Select placeholder={'Pilih Division'} onChange={this.getUsers} options={this.state.dpt.map((x)=>({
                                            value: x.SYSTEM_ID,
                                            label: x.DIVISION
                                        }))} />
                        </Col>
                         <Col sm='3'>
                             <Button className='btn btn-success' type='button' onClick={this.mode}> Tambah User</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='12'>
                            <Tabel
                                data ={this.state.users}
                                keyField = {'IDLOGIN'}
                                columns ={[
                                    {
                                        dataField: 'USERNAME',
                                        text: 'Username'
                                    },
                                    {
                                        dataField: 'PASSWORD',
                                        text: 'Password'
                                    },
                                    {
                                        dataField: 'TANGGAL_DAFTAR',
                                        text: 'Tanggal Daftar'
                                    },
                                    {
                                        dataField: 'USER_LEVEL',
                                        text: 'User Level'
                                    },
                                    {
                                        dataField: 'IDLOGIN',
                                        text: 'Action',
                                        formatter: this.Button
                                    }
                                ]}

                                width={{ width:'300px'}}
                            />
                        </Col>
                    </Row>
                </Pageadmin>
            </div>
        )
    }
}
