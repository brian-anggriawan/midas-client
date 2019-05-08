import React from "react";
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FormRepository from './form-repository';
import Pageadmin from 'layouts/page-admin';
import app from 'app';
import {Button} from 'reactstrap';
import Listuser from './list-user';
import Scroll from 'simplebar-react';

class listRepository extends React.Component {
  constructor(){
    super()

    this.state = {
      repo: [],
      user:[],
      reponame:'',
      modal: false,
      modal2: false
    }
  }

  mode = ()=>{
    this.setState({
      modal: !this.state.modal
    })
  }

  mode2 = ()=>{
    this.setState({
      modal2: !this.state.modal2
    }) 
  }

  componentWillMount(){

    app.apiGet('repository')
       .then(res => {
        this.setState({
          repo: res
        })
       });
  }

  Showlist(id){
    
    let data = this.state.repo.filter(res => res.ID_REPO === id)[0];
    app.apiGet1('repository/user',id)
       .then(res =>{
         this.setState({
           user: res
         })
         this.setState({
          reponame: data.REPOSITORY
        })
       })
    this.mode();    
  }

  button =(id)=>{
    return <Button type="button" size="sm" color="default" onClick={()=> this.Showlist(id)}> List User </Button>
  }


  render() {
 
    return (
      <Pageadmin head={'List Master Report'}>
        <Button type='button' color='default' onClick={this.mode2} style={{marginBottom:'10px'}}>Tambah Data</Button>
        <FormRepository modal={this.state.modal2} mode={this.mode2}/>
        <Listuser modal={this.state.modal} mode={this.mode} data={this.state.user} title={this.state.reponame}/>
        <Scroll>
          <BootstrapTable
          data={this.state.repo}
          bordered={false}
          striped
          search
          pagination={true}
          options={app.optionTable}>
            <TableHeaderColumn
              dataField='REPOSITORY'
              width='8%'
              isKey = {true}
              dataSort>
              Description
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='NODOC'
              width='8%'
              dataSort>
              No Doc
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='JENIS_REPO'
              width='8%'
              dataSort>
              Jenis Laporan
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='KETERANGAN'
              width='8%'
              dataSort>
              Keterangan
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='SBU'
              width='8%'
              dataSort>
              SBU
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='DIVISION'
              width='8%'
              dataSort>
              Division
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='JUMLAH_USER'
              width='8%'
              dataSort>
              Jumlah User
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField='ID_REPO'
              dataFormat={this.button}
              width='8%'
              dataSort>
              Action
            </TableHeaderColumn>
          </BootstrapTable>              
        </Scroll>   
      </Pageadmin>
    );
  }
}

export default listRepository;
