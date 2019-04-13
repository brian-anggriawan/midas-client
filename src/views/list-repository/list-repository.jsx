import React from "react";
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FormRepository from './form-repository';
import Pageadmin from 'layouts/page-admin';
import app from 'app';
import {Button} from 'reactstrap';
import Listuser from './list-user';

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

  componentDidMount(){

    app.apiGet('repository')
       .then(res => {
        this.setState({
          repo: res
        })
       });
  }

  Showlist(rowIndex){
    
    let id = this.state.repo[rowIndex].ID_REPO;

    app.apiGet1('repository/user',id)
       .then(res =>{
         this.setState({
           user: res
         })
         this.setState({
          reponame: this.state.repo[rowIndex].REPOSITORY
        })
       })
    this.mode();    
  }

  button(cell, row, enumObject, rowIndex){
    return <Button type="button" size="sm" color="default" onClick={()=> this.Showlist(rowIndex)}> List User </Button>
  }


  render() {
 
    return (
      <Pageadmin head={'List Master Report'}>
        <Button type='button' color='default' onClick={this.mode2} style={{marginBottom:'10px'}}>Tambah Data</Button>
        <FormRepository modal={this.state.modal2} mode={this.mode2}/>
        <Listuser modal={this.state.modal} mode={this.mode} data={this.state.user} title={this.state.reponame}/>
        <div className="row">
          <div className="col-md-12">
              <div className="card">
                <div className="content">
                        <BootstrapTable
                        data={this.state.repo}
                        bordered={false}
                        striped
                        search
                        pagination={true}
                        options={app.optionTable}>
                          <TableHeaderColumn
                            dataField='REPOSITORY'
                            width='20%'
                            isKey = {true}
                            dataSort>
                            Description
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='NODOC'
                            width='20%'
                            dataSort>
                            No Doc
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='JENIS_REPO'
                            width='20%'
                            dataSort>
                            Jenis Laporan
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='KETERANGAN'
                            width='20%'
                            dataSort>
                            Keterangan
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='SBU'
                            width='20%'
                            dataSort>
                            SBU
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='DIVISION'
                            width='20%'
                            dataSort>
                            Division
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='JUMLAH_USER'
                            width='20%'
                            dataSort>
                            Jumlah User
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataFormat={this.button.bind(this)}
                            width='20%'
                            dataSort>
                            Action
                          </TableHeaderColumn>
                      </BootstrapTable>
                </div>
              </div>
            </div>
          </div>  
      </Pageadmin>
    );
  }
}

export default listRepository;
