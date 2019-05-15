import React from 'react';
import { BootstrapTable , TableHeaderColumn } from 'react-bootstrap-table';
import Pageadmin from 'layouts/page-admin';
import { Row , Col , FormGroup , Button } from 'reactstrap';
import Formacc from './form_access_repo';
import Scroll from 'simplebar-react';
import Select from 'react-select';
import app from 'app';


class listAccessmenu extends React.Component{
constructor(){
    super()
    this.state = {
        sbu: [],
        dpt: [],
        user:[],
        data:[],
        modal: false,
        repo:[],
        idsbu:'',
        iddept:'',
        iduser:'',

    }
}


componentDidMount(){
    app.apiGet('sbu')
       .then(res =>{

        let data = [];
        res.map( x =>
                data.push({
                    value: x.SYSTEM_ID,
                    label: x.SBU
                })
            )
           this.setState({
               sbu: data
           })
       })
}

dpt = (e)=>{
    app.apiGet1('dpt',e.value)
       .then(res =>{
           let data = [];
           res.map(x =>
                data.push({
                    value: x.SYSTEM_ID,
                    label: x.DIVISION
                })
            )
           this.setState({
               dpt: data,
               idsbu: e.value
           })
       })  
}

user = (e) =>{
  
    app.apiGet2('userFilter',this.state.idsbu , e.value)
       .then(res =>{
           let data = [];

           res.map(x =>
                data.push({
                    value: x.IDLOGIN,
                    label: x.USERNAME
                })
            )
           this.setState({
               user: data
           })
       })


    app.apiGet1('accessrepo/repo',e.value)
       .then(res =>{
           this.setState({
               repo: res
           })
    })
}

data = (e) =>{
  app.apiGet1('accessrepo',e.value)
     .then(res =>{
        this.setState({
            data: res
        })
         
     })  

     this.setState({
         iduser: e.value
     }) 
}

refresh = () =>{
    app.apiGet1('accessrepo',this.state.iduser)
     .then(res =>{
        this.setState({
            data: res
        })
         
     })  
}

mode = ()=>{
    this.setState({
        modal: !this.state.modal
    })
}

delete(idrepo){

    app.apiDelete('accessrepo',{
        id: idrepo
    })
       .then(data =>{
           if (data) {
               this.refresh();
           }
       })
}

action=(id)=>{
    return <Button color="danger" onClick={()=> this.delete(id)} size="sm"> Delete Hak Akses </Button>
}




render(){
    return(
        <Pageadmin head={'List Access Repository'}>
            <Row style={{marginBottom:'20px'}}>
                <Col md='3'>
                    <FormGroup>
                        <Select options={this.state.sbu} placeholder={'Pilih SBU'} onChange={this.dpt} id='sbu' />
                    </FormGroup>
                </Col>
                <Col md='3'>
                    <FormGroup>
                        <Select options={this.state.dpt} placeholder={'Pilih Division'} onChange={this.user} />
                    </FormGroup>
                </Col>
                <Col md='3'>
                    <FormGroup>
                        <Select options={this.state.user} placeholder={'Pilih User'} onChange={this.data} />              
                    </FormGroup>    
                </Col> 
            </Row>
            <Button type="button" color='default' className='mb--1' onClick={this.mode}>Tambah Akses Repository</Button>
            <Formacc modal={this.state.modal} mode={this.mode} repo ={this.state.repo} user={this.state.iduser} test={this.refresh} />
            <Scroll>
                <BootstrapTable
                    bordered={false}
                    striped
                    search
                    data={this.state.data}
                    pagination={true}
                    options= {app.optionTable}
                    >
                    <TableHeaderColumn
                        dataField='REPOSITORY'
                        width='16%'
                        isKey = {true}
                        dataSort>
                        Periode
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='JENIS_REPO'
                        width='16%'
                        dataSort>
                        Kategori
                    </TableHeaderColumn>   
                    <TableHeaderColumn
                        dataField='IDACC_REPO'
                        dataFormat={this.action}
                        width='16%'
                        dataSort>
                        Action
                    </TableHeaderColumn>   
                </BootstrapTable>
            </Scroll>
        </Pageadmin>
    )
}

}

export default listAccessmenu;