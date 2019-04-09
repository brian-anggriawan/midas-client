import React from 'react';
import { BootstrapTable , TableHeaderColumn } from 'react-bootstrap-table';
import Pageadmin from 'layouts/page-admin';
import { Input ,Row , Col , FormGroup , Button } from 'reactstrap';
import Formacc from './form_access_repo';
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
        iduser:''
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

dpt = (e)=>{
    app.apiGet1('dpt',e.target.value)
       .then(res =>{
           this.setState({
               dpt: res
           })
       })  
}

user = (e) =>{
    let sbu = document.getElementById('sbu').value;

    app.apiGet2('userFilter',sbu , e.target.value)
       .then(res =>{
           this.setState({
               user: res
           })
       })


    app.apiGet1('accessrepo/repo',e.target.value)
       .then(res =>{
           this.setState({
               repo: res
           })
    })
}

data = () =>{

let id = document.getElementById('user').value;
  app.apiGet1('accessrepo',id)
     .then(res =>{
        this.setState({
            data: res
        })
         
     })  

     this.setState({
         iduser: id
     }) 
}

mode = ()=>{
    this.setState({
        modal: !this.state.modal
    })
}

delete(rowIndex){
    let idrepo = this.state.data[rowIndex].IDACC_REPO;
    
    app.apiDelete('accessrepo',{
        id: idrepo
    })
       .then(data =>{
           if (data) {
               this.data();
           }
       })
}

action(cell, row, enumObject, rowIndex){
    return <Button color="danger" onClick={()=> this.delete(rowIndex)} size="sm"> Delete Hak Akses </Button>
}




render(){
    return(
        <Pageadmin head={'List Access Repository'}>
            <Row style={{marginBottom:'20px'}}>
                <Col md='3'>
                    <FormGroup>
                        <Input type='select' onChange={this.dpt} id="sbu">
                        <option value="0">Pilih SBU</option>
                            {
                                this.state.sbu.map(data =>
                                 <option key={data.SYSTEM_ID} value={data.SYSTEM_ID}>{data.SBU}</option>   
                                )
                            }
                        </Input>
                    </FormGroup>
                </Col>
                <Col md='3'>
                    <FormGroup>
                        <Input type='select' onChange={this.user} id="dpt">
                        <option value="0">Pilih Division</option>
                        {
                            this.state.dpt.map(data =>
                                <option key={data.SYSTEM_ID} value={data.SYSTEM_ID}>{data.DIVISION}</option>    
                            )
                        }
                        </Input>
                    </FormGroup>
                </Col>
                <Col md='3'>
                    <FormGroup>
                        <Input type='select' id="user">
                        <option value="0" >Pilih User</option>
                        {
                            this.state.user.map(data =>
                                <option key={data.IDLOGIN} value={data.IDLOGIN}>{data.USERNAME}</option>    
                            )
                        }
                        </Input>              
                    </FormGroup>    
                </Col>
                <Button type="Button" onClick={this.data} color="default">Cari Data</Button>    
            </Row>
            <Button type="button" color='default' onClick={this.mode}>Tambah Akses Repository</Button><br/><br/>
            <br/>
            <Formacc modal={this.state.modal} mode={this.mode} repo ={this.state.repo} user={this.state.iduser} test={this.data} />
            <BootstrapTable
                bordered={false}
                striped
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
                    dataFormat={this.action.bind(this)}
                    width='16%'
                    dataSort>
                    Action
                </TableHeaderColumn>   
            </BootstrapTable>
        </Pageadmin>
    )
}

}

export default listAccessmenu;